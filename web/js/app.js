import { Lucid, Blockfrost, fromText, Data } from 'https://cdn.jsdelivr.net/npm/lucid-cardano@0.10.7/web/mod.js';

let lucid;
let contractAddress;
let config;

// Dados do validator (você precisa copiar do plutus.json após compilar)
const validator = {
    type: "PlutusV2",
    script: "58ae01010029800aba2aba1aab9faab9eaab9dab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c01cdd500144c8c96600266e1d20003009375400b13232598009807801456600266e1d2000300b3754601c601e00913371e6eb8c038c030dd5003a450d48656c6c6f2c20576f726c6421008b20148b201a375c601a00260146ea80162c8040c02c004c020dd50014590060c01c004c00cdd5003c52689b2b200201"
};

/**
 * Inicializa a configuração carregando as variáveis de ambiente
 */
async function initConfig() {
    try {
        config = await window.envLoader.load();
        console.log('✅ Configuração carregada com sucesso');
    } catch (error) {
        console.error('❌ Erro ao carregar configuração:', error);
        showStatus('error', '❌ Erro ao carregar configuração. Verifique se o arquivo .env está configurado corretamente.');
        throw error;
    }
}

/**
 * Detecta wallets disponíveis
 */
function getAvailableWallet() {
    if (!window.cardano) {
        throw new Error('Nenhuma wallet Cardano detectada. Instale Nami, Eternl, Lace ou Flint.');
    }

    // Tentar detectar wallets na ordem de preferência
    const wallets = ['nami', 'eternl', 'lace', 'flint', 'typhon', 'gerowallet'];

    for (const wallet of wallets) {
        if (window.cardano[wallet]) {
            return { name: wallet, api: window.cardano[wallet] };
        }
    }

    throw new Error('Nenhuma wallet compatível encontrada. Instale Nami, Eternl, Lace ou Flint.');
}

/**
 * Conecta a wallet do usuário
 */
window.connectWallet = async function () {
    try {
        // Carregar configuração se ainda não foi carregada
        if (!config) {
            await initConfig();
        }

        showStatus('info', '⏳ Detectando wallet...');

        // Detectar wallet disponível
        const wallet = getAvailableWallet();

        showStatus('info', `⏳ Conectando à ${wallet.name.toUpperCase()}...`);

        lucid = await Lucid.new(
            new Blockfrost(
                config.BLOCKFROST_URL,
                config.BLOCKFROST_API_KEY
            ),
            config.CARDANO_NETWORK
        );

        const api = await wallet.api.enable();
        lucid.selectWallet(api);

        const address = await lucid.wallet.address();
        const utxos = await lucid.wallet.getUtxos();

        let totalLovelace = 0n;
        utxos.forEach(utxo => {
            totalLovelace += utxo.assets.lovelace;
        });

        document.getElementById('walletAddress').textContent =
            address.substring(0, 20) + '...' + address.substring(address.length - 10);
        document.getElementById('walletBalance').textContent =
            (Number(totalLovelace) / 1_000_000).toFixed(2) + ' ADA';

        document.getElementById('walletInfo').classList.remove('hidden');
        document.getElementById('contractSection').classList.remove('hidden');

        // Calcular endereço do contrato
        contractAddress = lucid.utils.validatorToAddress(validator);

        showStatus('success', '✅ Wallet conectada com sucesso!');

    } catch (error) {
        console.error('Erro ao conectar wallet:', error);
        showStatus('error', '❌ Erro: ' + error.message);
    }
}

/**
 * Bloqueia fundos no contrato
 */
window.lockFunds = async function () {
    try {
        const amount = document.getElementById('lockAmount').value;
        if (!amount || amount <= 0) {
            showStatus('error', '❌ Digite uma quantidade válida');
            return;
        }

        showStatus('info', '⏳ Criando transação...');

        // Criar o Datum
        const Datum = Data.Object({
            owner: Data.Bytes()
        });

        const ownerPubKeyHash = lucid.utils.getAddressDetails(
            await lucid.wallet.address()
        ).paymentCredential.hash;

        const datum = Data.to(
            { owner: ownerPubKeyHash },
            Datum
        );

        showStatus('info', '⏳ Construindo transação...');

        const tx = await lucid
            .newTx()
            .payToContract(contractAddress, { inline: datum }, {
                lovelace: BigInt(amount * 1_000_000)
            })
            .complete();

        showStatus('info', '✍️ Aguardando assinatura...');

        const signedTx = await tx.sign().complete();

        showStatus('info', '📤 Enviando transação para a blockchain...');

        const txHash = await signedTx.submit();

        showStatus('success',
            `✅ Fundos bloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a><br>
            <small>⏱️ Aguarde ~20 segundos para confirmação na blockchain</small>`
        );

    } catch (error) {
        console.error('Erro ao bloquear fundos:', error);
        showStatus('error', '❌ Erro: ' + error.message);
    }
}

/**
 * Desbloqueia fundos do contrato
 */
window.unlockFunds = async function () {
    try {
        const message = document.getElementById('redeemerMsg').value;

        showStatus('info', '⏳ Buscando UTXOs do contrato...');

        const scriptUtxos = await lucid.utxosAt(contractAddress);

        if (scriptUtxos.length === 0) {
            showStatus('error', '❌ Nenhum fundo encontrado no contrato');
            return;
        }

        showStatus('info', `✅ Encontrados ${scriptUtxos.length} UTXO(s). Criando transação de resgate...`);

        // Criar o Redeemer
        const Redeemer = Data.Object({
            msg: Data.Bytes()
        });

        const redeemer = Data.to(
            { msg: fromText(message) },
            Redeemer
        );

        showStatus('info', '⏳ Construindo transação...');

        const tx = await lucid
            .newTx()
            .collectFrom(scriptUtxos, redeemer)
            .attachSpendingValidator(validator)
            .complete();

        showStatus('info', '✍️ Aguardando assinatura...');

        const signedTx = await tx.sign().complete();

        showStatus('info', '📤 Enviando transação para a blockchain...');

        const txHash = await signedTx.submit();

        showStatus('success',
            `✅ Fundos desbloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a><br>
            <small>⏱️ Aguarde ~20 segundos para confirmação na blockchain</small>`
        );

    } catch (error) {
        console.error('Erro ao desbloquear fundos:', error);
        showStatus('error', '❌ Erro: ' + error.message +
            (message !== "Hello, World!" ? '<br>💡 Verifique se a mensagem está correta!' : ''));
    }
}

/**
 * Mostra status da operação
 */
function showStatus(type, message) {
    const statusDiv = document.getElementById('txStatus');
    statusDiv.className = `status ${type}`;
    statusDiv.innerHTML = message;
    statusDiv.classList.remove('hidden');
}

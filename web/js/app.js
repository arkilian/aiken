import { Lucid, Blockfrost, fromText, Data } from 'https://cdn.jsdelivr.net/npm/lucid-cardano@0.10.7/web/mod.js';

let lucid;
let contractAddress;
let config;

// Dados do validator (você precisa copiar do plutus.json após compilar)
const validator = {
    type: "PlutusV2",
    script: "YOUR_COMPILED_PLUTUS_SCRIPT_HERE" // ⚠️ Substitua pelo script compilado
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
 * Conecta a wallet do usuário
 */
window.connectWallet = async function () {
    try {
        // Carregar configuração se ainda não foi carregada
        if (!config) {
            await initConfig();
        }

        showStatus('info', '⏳ Conectando à wallet...');

        lucid = await Lucid.new(
            new Blockfrost(
                config.BLOCKFROST_URL,
                config.BLOCKFROST_API_KEY
            ),
            config.CARDANO_NETWORK
        );

        const api = await window.cardano.nami.enable();
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

        const tx = await lucid
            .newTx()
            .payToContract(contractAddress, { inline: datum }, {
                lovelace: BigInt(amount * 1_000_000)
            })
            .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();

        showStatus('success',
            `✅ Fundos bloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a>`
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

        showStatus('info', '⏳ Criando transação de resgate...');

        // Criar o Redeemer
        const Redeemer = Data.Object({
            msg: Data.Bytes()
        });

        const redeemer = Data.to(
            { msg: fromText(message) },
            Redeemer
        );

        const tx = await lucid
            .newTx()
            .collectFrom(scriptUtxos, redeemer)
            .attachSpendingValidator(validator)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();

        showStatus('success',
            `✅ Fundos desbloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a>`
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

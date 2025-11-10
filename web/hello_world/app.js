import { BrowserWallet, Transaction, resolveDataHash, resolvePaymentKeyHash } from 'https://esm.sh/@meshsdk/core@1.5.18';
import { BlockfrostProvider } from 'https://esm.sh/@meshsdk/core@1.5.18/provider';

let wallet;
let provider;
let walletAddress;

// Configuração (carregar do arquivo .env ou diretamente)
const BLOCKFROST_API_KEY = "preprodbrFrMHjt5JS8Gr0sup5fQezMh9FFg0eY";
const NETWORK = "preprod";

// Script compilado do hello_world (do plutus.json)
const VALIDATOR_SCRIPT = "58ae01010029800aba2aba1aab9faab9eaab9dab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c01cdd500144c8c96600266e1d20003009375400b13232598009807801456600266e1d2000300b3754601c601e00913371e6eb8c038c030dd5003a450d48656c6c6f2c20576f726c6421008b20148b201a375c601a00260146ea80162c8040c02c004c020dd50014590060c01c004c00cdd5003c52689b2b200201";
const VALIDATOR_ADDRESS = "addr_test1wr253cxwprqqr9cvf6rnwarqkg8dl69r3hesamnrr7vh7pq7cqpxf";

/**
 * Conecta a wallet do usuário
 */
window.connectWallet = async function () {
    try {
        showStatus('info', '⏳ Detectando wallet...');

        // Inicializar provider
        provider = new BlockfrostProvider(BLOCKFROST_API_KEY);

        // Detectar e conectar wallet
        const availableWallets = BrowserWallet.getInstalledWallets();
        console.log('Wallets disponíveis:', availableWallets);

        if (availableWallets.length === 0) {
            throw new Error('Nenhuma wallet Cardano detectada. Instale Nami, Eternl, Lace ou Flint.');
        }

        showStatus('info', `⏳ Conectando à ${availableWallets[0].name}...`);

        wallet = await BrowserWallet.enable(availableWallets[0].name);

        // Obter informações da wallet
        walletAddress = await wallet.getChangeAddress();
        const utxos = await wallet.getUtxos();

        // Calcular saldo total
        let totalLovelace = 0;
        utxos.forEach(utxo => {
            utxo.output.amount.forEach(asset => {
                if (asset.unit === 'lovelace') {
                    totalLovelace += parseInt(asset.quantity);
                }
            });
        });

        document.getElementById('walletAddress').textContent =
            walletAddress.substring(0, 20) + '...' + walletAddress.substring(walletAddress.length - 10);
        document.getElementById('walletBalance').textContent =
            (totalLovelace / 1_000_000).toFixed(2) + ' ADA';

        document.getElementById('walletInfo').classList.remove('hidden');
        document.getElementById('contractSection').classList.remove('hidden');

        console.log('Wallet conectada:', walletAddress);
        console.log('Endereço do contrato:', VALIDATOR_ADDRESS);

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

        // Obter o payment key hash do proprietário
        const paymentKeyHash = resolvePaymentKeyHash(walletAddress);

        // Criar o datum (owner: ByteArray)
        const datum = {
            alternative: 0,
            fields: [paymentKeyHash]
        };

        console.log('Datum:', datum);

        // Criar transação
        const tx = new Transaction({ initiator: wallet });

        tx.sendLovelace(
            {
                address: VALIDATOR_ADDRESS,
                datum: {
                    value: datum,
                    inline: true
                }
            },
            (parseInt(amount) * 1_000_000).toString()
        );

        showStatus('info', '✍️ Aguardando assinatura...');

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);

        showStatus('info', '📤 Enviando transação...');

        const txHash = await wallet.submitTx(signedTx);

        showStatus('success',
            `✅ Fundos bloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a><br>
            <small>⏱️ Aguarde ~20 segundos para confirmação</small>`
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

        // Buscar UTXOs no endereço do contrato
        const scriptUtxos = await provider.fetchAddressUTxOs(VALIDATOR_ADDRESS);

        console.log('UTXOs encontrados:', scriptUtxos);

        if (!scriptUtxos || scriptUtxos.length === 0) {
            showStatus('error', '❌ Nenhum fundo encontrado no contrato');
            return;
        }

        showStatus('info', `✅ Encontrados ${scriptUtxos.length} UTXO(s). Criando transação...`);

        // Criar o redeemer (msg: ByteArray)
        // Converter string para bytes
        const encoder = new TextEncoder();
        const messageBytes = Array.from(encoder.encode(message));

        const redeemer = {
            alternative: 0,
            fields: [messageBytes]
        };

        console.log('Redeemer:', redeemer);

        // Criar transação de resgate
        const tx = new Transaction({ initiator: wallet });

        // Adicionar o UTXO do script como input
        tx.redeemValue({
            value: scriptUtxos[0],
            script: {
                version: 'V3',
                code: VALIDATOR_SCRIPT
            },
            datum: scriptUtxos[0].output.plutusData,
            redeemer: redeemer
        });

        // Adicionar collateral
        tx.setRequiredSigners([walletAddress]);

        showStatus('info', '⏳ Construindo transação...');

        const unsignedTx = await tx.build();

        showStatus('info', '✍️ Aguardando assinatura...');

        const signedTx = await wallet.signTx(unsignedTx, true); // true = sign com collateral

        showStatus('info', '📤 Enviando transação...');

        const txHash = await wallet.submitTx(signedTx);

        showStatus('success',
            `✅ Fundos desbloqueados com sucesso!<br>
            <a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">
                Ver Transação: ${txHash.substring(0, 20)}...
            </a><br>
            <small>⏱️ Aguarde ~20 segundos para confirmação</small>`
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

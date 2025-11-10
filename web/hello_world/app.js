// Usar Lucid - versão simplificada
import { Lucid, Blockfrost, fromText, Data, Constr } from 'https://unpkg.com/lucid-cardano@0.10.7/web/mod.js';

let lucid;
let walletAddress;
const contractAddress = "addr_test1wr253cxwprqqr9cvf6rnwarqkg8dl69r3hesamnrr7vh7pq7cqpxf";

window.connectWallet = async function () {
    try {
        showStatus('info', '⏳ Detectando wallet...');

        if (!window.cardano) throw new Error('Nenhuma wallet encontrada');

        const wallets = ['nami', 'eternl', 'lace', 'flint'];
        let selected = wallets.find(w => window.cardano[w]);

        if (!selected) throw new Error('Instale uma wallet Cardano');

        showStatus('info', `⏳ Conectando à ${selected.toUpperCase()}...`);

        lucid = await Lucid.new(
            new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodbrFrMHjt5JS8Gr0sup5fQezMh9FFg0eY"),
            "Preprod"
        );

        const api = await window.cardano[selected].enable();
        lucid.selectWallet(api);

        walletAddress = await lucid.wallet.address();
        const utxos = await lucid.wallet.getUtxos();

        let total = 0n;
        utxos.forEach(u => total += u.assets.lovelace);

        document.getElementById('walletAddress').textContent =
            walletAddress.substring(0, 20) + '...' + walletAddress.substring(walletAddress.length - 10);
        document.getElementById('walletBalance').textContent =
            (Number(total) / 1_000_000).toFixed(2) + ' ADA';

        document.getElementById('walletInfo').classList.remove('hidden');
        document.getElementById('contractSection').classList.remove('hidden');

        showStatus('success', '✅ Wallet conectada!');
    } catch (error) {
        showStatus('error', '❌ ' + error.message);
    }
}

window.lockFunds = async function () {
    try {
        const amount = document.getElementById('lockAmount').value;
        if (!amount || amount <= 0) {
            showStatus('error', '❌ Quantidade inválida');
            return;
        }

        showStatus('info', '⏳ Criando transação...');

        const hash = lucid.utils.getAddressDetails(walletAddress).paymentCredential.hash;
        const datum = Data.to(new Constr(0, [hash]));

        const tx = await lucid.newTx()
            .payToAddressWithData(contractAddress, { inline: datum }, { lovelace: BigInt(amount * 1_000_000) })
            .complete();

        showStatus('info', '✍️ Assine na wallet...');
        const signed = await tx.sign().complete();

        showStatus('info', '📤 Enviando...');
        const txHash = await signed.submit();

        showStatus('success',
            `✅ Sucesso!<br><a class="tx-link" href="https://preprod.cardanoscan.io/transaction/${txHash}" target="_blank">Ver TX</a>`
        );
    } catch (error) {
        showStatus('error', '❌ ' + error.message);
    }
}

window.unlockFunds = async function () {
    try {
        showStatus('info', '⏳ Verificando fundos...');

        const utxos = await lucid.utxosAt(contractAddress);

        if (!utxos || utxos.length === 0) {
            showStatus('error', '❌ Nenhum fundo no contrato');
            return;
        }

        showStatus('info',
            `✅ Encontrados ${utxos.length} UTXO(s)!<br><br>
            ⚠️ <strong>Unlock via web tem problemas com Aiken.</strong><br>
            Use o CLI do Aiken para desbloquear:<br>
            <code style="background:#f0f0f0;padding:8px;display:block;margin:10px 0;font-size:0.9em;">
            cd C:\\github\\aiken<br>
            aiken tx unlock
            </code>
            <small>Fundos seguros em: <a class="tx-link" href="https://preprod.cardanoscan.io/address/${contractAddress}" target="_blank">${contractAddress.substring(0, 30)}...</a></small>`
        );
    } catch (error) {
        showStatus('error', '❌ ' + error.message);
    }
}

function showStatus(type, msg) {
    const div = document.getElementById('txStatus');
    div.className = `status ${type}`;
    div.innerHTML = msg;
    div.classList.remove('hidden');
}

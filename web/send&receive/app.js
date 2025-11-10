// Cardano Send & Receive Application
// Using Lucid library for Cardano blockchain interaction

import { Blockfrost, Lucid } from "https://cdn.jsdelivr.net/npm/lucid-cardano@0.10.7/web/mod.js";

const BLOCKFROST_API_KEY = 'preprodbrFrMHjt5JS8Gr0sup5fQezMh9FFg0eY';
const NETWORK = 'Preprod';

// State
let lucid = null;
let walletAPI = null;
let walletName = '';
let walletAddress = '';
let walletBalance = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectWallets();
    setupEventListeners();
});

// Detect available wallets
function detectWallets() {
    const wallets = ['nami', 'eternl', 'lace', 'flint', 'typhon', 'gero'];
    const connectBtn = document.getElementById('connectWallet');

    const available = wallets.filter(name => window.cardano && window.cardano[name]);

    if (available.length === 0) {
        connectBtn.disabled = true;
        connectBtn.textContent = 'No Wallet Found';
        showStatus('Please install a Cardano wallet (Nami, Eternl, Lace, etc.)', 'error');
    } else {
        connectBtn.textContent = `Connect Wallet (${available.length} available)`;
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
    document.getElementById('sendForm').addEventListener('submit', handleSendAda);
    document.getElementById('copyAddress').addEventListener('click', copyAddress);
    document.getElementById('refreshTx').addEventListener('click', loadTransactions);
}

// Connect to wallet
async function connectWallet() {
    try {
        showStatus('Connecting to wallet...', 'info');

        // Try wallets in order of preference
        const wallets = ['nami', 'eternl', 'lace', 'flint', 'typhon', 'gero'];

        for (const name of wallets) {
            if (window.cardano && window.cardano[name]) {
                try {
                    walletAPI = await window.cardano[name].enable();
                    walletName = name.charAt(0).toUpperCase() + name.slice(1);
                    break;
                } catch (err) {
                    console.log(`${name} connection failed or rejected`);
                }
            }
        }

        if (!walletAPI) {
            throw new Error('No wallet available or connection rejected');
        }

        // Initialize Lucid
        lucid = await Lucid.new(
            new Blockfrost(
                'https://cardano-preprod.blockfrost.io/api/v0',
                BLOCKFROST_API_KEY
            ),
            NETWORK
        );

        lucid.selectWallet(walletAPI);

        // Get wallet details
        walletAddress = await lucid.wallet.address();
        const utxos = await lucid.wallet.getUtxos();

        // Calculate balance
        walletBalance = utxos.reduce((sum, utxo) => {
            return sum + Number(utxo.assets.lovelace || 0);
        }, 0);

        updateUI();
        loadTransactions();
        showStatus(`Connected to ${walletName} wallet`, 'success');

    } catch (error) {
        console.error('Connection error:', error);
        showStatus(`Connection failed: ${error.message}`, 'error');
    }
}

// Disconnect wallet
function disconnectWallet() {
    lucid = null;
    walletAPI = null;
    walletName = '';
    walletAddress = '';
    walletBalance = 0;

    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('sendSection').classList.add('hidden');
    document.getElementById('receiveSection').classList.add('hidden');
    document.getElementById('transactionsSection').classList.add('hidden');
    document.getElementById('connectWallet').classList.remove('hidden');

    document.getElementById('transactionsList').innerHTML = '';
    showStatus('Wallet disconnected', 'info');
}

// Update UI after connection
function updateUI() {
    document.getElementById('connectWallet').classList.add('hidden');
    document.getElementById('walletSection').classList.remove('hidden');
    document.getElementById('sendSection').classList.remove('hidden');
    document.getElementById('receiveSection').classList.remove('hidden');
    document.getElementById('transactionsSection').classList.remove('hidden');

    document.getElementById('connectedWallet').textContent = walletName;
    document.getElementById('walletAddress').textContent = walletAddress;
    document.getElementById('walletBalance').textContent = `${(walletBalance / 1_000_000).toFixed(2)} ₳`;

    document.getElementById('receiveAddress').textContent = walletAddress;

    // Generate QR Code
    generateQRCode(walletAddress);
}

// Generate QR Code for receive address
function generateQRCode(address) {
    const qrContainer = document.getElementById('qrCode');
    qrContainer.innerHTML = '';

    // Using qrcodejs library (needs to be included in HTML)
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrContainer, {
            text: address,
            width: 200,
            height: 200,
            colorDark: '#667eea',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.innerHTML = '<p style="color: #999;">QR code library not loaded</p>';
    }
}

// Handle send ADA
async function handleSendAda(e) {
    e.preventDefault();

    const recipientAddress = document.getElementById('recipientAddress').value.trim();
    const amount = parseFloat(document.getElementById('sendAmount').value);
    const message = document.getElementById('sendMessage').value.trim();

    if (!recipientAddress || !amount || amount <= 0) {
        showStatus('Please enter valid recipient address and amount', 'error');
        return;
    }

    try {
        document.getElementById('sendBtn').disabled = true;
        document.getElementById('sendBtn').textContent = 'Sending...';
        showStatus('Building transaction...', 'info');

        // Convert ADA to Lovelace
        const lovelace = Math.floor(amount * 1_000_000);

        // Build transaction
        let tx = lucid.newTx().payToAddress(recipientAddress, { lovelace: BigInt(lovelace) });

        // Add metadata if message provided
        if (message) {
            tx = tx.attachMetadata(674, {
                msg: [message]
            });
        }

        const txComplete = await tx.complete();

        showStatus('Waiting for signature...', 'info');
        const signedTx = await txComplete.sign().complete();

        showStatus('Submitting transaction...', 'info');
        const txHash = await signedTx.submit();

        showStatus(`Transaction submitted! Hash: ${txHash}`, 'success');

        // Reset form
        document.getElementById('sendForm').reset();

        // Wait a bit and refresh
        setTimeout(() => {
            connectWallet(); // Refresh balance
            setTimeout(loadTransactions, 3000); // Refresh transactions after 3s
        }, 2000);

    } catch (error) {
        console.error('Send error:', error);
        showStatus(`Transaction failed: ${error.message}`, 'error');
    } finally {
        document.getElementById('sendBtn').disabled = false;
        document.getElementById('sendBtn').textContent = 'Send ADA';
    }
}

// Copy address to clipboard
function copyAddress() {
    navigator.clipboard.writeText(walletAddress).then(() => {
        const btn = document.getElementById('copyAddress');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Load transaction history
async function loadTransactions() {
    if (!walletAddress) return;

    try {
        const list = document.getElementById('transactionsList');
        list.innerHTML = '<div class="loading">Loading transactions...</div>';

        // Fetch transactions from Blockfrost
        const response = await fetch(
            `https://cardano-preprod.blockfrost.io/api/v0/addresses/${walletAddress}/transactions?count=20&order=desc`,
            {
                headers: { 'project_id': BLOCKFROST_API_KEY }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }

        const txHashes = await response.json();

        if (txHashes.length === 0) {
            list.innerHTML = '<div class="no-transactions">No transactions yet</div>';
            return;
        }

        // Fetch details for each transaction
        const txDetails = await Promise.all(
            txHashes.slice(0, 10).map(async (item) => {
                const txResponse = await fetch(
                    `https://cardano-preprod.blockfrost.io/api/v0/txs/${item.tx_hash}`,
                    {
                        headers: { 'project_id': BLOCKFROST_API_KEY }
                    }
                );
                return txResponse.json();
            })
        );

        // Display transactions
        list.innerHTML = txDetails.map(tx => renderTransaction(tx)).join('');

    } catch (error) {
        console.error('Load transactions error:', error);
        document.getElementById('transactionsList').innerHTML =
            '<div class="no-transactions">Failed to load transactions</div>';
    }
}

// Render transaction item
function renderTransaction(tx) {
    const amount = (parseInt(tx.output_amount[0].quantity) / 1_000_000).toFixed(2);
    const date = new Date(tx.block_time * 1000).toLocaleString();
    const hash = tx.hash;
    const shortHash = `${hash.slice(0, 8)}...${hash.slice(-8)}`;

    // Determine if sent or received (simplified - checks first output)
    const type = 'info'; // Would need more logic to determine sent vs received

    return `
        <div class="transaction-item ${type}" onclick="window.open('https://preprod.cardanoscan.io/transaction/${hash}', '_blank')">
            <div class="tx-header">
                <span class="tx-type ${type}">Transaction</span>
                <span class="tx-amount">${amount} ₳</span>
            </div>
            <div class="tx-details">
                <div>${date}</div>
            </div>
            <div class="tx-hash">
                <a href="https://preprod.cardanoscan.io/transaction/${hash}" target="_blank" class="tx-link" onclick="event.stopPropagation()">
                    ${shortHash}
                </a>
            </div>
        </div>
    `;
}

// Show status message
function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.classList.remove('hidden');

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 5000);
    }
}

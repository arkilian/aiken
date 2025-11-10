# Send & Receive ADA - Cardano Web App

Simple web application for sending and receiving ADA on Cardano Preprod testnet.

## Features

- 🔗 **Connect Wallet**: Supports Nami, Eternl, Lace, Flint, Typhon, and Gero wallets
- 💸 **Send ADA**: Transfer ADA to any Cardano address with optional message metadata
- 📥 **Receive ADA**: Display wallet address with QR code for easy sharing
- 📜 **Transaction History**: View recent transactions with links to Cardanoscan

## Setup

1. Make sure you have a Cardano wallet browser extension installed (Nami, Eternl, Lace, etc.)
2. Open `index.html` in your browser using a local server

### Run with Python:
```powershell
python -m http.server 8002
```

Then visit: http://localhost:8002

### Run with Node.js:
```powershell
npx serve .
```

## Usage

1. **Connect Wallet**
   - Click "Conectar Wallet" button
   - Approve the connection in your wallet extension
   - Your balance and address will be displayed

2. **Send ADA**
   - Enter recipient address (must be valid Cardano address)
   - Enter amount in ADA
   - Optionally add a message (stored as transaction metadata)
   - Click "Enviar ADA" and approve in your wallet

3. **Receive ADA**
   - Your wallet address is automatically displayed
   - Use the QR code to share your address
   - Click "Copiar Endereço" to copy to clipboard

4. **View Transactions**
   - Transaction history loads automatically
   - Click any transaction to view on Cardanoscan
   - Click "Atualizar" to refresh the list

## Technology

- **Lucid-Cardano 0.10.7**: JavaScript library for Cardano blockchain interaction
- **Blockfrost API**: Cardano blockchain data provider
- **QRCode.js**: QR code generation
- **Preprod Testnet**: Testing environment

## API Key

The application uses a Blockfrost API key for Preprod testnet. For production use, you should:

1. Get your own API key from https://blockfrost.io
2. Update the `BLOCKFROST_API_KEY` in `app.js`
3. Consider using environment variables for security

## Network

Currently configured for **Preprod Testnet**. To switch to mainnet:

1. Change `NETWORK` to `'Mainnet'` in `app.js`
2. Update Blockfrost URL to mainnet endpoint
3. Use a mainnet API key

## Notes

- Minimum send amount: 1 ADA
- Transaction metadata limited to 100 characters
- Transaction history shows last 10 transactions
- All amounts displayed in ADA (1 ADA = 1,000,000 Lovelace)

## Troubleshooting

**Wallet not detected:**
- Ensure wallet extension is installed and enabled
- Refresh the page after installing wallet

**Transaction failed:**
- Check you have sufficient balance (including fees ~0.2 ADA)
- Verify recipient address is valid
- Ensure wallet is unlocked

**Transactions not loading:**
- Check internet connection
- Verify Blockfrost API key is valid
- Wait a few seconds and click refresh

## Links

- [Cardano Preprod Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet/)
- [Cardanoscan Preprod](https://preprod.cardanoscan.io/)
- [Blockfrost Documentation](https://docs.blockfrost.io/)
- [Lucid Documentation](https://lucid.spacebudz.io/)

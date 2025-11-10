# Interagindo com Hello World via Web

Este guia mostra como interagir com o validator `hello_world.ak` através de uma aplicação web.

## 📋 Pré-requisitos

1. **Wallet Cardano** instalada no navegador (Nami, Eternl, ou Flint)
2. **Fundos tADA** na Preprod Testnet
3. **API Key do Blockfrost** (gratuita)

## 🚀 Configuração

### 1. Obter API Key do Blockfrost

1. Acesse [https://blockfrost.io](https://blockfrost.io)
2. Crie uma conta gratuita
3. Crie um novo projeto para **Cardano Preprod**
4. Copie a API Key

### 2. Obter o Script Compilado

Depois de executar `aiken build`, o arquivo `plutus.json` é gerado. Você precisa extrair o script compilado:

```powershell
# Visualizar o plutus.json
Get-Content plutus.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

Procure pelo validator `hello_world` e copie o campo `compiledCode`.

### 3. Configurar o index.html

No arquivo `web/index.html`, substitua:

```javascript
const BLOCKFROST_API_KEY = "preprodYOUR_API_KEY_HERE"; // Sua API key aqui
```

E:

```javascript
const validator = {
    type: "PlutusV2",
    script: "YOUR_COMPILED_PLUTUS_SCRIPT_HERE" // Script do plutus.json
};
```

### 4. Obter tADA (Test ADA)

Para testar na Preprod, você precisa de tADA gratuito:

1. Acesse: [https://docs.cardano.org/cardano-testnet/tools/faucet/](https://docs.cardano.org/cardano-testnet/tools/faucet/)
2. Cole seu endereço da wallet (em modo Preprod)
3. Aguarde receber os fundos (geralmente alguns minutos)

## 🎯 Como Usar

### 1. Abrir a Aplicação

```powershell
# Navegue até a pasta web
cd web

# Abra o index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

### 2. Conectar a Wallet

1. Clique em "Conectar Wallet"
2. Selecione sua wallet (Nami, Eternl, etc.)
3. Aprove a conexão
4. Certifique-se de estar na **Preprod Testnet**

### 3. Bloquear Fundos

1. Digite a quantidade de ADA (ex: 5)
2. Clique em "Bloquear Fundos"
3. Aprove a transação na wallet
4. Aguarde a confirmação (1-2 minutos)

### 4. Desbloquear Fundos

1. Digite a mensagem: `Hello, World!`
2. Clique em "Desbloquear Fundos"
3. Aprove a transação na wallet
4. Os fundos voltarão para sua wallet

### ⚠️ Teste de Falha

Tente desbloquear com uma mensagem errada (ex: "Olá Mundo") e veja a transação falhar!

## 🛠️ Tecnologias Utilizadas

- **Lucid**: Biblioteca JavaScript para Cardano
- **Blockfrost**: API provider para Cardano
- **Aiken**: Linguagem para smart contracts

## 📚 Recursos Adicionais

- [Documentação Lucid](https://github.com/spacebudz/lucid)
- [Documentação Blockfrost](https://docs.blockfrost.io/)
- [Documentação Aiken](https://aiken-lang.org/)
- [Cardano Explorer Preprod](https://preprod.cardanoscan.io/)

## 🔍 Troubleshooting

### Erro: "Wallet não encontrada"
- Instale Nami ou Eternl
- Certifique-se de que a extensão está ativa

### Erro: "Insufficient funds"
- Obtenha tADA no faucet
- Aguarde confirmação dos fundos

### Erro: "Script execution failed"
- Verifique se a mensagem é exatamente "Hello, World!"
- Verifique se há UTXOs no contrato para desbloquear

### Transação não confirma
- Aguarde 1-2 minutos
- Verifique no explorer se a transação foi submetida
- Tente aumentar as fees se necessário

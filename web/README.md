# 🌐 Hello World - Interface Web

Aplicação web para interagir com o smart contract `hello_world.ak` na blockchain Cardano.

## 📁 Estrutura do Projeto

```
web/
├── css/
│   └── styles.css      # Estilos da aplicação
├── js/
│   └── app.js          # Lógica de interação com blockchain
├── index.html          # Interface do usuário
└── README.md           # Este arquivo
```

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

### 3. Configurar a aplicação

No arquivo `js/app.js`, substitua as seguintes configurações:

**API Key do Blockfrost:**
```javascript
const BLOCKFROST_API_KEY = "preprodYOUR_API_KEY_HERE"; // Sua API key aqui
```

**Script compilado do validator:**
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

**Opção A - Abrir diretamente:**
```powershell
# Abra o index.html no seu navegador
start index.html
```

**Opção B - Usar servidor local (recomendado):**
```powershell
# Navegue até a pasta web
cd web

# Inicie um servidor HTTP local
python -m http.server 8000

# Acesse: http://localhost:8000
```

> **Nota:** Usar um servidor local evita problemas com CORS e módulos ES6.

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

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (ES6+)** - Lógica da aplicação
- **Lucid** - Biblioteca JavaScript para Cardano
- **Blockfrost** - API provider para Cardano
- **Aiken** - Linguagem para smart contracts

## 📝 Arquivos Principais

### `index.html`
Interface do usuário com formulários para:
- Conectar wallet
- Bloquear fundos no contrato
- Desbloquear fundos do contrato

### `css/styles.css`
Estilos da aplicação incluindo:
- Layout responsivo
- Gradientes e animações
- Estados de sucesso/erro
- Design moderno

### `js/app.js`
Lógica de interação com a blockchain:
- Conexão com wallet Cardano
- Criação de transações
- Interação com o validator
- Gerenciamento de estado

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

## 🎨 Personalização

### Alterar cores do tema
Edite `css/styles.css`:
```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cor dos botões e links */
color: #667eea;
```

### Adicionar mais funcionalidades
Edite `js/app.js` e adicione novas funções seguindo o padrão:
```javascript
window.minhaNovaFuncao = async function() {
    // Sua lógica aqui
}
```

## 🔐 Segurança

⚠️ **Importante:**
- Nunca compartilhe sua API Key do Blockfrost
- Use sempre a Preprod Testnet para testes
- Não envie fundos reais (ADA) para contratos em teste
- Revise todas as transações antes de assinar

## 📚 Próximos Passos

Depois de dominar o Hello World, explore:
1. **Counter** - Gerenciamento de estado
2. **Vesting** - Controle temporal
3. **NFT Minting** - Criação de tokens
4. **Marketplace** - Compra e venda de assets

## 🤝 Contribuindo

Sinta-se à vontade para melhorar esta aplicação:
- Adicione suporte para mais wallets
- Melhore a interface
- Adicione mais validações
- Otimize o código

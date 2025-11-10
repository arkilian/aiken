# Hello World - Aiken + MeshJS

Projeto usando **MeshJS** em vez de Lucid para melhor compatibilidade com Aiken PlutusV3.

## 🚀 Como executar

```powershell
cd hello_world
python -m http.server 8001
```

Acesse: http://localhost:8001

## ✨ Diferenças do projeto anterior

- ✅ **MeshJS** em vez de Lucid (melhor suporte Aiken)
- ✅ **PlutusV3** nativo
- ✅ **API mais simples** para criar transações
- ✅ **Sem problemas** de parsing de script

## 📝 Configuração

A API Key do Blockfrost já está configurada no `app.js`. Para mudar:

```javascript
const BLOCKFROST_API_KEY = "sua_api_key_aqui";
```

## 🎯 Funcionalidades

1. **Conectar Wallet** - Suporta Nami, Eternl, Lace, Flint
2. **Bloquear Fundos** - Enviar ADA para o contrato
3. **Desbloquear Fundos** - Resgatar com a mensagem correta

## 🔧 Tecnologias

- MeshJS 1.5.18
- Aiken 1.1.19
- PlutusV3
- Blockfrost API

# Segurança e .gitignore

## ✅ Verificação de Segurança - 10/11/2025

### Informações Sensíveis Removidas

**Problema identificado:**
- ❌ Caminhos de usuário específicos hardcoded (`C:\Users\diogo\`)
- ❌ Informações pessoais em arquivos de configuração

**Soluções aplicadas:**
- ✅ Uso de variáveis de ambiente (`${env:USERPROFILE}`)
- ✅ `.gitignore` atualizado
- ✅ Documentação atualizada sem informações pessoais

---

## 📋 O que está no .gitignore

### Build e Artefatos
```
plutus.json       # Gerado por 'aiken build'
artifacts/        # Arquivos compilados
build/            # Diretório de build
packages/         # Dependências baixadas
```

### Configurações Locais
```
.vscode/*.local.json        # Configurações locais do usuário
.vscode/settings.local.json # Settings específicos
```

### Segredos e Ambiente
```
.env                 # Variáveis de ambiente
.env.local          # Variáveis locais
.env.*.local        # Variáveis por ambiente
*.secret            # Qualquer arquivo .secret
secrets/            # Diretório de segredos
private/            # Diretório privado
```

### Logs
```
*.log              # Arquivos de log
logs/              # Diretório de logs
```

### Editor/IDE
```
.vscode/* (exceto settings.json, extensions.json, tasks.json)
.idea/
*.swp, *.swo, *~
```

### Sistema
```
.DS_Store          # macOS
Thumbs.db          # Windows
*.tmp, *.temp      # Temporários
*.bak, *.backup    # Backups
```

---

## 🔒 Boas Práticas de Segurança

### ✅ O QUE FAZER

1. **Use variáveis de ambiente**
   ```json
   // BOM ✅
   "aiken.aikenPath": "${env:USERPROFILE}\\.cargo\\bin\\aiken.exe"

   // RUIM ❌
   "aiken.aikenPath": "C:\\Users\\seu_nome\\.cargo\\bin\\aiken.exe"
   ```

2. **Mantenha segredos em arquivos .env**
   ```bash
   # .env (NÃO commitar!)
   API_KEY=sua_chave_secreta
   PRIVATE_KEY=sua_chave_privada
   ```

3. **Use arquivos .example para templates**
   ```
   .env.example          ✅ Commitar (sem valores reais)
   .env                  ❌ NÃO commitar (com valores reais)
   settings.local.example ✅ Commitar (template)
   settings.local.json    ❌ NÃO commitar (configurações pessoais)
   ```

### ❌ O QUE EVITAR

1. **Não commitar:**
   - ❌ Senhas
   - ❌ Chaves privadas/API keys
   - ❌ Tokens de acesso
   - ❌ Caminhos de usuário específicos
   - ❌ Dados pessoais (email, nome de usuário)
   - ❌ Credenciais de blockchain (seeds, private keys)

2. **Não usar valores hardcoded:**
   ```javascript
   // RUIM ❌
   const apiKey = "1234567890abcdef";
   const walletSeed = "palavra1 palavra2 palavra3...";

   // BOM ✅
   const apiKey = process.env.API_KEY;
   const walletSeed = process.env.WALLET_SEED;
   ```

---

## 🔍 Como Verificar Antes de Commitar

### 1. Revisar Mudanças
```bash
git diff
git diff --cached
```

### 2. Verificar o que será commitado
```bash
git status
```

### 3. Usar git-secrets (opcional)
```bash
# Instalar git-secrets
# https://github.com/awslabs/git-secrets

git secrets --install
git secrets --register-aws
```

### 4. Checklist Pré-Commit
- [ ] Removi todos os dados pessoais?
- [ ] Usei variáveis de ambiente?
- [ ] Arquivos .env estão no .gitignore?
- [ ] Nenhuma senha ou chave no código?
- [ ] Caminhos são genéricos (não específicos de usuário)?

---

## 🚨 Se Você Já Commitou Informação Sensível

### Opção 1 - Remover do Último Commit (se ainda não fez push)
```bash
# Editar o arquivo e remover a informação sensível
# Depois:
git add .
git commit --amend --no-edit
```

### Opção 2 - Remover da História (CUIDADO!)
```bash
# Usar BFG Repo Cleaner ou git filter-branch
# ATENÇÃO: Reescreve a história do git!

# BFG (recomendado)
java -jar bfg.jar --delete-files *.secret
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Opção 3 - Rotacionar Credenciais
Se você commitou:
- Senhas → Altere imediatamente
- API Keys → Revogue e gere novas
- Private Keys → Gere novas chaves
- Tokens → Revogue e crie novos

---

## 📁 Estrutura Recomendada

```
projeto/
├── .env.example          # Template (commitar)
├── .env                  # Valores reais (NÃO commitar)
├── .gitignore           # Configurado corretamente
├── .vscode/
│   ├── settings.json         # Configurações compartilhadas (commitar)
│   ├── settings.local.json   # Configurações pessoais (NÃO commitar)
│   └── settings.local.example # Template (commitar)
└── secrets/             # (NÃO commitar - todo o diretório)
```

---

## 🔐 Segurança Específica para Cardano/Aiken

### ⚠️ NUNCA COMMITE

1. **Seed Phrases / Mnemonic**
   - 12 ou 24 palavras da carteira
   - Essencial para recuperação da carteira

2. **Private Keys**
   - Chaves privadas de assinatura
   - Chaves de endereços

3. **Stake Pool Keys**
   - KES keys
   - VRF keys
   - Cold keys

4. **Certificados**
   - Certificados de stake pool
   - Certificados operacionais

### ✅ Armazenamento Seguro

1. **Hardware Wallet** (recomendado)
   - Ledger
   - Trezor

2. **Encrypted Storage**
   - KeePass
   - 1Password
   - Bitwarden

3. **Offline Storage**
   - Paper wallet (backup físico)
   - USB criptografado

---

## 📚 Recursos Adicionais

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [git-secrets](https://github.com/awslabs/git-secrets)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [OWASP: Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

---

**Última verificação:** 10 de Novembro de 2025
**Status:** ✅ Sem informações sensíveis detectadas
**Arquivos sensíveis protegidos:** ✅ .gitignore atualizado

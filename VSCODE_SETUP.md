# Configuração do VS Code para Aiken

## ✅ O que foi configurado / What was configured

Este projeto já está configurado com tudo que você precisa para trabalhar com Aiken no VS Code!

*This project is already configured with everything you need to work with Aiken in VS Code!*

---

## 🔧 Extensões Instaladas / Installed Extensions

### Aiken Language Support (txpipe.aiken)
✅ **Já instalada automaticamente / Already installed automatically**

Fornece:
- Syntax highlighting para arquivos `.ak`
- Formatação automática de código
- Suporte a IntelliSense
- Detecção de erros em tempo real

*Provides:*
- *Syntax highlighting for `.ak` files*
- *Automatic code formatting*
- *IntelliSense support*
- *Real-time error detection*

---

## 📁 Arquivos de Configuração / Configuration Files

### `.vscode/settings.json`
Configurações do workspace:
- **Encoding UTF-8** para todos os arquivos
- **Formatação automática** ao salvar
- **Tab size de 2 espaços** para Aiken
- **Terminal com UTF-8** (chcp 65001)

### `.vscode/extensions.json`
Recomendação da extensão Aiken para colaboradores

### `.editorconfig`
Configurações de editor consistentes:
- UTF-8 encoding
- LF line endings
- Trim trailing whitespace
- 2 spaces para indentação

---

## 🎨 Recursos Disponíveis / Available Features

### 1. Syntax Highlighting
Arquivos `.ak` têm colorização de sintaxe automática:
- Keywords (validator, fn, type, etc.)
- Tipos (Int, ByteArray, Bool, etc.)
- Strings e comentários
- Pattern matching

### 2. Formatação Automática
Pressione `Shift + Alt + F` ou salve o arquivo (já está configurado para formatar ao salvar)

```aiken
// Antes
validator hello{spend(d:Option<D>,r:R,_u,_s){True}else(_){fail}}

// Depois (formatado automaticamente)
validator hello {
  spend(d: Option<D>, r: R, _u, _s) {
    True
  }

  else(_) {
    fail
  }
}
```

### 3. IntelliSense
- Auto-complete de tipos e funções
- Sugestões de código
- Documentação inline

### 4. Detecção de Erros
Erros são marcados em tempo real enquanto você digita

---

## 🚀 Comandos Úteis / Useful Commands

### No Terminal Integrado (Ctrl + `)

```bash
# Verificar código
aiken check

# Compilar
aiken build

# Formatar código
aiken fmt

# Ver versão
aiken --version
```

### Atalhos do Editor

| Atalho | Ação |
|--------|------|
| `Ctrl + Space` | Abrir IntelliSense |
| `Shift + Alt + F` | Formatar documento |
| `Ctrl + /` | Comentar/descomentar linha |
| `F2` | Renomear símbolo |
| `Ctrl + Click` | Ir para definição |

---

## 🔍 Verificar Configuração / Check Configuration

### 1. Verificar Extensão Instalada
```
1. Pressione Ctrl + Shift + X
2. Procure por "Aiken"
3. Deve aparecer "Aiken" por TxPipe como instalada
```

### 2. Verificar Encoding
```
1. Abra um arquivo .ak
2. Olhe na barra de status (inferior direita)
3. Deve mostrar "UTF-8"
```

### 3. Verificar Formatação
```
1. Abra um arquivo .ak
2. Pressione Shift + Alt + F
3. O código deve ser formatado automaticamente
```

### 4. Verificar Syntax Highlighting
```
1. Abra validators/hello_world.ak
2. As keywords devem estar coloridas:
   - validator (roxo/azul)
   - pub, type (roxo/azul)
   - spend, else (roxo/azul)
   - True, False (laranja)
```

---

## ⚙️ Configurações Avançadas / Advanced Settings

### Script de Configuração Automática do PATH

Para resolver problemas de PATH permanentemente, use o script fornecido:

```powershell
# Adicionar ao PATH do usuário (recomendado)
.\setup-path.ps1 -User

# Ou adicionar ao PATH do sistema (requer Administrator)
.\setup-path.ps1 -System
```

O script:
- ✅ Verifica se o Aiken está instalado
- ✅ Adiciona `%USERPROFILE%\.cargo\bin` ao PATH
- ✅ Testa se o comando `aiken` funciona
- ✅ Salva permanentemente (não precisa configurar de novo)

### Desabilitar formatação automática ao salvar
Se preferir formatar manualmente:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": false
}
```

### Alterar tamanho do tab
```json
{
  "[aiken]": {
    "editor.tabSize": 4  // padrão é 2
  }
}
```

### Alterar tema de cores
```
1. Ctrl + K, Ctrl + T
2. Escolha um tema (recomendado: Dark+ ou Monokai)
```

---

## 🐛 Problemas Comuns / Common Issues

### ❌ Erro: "spawn aiken ENOENT" ou Language Server não inicia

**Sintoma:**
```
Error: spawn aiken ENOENT
Couldn't create connection to server
```

**Causa:** O VS Code não encontra o executável `aiken` no PATH.

**Solução:** ✅ **JÁ CORRIGIDO neste projeto!**

O arquivo `.vscode/settings.json` já está configurado com o caminho correto:
```json
{
  "aiken.aikenPath": "C:\\Users\\diogo\\.cargo\\bin\\aiken.exe"
}
```

**Se o erro persistir:**

1. **Verifique se o caminho está correto:**
   ```powershell
   # No terminal integrado do VS Code:
   where.exe aiken
   ```

2. **Atualize o caminho em `.vscode/settings.json`:**
   - Se o caminho for diferente, altere `aiken.aikenPath`

3. **Recarregue o VS Code:**
   - `Ctrl + Shift + P` -> "Reload Window"

4. **Reinicie o Language Server:**
   - `Ctrl + Shift + P` -> "Aiken: Restart Language Server"

### Extensão não está funcionando
```bash
# 1. Recarregar o VS Code
Ctrl + Shift + P -> "Reload Window"

# 2. Reinstalar a extensão
Ctrl + Shift + X -> Aiken -> Desinstalar -> Instalar
```

### Arquivos .ak sem syntax highlighting
```json
// Adicione em .vscode/settings.json
{
  "files.associations": {
    "*.ak": "aiken"
  }
}
```

### Caracteres especiais aparecem errados (ç, ã, etc.)
```
1. Verifique que está usando UTF-8:
   - Barra inferior direita -> clique em "UTF-8"
   - Se aparecer outro encoding, selecione "Save with Encoding" -> "UTF-8"

2. Recarregue o arquivo:
   - Feche e abra novamente
   - Ou: "Reopen with Encoding" -> "UTF-8"
```

### Terminal não reconhece comandos `aiken`
```powershell
# Execute uma vez:
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Ou feche e abra um novo terminal
```

---

## 📚 Recursos Adicionais / Additional Resources

### Documentação
- [Aiken Language Tour](https://aiken-lang.org/language-tour)
- [Aiken Standard Library](https://aiken-lang.org/stdlib)
- [VS Code Aiken Extension](https://marketplace.visualstudio.com/items?itemName=txpipe.aiken)

### Atalhos Úteis
- [VS Code Keyboard Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

---

## ✅ Checklist de Verificação / Verification Checklist

- [ ] Extensão Aiken instalada
- [ ] Arquivos `.ak` têm syntax highlighting
- [ ] UTF-8 aparece na barra de status
- [ ] Formatação automática funciona (Shift + Alt + F)
- [ ] IntelliSense funciona (Ctrl + Space)
- [ ] Terminal integrado funciona
- [ ] Comando `aiken --version` funciona
- [ ] Comando `aiken check` funciona

Se todos os itens acima estiverem marcados, você está pronto! 🚀

*If all items above are checked, you're ready to go!* 🚀

---

**Última atualização:** 10 de Novembro de 2025
**Versão do Aiken:** 1.1.19
**Extensão VS Code:** txpipe.aiken

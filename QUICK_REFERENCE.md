# Aiken - Guia Rápido / Quick Reference

## 🚀 Início Rápido / Quick Start

```bash
# Instalar Aiken / Install Aiken
curl -sSfL https://install.aiken-lang.org | bash
aikup

# Verificar / Check
aiken check

# Compilar / Build
aiken build

# Formatar / Format
aiken fmt
```

## 📝 Sintaxe Básica / Basic Syntax

### Variáveis / Variables
```aiken
let x = 42
let nome: ByteArray = "Alice"
let ativo: Bool = True
```

### Funções / Functions
```aiken
fn somar(a: Int, b: Int) -> Int {
  a + b
}

pub fn multiplicar(a: Int, b: Int) -> Int {
  a * b
}
```

### Tipos / Types
```aiken
// Record (sempre use pub para validators)
pub type Pessoa {
  nome: ByteArray,
  idade: Int,
}

// Enum
pub type Resultado {
  Sucesso { valor: Int }
  Erro { mensagem: ByteArray }
}
```

### Pattern Matching
```aiken
fn processar(resultado: Resultado) -> Int {
  when resultado is {
    Sucesso { valor } -> valor
    Erro { .. } -> 0
  }
}
```

### Listas / Lists
```aiken
let nums = [1, 2, 3, 4, 5]
let dobrado = list.map(nums, fn(x) { x * 2 })
let soma = list.foldl(nums, 0, fn(acc, x) { acc + x })
```

## 🔒 Validadores / Validators

### Estrutura Básica / Basic Structure
```aiken
pub type MeuDatum {
  owner: ByteArray,
  value: Int,
}

pub type MeuRedeemer {
  action: ByteArray,
}

validator meu_validador {
  spend(datum: Option<MeuDatum>, redeemer: MeuRedeemer, _utxo, _self) {
    // Extrair datum
    expect Some(dat) = datum
    
    // Lógica de validação
    dat.value > 0 && redeemer.action == "approve"
  }

  else(_) {
    fail
  }
}
```

### Múltiplos Propósitos / Multiple Purposes
```aiken
validator multi_purpose {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _utxo, _self) {
    // Lógica para gastar
    True
  }

  mint(_redeemer, _policy_id, _self) {
    // Lógica para cunhar tokens
    True
  }

  withdraw(_redeemer, _account, _self) {
    // Lógica para saques de stake
    True
  }

  else(_) {
    fail
  }
}
```

## ✅ Testes / Tests

```aiken
test soma_funciona() {
  somar(2, 3) == 5
}

test validator_aceita_correto() {
  let datum = Some(MeuDatum { value: 100 })
  let redeemer = MeuRedeemer { action: "approve" }
  
  // Use Void para parâmetros não usados
  meu_validador.spend(datum, redeemer, Void, Void)
}

test validator_rejeita_incorreto() {
  let datum = Some(MeuDatum { value: 0 })
  let redeemer = MeuRedeemer { action: "reject" }
  
  // Use ! para testar que deve falhar
  !meu_validador.spend(datum, redeemer, Void, Void)
}
```

## 📚 Imports Comuns / Common Imports

```aiken
// Coleções / Collections
use aiken/collection/list
use aiken/collection/dict

// Cardano (nova estrutura v1.1.19+)
use cardano/address.{Address, Script}
use cardano/transaction.{Transaction, OutputReference}
use cardano/assets.{PolicyId}
```

**Nota:** A partir do Aiken 1.1.19, módulos core mudaram de `aiken/` para `cardano/`.

## 🎯 Dicas / Tips

### ✨ Boas Práticas / Best Practices

1. **Sempre teste** - Escreva testes para tudo
   *Always test - Write tests for everything*

2. **Use pattern matching** - É mais seguro que if/else
   *Use pattern matching - It's safer than if/else*

3. **Mantenha funções puras** - Sem efeitos colaterais
   *Keep functions pure - No side effects*

4. **Documente** - Use comentários para funções públicas
   *Document - Use comments for public functions*

5. **Seja explícito** - Adicione anotações de tipo
   *Be explicit - Add type annotations*

### ⚠️ Erros Comuns / Common Mistakes

❌ **Evite / Avoid:**
```aiken
// Tipos privados em validators
type MeuDatum {  // ❌ Faltando 'pub'
  value: Int,
}

// Validator sem propósitos definidos
validator inseguro {
  // ❌ Sem handlers (spend, mint, etc.)
}

// Usar todo em testes
test meu_teste() {
  meu_validator.spend(datum, redeemer, todo, todo)  // ❌
}
```

✅ **Faça / Do:**
```aiken
// Tipos públicos
pub type MeuDatum {  // ✅
  value: Int,
}

// Validator com propósitos e else
validator seguro {
  spend(datum: Option<MeuDatum>, redeemer: MeuRedeemer, _utxo, _self) {
    expect Some(dat) = datum
    dat.value > 0
  }

  else(_) {
    fail
  }
}

// Usar Void em testes
test meu_teste() {
  meu_validator.spend(datum, redeemer, Void, Void)  // ✅
}
```

## 🔗 Links Úteis / Useful Links

- [Documentação Oficial](https://aiken-lang.org/)
- [Standard Library](https://aiken-lang.org/stdlib)
- [Language Tour](https://aiken-lang.org/language-tour)
- [Discord](https://discord.gg/Vc3x8N9nz2)
- [GitHub](https://github.com/aiken-lang)

## 📖 Exemplos neste Projeto / Examples in this Project

1. **hello_world.ak** - Validador básico
2. **counter.ak** - Gerenciamento de estado
3. **vesting.ak** - Validador temporal

Veja `EXAMPLES.md` para detalhes / See `EXAMPLES.md` for details.

---

**Lembre-se:** Comece simples, teste frequentemente, e construa incrementalmente!

**Remember:** *Start simple, test frequently, and build incrementally!*

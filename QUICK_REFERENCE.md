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
// Record
type Pessoa {
  nome: ByteArray,
  idade: Int,
}

// Enum
type Resultado {
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
validator {
  fn meu_validador(
    datum: MeuDatum,
    redeemer: MeuRedeemer,
    context: ScriptContext
  ) -> Bool {
    // Lógica de validação
    True
  }
}
```

### Verificar Assinatura / Check Signature
```aiken
use aiken/list
use aiken/transaction.{ScriptContext}

let must_be_signed = 
  list.has(context.transaction.extra_signatories, owner)
```

### Verificar Tempo / Check Time
```aiken
let deadline_passed = when context.transaction.validity_range.lower_bound.bound_type is {
  Finite(time) -> time >= deadline
  _ -> False
}
```

## ✅ Testes / Tests

```aiken
test soma_funciona() {
  somar(2, 3) == 5
}

test nome_descritivo() {
  let resultado = minha_funcao(args)
  resultado == valor_esperado
}
```

## 📚 Imports Comuns / Common Imports

```aiken
// Hash e criptografia / Hash and cryptography
use aiken/hash.{Blake2b_224, Hash}

// Transações / Transactions
use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{VerificationKey}

// Listas / Lists
use aiken/list

// Valores / Values
use aiken/transaction/value
```

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
// Sem verificação de condições
validator {
  fn inseguro(datum, redeemer, ctx) -> Bool {
    True  // Aceita tudo!
  }
}
```

✅ **Faça / Do:**
```aiken
// Com validações apropriadas
validator {
  fn seguro(datum, redeemer, ctx) -> Bool {
    let assinado = list.has(ctx.transaction.extra_signatories, datum.owner)
    let valor_correto = ctx.transaction.value == datum.expected_value
    assinado && valor_correto
  }
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

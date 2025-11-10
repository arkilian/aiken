# Exemplos de Validadores Aiken / Aiken Validator Examples

Este documento explica os exemplos de validadores incluídos neste projeto.

*This document explains the validator examples included in this project.*

## 📁 Estrutura / Structure

```
validators/
├── hello_world.ak  # Exemplo básico / Basic example
├── counter.ak      # Gerenciamento de estado / State management
└── vesting.ak      # Validador com tempo / Time-based validator
```

## 1. Hello World (`validators/hello_world.ak`)

### O que faz / What it does
O validador mais simples possível - verifica se o redeemer contém a mensagem "Hello, World!".

*The simplest possible validator - checks if the redeemer contains the message "Hello, World!".*

### Conceitos demonstrados / Concepts demonstrated
- ✅ Estrutura básica de um validador
- ✅ Tipos customizados (Datum e Redeemer)
- ✅ Comparação de ByteArray
- ✅ Testes básicos

### Quando usar / When to use
Perfeito para:
- Primeiro contato com Aiken
- Entender a estrutura básica
- Aprender sobre tipos

*Perfect for:*
- *First contact with Aiken*
- *Understanding basic structure*
- *Learning about types*

### Código chave / Key code
```aiken
pub type Datum {
  owner: ByteArray,
}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_world {
  spend(datum: Option<Datum>, redeemer: Redeemer, _utxo, _self) {
    expect Some(_dat) = datum
    redeemer.msg == "Hello, World!"
  }

  else(_) {
    fail
  }
}
```

**Mudanças no Aiken 1.1.19:**
- Validators agora usam múltiplos propósitos (`spend`, `mint`, etc.)
- Datum agora é `Option<T>` em vez de `T` direto
- Parâmetros mudaram: `_utxo` e `_self` em vez de `context`
- Necessário adicionar `else(_)` handler

---

## 2. Counter (`validators/counter.ak`)

### O que faz / What it does
Um contador simples que pode ser incrementado, decrementado ou resetado.

*A simple counter that can be incremented, decremented, or reset.*

### Conceitos demonstrados / Concepts demonstrated
- ✅ Pattern matching com enums
- ✅ Gerenciamento de estado
- ✅ Lógica condicional
- ✅ Validação de estado

### Quando usar / When to use
Útil para:
- Aprender pattern matching
- Entender como gerenciar estado on-chain
- Ver como trabalhar com diferentes ações

*Useful for:*
- *Learning pattern matching*
- *Understanding on-chain state management*
- *Seeing how to work with different actions*

### Código chave / Key code
```aiken
pub type CounterDatum {
  count: Int,
}

pub type CounterRedeemer {
  Increment
  Decrement
  Reset
}

validator counter {
  spend(datum: Option<CounterDatum>, redeemer: CounterRedeemer, _utxo, _self) {
    expect Some(dat) = datum

    when redeemer is {
      Increment -> True
      Decrement -> dat.count > 0
      Reset -> True
    }
  }

  else(_) {
    fail
  }
}
```

### Observação importante / Important note
Em um validador real, você também precisaria verificar o datum de saída para garantir que:
- Increment realmente incrementa (output.count == datum.count + 1)
- Decrement realmente decrementa (output.count == datum.count - 1)
- Reset realmente reseta (output.count == 0)

*In a real validator, you would also need to check the output datum to ensure that:*
- *Increment actually increments (output.count == datum.count + 1)*
- *Decrement actually decrements (output.count == datum.count - 1)*
- *Reset actually resets (output.count == 0)*

**Nota sobre a API:** No Aiken 1.1.19+, você precisaria acessar os outputs através do parâmetro `_self: Transaction` para fazer essas verificações.

---

## 3. Vesting (`validators/vesting.ak`)

### O que faz / What it does
Um validador de "vesting" que bloqueia fundos até uma data específica e só permite que o beneficiário os reclame.

*A vesting validator that locks funds until a specific date and only allows the beneficiary to claim them.*

### Conceitos demonstrados / Concepts demonstrated
- ✅ Verificação de assinaturas
- ✅ Trabalho com tempo (POSIX timestamps)
- ✅ Uso de ScriptContext
- ✅ Pattern matching em validity ranges
- ✅ Lógica booleana composta

### Quando usar / When to use
Importante para:
- Entender validações temporais
- Aprender sobre verificação de assinaturas
- Ver um exemplo mais realista de smart contract

*Important for:*
- *Understanding temporal validations*
- *Learning about signature verification*
- *Seeing a more realistic smart contract example*

### Código chave / Key code
```aiken
pub type VestingDatum {
  beneficiary: ByteArray,
  deadline: Int,
}

pub type VestingRedeemer {
  msg: ByteArray,
}

validator vesting {
  spend(datum: Option<VestingDatum>, _redeemer: VestingRedeemer, _utxo, _self) {
    expect Some(dat) = datum

    // Versão simplificada para demonstração
    // Em produção, você verificaria:
    // 1. Assinatura do beneficiário via _self.extra_signatories
    // 2. Tempo atual via _self.validity_range
    dat.deadline > 0
  }

  else(_) {
    fail
  }
}
```

**Nota:** A implementação completa com verificação de assinatura e tempo requer acesso aos campos de `_self: Transaction`, que é mais avançado.

### Caso de uso real / Real-world use case
Este tipo de validador é usado para:
- 💰 Planos de vesting de tokens
- 🎁 Presentes com liberação programada
- 🏦 Poupanças com prazo mínimo
- 💼 Contratos de pagamento parcelado

*This type of validator is used for:*
- *💰 Token vesting plans*
- *🎁 Gifts with scheduled release*
- *🏦 Savings with minimum term*
- *💼 Installment payment contracts*

---

## Biblioteca / Library

### Utils (`lib/aiken_learning/utils.ak`)

Funções utilitárias básicas para demonstrar:
- Como criar bibliotecas reutilizáveis
- Como escrever funções puras
- Como testar funções de biblioteca

*Basic utility functions to demonstrate:*
- *How to create reusable libraries*
- *How to write pure functions*
- *How to test library functions*

```aiken
pub fn is_positive(value: Int) -> Bool {
  value > 0
}

pub fn add(a: Int, b: Int) -> Int {
  a + b
}
```

---

## Próximos Passos / Next Steps

### Para Iniciantes / For Beginners
1. Comece com `hello_world.ak`
2. Experimente modificar a mensagem
3. Adicione mais testes

*Start with `hello_world.ak`*
*Try modifying the message*
*Add more tests*

### Para Intermediários / For Intermediate
1. Estude `counter.ak`
2. Implemente a verificação completa do output datum
3. Adicione novas ações (ex: Multiplicar, Dividir)

*Study `counter.ak`*
*Implement full output datum verification*
*Add new actions (e.g., Multiply, Divide)*

### Para Avançados / For Advanced
1. Analise `vesting.ak`
2. Adicione múltiplos beneficiários
3. Implemente vesting gradual (ex: 25% a cada 3 meses)

*Analyze `vesting.ak`*
*Add multiple beneficiaries*
*Implement gradual vesting (e.g., 25% every 3 months)*

---

## Recursos / Resources

### Aprender Mais / Learn More
- [Aiken Language Tour](https://aiken-lang.org/language-tour)
- [Aiken Standard Library](https://aiken-lang.org/stdlib)
- [Cardano Developer Portal](https://developers.cardano.org/)

### Comunidade / Community
- [Discord](https://discord.gg/Vc3x8N9nz2)
- [GitHub](https://github.com/aiken-lang)

---

**Dica:** Experimente modificar os exemplos e veja o que acontece! A melhor forma de aprender é fazendo. 🚀

**Tip:** *Try modifying the examples and see what happens! The best way to learn is by doing.* 🚀

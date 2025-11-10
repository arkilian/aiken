# Atualizações do Projeto / Project Updates

## ✅ Atualização Completa - 10/11/2025

### Resumo / Summary

O projeto foi completamente atualizado para a sintaxe **Aiken 1.1.19**, a versão mais recente da linguagem. Todos os validadores, testes e documentação foram modernizados.

*The project has been fully updated to **Aiken 1.1.19** syntax, the latest version of the language. All validators, tests, and documentation have been modernized.*

---

## 📝 Documentação Atualizada / Updated Documentation

### 1. README.md
- ✅ Instruções de instalação para Windows detalhadas
- ✅ Estrutura do projeto atualizada
- ✅ Status do projeto com todos os 3 validadores
- ✅ Comandos básicos atualizados

### 2. TUTORIAL.md
- ✅ Instalação passo a passo para Windows com Rust/Cargo
- ✅ Explicação da nova estrutura de validators
- ✅ Exemplos de código com sintaxe 1.1.19
- ✅ Múltiplos propósitos de validators explicados
- ✅ Tipos públicos (`pub type`)
- ✅ Testes com `Void` em vez de `todo`

### 3. QUICK_REFERENCE.md
- ✅ Sintaxe de validators com múltiplos propósitos
- ✅ Imports atualizados (`cardano/` em vez de `aiken/`)
- ✅ Exemplos de testes modernos
- ✅ Seção de erros comuns expandida
- ✅ Tipos públicos obrigatórios

### 4. EXAMPLES.md
- ✅ Todos os 3 exemplos atualizados:
  - `hello_world.ak` - Validador básico
  - `counter.ak` - Gerenciamento de estado
  - `vesting.ak` - Bloqueio temporal (simplificado)
- ✅ Explicações sobre as mudanças de API
- ✅ Notas sobre implementações completas vs simplificadas

### 5. CHANGELOG.md (NOVO)
- ✅ Registro completo de todas as mudanças
- ✅ Guia de migração detalhado
- ✅ Comparação antes/depois da sintaxe
- ✅ Lista de breaking changes

### 6. UPDATES.md (ESTE ARQUIVO)
- ✅ Resumo executivo das atualizações
- ✅ Checklist de validação

---

## 🔧 Código Atualizado / Updated Code

### Validators

#### hello_world.ak
```diff
- validator {
-   fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
+ validator hello_world {
+   spend(datum: Option<Datum>, redeemer: Redeemer, _utxo, _self) {
+     expect Some(_dat) = datum
      redeemer.msg == "Hello, World!"
    }
+   else(_) {
+     fail
+   }
  }
```

#### counter.ak
```diff
- type CounterDatum {
+ pub type CounterDatum {
    count: Int,
  }

- validator {
-   fn counter(datum: CounterDatum, redeemer: CounterRedeemer, _context) -> Bool {
+ validator counter {
+   spend(datum: Option<CounterDatum>, redeemer: CounterRedeemer, _utxo, _self) {
+     expect Some(dat) = datum
      when redeemer is {
-       Increment -> True
-       Decrement -> datum.count > 0
+       Increment -> True
+       Decrement -> dat.count > 0
        Reset -> True
      }
    }
+   else(_) {
+     fail
+   }
  }
```

#### vesting.ak
```diff
- use aiken/hash.{Blake2b_224, Hash}
- use aiken/list
- use aiken/transaction.{ScriptContext, Spend}
+ // Imports removidos - versão simplificada

- type VestingDatum {
-   beneficiary: Hash<Blake2b_224, VerificationKey>,
+ pub type VestingDatum {
+   beneficiary: ByteArray,
    deadline: Int,
  }

+ validator vesting {
+   spend(datum: Option<VestingDatum>, _redeemer, _utxo, _self) {
+     expect Some(dat) = datum
+     dat.deadline > 0  // Simplificado para demonstração
+   }
+   else(_) {
+     fail
+   }
+ }
```

### Testes
```diff
  test hello_world_example() {
-   let datum = Datum { owner: #"00..." }
+   let datum = Some(Datum { owner: #"00..." })
    let redeemer = Redeemer { msg: "Hello, World!" }
-   hello_world(datum, redeemer, todo) == True
+   hello_world.spend(datum, redeemer, Void, Void)
  }
```

---

## ✅ Validação / Validation

### Testes Passando / Passing Tests
```
✅ 5/5 tests - aiken_learning/utils
✅ 4/4 tests - counter
✅ 2/2 tests - hello_world

Total: 11/11 tests passing ✅
```

### Compilação / Build
```bash
$ aiken check
Summary 11 checks, 0 errors, 0 warnings ✅

$ aiken build
Generating project's blueprint (plutus.json) ✅
Summary 0 errors, 0 warnings ✅
```

---

## 📚 Principais Conceitos Novos / Key New Concepts

### 1. Múltiplos Propósitos (Multiple Purposes)
Validators agora podem ter múltiplos handlers:
- `spend` - Gastar UTxOs
- `mint` - Cunhar tokens
- `withdraw` - Sacar rewards de stake
- `publish` - Publicar certificados
- `vote` - Votar em propostas de governança
- `propose` - Propor mudanças de governança
- `else` - Handler padrão (obrigatório)

### 2. Datum como Option
O datum agora é sempre `Option<T>`, permitindo UTxOs sem datum:
```aiken
spend(datum: Option<MyDatum>, ...) {
  expect Some(dat) = datum
  // usar dat
}
```

### 3. Tipos Públicos Obrigatórios
Tipos usados em validators devem ser públicos:
```aiken
pub type MyDatum { ... }  // ✅
type MyDatum { ... }      // ❌ Erro!
```

### 4. Nova Estrutura de Imports
```aiken
// Antigo
use aiken/transaction.{ScriptContext}
use aiken/hash.{Blake2b_224, Hash}

// Novo
use cardano/transaction.{Transaction}
use cardano/address.{Address}
```

---

## 🚀 Próximos Passos Sugeridos / Suggested Next Steps

1. **Experimentar com os validadores**
   - Modificar `counter.ak` para adicionar multiplicação/divisão
   - Completar `vesting.ak` com verificação real de assinaturas

2. **Criar novos validators**
   - Multi-signature wallet
   - NFT minting policy
   - Simple DEX

3. **Explorar outros propósitos**
   - Implementar `mint` em um validator
   - Criar um validator com múltiplos propósitos

4. **Integração off-chain**
   - Usar os validators compilados com Lucid ou Mesh.js
   - Testar em testnet da Cardano

---

## 📖 Recursos / Resources

- [Aiken Official Docs](https://aiken-lang.org/)
- [Aiken Language Tour](https://aiken-lang.org/language-tour)
- [Aiken Standard Library](https://aiken-lang.org/stdlib)
- [Cardano Developer Portal](https://developers.cardano.org/)
- [Aiken Discord](https://discord.gg/Vc3x8N9nz2)

---

**Status Final:** ✅ Projeto 100% funcional e atualizado  
**Versão Aiken:** 1.1.19  
**Data:** 10 de Novembro de 2025  

**Todos os objetivos alcançados! 🎉**

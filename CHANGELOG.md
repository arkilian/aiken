# Changelog / Registro de Mudanças

## [2025-11-10] - Atualização para Aiken 1.1.19

### Mudanças Importantes / Breaking Changes

#### Nova Sintaxe de Validators
A sintaxe dos validators mudou completamente no Aiken 1.1.19:

**Antes (sintaxe antiga):**
```aiken
validator {
  fn my_validator(datum: MyDatum, redeemer: MyRedeemer, context: ScriptContext) -> Bool {
    True
  }
}
```

**Agora (Aiken 1.1.19+):**
```aiken
validator my_validator {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _utxo, _self) {
    expect Some(dat) = datum
    True
  }

  else(_) {
    fail
  }
}
```

#### Principais Mudanças / Key Changes

1. **Múltiplos Propósitos (Multiple Purposes)**
   - Validators agora suportam múltiplos propósitos: `spend`, `mint`, `withdraw`, `publish`, `vote`, `propose`
   - Cada propósito tem sua própria assinatura de função

2. **Datum como Option**
   - `datum` agora é `Option<T>` em vez de `T` direto
   - Necessário usar `expect Some(dat) = datum` para extrair

3. **Parâmetros Diferentes**
   - `spend`: `(datum: Option<T>, redeemer: R, _utxo: OutputReference, _self: Transaction)`
   - `mint`: `(redeemer: R, policy_id: PolicyId, self: Transaction)`
   - Não há mais `ScriptContext` único

4. **Handler `else` Obrigatório**
   - Todo validator precisa de um handler `else(_)` para propósitos não implementados

5. **Tipos Públicos**
   - Tipos usados em validators devem ser `pub`
   - Exemplo: `pub type MyDatum { ... }`

6. **Imports Atualizados**
   - Módulos core mudaram de `aiken/` para `cardano/`
   - `use aiken/transaction` → `use cardano/transaction`
   - `use aiken/hash` → não mais necessário (use `ByteArray` diretamente)

7. **Testes**
   - Use `Void` em vez de `todo` para parâmetros não usados em testes
   - Exemplo: `my_validator.spend(datum, redeemer, Void, Void)`

### Arquivos Atualizados / Updated Files

- ✅ `validators/hello_world.ak` - Atualizado para nova sintaxe
- ✅ `validators/counter.ak` - Atualizado para nova sintaxe
- ✅ `validators/vesting.ak` - Simplificado para nova API
- ✅ `TUTORIAL.md` - Exemplos atualizados
- ✅ `QUICK_REFERENCE.md` - Referência atualizada
- ✅ `EXAMPLES.md` - Exemplos atualizados
- ✅ `README.md` - Instruções de instalação melhoradas

### Instalação / Installation

Adicionadas instruções detalhadas para Windows:
1. Instalar Rust via `winget install rustup`
2. Recarregar variáveis de ambiente
3. Instalar Aiken via `cargo install aiken --locked`

### Testes / Tests

Todos os 11 testes passando:
- ✅ 5 testes em `aiken_learning/utils`
- ✅ 4 testes em `counter`
- ✅ 2 testes em `hello_world`

### Compilação / Build

- ✅ `aiken check` - 0 errors, 0 warnings
- ✅ `aiken build` - plutus.json gerado com sucesso

---

## Migração / Migration Guide

### Para Atualizar Validadores Existentes / To Update Existing Validators

1. **Adicione `pub` aos tipos:**
   ```aiken
   pub type MyDatum { ... }
   pub type MyRedeemer { ... }
   ```

2. **Reestruture o validator:**
   ```aiken
   validator my_validator {
     spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _utxo, _self) {
       expect Some(dat) = datum
       // sua lógica aqui
     }

     else(_) {
       fail
     }
   }
   ```

3. **Atualize imports:**
   - `aiken/transaction` → `cardano/transaction`
   - `aiken/hash` → remova se não necessário
   - `aiken/list` → `aiken/collection/list`

4. **Atualize testes:**
   ```aiken
   test my_test() {
     my_validator.spend(datum, redeemer, Void, Void)
   }
   ```

### Recursos / Resources

- [Aiken Official Docs](https://aiken-lang.org/)
- [Aiken 1.1.19 Release](https://github.com/aiken-lang/aiken/releases/tag/v1.1.19)
- [Migration Guide](https://aiken-lang.org/fundamentals/migration-guide)

---

**Data da atualização:** 10 de Novembro de 2025  
**Versão do Aiken:** 1.1.19  
**Status:** ✅ Todos os exemplos funcionando

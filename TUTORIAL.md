# Tutorial Aiken - Passo a Passo / Aiken Tutorial - Step by Step

Este tutorial guia voc√™ atrav√©s dos fundamentos do Aiken, baseado na documenta√ß√£o oficial.

*This tutorial guides you through the fundamentals of Aiken, based on the official documentation.*

## √ùndice / Table of Contents

1. [Instala√ß√£o / Installation](#instala√ß√£o--installation)
2. [Conceitos B√°sicos / Basic Concepts](#conceitos-b√°sicos--basic-concepts)
3. [Primeiro Validador / First Validator](#primeiro-validador--first-validator)
4. [Tipos de Dados / Data Types](#tipos-de-dados--data-types)
5. [Testes / Testing](#testes--testing)
6. [Pr√≥ximos Passos / Next Steps](#pr√≥ximos-passos--next-steps)

## InstalaÁ„o / Installation

### 1. Instalar Aiken / Install Aiken

**Linux/MacOS:**
```bash
curl -sSfL https://install.aiken-lang.org | bash
aikup
```

**Windows:**

Primeiro, instale o Rust (se ainda n„o tiver):
```powershell
# Instalar Rust via winget
winget install rustup

# Recarregar as vari·veis de ambiente
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verificar instalaÁ„o do Rust
rustup --version
cargo --version
```

Depois, instale o Aiken via Cargo:
```powershell
cargo install aiken --locked
```

**Alternativa (qualquer plataforma via Cargo):**
```bash
cargo install aiken --locked
```

### 2. Verificar InstalaÁ„o / Verify Installation
```bash
aiken --version
```

**Nota para Windows:** Se o comando `cargo` n„o for reconhecido em uma nova janela do PowerShell, execute:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Conceitos B√°sicos / Basic Concepts

### Estrutura de um Projeto Aiken / Aiken Project Structure

```
projeto/
‚îú‚îÄ‚îÄ aiken.toml          # Configura√ß√£o / Configuration
‚îú‚îÄ‚îÄ lib/                # Bibliotecas / Libraries
‚îÇ   ‚îî‚îÄ‚îÄ seu_projeto/    # Seu c√≥digo reutiliz√°vel / Your reusable code
‚îî‚îÄ‚îÄ validators/         # Validadores / Validators
    ‚îî‚îÄ‚îÄ seu_validador.ak
```

### O que s„o Validadores? / What are Validators?

Validadores s„o smart contracts que verificam se uma transaÁ„o È v·lida. Na vers„o moderna do Aiken (1.1.19+), eles usam m˙ltiplos propÛsitos (handlers) e recebem diferentes par‚metros dependendo do propÛsito:

*Validators are smart contracts that check if a transaction is valid. In modern Aiken (1.1.19+), they use multiple purposes (handlers) and receive different parameters depending on the purpose:*

**Para `spend` (gastar UTxOs):**
1. **datum: Option<T>**: Dados armazenados no UTxO (opcional)
2. **redeemer: R**: Dados fornecidos por quem gasta o UTxO
3. **_utxo: OutputReference**: ReferÍncia ao UTxO sendo gasto
4. **_self: Transaction**: InformaÁıes sobre a transaÁ„o completa

**Para `mint` (cunhar tokens):**
1. **redeemer**: Dados de cunhagem
2. **policy_id**: ID da polÌtica de cunhagem
3. **self**: TransaÁ„o

## Primeiro Validador / First Validator

### Hello World

Veja o arquivo `validators/hello_world.ak` para um exemplo completo.

*See the `validators/hello_world.ak` file for a complete example.*

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

Este validador:
- Aceita transaÁıes onde o redeemer contÈm "Hello, World!"
- Rejeita todas as outras transaÁıes
- Usa a nova sintaxe do Aiken 1.1.19 com m˙ltiplos propÛsitos

*This validator:*
- *Accepts transactions where the redeemer contains "Hello, World!"*
- *Rejects all other transactions*
- *Uses the new Aiken 1.1.19 syntax with multiple purposes*
- *Accepts transactions where the redeemer contains "Hello, World!"*
- *Rejects all other transactions*

## Tipos de Dados / Data Types

### Tipos Primitivos / Primitive Types

```aiken
// Inteiros / Integers
let idade: Int = 25

// ByteArray (para dados bin√°rios)
let mensagem: ByteArray = "Hello"

// Booleanos / Booleans
let ativo: Bool = True

// Listas / Lists
let numeros: List<Int> = [1, 2, 3, 4, 5]
```

### Tipos Customizados / Custom Types

```aiken
// Record type (como struct)
pub type Pessoa {
  nome: ByteArray,
  idade: Int,
}

// Enum type (uni„o de tipos)
pub type Acao {
  Depositar
  Sacar { quantidade: Int }
}
```

**Importante:** Tipos usados em validators devem ser `pub` (p˙blicos).

## Testes / Testing

### Escrever Testes / Writing Tests

```aiken
test meu_teste() {
  // Arrange (preparar)
  let valor = 10
  
  // Act (executar)
  let resultado = valor + 5
  
  // Assert (verificar)
  resultado == 15
}

test validator_teste() {
  let datum = Some(MeuDatum { campo: 10 })
  let redeemer = MeuRedeemer { acao: Incrementar }
  
  // Use Void para par‚metros n„o utilizados
  meu_validator.spend(datum, redeemer, Void, Void)
}
```

### Executar Testes / Run Tests

```bash
aiken check
```

## Comandos √öteis / Useful Commands

### Verificar C√≥digo / Check Code
```bash
aiken check          # Verifica tipos e roda testes
```

### Compilar / Build
```bash
aiken build          # Compila para Plutus
```

### Formatar / Format
```bash
aiken fmt            # Formata o c√≥digo
```

### Documenta√ß√£o / Documentation
```bash
aiken docs           # Gera documenta√ß√£o
```

## Exemplos Pr√°ticos / Practical Examples

### 1. Validador Simples / Simple Validator

Arquivo: `validators/hello_world.ak`

Este √© o exemplo mais b√°sico - verifica apenas uma mensagem.

*This is the most basic example - it only checks a message.*

### 2. Validador com Tempo / Time-based Validator

Arquivo: `validators/vesting.ak`

Demonstra como:
- Verificar assinaturas
- Trabalhar com tempo
- Usar padr√µes mais complexos

*Demonstrates how to:*
- *Check signatures*
- *Work with time*
- *Use more complex patterns*

### 3. Biblioteca de Utilidades / Utility Library

Arquivo: `lib/aiken_learning/utils.ak`

Mostra como criar fun√ß√µes reutiliz√°veis e test√°-las.

*Shows how to create reusable functions and test them.*

## Conceitos Avan√ßados / Advanced Concepts

### Pattern Matching

```aiken
fn processar_acao(acao: Acao) -> Int {
  when acao is {
    Depositar -> 100
    Sacar { quantidade } -> quantidade
  }
}
```

### Validators com M˙ltiplos PropÛsitos

```aiken
validator meu_validator {
  spend(datum: Option<MeuDatum>, redeemer: MeuRedeemer, _utxo, _self) {
    // LÛgica para gastar UTxOs
    True
  }

  mint(_redeemer, _policy_id, _self) {
    // LÛgica para cunhar tokens
    True
  }

  else(_) {
    fail
  }
}
```

### List Functions

```aiken
use aiken/list

let numeros = [1, 2, 3, 4, 5]
let dobrados = list.map(numeros, fn(n) { n * 2 })
let soma = list.foldl(numeros, 0, fn(acc, n) { acc + n })
```

### Option Type

```aiken
// Para valores que podem n√£o existir
type Option<a> {
  Some(a)
  None
}

fn buscar(lista: List<Int>, valor: Int) -> Option<Int> {
  when list.find(lista, fn(x) { x == valor }) is {
    Some(x) -> Some(x)
    None -> None
  }
}
```

## Pr√≥ximos Passos / Next Steps

### 1. Estudar a Documenta√ß√£o Oficial / Study Official Documentation
- [Language Tour](https://aiken-lang.org/language-tour/primitive-types)
- [Standard Library](https://aiken-lang.org/stdlib)

### 2. Praticar com Exemplos / Practice with Examples
- Modifique os validadores existentes
- Crie seus pr√≥prios validadores
- Experimente com diferentes tipos de dados

*Modify existing validators*
*Create your own validators*
*Experiment with different data types*

### 3. Explorar Projetos da Comunidade / Explore Community Projects
- [Aiken Examples](https://github.com/aiken-lang/aiken/tree/main/examples)
- [Awesome Aiken](https://github.com/aiken-lang/awesome-aiken)

### 4. Integra√ß√£o com Cardano / Cardano Integration
Quando estiver confort√°vel com Aiken, aprenda a:
- Usar os validadores em transa√ß√µes reais
- Integrar com frameworks off-chain (Lucid, Mesh, etc.)
- Deploy em testnet

*When comfortable with Aiken, learn to:*
- *Use validators in real transactions*
- *Integrate with off-chain frameworks (Lucid, Mesh, etc.)*
- *Deploy to testnet*

## Recursos Adicionais / Additional Resources

### Documenta√ß√£o / Documentation
- [Aiken Official Docs](https://aiken-lang.org/)
- [Cardano Docs - Aiken](https://docs.cardano.org/developer-resources/smart-contracts/aiken)

### Comunidade / Community
- [Discord do Aiken](https://discord.gg/Vc3x8N9nz2)
- [GitHub Discussions](https://github.com/aiken-lang/aiken/discussions)

### Tutoriais / Tutorials
- [Mesh.js Aiken Guide](https://meshjs.dev/guides/aiken)
- [EMURGO Academy](https://www.emurgo.io/)

---

**Dica:** Comece devagar, pratique os exemplos, e n√£o tenha medo de experimentar! üéØ

**Tip:** *Start slowly, practice the examples, and don't be afraid to experiment!* üéØ

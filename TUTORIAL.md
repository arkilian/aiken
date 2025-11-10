# Tutorial Aiken - Passo a Passo / Aiken Tutorial - Step by Step

Este tutorial guia você através dos fundamentos do Aiken, baseado na documentação oficial.

*This tutorial guides you through the fundamentals of Aiken, based on the official documentation.*

## Índice / Table of Contents

1. [Instalação / Installation](#instalação--installation)
2. [Conceitos Básicos / Basic Concepts](#conceitos-básicos--basic-concepts)
3. [Primeiro Validador / First Validator](#primeiro-validador--first-validator)
4. [Tipos de Dados / Data Types](#tipos-de-dados--data-types)
5. [Testes / Testing](#testes--testing)
6. [Próximos Passos / Next Steps](#próximos-passos--next-steps)

## Instalação / Installation

### 1. Instalar Aiken / Install Aiken

**Linux/MacOS:**
```bash
curl -sSfL https://install.aiken-lang.org | bash
aikup
```

**Windows ou via Cargo:**
```bash
cargo install aiken
```

### 2. Verificar Instalação / Verify Installation
```bash
aiken --version
```

## Conceitos Básicos / Basic Concepts

### Estrutura de um Projeto Aiken / Aiken Project Structure

```
projeto/
├── aiken.toml          # Configuração / Configuration
├── lib/                # Bibliotecas / Libraries
│   └── seu_projeto/    # Seu código reutilizável / Your reusable code
└── validators/         # Validadores / Validators
    └── seu_validador.ak
```

### O que são Validadores? / What are Validators?

Validadores são smart contracts que verificam se uma transação é válida. Eles recebem três argumentos:

*Validators are smart contracts that check if a transaction is valid. They receive three arguments:*

1. **Datum**: Dados armazenados no UTxO
2. **Redeemer**: Dados fornecidos por quem gasta o UTxO
3. **ScriptContext**: Informações sobre a transação

## Primeiro Validador / First Validator

### Hello World

Veja o arquivo `validators/hello_world.ak` para um exemplo completo.

*See the `validators/hello_world.ak` file for a complete example.*

```aiken
validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
    let must_say_hello = redeemer.msg == "Hello, World!"
    must_say_hello
  }
}
```

Este validador:
- Aceita transações onde o redeemer contém "Hello, World!"
- Rejeita todas as outras transações

*This validator:*
- *Accepts transactions where the redeemer contains "Hello, World!"*
- *Rejects all other transactions*

## Tipos de Dados / Data Types

### Tipos Primitivos / Primitive Types

```aiken
// Inteiros / Integers
let idade: Int = 25

// ByteArray (para dados binários)
let mensagem: ByteArray = "Hello"

// Booleanos / Booleans
let ativo: Bool = True

// Listas / Lists
let numeros: List<Int> = [1, 2, 3, 4, 5]
```

### Tipos Customizados / Custom Types

```aiken
// Record type (como struct)
type Pessoa {
  nome: ByteArray,
  idade: Int,
}

// Enum type (união de tipos)
type Acao {
  Depositar
  Sacar { quantidade: Int }
}
```

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
```

### Executar Testes / Run Tests

```bash
aiken check
```

## Comandos Úteis / Useful Commands

### Verificar Código / Check Code
```bash
aiken check          # Verifica tipos e roda testes
```

### Compilar / Build
```bash
aiken build          # Compila para Plutus
```

### Formatar / Format
```bash
aiken fmt            # Formata o código
```

### Documentação / Documentation
```bash
aiken docs           # Gera documentação
```

## Exemplos Práticos / Practical Examples

### 1. Validador Simples / Simple Validator

Arquivo: `validators/hello_world.ak`

Este é o exemplo mais básico - verifica apenas uma mensagem.

*This is the most basic example - it only checks a message.*

### 2. Validador com Tempo / Time-based Validator

Arquivo: `validators/vesting.ak`

Demonstra como:
- Verificar assinaturas
- Trabalhar com tempo
- Usar padrões mais complexos

*Demonstrates how to:*
- *Check signatures*
- *Work with time*
- *Use more complex patterns*

### 3. Biblioteca de Utilidades / Utility Library

Arquivo: `lib/aiken_learning/utils.ak`

Mostra como criar funções reutilizáveis e testá-las.

*Shows how to create reusable functions and test them.*

## Conceitos Avançados / Advanced Concepts

### Pattern Matching

```aiken
fn processar_acao(acao: Acao) -> Int {
  when acao is {
    Depositar -> 100
    Sacar { quantidade } -> quantidade
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
// Para valores que podem não existir
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

## Próximos Passos / Next Steps

### 1. Estudar a Documentação Oficial / Study Official Documentation
- [Language Tour](https://aiken-lang.org/language-tour/primitive-types)
- [Standard Library](https://aiken-lang.org/stdlib)

### 2. Praticar com Exemplos / Practice with Examples
- Modifique os validadores existentes
- Crie seus próprios validadores
- Experimente com diferentes tipos de dados

*Modify existing validators*
*Create your own validators*
*Experiment with different data types*

### 3. Explorar Projetos da Comunidade / Explore Community Projects
- [Aiken Examples](https://github.com/aiken-lang/aiken/tree/main/examples)
- [Awesome Aiken](https://github.com/aiken-lang/awesome-aiken)

### 4. Integração com Cardano / Cardano Integration
Quando estiver confortável com Aiken, aprenda a:
- Usar os validadores em transações reais
- Integrar com frameworks off-chain (Lucid, Mesh, etc.)
- Deploy em testnet

*When comfortable with Aiken, learn to:*
- *Use validators in real transactions*
- *Integrate with off-chain frameworks (Lucid, Mesh, etc.)*
- *Deploy to testnet*

## Recursos Adicionais / Additional Resources

### Documentação / Documentation
- [Aiken Official Docs](https://aiken-lang.org/)
- [Cardano Docs - Aiken](https://docs.cardano.org/developer-resources/smart-contracts/aiken)

### Comunidade / Community
- [Discord do Aiken](https://discord.gg/Vc3x8N9nz2)
- [GitHub Discussions](https://github.com/aiken-lang/aiken/discussions)

### Tutoriais / Tutorials
- [Mesh.js Aiken Guide](https://meshjs.dev/guides/aiken)
- [EMURGO Academy](https://www.emurgo.io/)

---

**Dica:** Comece devagar, pratique os exemplos, e não tenha medo de experimentar! 🎯

**Tip:** *Start slowly, practice the examples, and don't be afraid to experiment!* 🎯

# Aprendendo Aiken (Learning Aiken)

Este é um projeto de aprendizado para desenvolver em Aiken, a linguagem de programação para smart contracts da blockchain Cardano.

*This is a learning project for developing with Aiken, the programming language for Cardano blockchain smart contracts.*

## O que é Aiken? / What is Aiken?

Aiken é uma linguagem de programação moderna, estaticamente tipada e funcional, projetada especificamente para escrever smart contracts (validadores on-chain) para a blockchain Cardano. É inspirada em linguagens como Elm, Gleam e Rust.

*Aiken is a modern, statically typed, functional programming language specifically designed for writing smart contracts (on-chain validators) for the Cardano blockchain. It's inspired by languages like Elm, Gleam, and Rust.*

## Estrutura do Projeto / Project Structure

```
.
├── README.md           # Este arquivo / This file
├── aiken.toml          # Configuração do projeto / Project configuration
├── lib/                # Código de biblioteca / Library code
│   └── aiken_learning/
│       └── utils.ak    # Funções utilitárias / Utility functions
└── validators/         # Validadores de smart contract / Smart contract validators
    ├── hello_world.ak  # Exemplo "Hello, World!" / "Hello, World!" example
    ├── counter.ak      # Contador com estado / Counter with state
    └── vesting.ak      # Bloqueio temporal / Time-lock vesting
```

**Versão do Aiken:** 1.1.19+ (sintaxe atualizada)

## Pré-requisitos / Prerequisites

Para trabalhar com este projeto, você precisa instalar o Aiken. Siga as instruções oficiais:

*To work with this project, you need to install Aiken. Follow the official instructions:*

### Instalação / Installation

**Windows:**
```powershell
# 1. Instalar Rust via winget
winget install rustup

# 2. Recarregar variáveis de ambiente
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 3. Instalar Aiken via Cargo
cargo install aiken --locked

# 4. Verificar instalação
aiken --version
```

**Linux/MacOS:**
```bash
curl -sSfL https://install.aiken-lang.org | bash
aikup
```

**Ou via Cargo (todas as plataformas) / Or via Cargo (all platforms):**
```bash
cargo install aiken --locked
```

**Verificar instalação / Verify installation:**
```bash
aiken --version
```

## Comandos Básicos / Basic Commands

### Verificar e testar o código / Check and test the code
```bash
aiken check
```

### Compilar o projeto / Build the project
```bash
aiken build
```

### Executar testes / Run tests
```bash
aiken check
```

### Formatar código / Format code
```bash
aiken fmt
```

## Exemplos / Examples

### Hello World Validator

O arquivo `validators/hello_world.ak` contém um validador simples que verifica se o redeemer contém a mensagem "Hello, World!".

*The `validators/hello_world.ak` file contains a simple validator that checks if the redeemer contains the message "Hello, World!".*

### Biblioteca de Utilidades / Utility Library

O arquivo `lib/aiken_learning/utils.ak` contém funções utilitárias básicas com testes para demonstrar como escrever e testar código em Aiken.

*The `lib/aiken_learning/utils.ak` file contains basic utility functions with tests to demonstrate how to write and test code in Aiken.*

## Recursos de Aprendizado / Learning Resources

### Documentação Oficial / Official Documentation
- [Getting Started](https://aiken-lang.org/fundamentals/getting-started) - Guia de início
- [Language Tour](https://aiken-lang.org/language-tour/primitive-types) - Tour pela linguagem
- [Standard Library](https://aiken-lang.org/stdlib) - Biblioteca padrão

### Tutoriais e Exemplos / Tutorials and Examples
- [Cardano Docs - Aiken](https://docs.cardano.org/developer-resources/smart-contracts/aiken)
- [Aiken Hello World - Mesh](https://meshjs.dev/guides/aiken)
- [GitHub - Aiken Lang](https://github.com/aiken-lang)

## Próximos Passos / Next Steps

1. ✅ Configurar o projeto básico / Set up basic project
2. ✅ Criar validador "Hello, World!" / Create "Hello, World!" validator
3. ✅ Criar validador Counter / Create Counter validator
4. ✅ Criar validador Vesting / Create Vesting validator
5. ✅ Adicionar testes / Add tests
6. ✅ Atualizar para sintaxe Aiken 1.1.19+ / Update to Aiken 1.1.19+ syntax
7. 📚 Estudar a documentação oficial / Study the official documentation
8. 🔨 Praticar criando validadores mais complexos / Practice creating more complex validators
9. 🎯 Explorar exemplos da comunidade / Explore community examples

**Status:** Projeto funcionando com Aiken 1.1.19 - todos os testes passando! ✅

## Licença / License

Apache-2.0

---

**Bons estudos! / Happy learning!** 🚀

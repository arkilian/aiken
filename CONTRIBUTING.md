# Contribuindo / Contributing

Obrigado por seu interesse em contribuir para este projeto de aprendizado!

*Thank you for your interest in contributing to this learning project!*

## Como Contribuir / How to Contribute

### 1. Adicione Seus Próprios Exemplos / Add Your Own Examples

Se você criou um validador interessante enquanto aprendia Aiken, compartilhe!

*If you created an interesting validator while learning Aiken, share it!*

**Passos / Steps:**

1. Fork este repositório
2. Crie um branch: `git checkout -b meu-exemplo`
3. Adicione seu validador em `validators/` ou função em `lib/`
4. Adicione testes
5. Documente em `EXAMPLES.md`
6. Commit: `git commit -m 'Adiciona exemplo de XXX'`
7. Push: `git push origin meu-exemplo`
8. Abra um Pull Request

### 2. Melhore a Documentação / Improve Documentation

Encontrou algo confuso? Ajude outros aprendizes!

*Found something confusing? Help other learners!*

- Corrija erros de digitação / Fix typos
- Adicione exemplos / Add examples
- Melhore explicações / Improve explanations
- Traduza documentação / Translate documentation

### 3. Reporte Problemas / Report Issues

Encontrou um bug nos exemplos? Abra uma issue!

*Found a bug in the examples? Open an issue!*

## Diretrizes / Guidelines

### Para Validadores / For Validators

✅ **Faça / Do:**
- Adicione comentários explicativos
- Inclua testes
- Use nomes descritivos
- Siga as convenções do Aiken
- Mantenha exemplos simples e educacionais

❌ **Evite / Don't:**
- Código de produção complexo
- Exemplos sem documentação
- Validadores sem testes
- Código não formatado (`aiken fmt`)

### Para Documentação / For Documentation

✅ **Faça / Do:**
- Mantenha português e inglês
- Use exemplos práticos
- Seja claro e conciso
- Adicione links para recursos oficiais

❌ **Evite / Don't:**
- Jargão técnico excessivo sem explicação
- Documentação apenas em um idioma
- Exemplos muito avançados sem contexto

## Estilo de Código / Code Style

### Aiken

```aiken
// Use aiken fmt antes de commitar
// Run aiken fmt before committing

// Bom / Good:
fn calcular_total(items: List<Int>) -> Int {
  list.foldl(items, 0, fn(acc, item) { acc + item })
}

// Evite / Avoid:
fn calc(x: List<Int>) -> Int {
  list.foldl(x,0,fn(a,b){a+b})
}
```

### Comentários / Comments

```aiken
// Para funções públicas, explique o que faz
// For public functions, explain what it does
pub fn is_valid(value: Int) -> Bool {
  // Explique lógica complexa
  // Explain complex logic
  value > 0 && value < 100
}
```

## Ideias de Contribuição / Contribution Ideas

### Exemplos de Validadores / Validator Examples

Precisamos de exemplos para:
*We need examples for:*

- [ ] Multi-signature wallet / Carteira multi-assinatura
- [ ] Token minting / Cunhagem de tokens
- [ ] NFT marketplace / Mercado de NFTs
- [ ] Staking contract / Contrato de staking
- [ ] DAO voting / Votação DAO
- [ ] Escrow / Depósito em garantia
- [ ] Lottery / Loteria
- [ ] Auction / Leilão

### Tutoriais / Tutorials

- [ ] Como integrar com wallets
- [ ] Como usar com Lucid/Mesh
- [ ] Como fazer deploy na testnet
- [ ] Como debugar validadores
- [ ] Padrões comuns de design

*How to integrate with wallets*
*How to use with Lucid/Mesh*
*How to deploy to testnet*
*How to debug validators*
*Common design patterns*

### Ferramentas / Tools

- [ ] Scripts de teste automatizados
- [ ] Gerador de templates
- [ ] Documentação interativa
- [ ] Exemplos de integração

*Automated testing scripts*
*Template generator*
*Interactive documentation*
*Integration examples*

## Processo de Review / Review Process

1. **Checklist Automático / Automated Checklist:**
   - [ ] Código compila (`aiken build`)
   - [ ] Testes passam (`aiken check`)
   - [ ] Código formatado (`aiken fmt`)
   - [ ] Documentação atualizada

2. **Review Manual / Manual Review:**
   - Código é educacional?
   - Documentação é clara?
   - Exemplos funcionam?

3. **Feedback:**
   - Responderemos em até 48 horas
   - Pode haver pedidos de mudanças
   - Agradeça sempre o esforço!

*We'll respond within 48 hours*
*There may be change requests*
*Always appreciate the effort!*

## Código de Conduta / Code of Conduct

### Seja Respeitoso / Be Respectful

- ✅ Ajude outros aprendizes
- ✅ Critique construtivamente
- ✅ Seja paciente
- ✅ Celebre sucessos

*Help other learners*
*Critique constructively*
*Be patient*
*Celebrate successes*

- ❌ Não seja rude
- ❌ Não assuma conhecimento
- ❌ Não menospreze perguntas
- ❌ Não spam

*Don't be rude*
*Don't assume knowledge*
*Don't belittle questions*
*Don't spam*

## Recursos para Contribuidores / Resources for Contributors

### Aprender Aiken / Learning Aiken
- [Aiken Documentation](https://aiken-lang.org/)
- [Cardano Docs](https://docs.cardano.org/)
- [Aiken Discord](https://discord.gg/Vc3x8N9nz2)

### Git e GitHub / Git and GitHub
- [GitHub Guides](https://guides.github.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

## Reconhecimento / Acknowledgment

Todos os contribuidores serão:
*All contributors will be:*

- Listados no README / Listed in README
- Mencionados nos commits / Mentioned in commits
- Creditados na documentação / Credited in documentation

## Perguntas? / Questions?

- Abra uma issue / Open an issue
- Discord da comunidade Aiken / Aiken community Discord
- Email: [maintainer email]

---

**Obrigado por tornar este projeto melhor para todos! 🚀**

**Thank you for making this project better for everyone! 🚀**

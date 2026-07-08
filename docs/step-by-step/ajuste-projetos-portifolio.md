# Step-by-step: ajuste dos projetos do portfólio

Documento de referência das mudanças feitas na aba de projetos do portfólio.

## Objetivo

Reorganizar `content/projects/` para refletir os projetos atuais: renomear o portfólio para `mateus.dev`, remover projetos antigos e adicionar os novos, mantendo dois em destaque na home.

## Como o conteúdo funciona

- Cada projeto é um arquivo `.mdx` em `content/projects/` com frontmatter bilíngue (`pt`/`en`).
- `getProjects()` em `src/lib/content.ts` lê os arquivos, ordena por `order` e alimenta a listagem.
- A home (`src/app/[locale]/page.tsx`) exibe os 2 primeiros com `featured: true`.
- A aba `/projects` exibe todos, com filtro dinâmico por `tags`.
- O slug da URL é o nome do arquivo sem `.mdx`.

## Arquivos editados

| Arquivo | Mudança |
|---------|---------|
| `content/projects/mk-portifolio.mdx` | Título alterado para `mateus.dev`; adicionado `liveUrl` de produção. Mantido `featured: true`, `order: 1`. |
| `content/projects/venda-de-ingressos.mdx` | `featured: false`, `order: 4` (saiu do destaque na home). |

## Arquivos removidos

- `content/projects/microservice-project.mdx`
- `content/projects/mklog-api.mdx`

## Arquivos criados

| Arquivo | Projeto | Stack | Order | Featured |
|---------|---------|-------|-------|----------|
| `js-fisioterapia.mdx` | JS Fisioterapia (SaaS de gestão de clínica) | Next.js, TypeScript, Tailwind CSS, PostgreSQL | 2 | sim |
| `wordcupodd.mdx` | WordCup (analisador estatístico de apostas) | Python, Streamlit, Docker, Tauri | 3 | não |
| `sistema-de-pedidos.mdx` | Sistema de Pedidos | Java, Spring Boot, Thymeleaf, Maven | 5 | não |
| `dsvendas.mdx` | DSVendas (dashboard fullstack) | Java, Spring Boot, React, TypeScript | 6 | não |
| `rest-api-complete.mdx` | REST API Complete (estudos) | Java, Spring Boot, REST APIs, Maven | 7 | não |
| `chess-system.mdx` | Chess System (xadrez em POO) | Java, POO | 8 | não |

## Ordem final na listagem

1. mateus.dev (destaque)
2. JS Fisioterapia (destaque)
3. WordCup
4. Venda de Ingressos
5. Sistema de Pedidos
6. DSVendas
7. REST API Complete
8. Chess System

## Decisões e observações

- `chess-system`: nesta etapa foi apenas adicionado ao portfólio; o README do repositório não foi alterado (repo fora deste workspace).
- `rest-api-complete` e `dsvendas`: os repositórios retornaram 404 (provavelmente privados). As descrições foram escritas com base no nome/contexto e devem ser revisadas.
- `js-fisioterapia` não possui `githubUrl` (apenas `liveUrl`); o card e a página de detalhe já tratam a ausência do link.
- `wordcupodd` foi descrito com base no `README.md` real do projeto presente no workspace.

## Como validar

```bash
npm run build
```

Confirma que `generateStaticParams` gera as rotas estáticas de todos os slugs sem erro.

# Fase 4 — Portfólio

## O que foi feito

- Listagem de projetos com filtro por tag
- Página de detalhe por slug
- Conteúdo em MDX com frontmatter bilíngue (`localeBodies`)
- Três projetos seed: `mk-portifolio`, `tasks-api`, `analytics-dashboard`

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `src/lib/content.ts` | Leitura de projetos MDX |
| `src/app/[locale]/projects/page.tsx` | Listagem |
| `src/app/[locale]/projects/[slug]/page.tsx` | Detalhe |
| `content/projects/*.mdx` | Dados dos projetos |

## Modelo de dados

Cada projeto possui título/descrição bilíngues, tags, stack, links e corpo MDX por idioma.

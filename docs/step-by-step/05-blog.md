# Fase 5 — Blog

## O que foi feito

- Posts em MDX por locale (`content/blog/pt`, `content/blog/en`)
- Renderização com `next-mdx-remote/rsc` e `remark-gfm`
- Syntax highlighting com Shiki
- TOC automático a partir de headings h2/h3
- Navegação anterior/próximo entre posts
- Filtro por tags na listagem

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `src/components/mdx/MdxContent.tsx` | Compila e renderiza MDX |
| `src/lib/shiki.ts` | Highlight de código |
| `src/app/[locale]/blog/[slug]/page.tsx` | Página do post |

## Posts iniciais

- Kafka (pt/en)
- Arquitetura Hexagonal (pt/en)

## Fluxo de publicação

1. Criar `.mdx` em `content/blog/pt/` ou `en/`
2. Commit + push → deploy automático na Vercel

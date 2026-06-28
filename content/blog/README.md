# Blog — guia de conteúdo

Este guia explica como publicar estudos no blog em `/pt/blog` e `/en/blog`.

## Status atual

O blog está **em construção**. Isso é controlado por:

```
content/site/blog.json
```

```json
{
  "underConstruction": true
}
```

Enquanto `underConstruction` for `true` **ou** não houver posts com `published: true`, a página exibe o aviso de construção.

## Onde ficam os posts

Posts são arquivos `.mdx` separados por idioma:

```
content/blog/
├── pt/
│   └── meu-estudo.mdx
└── en/
    └── my-study.mdx
```

- Post em português → `content/blog/pt/`
- Post em inglês → `content/blog/en/`
- O **slug** da URL é o nome do arquivo (ex.: `meu-estudo.mdx` → `/pt/blog/meu-estudo`)

Posts em `pt` e `en` **não precisam** ter o mesmo slug, mas é recomendado para manter paridade bilíngue.

## Publicar um novo estudo

### Passo 1 — Criar o arquivo MDX

Exemplo em `content/blog/pt/kafka-filas.mdx`:

```mdx
---
title: "Filas com Apache Kafka"
description: "Resumo do meu estudo sobre tópicos, partições e consumidores."
date: "2026-06-28"
tags: [kafka, backend, messaging]
published: true
---

## Introdução

Texto do estudo em Markdown...

## Exemplo de código

```java
producer.send(new ProducerRecord<>("orders", payload));
```
```

### Passo 2 — Campos do frontmatter

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `title` | Sim | Título do post |
| `description` | Sim | Resumo para cards e SEO |
| `date` | Sim | Data ISO (`YYYY-MM-DD`) |
| `tags` | Sim | Tags para filtros futuros |
| `published` | Sim | `true` para publicar, `false` para rascunho |

### Passo 3 — Ativar o blog

1. Defina `published: true` no post
2. Em `content/site/blog.json`, altere:

```json
{
  "underConstruction": false
}
```

3. Rode `npm run dev` e acesse `/pt/blog`
4. Commit + push

## Rascunhos (não publicar ainda)

Para manter um post no repositório sem exibi-lo:

```yaml
published: false
```

Posts com `published: false`:

- **Não** aparecem na listagem
- **Não** aparecem na home
- **Não** geram rota pública (retornam 404)
- **Não** entram no sitemap

## Editar um post

1. Abra o `.mdx` em `content/blog/pt/` ou `en/`
2. Altere frontmatter ou conteúdo
3. Salve e recarregue a página

## Remover um post

1. Delete o arquivo `.mdx`
2. Commit + push

## Tradução (pt + en)

Para cada estudo bilíngue, crie dois arquivos:

```
content/blog/pt/kafka-filas.mdx
content/blog/en/kafka-queues.mdx
```

Traduza `title` e `description`; o corpo pode ser adaptado (não precisa ser tradução literal).

## Posts de exemplo (templates)

Estes arquivos existem como referência e estão **despublicados** (`published: false`):

- `pt/kafka-introducao.mdx`
- `pt/arquitetura-hexagonal.mdx`
- `en/kafka-introduction.mdx`
- `en/hexagonal-architecture.mdx`

Você pode copiá-los como base para novos estudos.

## Sintaxe suportada

- Markdown padrão (títulos, listas, links, blockquotes)
- Blocos de código com syntax highlighting (Shiki)
- GFM via `remark-gfm` (tabelas, checkboxes, etc.)

## Dicas de segurança

- Não inclua senhas, tokens, chaves de API ou dados internos de empresa
- Evite URLs de ambientes internos (staging, VPN, IPs privados)
- Revise o conteúdo antes de definir `published: true`

## Publicar

```bash
git add content/blog/ content/site/blog.json
git commit -m "feat: publica estudo sobre Kafka"
git push origin main
```

## Checklist rápido

- [ ] Arquivo `.mdx` criado em `content/blog/pt/` (e `en/` se bilíngue)
- [ ] `published: true`
- [ ] `underConstruction: false` em `content/site/blog.json`
- [ ] Preview local em `/pt/blog`
- [ ] Push para `main`

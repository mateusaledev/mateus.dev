# Projetos — guia de conteúdo

Este guia explica como adicionar, editar ou remover projetos exibidos em `/pt/projects` e `/en/projects`.

## Onde ficam os arquivos

Cada projeto é um arquivo `.mdx` em:

```
content/projects/
├── mk-portifolio.mdx
├── venda-de-ingressos.mdx
└── ...
```

O **slug** da URL é o nome do arquivo sem `.mdx`.

Exemplo: `venda-de-ingressos.mdx` → `/pt/projects/venda-de-ingressos`

## Adicionar um projeto

1. Crie um novo arquivo em `content/projects/nome-do-projeto.mdx`
2. Use o frontmatter abaixo como modelo
3. Salve e rode `npm run dev` para visualizar
4. Commit + push para publicar na Vercel

### Modelo completo

```mdx
---
title:
  pt: "Nome do Projeto"
  en: "Project Name"
description:
  pt: "Descrição curta em português (1–2 frases)."
  en: "Short description in English (1–2 sentences)."
tags: [java, api, backend]
stack: [Java, Spring Boot, PostgreSQL]
githubUrl: https://github.com/seu-usuario/repositorio
liveUrl: https://demo-opcional.com
featured: true
order: 1
challenges:
  pt: "Principal desafio técnico do projeto."
  en: "Main technical challenge of the project."
learnings:
  pt: "O que você aprendeu com o projeto."
  en: "What you learned from the project."
localeBodies:
  pt: |
    ## Visão geral

    Texto em Markdown/MDX do detalhe do projeto em português.

    ## Destaques

    - Item 1
    - Item 2
  en: |
    ## Overview

    Project detail content in English.
---

Texto fallback opcional após o frontmatter (raramente necessário se usar `localeBodies`).
```

## Campos do frontmatter

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `title` | Sim | Título bilíngue (`pt` e `en`) |
| `description` | Sim | Resumo exibido no card e no topo da página |
| `tags` | Sim | Filtros na listagem (ex.: `java`, `api`) |
| `stack` | Sim | Tecnologias exibidas no card e no detalhe |
| `githubUrl` | Não | Link para o repositório |
| `liveUrl` | Não | Link para demo ao vivo |
| `featured` | Não | `true` para aparecer na home (padrão: `false`) |
| `order` | Não | Ordem na listagem — menor número aparece primeiro |
| `challenges` | Não | Texto bilíngue da seção "Desafios" |
| `learnings` | Não | Texto bilíngue da seção "Aprendizados" |
| `localeBodies` | Recomendado | Corpo MDX bilíngue da página de detalhe |

## Editar um projeto existente

1. Abra o `.mdx` correspondente em `content/projects/`
2. Altere frontmatter ou conteúdo em `localeBodies`
3. Verifique localmente em `/pt/projects/nome-do-projeto`

## Remover um projeto

1. Delete o arquivo `.mdx` em `content/projects/`
2. Commit + push

A rota deixa de existir no próximo build.

## Destaques na home

A home exibe até **2 projetos** com `featured: true`, ordenados por `order`.

Para destacar um projeto:

```yaml
featured: true
order: 1
```

## Dicas

- Use slugs curtos e descritivos (`mklog-api`, não `projeto-final-v2`)
- Mantenha `pt` e `en` alinhados — visitantes podem alternar o idioma
- Não coloque senhas, tokens ou URLs internas nos arquivos de conteúdo
- Após mudanças, rode `npm run build` para garantir que o build passa

## Publicar

```bash
git add content/projects/
git commit -m "feat: adiciona projeto X"
git push origin main
```

O deploy na Vercel ocorre automaticamente após o push em `main`.

# mateus.dev

Site pessoal bilíngue (pt-BR / EN) com portfólio de projetos, página sobre e blog de estudos técnicos.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- next-intl (internacionalização)
- MDX + Shiki (blog e projetos)
- GitHub Actions + Vercel (CI/CD)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) — você será redirecionado para `/pt`.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos |

## Estrutura de conteúdo

```
content/
├── blog/
│   ├── README.md    # Guia para publicar estudos
│   ├── pt/
│   └── en/
├── projects/
│   ├── README.md    # Guia para adicionar projetos
│   └── *.mdx
└── site/
    ├── about.pt.json
    ├── about.en.json
    └── blog.json    # Status do blog (em construção)
```

## Guias de conteúdo

| Guia | Descrição |
|------|-----------|
| [content/projects/README.md](content/projects/README.md) | Como adicionar, editar e remover projetos |
| [content/blog/README.md](content/blog/README.md) | Como publicar estudos no blog |

## Personalização

- **Sobre você:** `content/site/about.pt.json` e `about.en.json`
- **Blog em construção:** `content/site/blog.json` (`underConstruction: true/false`)
- **Traduções da UI:** `src/i18n/messages/pt.json` e `en.json`
- **URL base (SEO):** `metadataBase` em `src/app/layout.tsx`

## Licença

Projeto pessoal — uso livre para referência.

# Fase 7 — CI/CD e deploy

## GitHub Actions

Workflow em `.github/workflows/ci.yml`:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Dispara em push e pull request para `main`.

## Vercel

1. Login em [vercel.com](https://vercel.com) com GitHub
2. Importar `mateusaledev/mk-portifolio`
3. Framework: Next.js (auto-detectado)
4. Branch de produção: `main`

Cada merge em `main` publica automaticamente. PRs geram preview deployments.

## Separação de responsabilidades

- **GitHub Actions:** qualidade (lint, types, build)
- **Vercel:** hospedagem e deploy

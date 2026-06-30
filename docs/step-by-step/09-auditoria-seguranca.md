# Auditoria de segurança e testes

Auditoria completa de segurança realizada em jun/2026, com correções e suite de testes automatizados.

## Contexto do projeto

Site estático Next.js 15 (portfólio + blog MDX). **Sem** banco de dados, API routes, autenticação ou formulários. Superfície de ataque reduzida, mas com vetores em path traversal, headers HTTP e dependências.

## Arquivos criados/modificados

| Arquivo | Função |
|---------|--------|
| `src/lib/security.ts` | Validação de slugs, path traversal, URLs externas e headers HTTP |
| `src/lib/security.test.ts` | Testes automatizados de segurança |
| `src/lib/content.ts` | `getBlogPost` usa validação de slug + path seguro |
| `next.config.ts` | Headers de segurança (CSP, HSTS, X-Frame-Options, etc.) |
| `vitest.config.ts` | Configuração do Vitest |
| `.env.example` | Documenta que não há env vars necessárias |
| `.gitignore` | Adicionado `.cursor/`, `.vscode/`, `Thumbs.db` |
| `.github/workflows/ci.yml` | `npm audit` + `test:security` no pipeline |

## Validações realizadas

### SQL Injection
**N/A** — projeto não usa banco de dados nem queries SQL. Testes confirmam que payloads SQL são tratados como strings opacas e rejeitados pela validação de slug.

### Path Traversal (pentest simulado)
**Corrigido** — `getBlogPost` interpolava o slug da URL diretamente no path do arquivo.

Mitigações:
1. `isValidSlug()` — aceita apenas `[a-z0-9-]+`
2. `resolvePathWithinBase()` — garante que o path resolvido permanece no diretório base
3. `dynamicParams = false` — bloqueia renderização on-demand de slugs não previstos

### XSS via URLs externas
**Mitigado** — `isSafeExternalUrl()` bloqueia `javascript:`, `data:`, `vbscript:`. Função disponível para validação futura de links em frontmatter.

### Inspeção de navegador / headers
**Implementado** — headers em todas as rotas:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`

### Secrets e .gitignore
- Nenhum `process.env` no código
- `.env*` ignorado corretamente
- **`docs/` NÃO deve ir para .gitignore** — é documentação intencional do projeto

### Dependências (npm audit)

| Pacote | Severidade | Risco real | Ação |
|--------|-----------|------------|------|
| next-mdx-remote | **6.0.0** (upgrade aplicado) | — | Corrige CVE de execução arbitrária em MDX |
| js-yaml 3.x (gray-matter) | Moderada | Baixo — frontmatter autor-controlled | Aguardar gray-matter |
| postcss (via next) | Moderada | Baixo — transitive | ~~Aguardar next~~ **override `^8.5.10` em package.json** |

CI roda `npm audit --audit-level=high` — após upgrade para v6, não há mais vulnerabilidades **high**.

### PostCSS XSS (GHSA-qx2v-qp2m-jg93)

**Corrigido** — Next.js embute `postcss@8.4.31` como dependência transitiva. Override em `package.json` força `postcss >= 8.5.10` em toda a árvore.

**Risco real neste projeto:** muito baixo — PostCSS roda só no build (Tailwind), não processa CSS de usuários. O override silencia o Dependabot e mantém boas práticas de supply chain.

**Não use** `npm audit fix --force` — pode fazer downgrade do Next.js para 9.x.

## Proteção de branch (GitHub)

Configuração manual: **Settings → Branches → Add rule** (ou **Add branch ruleset**):

1. **Branch name pattern:** `main`
2. **Require a pull request before merging**
3. **Require status checks to pass** — selecione o job `quality` do CI (`.github/workflows/ci.yml`)
4. **Require branches to be up to date** (opcional, recomendado)

Para repos pessoais, PR obrigatório + CI verde já cobre a maior parte do valor.

## Como executar os testes

```bash
npm run test:security   # apenas testes de segurança
npm run test            # todos os testes
npm run audit           # npm audit (falha em high+)
```

## Checklist manual (pentest no navegador)

1. DevTools → Network → verificar headers de resposta em `/pt`
2. Tentar `/pt/blog/../projects/mk-portifolio` → deve retornar 404
3. Tentar `/pt/blog/' OR '1'='1` → 404
4. Verificar que posts com `published: false` não aparecem na listagem nem por URL
5. Inspecionar links externos — devem usar `rel="noreferrer"`

## Decisões arquiteturais

- Vitest escolhido por simplicidade (sem browser/e2e) — testes focados em lógica de segurança server-side
- CSP inclui `'unsafe-inline'` e `'unsafe-eval'` para compatibilidade com Next.js hydration
- Projetos já eram seguros (lookup por array); blog era o vetor principal

## Próximos passos opcionais

1. ~~Upgrade `next-mdx-remote` para v6~~ — **concluído** (v6.0.0 + `transpilePackages` no next.config)
2. Playwright e2e para validar headers em build de produção
3. ~~Dependabot no GitHub para alertas automáticos~~ — **ativado**
4. Validar `githubUrl`/`liveUrl` com `isSafeExternalUrl` no carregamento de projetos
5. ~~Override PostCSS >= 8.5.10~~ — **concluído**
6. Proteção de branch em `main` — configurar no GitHub (ver seção acima)

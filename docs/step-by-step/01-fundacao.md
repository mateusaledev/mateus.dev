# Fase 1 — Fundação do projeto

## O que foi feito

- Inicialização do Next.js 15 com TypeScript, Tailwind CSS v4 e App Router
- Configuração do `next-intl` com locales `pt` e `en`
- Middleware de redirecionamento e roteamento por prefixo de idioma
- `next-themes` para dark mode (sistema + toggle manual)
- Estrutura base em `src/app/[locale]/`

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `src/middleware.ts` | Redireciona e resolve locale |
| `src/i18n/routing.ts` | Define locales e locale padrão |
| `src/i18n/request.ts` | Carrega mensagens por locale |
| `src/i18n/messages/*.json` | Traduções da interface |
| `src/components/providers/ThemeProvider.tsx` | Provider de tema |

## Decisão arquitetural

Rotas sempre prefixadas (`/pt`, `/en`) para SEO claro e URLs previsíveis em site bilíngue.

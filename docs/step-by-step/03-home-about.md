# Fase 3 — Home e About

## O que foi feito

- Página inicial com hero, CTAs, projetos em destaque e últimos posts
- Página About com bio, experiência, skills e links sociais
- Conteúdo externalizado em `content/site/about.pt.json` e `about.en.json`

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `src/app/[locale]/page.tsx` | Home |
| `src/app/[locale]/about/page.tsx` | Sobre |
| `content/site/about.*.json` | Dados editáveis sem alterar código |

## Decisão arquitetural

JSON para dados estruturados do About; componentes apenas renderizam.

# Fase 2 — Design system

## O que foi feito

- Tokens de cor em `src/app/globals.css` (paleta neutra estilo Apple)
- Tipografia com Geist Sans e Geist Mono via `next/font`
- Componentes base: `Button`, `Card`, `Tag`, `Section`
- Layout: `Header`, `Footer`, `ThemeToggle`, `LanguageSwitcher`
- Animações sutis (`fade-in`) e containers `container-narrow` / `container-wide`

## Princípios visuais

- Muito espaço em branco
- Monospace em tags e detalhes técnicos
- Bordas suaves (`rounded-2xl`) e sombras leves
- Dark mode com variáveis CSS

## Arquivos principais

| Arquivo | Função |
|---------|--------|
| `src/app/globals.css` | Tokens e utilitários globais |
| `src/components/ui/*` | Componentes reutilizáveis |
| `src/components/layout/*` | Header, footer e controles |

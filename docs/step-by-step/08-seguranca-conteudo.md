# Segurança e privacidade do conteúdo

Revisão realizada para evitar vazamento de informações sensíveis no repositório e no site público.

## O que foi verificado

| Item | Status |
|------|--------|
| Arquivos `.env` versionados | Nenhum encontrado (`.gitignore` cobre `.env*`) |
| API keys, tokens, senhas no código | Nenhum encontrado |
| Posts de blog não publicados acessíveis por URL | Corrigido — `getBlogPost` retorna `undefined` se `published: false` |
| Posts de exemplo exibidos como conteúdo real | Corrigido — `published: false` + blog em construção |

## Dados públicos intencionais

Estes dados aparecem no site **por escolha** (página Sobre e contato):

- Nome e trajetória profissional
- Links GitHub e LinkedIn
- E-mail de contato (`content/site/about.*.json`)

O e-mail de contato público é `m.alexandresilva22@gmail.com` (definido em `content/site/about.pt.json` e `about.en.json`).

## Boas práticas ao editar conteúdo

1. **Não** coloque em MDX/JSON: senhas, tokens, connection strings, URLs de staging interno
2. Use `published: false` para rascunhos de blog
3. Mantenha secrets apenas em variáveis de ambiente locais (`.env.local` — nunca no Git)
4. Revise o diff antes de cada push

## Blog em construção

Configuração em `content/site/blog.json`:

```json
{ "underConstruction": true }
```

Para lançar o blog: publique posts com `published: true` e defina `underConstruction: false`.

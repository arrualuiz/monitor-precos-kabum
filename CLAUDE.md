# CLAUDE.md

Contexto para o Claude Code trabalhar neste repositório. Leia o README.md para a visão completa.

## O que é

Monitor de preços da Kabum em Google Sheets + Apps Script. Todo o código está em `src/Code.js` (runtime V8, sem dependências npm). A pasta `src/` é sincronizada com o projeto online via `clasp`.

- Planilha: `1hgSeSzOpBzxyJji-S2GPG8xECaZlpr0RlBsaCNQrLZE`
- Script ID: `1JfvpYn5MYRqB1KsGl_H5-a4Sa9ymnLSJ2POCu7XLLWOk0PktiEZ7QLP_` (em `.clasp.json`)
- Usuário: Luiz. Escreva mensagens, comentários e textos da planilha em português.

## Comandos

```bash
node --check src/Code.js   # checagem de sintaxe (sempre antes de push)
clasp pull                 # baixa o código online (faça antes de editar)
clasp push                 # envia src/ para o Apps Script (sobrescreve o online)
clasp open                 # abre o editor online
```

Não existe teste automatizado. Para validar o parser, rode `testarParserKabum()` no editor online (só loga, não grava na planilha).

## Regras

- **Nunca execute nem sugira executar `setupMonitor()`**: apaga todas as abas. Ela tem a trava `CONFIRMAR_RESET_TOTAL = false`; não remova a trava.
- Pergunte ao Luiz antes de `clasp push` e antes de pedir para ele rodar `coletarAgora()` (cada execução grava 15 linhas em três abas).
- Não mude a **ordem das colunas** das abas `Coletas_Brutas`, `Coletas_Fatiadas`, `Historico` ou `Produtos` sem escrever uma função de migração: o código grava e lê por posição (ex.: `r[6]` = `preco_pix` no Historico). Colunas novas vão sempre no fim.
- `Acompanhamento` e `Dashboard` são recriadas pelo script a cada coleta: mudanças manuais nelas se perdem. Altere o código (`atualizarAcompanhamento`, `atualizarDashboard`).
- Toda linha nova passa por `append_()` (cresce a aba e aplica o formato de data/hora). Logs por `log_()`.
- O status de cada coleta vem de `avaliarColeta_()`; preço "suspeito" = abaixo de `LIMITE_PRECO_SUSPEITO` × `preco_maximo` (normalmente o valor da parcela).
- Estilo do código: ES2019 compatível com Apps Script V8, `const`/arrow functions, funções privadas terminam com `_`, comentários sem acento.
- Datas: fuso `America/Sao_Paulo`, formato `dd/MM/yyyy HH:mm:ss` (`DATETIME_FORMAT`).
- Depois de uma mudança relevante, atualize o `CHANGELOG.md` e, se mudar comportamento, o `README.md`.

## Mapa do código (`src/Code.js`)

| Área | Funções |
|---|---|
| Coleta | `coletarAgora`, `collectProduct_`, `avaliarColeta_` |
| Parser Kabum | `parseKabum_`, `extractKabumPrices_` (`__NEXT_DATA__`), `extractLdJsonPrice_`, `stripHtml_`, `findPrices_`, `parsePrice_` |
| Abas calculadas | `atualizarAcompanhamento`, `atualizarDashboard` |
| Histórico/preço | `getLastPrice_`, `getMinPrice_`, `precoValido_`, `getStatusPrice_`, `round2_`, `fmtBRL_` |
| Infra | `append_`, `log_`, `formatSheet_`, `resetSheet_`, `simpleHash_` |
| Gatilhos | `criarGatilhoDiario23h`, `criarGatilhoCada6Horas` (na prática, diário) |
| Manutenção | `testarParserKabum`, `migrarColetasBrutasV2`, `setupMonitor` (bloqueada) |

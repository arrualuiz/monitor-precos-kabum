# Changelog

## v3 – 29/09/2026

- `data_hora` com hora (`dd/MM/yyyy HH:mm:ss`) em Coletas_Brutas, Coletas_Fatiadas, Historico e Logs.
- Coletas_Brutas: nova coluna `status_coleta` (OK/ERRO) e motivo na coluna `erro`. As 480 coletas antigas foram avaliadas retroativamente por `migrarColetasBrutasV2()`: 247 OK, 233 ERRO (quase todas com o valor da parcela no lugar do PIX).
- `avaliarColeta_()`: HTTP ≠ 200, preço não encontrado ou preço suspeito (< 50% do `preco_maximo`) viram ERRO. O Historico grava `status_preco = ERRO` nesses casos, e não mais `OK`/`COMPRAR` com preço errado.
- Exceções numa coleta também geram linha em Coletas_Brutas (status ERRO).
- Logs: `INFO` no início e no fim de cada coleta (com contagem OK/ERRO e duração) e `AVISO` por produto com erro.
- Dashboard reescrito (`atualizarDashboard()`): situação do gatilho, última coleta, OK/ERRO da última execução e dos últimos 7 dias, produtos que subiram/caíram, COMPRAR, CARO e sem preço. Saíram "Melhor preco monitorado" (misturava produtos e pegava o valor da parcela) e as fórmulas antigas.
- `Produtos.ultima_coleta` passa a ser preenchida.
- `append_()` cria linhas quando a aba chega ao limite (antes quebraria ao passar da linha 1000, por volta de novembro/2026).
- Config atualizada com a frequência real (diária ~23h) e o parser novo.

## v2 – 29/09/2026

- Parser da Kabum lê o preço do JSON `__NEXT_DATA__` (`prices.priceWithDiscount`), depois JSON-LD e depois `<h4>`. Saiu o fallback "segundo R$ da página", que desde ~09/09 gravava o valor da parcela.
- `preco_de` passa a ser o preço normal (`prices.price`) e `desconto_pix` o percentual informado pela Kabum.
- Aba Acompanhamento reescrita em JS (a fórmula QUERY dava `#VALUE!`): preço atual × anterior, variação R$/%, tendência ▲/▼/→, última mudança, mínimo, máximo, média das 7 últimas, cores, e descarte de preços suspeitos.
- `getLastPrice_`/`getMinPrice_` ignoram preços suspeitos; variação não é calculada quando a coleta falha.
- Trava `CONFIRMAR_RESET_TOTAL` no `setupMonitor()` depois de uma execução acidental (dados restaurados pelo histórico de versões da planilha).
- Nova função `testarParserKabum()` (só loga).

## v1 – 29/08/2026

- Versão inicial: 15 produtos (GPUs e kits) da Kabum, coleta diária às 23h, abas Config, Produtos, Coletas_Brutas, Coletas_Fatiadas, Historico, Acompanhamento, Dashboard e Logs.

/**
 * AcompanhaPrecos — Buscas filtradas (v1: Mercado Livre)
 *
 * Acompanha TODOS os produtos de uma listagem filtrada (ex.: monitores 24–27", 120–200 Hz),
 * em vez de um produto específico.
 *
 * Como usar:
 *   1. Crie um arquivo novo no projeto do Apps Script (ex.: "BuscasFiltradas") e cole este código.
 *   2. Rode configurarBuscas()  → cria as abas "Buscas" e "Histórico Buscas".
 *   3. Rode testarML()          → confere se o Mercado Livre responde e se o parser acha os produtos.
 *   4. Rode coletarBuscas()     → faz a coleta e monta a aba "Resumo Buscas".
 *   5. Rode criarGatilhoDiario() → agenda a coleta todo dia às 8h.
 */

const BUSCAS_CFG = {
  abaBuscas: 'Buscas',
  abaHistorico: 'Histórico Buscas',
  abaResumo: 'Resumo Buscas',
  paginasPadrao: 3,   // o ML mostra 48 itens por página
  pausaMs: 1500,      // pausa entre páginas, para não ser bloqueado
  horaGatilho: 8,
};

const HIST_CABECALHO = ['Data', 'Busca', 'Loja', 'ID', 'Título', 'Preço', 'Preço antigo',
  'Tamanho (")', 'Hz', 'Patrocinado', 'Link'];

const URL_ML_PADRAO = 'https://lista.mercadolivre.com.br/_OrderId_PRICE_Container_lpinfomonitores_DISPLAY*SIZE_24%22-27%22_MAX*REFRESH*RATE_120Hz-200Hz_NoIndex_True';

/* ───────────────────────── Configuração ───────────────────────── */

function configurarBuscas() {
  const ss = SpreadsheetApp.getActive();

  let sh = ss.getSheetByName(BUSCAS_CFG.abaBuscas);
  if (!sh) {
    sh = ss.insertSheet(BUSCAS_CFG.abaBuscas);
    sh.getRange(1, 1, 1, 5).setValues([['Nome', 'Loja', 'URL', 'Ativo', 'Páginas']]).setFontWeight('bold');
    sh.getRange(2, 1, 1, 5).setValues([['Monitores 24-27" 120-200Hz', 'Mercado Livre', URL_ML_PADRAO, true, 3]]);
    sh.getRange('D2:D50').insertCheckboxes();
    sh.getRange('D2').setValue(true);
    sh.setFrozenRows(1);
  }

  let hist = ss.getSheetByName(BUSCAS_CFG.abaHistorico);
  if (!hist) {
    hist = ss.insertSheet(BUSCAS_CFG.abaHistorico);
    hist.getRange(1, 1, 1, HIST_CABECALHO.length).setValues([HIST_CABECALHO]).setFontWeight('bold');
    hist.setFrozenRows(1);
  }
}

function criarGatilhoDiario() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'coletarBuscas')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('coletarBuscas').timeBased().everyDays(1).atHour(BUSCAS_CFG.horaGatilho).create();
  console.log(`Gatilho criado: coletarBuscas todo dia por volta das ${BUSCAS_CFG.horaGatilho}h.`);
}

/* ───────────────────────── Coleta ───────────────────────── */

function coletarBuscas() {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(BUSCAS_CFG.abaBuscas);
  if (!sh) throw new Error('Rode configurarBuscas() primeiro.');

  const agora = new Date();
  const saida = [];

  sh.getDataRange().getValues().slice(1).forEach(([nome, loja, url, ativo, paginas]) => {
    if (ativo !== true || !url) return;
    const lojaN = String(loja).toLowerCase();
    let itens;
    try {
      if (lojaN.includes('mercado')) {
        itens = buscarML_(String(url), Number(paginas) || BUSCAS_CFG.paginasPadrao);
      } else {
        console.warn(`Loja ainda não suportada: ${loja}`);
        return;
      }
    } catch (e) {
      console.error(`${nome}: ${e.message}`);
      return;
    }
    console.log(`${nome}: ${itens.length} itens`);
    itens.forEach(it => saida.push([
      agora, nome, loja, it.id, it.titulo, it.preco, it.precoAntigo || '',
      it.tamanho || '', it.hz || '', it.patrocinado, it.link,
    ]));
  });

  if (!saida.length) {
    console.warn('Nada coletado — rode testarML() para ver o que a loja devolveu.');
    return;
  }

  const hist = ss.getSheetByName(BUSCAS_CFG.abaHistorico);
  hist.getRange(hist.getLastRow() + 1, 1, saida.length, HIST_CABECALHO.length).setValues(saida);
  atualizarResumo_(saida);
}

/* ───────────────────────── Mercado Livre ───────────────────────── */

function buscarML_(url, paginas) {
  const vistos = new Set();
  const itens = [];
  for (let p = 0; p < paginas; p++) {
    const html = baixar_(urlPaginaML_(url, p * 48 + 1));
    const novos = parseML_(html).filter(it => {
      if (vistos.has(it.id)) return false;   // anúncios patrocinados repetem produtos
      vistos.add(it.id);
      return true;
    });
    if (!novos.length) break;
    itens.push(...novos);
    Utilities.sleep(BUSCAS_CFG.pausaMs);
  }
  return itens;
}

function urlPaginaML_(url, desde) {
  if (desde <= 1) return url;
  return url.includes('_NoIndex_True')
    ? url.replace('_NoIndex_True', `_Desde_${desde}_NoIndex_True`)
    : `${url}_Desde_${desde}`;
}

function parseML_(html) {
  const blocos = html.split(/<li[^>]+class="[^"]*ui-search-layout__item/).slice(1);
  const itens = [];

  blocos.forEach(b => {
    const titulo = limparTexto_(
      (b.match(/poly-component__title[^"]*"[^>]*>([\s\S]*?)<\/(?:a|h[23])>/) ||
       b.match(/ui-search-item__title[^"]*"[^>]*>([\s\S]*?)<\/h[23]>/) || [])[1]
    );

    let link = (b.match(/href="(https:\/\/[^"]*mercadolivre\.com\.br[^"]*)"/) || [])[1] || '';
    link = link.replace(/&amp;/g, '&').split('#')[0];

    const idMatch = b.match(/MLB-?(\d{6,})/);
    const id = idMatch ? `MLB${idMatch[1]}` : link;

    // Preço atual: só o trecho de "poly-price__current", para não pegar parcela nem preço riscado
    const iCur = b.indexOf('poly-price__current');
    const trechoAtual = iCur >= 0
      ? b.slice(iCur, b.indexOf('</div>', iCur))
      : b.replace(/<s[^>]*andes-money-amount--previous[\s\S]*?<\/s>/g, '');
    const preco = precoDe_(trechoAtual);

    const trechoAntigo = (b.match(/andes-money-amount--previous[\s\S]*?<\/s>/) || [])[0];
    const precoAntigo = precoDe_(trechoAntigo);

    if (!titulo || preco == null) return;
    itens.push({
      id, titulo, preco, precoAntigo, link,
      patrocinado: /Patrocinado/i.test(b),
      ...extrairSpecs_(titulo),
    });
  });

  return itens;
}

/* ───────────────────────── Resumo ───────────────────────── */

function atualizarResumo_(rodada) {
  const ss = SpreadsheetApp.getActive();
  const hist = ss.getSheetByName(BUSCAS_CFG.abaHistorico).getDataRange().getValues().slice(1);
  const chave = r => `${r[1]}|${r[7]}|${r[8]}`;   // busca | tamanho | Hz

  // Menor preço já registrado para cada combinação (inclui a coleta de agora)
  const minHist = {};
  hist.forEach(r => {
    if (typeof r[5] !== 'number') return;
    const k = chave(r);
    if (!(k in minHist) || r[5] < minHist[k]) minHist[k] = r[5];
  });

  // Mais barato de hoje para cada combinação tamanho × Hz
  const melhor = {};
  rodada.forEach(r => {
    if (r[7] === '' || r[8] === '') return;   // título sem tamanho ou Hz identificável
    const k = chave(r);
    if (!melhor[k] || r[5] < melhor[k][5]) melhor[k] = r;
  });

  const linhas = Object.values(melhor)
    .sort((a, b) => a[7] - b[7] || a[8] - b[8])
    .map(r => {
      const min = minHist[chave(r)];
      return [r[1], r[7], r[8], r[5], min, r[5] <= min ? 'MENOR PREÇO' : '', r[4], r[2], r[10]];
    });

  const sh = ss.getSheetByName(BUSCAS_CFG.abaResumo) || ss.insertSheet(BUSCAS_CFG.abaResumo);
  sh.clearContents();
  sh.getRange(1, 1, 1, 9)
    .setValues([['Busca', 'Tamanho (")', 'Hz', 'Preço hoje', 'Menor já visto', 'Status', 'Produto', 'Loja', 'Link']])
    .setFontWeight('bold');
  if (linhas.length) {
    sh.getRange(2, 1, linhas.length, 9).setValues(linhas);
    sh.getRange(2, 4, linhas.length, 2).setNumberFormat('R$ #,##0.00');
  }
  sh.setFrozenRows(1);
  sh.getRange('A1').setNote(`Atualizado em ${new Date().toLocaleString('pt-BR')}`);
}

/* ───────────────────────── Utilitários ───────────────────────── */

function baixar_(url) {
  const resp = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
      'Accept-Language': 'pt-BR,pt;q=0.9',
    },
  });
  const code = resp.getResponseCode();
  if (code !== 200) throw new Error(`HTTP ${code} em ${url}`);
  return resp.getContentText();
}

function precoDe_(trecho) {
  if (!trecho) return null;
  const f = trecho.match(/andes-money-amount__fraction[^>]*>([\d.]+)</);
  if (!f) return null;
  const c = trecho.match(/andes-money-amount__cents[^>]*>(\d+)</);
  return Number(f[1].replace(/\./g, '')) + (c ? Number(c[1]) / 100 : 0);
}

function extrairSpecs_(titulo) {
  const tam = titulo.match(/(\d{2}(?:[.,]\d)?)\s*(?:"|''|”|pol\b|polegadas)/i);
  const hz = titulo.match(/(\d{2,3})\s*hz/i);
  return {
    tamanho: tam ? Number(tam[1].replace(',', '.')) : null,
    hz: hz ? Number(hz[1]) : null,
  };
}

function limparTexto_(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, ' ')
    .replace(/&quot;|&#34;|&#x22;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ───────────────────────── Diagnóstico ───────────────────────── */

function testarML() {
  const resp = UrlFetchApp.fetch(URL_ML_PADRAO, {
    muteHttpExceptions: true,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0', 'Accept-Language': 'pt-BR' },
  });
  const html = resp.getContentText();
  console.log(`HTTP ${resp.getResponseCode()} | ${html.length} caracteres`);
  console.log(`<title>: ${(html.match(/<title>([^<]*)/) || [])[1]}`);
  console.log(`Blocos de produto encontrados: ${html.split(/<li[^>]+class="[^"]*ui-search-layout__item/).length - 1}`);

  const itens = parseML_(html);
  console.log(`Itens com título e preço: ${itens.length}`);
  itens.slice(0, 5).forEach(it =>
    console.log(`R$ ${it.preco} | ${it.tamanho}" | ${it.hz} Hz | ${it.patrocinado ? '[ad] ' : ''}${it.titulo}`));

  if (!itens.length) console.log('Trecho do HTML para análise:\n' + html.slice(0, 1500));
}

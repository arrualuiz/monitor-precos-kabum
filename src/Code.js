const SPREADSHEET_ID = '1hgSeSzOpBzxyJji-S2GPG8xECaZlpr0RlBsaCNQrLZE';
const TIMEZONE = 'America/Sao_Paulo';

const PRODUCTS = [
  ['GPU-001', 'Placa De Video Husky Alpha RX 580', 'Placa de video', 'RX 580 8GB', 'Kabum', 'https://www.kabum.com.br/produto/692461/placa-de-video-husky-alpha-rx-580-amd-8gb-gddr5-256-bit-hdmi-dvi-displayport-hvg580', '', 929.99, 'Media'],
  ['GPU-002', 'Placa De Video Vinik RX 580', 'Placa de video', 'RX 580 8GB', 'Kabum', 'https://www.kabum.com.br/produto/1056509/gpu-rx-580-8gb-gddr5-256-bits-dual-fan-vinik-gpuvk580v28gb2f', '', 890.38, 'Media'],
  ['GPU-003', 'Placa de Video Gamer Delta RX580', 'Placa de video', 'RX 580 8GB', 'Kabum', 'https://www.kabum.com.br/produto/678225/placa-de-video-gamer-delta-rx580-8gb-256bits-dvi-hdmi-dp-deltarx580', '', 844.79, 'Media'],
  ['KIT-001', 'Kit Ryzen 5 5600GT + MSI A520M-A PRO', 'Kit upgrade', 'Ryzen 5 5600GT kit', 'Kabum', 'https://www.kabum.com.br/produto/1003964/kit-upgrade-amd-ryzen-5-5600gt-placa-mae-msi-a520m-a-pro', '', 1189.99, 'Media'],
  ['KIT-002', 'Kit B550M Aorus Elite + Ryzen 7 5700X', 'Kit upgrade', 'Ryzen 7 5700X kit', 'Kabum', 'https://www.kabum.com.br/produto/1036587/kit-placa-mae-gigabyte-b550m-aorus-elite-am4-processador-amd-ryzen-7-5700x', '', 1899.99, 'Media'],
  ['KIT-003', 'Kit Intel Core I5 7a Geracao', 'Kit upgrade', 'Core i5 7a geracao kit', 'Kabum', 'https://www.kabum.com.br/produto/577368/kit-upgrade-intel-core-i5-7-geracao-8gb-ram-ssd-240gb-conexoes-usb-vga-hdmi-lan-som', '', 1257.68, 'Baixa'],
  ['KIT-004', 'Kit Ryzen 7 5700x + B550m Aorus Elite', 'Kit upgrade', 'Ryzen 7 5700X kit', 'Kabum', 'https://www.kabum.com.br/produto/751959/kit-upgrade-amd-ryzen-7-5700x-placa-mae-gigabyte-b550m-aorus-elite-', '', 2954.43, 'Baixa'],
  ['KIT-005', 'Kit Ryzen 5 5600gt + Asus Tuf B550m-plus', 'Kit upgrade', 'Ryzen 5 5600GT kit', 'Kabum', 'https://www.kabum.com.br/produto/727052/kit-upgrade-amd-ryzen-5-5600gt-placa-mae-asus-tuf-gaming-b550m-plus-am4', '', 2336.84, 'Baixa'],
  ['KIT-006', 'Kit Ryzen 5 5600gt + A520m + 16GB', 'Kit upgrade', 'Ryzen 5 5600GT kit', 'Kabum', 'https://www.kabum.com.br/produto/703207/kit-upgrade-amd-ryzen-5-5600gt-placa-mae-a520m-ddr4-memoria-ram-16gb-3200mhz', '', 3211.00, 'Baixa'],
  ['GPU-004', 'Asus RTX 3050 OC Dual 6GB', 'Placa de video', 'RTX 3050 6GB', 'Kabum', 'https://www.kabum.com.br/produto/577171/placa-de-video-asus-rtx-3050-oc-dual-nvidia-geforce-6gb-gddr6-96-bits-dual-rtx3050-6g', '', 1461.98, 'Media'],
  ['GPU-005', 'MSI RTX 3050 Ventus OC 2X 6GB', 'Placa de video', 'RTX 3050 6GB', 'Kabum', 'https://www.kabum.com.br/produto/997881/placa-de-video-msi-geforce-rtx-3050-ventus-oc-2x-6gb-gddr6-96-bit-912-v812-060', '', 1399.99, 'Media'],
  ['GPU-006', 'MSI RTX 3050 Ventus 2X OC 6GB', 'Placa de video', 'RTX 3050 6GB', 'Kabum', 'https://www.kabum.com.br/produto/1003726/placa-de-video-msi-rtx-3050-ventus-2x-oc-nvidia-geforce-6gb-gddr6-96-bit-g3050v2x6c', '', 1429.99, 'Media'],
  ['GPU-007', 'RX 7600 Challenger ASRock 8GB', 'Placa de video', 'RX 7600 8GB', 'Kabum', 'https://www.kabum.com.br/produto/459144/placa-de-video-rx-7600-challenger-asrock-amd-radeon-8gb-gddr6-90-ga41zz-00uanf', '', 1819.99, 'Alta'],
  ['GPU-008', 'RX 7600 Gaming OC Gigabyte 8GB', 'Placa de video', 'RX 7600 8GB', 'Kabum', 'https://www.kabum.com.br/produto/475647/placa-de-video-rx-7600-gaming-oc-8g-amd-radeon-gigabyte-8gb-gddr6-128bits-rgb-gv-r76gaming-oc-8gd', '', 1999.99, 'Alta'],
  ['GPU-009', 'Vinik RX 5600 6GB', 'Placa de video', 'RX 5600 6GB', 'Kabum', 'https://www.kabum.com.br/produto/1029133/placa-de-video-gpu-amd-radeon-rx-5600-6gb-192bits-gddr6-dual-fan-gpuvk56006gb2f', '', 1139.99, 'Media']
];

function setupMonitor() {
  // PROTECAO: esta funcao APAGA todas as abas (inclusive Historico e coletas) e recria a planilha do zero.
  // So mude para true se quiser mesmo resetar tudo; depois volte para false.
  const CONFIRMAR_RESET_TOTAL = false;
  if (!CONFIRMAR_RESET_TOTAL) {
    throw new Error('setupMonitor() apaga todos os dados. Mude CONFIRMAR_RESET_TOTAL para true se quiser mesmo recriar a planilha.');
  }
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const keepNames = ['Config', 'Produtos', 'Coletas_Brutas', 'Coletas_Fatiadas', 'Historico', 'Acompanhamento', 'Dashboard', 'Logs'];
  ss.getSheets().forEach(sheet => {
    if (!keepNames.includes(sheet.getName()) && ss.getSheets().length > 1) {
      ss.deleteSheet(sheet);
    }
  });
  const sheets = {
    config: resetSheet_(ss, 'Config'),
    products: resetSheet_(ss, 'Produtos'),
    raw: resetSheet_(ss, 'Coletas_Brutas'),
    parsed: resetSheet_(ss, 'Coletas_Fatiadas'),
    history: resetSheet_(ss, 'Historico'),
    follow: resetSheet_(ss, 'Acompanhamento'),
    dash: resetSheet_(ss, 'Dashboard'),
    logs: resetSheet_(ss, 'Logs')
  };

  sheets.config.getRange(1, 1, 7, 2).setValues([
    ['Chave', 'Valor'],
    ['timezone', TIMEZONE],
    ['frequencia_sugerida', 'Diariamente perto das 23h'],
    ['lojas_ativas', 'Kabum'],
    ['parser_kabum', 'preco_pix=h4; preco_de=primeiro R$; desconto=texto PIX; parcelamento=10x R$'],
    ['ultima_configuracao', new Date()],
    ['observacao', 'Screenshots exigem automacao externa; Apps Script faz coleta textual.']
  ]);

  sheets.products.getRange(1, 1, 1, 13).setValues([[
    'id', 'ativo', 'nome', 'categoria', 'gpu_tipo', 'loja', 'url', 'preco_alvo',
    'preco_maximo', 'prioridade', 'selector_preco_pix', 'observacoes', 'ultima_coleta'
  ]]);
  sheets.products.getRange(2, 1, PRODUCTS.length, 13).setValues(PRODUCTS.map(p => [
    p[0], true, p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], 'h4', 'Carga inicial 2026-08-29', ''
  ]));

  sheets.raw.getRange(1, 1, 1, 12).setValues([[
    'coleta_id', 'data_hora', 'id_produto', 'loja', 'url', 'status_http',
    'titulo_extraido', 'html_tamanho', 'texto_bruto_inicio', 'precos_detectados',
    'erro', 'hash_simples'
  ]]);

  sheets.parsed.getRange(1, 1, 1, 16).setValues([[
    'coleta_id', 'data_hora', 'id_produto', 'nome', 'loja', 'url', 'preco_de',
    'preco_pix', 'desconto_pix', 'parcelamento', 'preco_parcela', 'qtd_parcelas',
    'selector_usado', 'status_parse', 'confianca', 'observacoes'
  ]]);

  sheets.history.getRange(1, 1, 1, 15).setValues([[
    'data_hora', 'id_produto', 'nome', 'loja', 'url', 'preco_de', 'preco_pix',
    'preco_alvo', 'delta_alvo', 'variacao_ultima', 'menor_historico',
    'status_preco', 'desconto_pix', 'parcelamento', 'screenshot_url'
  ]]);

  sheets.follow.getRange(1, 1, 1, 13).setValues([[
    'id_produto', 'nome', 'loja', 'preco_atual', 'preco_anterior', 'variacao_abs',
    'variacao_pct', 'menor_preco', 'maior_preco', 'media_7_coletas',
    'status_preco', 'ultima_coleta', 'url'
  ]]);

  sheets.dash.getRange(1, 1, 8, 2).setValues([
    ['Indicador', 'Valor'],
    ['Produtos ativos', '=COUNTIF(Produtos!B:B;TRUE)'],
    ['Ultimas coletas', '=COUNTA(Historico!A:A)-1'],
    ['Melhor preco monitorado', '=MIN(Historico!G:G)'],
    ['Alertas COMPRAR', '=COUNTIF(Historico!L:L;"COMPRAR")'],
    ['Erros de coleta', '=COUNTIF(Coletas_Fatiadas!N:N;"ERRO")'],
    ['Ultima atualizacao', '=MAX(Historico!A:A)'],
    ['Proxima etapa', 'Criar graficos e cards depois de algumas coletas']
  ]);

  sheets.logs.getRange(1, 1, 1, 6).setValues([['data_hora', 'nivel', 'funcao', 'id_produto', 'mensagem', 'detalhe']]);
  Object.values(sheets).forEach(formatSheet_);
}

function coletarAgora() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const productsSheet = ss.getSheetByName('Produtos');
  const values = productsSheet.getDataRange().getValues();
  const headers = values.shift();
  const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
  const active = values.filter(r => r[idx.ativo] === true && r[idx.url]);
  active.forEach(row => collectProduct_(ss, row, idx));
  atualizarAcompanhamento();
}

function collectProduct_(ss, row, idx) {
  const now = new Date();
  const coletaId = Utilities.formatDate(now, TIMEZONE, 'yyyyMMdd-HHmmss') + '-' + row[idx.id];
  try {
    const response = UrlFetchApp.fetch(row[idx.url], {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {'User-Agent': 'Mozilla/5.0 MonitorPrecos/1.0'}
    });
    const status = response.getResponseCode();
    const html = response.getContentText();
    const parsed = parseKabum_(html, row[idx.url]);
    const rawText = stripHtml_(html).slice(0, 1500);
    const rawPrices = findPrices_(stripHtml_(html));

    append_(ss, 'Coletas_Brutas', [[coletaId, now, row[idx.id], row[idx.loja], row[idx.url], status, parsed.titulo, html.length, rawText, rawPrices.join(' | '), '', simpleHash_(html)]]);
    append_(ss, 'Coletas_Fatiadas', [[coletaId, now, row[idx.id], row[idx.nome], row[idx.loja], row[idx.url], parsed.precoDe, parsed.precoPix, parsed.descontoPix, parsed.parcelamento, parsed.precoParcela, parsed.qtdParcelas, parsed.selector, parsed.status, parsed.confianca, parsed.obs]]);

    const history = ss.getSheetByName('Historico');
    const refPrice = Number(row[idx.preco_maximo]) || 0;
    const temPreco = typeof parsed.precoPix === 'number' && parsed.precoPix > 0;
    const lastPrice = getLastPrice_(history, row[idx.id], refPrice);
    const minPrice = getMinPrice_(history, row[idx.id], temPreco ? parsed.precoPix : '', refPrice);
    const deltaAlvo = row[idx.preco_alvo] && temPreco ? round2_(parsed.precoPix - Number(row[idx.preco_alvo])) : '';
    const variation = lastPrice && temPreco ? round2_(parsed.precoPix - lastPrice) : '';
    const statusPreco = getStatusPrice_(parsed.precoPix, row[idx.preco_alvo], row[idx.preco_maximo], parsed.status);
    append_(ss, 'Historico', [[now, row[idx.id], row[idx.nome], row[idx.loja], row[idx.url], parsed.precoDe, parsed.precoPix, row[idx.preco_alvo], deltaAlvo, variation, minPrice, statusPreco, parsed.descontoPix, parsed.parcelamento, '']]);
  } catch (err) {
    append_(ss, 'Logs', [[now, 'ERRO', 'collectProduct_', row[idx.id], err.message, row[idx.url]]]);
  }
}

function parseKabum_(html, url) {
  const text = stripHtml_(html);
  const prices = findPrices_(text);
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/is) || html.match(/<title[^>]*>(.*?)<\/title>/is);
  const discountMatch = text.match(/(?:À|A) vista no PIX com \d+% de desconto/i);
  const installmentMatch = text.match(/\d+x\s*R\$\s*\d{1,3}(?:\.\d{3})*,\d{2}.{0,80}?(?:juros|NuPay|cart[aã]o)/i) || text.match(/\d+x\s*R\$\s*\d{1,3}(?:\.\d{3})*,\d{2}.{0,40}/i);
  const installmentText = installmentMatch ? installmentMatch[0].trim() : '';
  const installmentPrice = installmentText.match(/R\$\s*\d{1,3}(?:\.\d{3})*,\d{2}/);
  const installmentQty = installmentText.match(/(\d+)x/i);

  // Ordem de confianca do preco PIX:
  // 1) JSON do Next.js da Kabum: "prices":{"oldPrice","priceWithDiscount","price","discountPercentage"}
  // 2) JSON-LD (schema.org Product > offers.price)
  // 3) <h4> (layout antigo da pagina)
  // Nao usa mais o "segundo R$ da pagina" como fallback: era isso que gravava o valor da PARCELA como preco PIX.
  const next = extractKabumPrices_(html, url);
  const ldPrice = next ? '' : extractLdJsonPrice_(html);
  const h4Match = (next || ldPrice) ? null : html.match(/<h4[^>]*>(.*?)<\/h4>/is);
  const h4Price = h4Match ? parsePrice_(findPrices_(stripHtml_(h4Match[1]))[0]) : '';

  let precoPix = '', precoDe = '', selector = 'nenhum', confianca = 'Baixa';
  if (next) {
    precoPix = next.priceWithDiscount; precoDe = next.price; selector = 'next_data'; confianca = 'Alta';
  } else if (ldPrice) {
    precoPix = ldPrice; precoDe = parsePrice_(prices[0]); selector = 'ld_json'; confianca = 'Alta';
  } else if (h4Price) {
    precoPix = h4Price; precoDe = parsePrice_(prices[0]); selector = 'h4'; confianca = 'Media';
  }

  return {
    titulo: titleMatch ? stripHtml_(titleMatch[1]) : '',
    precoDe: precoDe,
    precoPix: precoPix,
    descontoPix: next && next.discountPercentage ? next.discountPercentage + '% de desconto no PIX' : (discountMatch ? discountMatch[0] : ''),
    parcelamento: installmentText,
    precoParcela: installmentPrice ? parsePrice_(installmentPrice[0]) : '',
    qtdParcelas: installmentQty ? Number(installmentQty[1]) : '',
    selector: selector,
    status: precoPix ? 'OK' : 'ERRO',
    confianca: confianca,
    obs: prices.slice(0, 8).join(' | ')
  };
}

function extractKabumPrices_(html, url) {
  const re = /"prices":\{([^{}]*)\}/g;
  const slug = String(url || '').split('?')[0].split('/').filter(String).pop() || '';
  const pos = slug ? html.indexOf('"friendlyName":"' + slug + '"') : -1;
  re.lastIndex = pos >= 0 ? pos : 0;
  let m = re.exec(html);
  if (!m && pos > 0) {
    re.lastIndex = 0;
    m = re.exec(html);
  }
  if (!m) return null;
  const bloco = m[1];
  const num = key => {
    const x = bloco.match(new RegExp('"' + key + '":(-?[\\d.]+)'));
    return x ? Number(x[1]) : 0;
  };
  const r = {
    oldPrice: num('oldPrice'),
    priceWithDiscount: num('priceWithDiscount'),
    price: num('price'),
    discountPercentage: num('discountPercentage')
  };
  return r.priceWithDiscount > 0 ? r : null;
}

function extractLdJsonPrice_(html) {
  const blocos = html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const b of blocos) {
    try {
      const json = JSON.parse(b.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, ''));
      const itens = [].concat(json['@graph'] || json);
      for (const it of itens) {
        if (it && it['@type'] === 'Product' && it.offers) {
          const oferta = [].concat(it.offers)[0];
          const p = Number(oferta.price || oferta.lowPrice);
          if (p > 0) return p;
        }
      }
    } catch (e) {
      // bloco JSON-LD invalido: ignora e tenta o proximo
    }
  }
  return '';
}

// Preco abaixo de 50% da referencia (preco_maximo da aba Produtos) e tratado como leitura errada
// (ex.: o scraper pegou o valor da parcela). Essas coletas sao ignoradas na aba Acompanhamento.
const LIMITE_PRECO_SUSPEITO = 0.5;

function atualizarAcompanhamento() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Acompanhamento');
  const prodValues = ss.getSheetByName('Produtos').getDataRange().getValues();
  const pHead = prodValues.shift();
  const p = Object.fromEntries(pHead.map((h, i) => [h, i]));
  const hist = ss.getSheetByName('Historico').getDataRange().getValues().slice(1);

  const header = [
    'id_produto', 'nome', 'loja', 'preco_atual', 'preco_anterior', 'variacao_abs', 'variacao_pct',
    'tendencia', 'ultima_mudanca', 'menor_preco', 'maior_preco', 'media_7_coletas', 'status_preco',
    'ultima_coleta_valida', 'coletas_ignoradas', 'url'
  ];

  const rows = prodValues.filter(r => r[p.id]).map(r => {
    const id = r[p.id];
    const ref = Number(r[p.preco_maximo]) || 0;
    const doProduto = hist.filter(h => h[1] === id);
    const validas = doProduto.filter(h => precoValido_(h[6], ref));
    const ignoradas = doProduto.length - validas.length;
    if (!validas.length) {
      return [id, r[p.nome], r[p.loja], '', '', '', '', 'Sem dados', '', '', '', '', 'ERRO', '', ignoradas, r[p.url]];
    }

    const precos = validas.map(h => h[6]);
    const atual = precos[precos.length - 1];
    const anterior = precos.length > 1 ? precos[precos.length - 2] : '';
    const varAbs = anterior === '' ? '' : round2_(atual - anterior);
    const varPct = anterior === '' ? '' : (atual - anterior) / anterior;
    let tendencia = 'Primeira coleta';
    if (anterior !== '') tendencia = varAbs > 0 ? '▲ Subiu' : varAbs < 0 ? '▼ Caiu' : '→ Igual';

    let ultimaMudanca = 'Sem mudança';
    for (let i = validas.length - 1; i > 0; i--) {
      const de = validas[i - 1][6];
      const para = validas[i][6];
      if (de !== para) {
        const dia = Utilities.formatDate(new Date(validas[i][0]), TIMEZONE, 'dd/MM');
        ultimaMudanca = (para > de ? '▲ ' : '▼ ') + dia + ': ' + fmtBRL_(de) + ' → ' + fmtBRL_(para);
        break;
      }
    }

    const ult7 = precos.slice(-7);
    const media7 = round2_(ult7.reduce((a, b) => a + b, 0) / ult7.length);
    const status = getStatusPrice_(atual, r[p.preco_alvo], r[p.preco_maximo], 'OK');
    return [
      id, r[p.nome], r[p.loja], atual, anterior, varAbs, varPct, tendencia, ultimaMudanca,
      Math.min.apply(null, precos), Math.max.apply(null, precos), media7, status,
      validas[validas.length - 1][0], ignoradas, r[p.url]
    ];
  });

  sheet.clear();
  sheet.clearConditionalFormatRules();
  sheet.getRange(1, 1, 1, header.length).setValues([header]);
  if (rows.length) {
    const last = rows.length + 1;
    sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
    ['D', 'E', 'F', 'J', 'K', 'L'].forEach(c => sheet.getRange(c + '2:' + c + last).setNumberFormat('"R$" #,##0.00'));
    sheet.getRange('G2:G' + last).setNumberFormat('+0.0%;-0.0%;0.0%');
    sheet.getRange('N2:N' + last).setNumberFormat('dd/MM/yyyy HH:mm');

    const verde = '#d9f2e3', vermelho = '#fbe0e0';
    const variacao = sheet.getRange('F2:H' + last);
    const mudanca = sheet.getRange('I2:I' + last);
    const faixaStatus = sheet.getRange('M2:M' + last);
    sheet.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$F2<0').setBackground(verde).setFontColor('#137333').setRanges([variacao]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$F2>0').setBackground(vermelho).setFontColor('#a50e0e').setRanges([variacao]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenTextStartsWith('▼').setFontColor('#137333').setRanges([mudanca]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenTextStartsWith('▲').setFontColor('#a50e0e').setRanges([mudanca]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('COMPRAR').setBackground(verde).setBold(true).setRanges([faixaStatus]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('CARO').setFontColor('#a50e0e').setRanges([faixaStatus]).build()
    ]);
  }
  formatSheet_(sheet);
  console.log('Acompanhamento atualizado: ' + rows.length + ' produtos');
}

// Roda o parser em todos os produtos ativos e so mostra no log (nao grava nada na planilha).
function testarParserKabum() {
  const values = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Produtos').getDataRange().getValues();
  const headers = values.shift();
  const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
  const ativos = values.filter(r => r[idx.ativo] === true && r[idx.url]);
  console.log('Produtos ativos: ' + ativos.length);
  ativos.forEach(r => {
    const resp = UrlFetchApp.fetch(r[idx.url], {muteHttpExceptions: true, followRedirects: true, headers: {'User-Agent': 'Mozilla/5.0 MonitorPrecos/1.0'}});
    const parsed = parseKabum_(resp.getContentText(), r[idx.url]);
    console.log(r[idx.id] + ' | HTTP ' + resp.getResponseCode() + ' | PIX ' + parsed.precoPix + ' | normal ' + parsed.precoDe + ' | ' + parsed.selector + ' | ' + parsed.descontoPix);
  });
}

function criarGatilhoDiario23h() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'coletarAgora') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('coletarAgora')
    .timeBased()
    .atHour(23)
    .everyDays(1)
    .inTimezone(TIMEZONE)
    .create();
}

function criarGatilhoCada6Horas() {
  criarGatilhoDiario23h();
}

function resetSheet_(ss, name) {
  const existing = ss.getSheetByName(name);
  const sheet = existing || ss.insertSheet(name);
  sheet.clear();
  return sheet;
}

function append_(ss, sheetName, rows) {
  const sheet = ss.getSheetByName(sheetName);
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
}

function formatSheet_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getDataRange().setFontFamily('Arial').setFontSize(10);
  if (sheet.getLastColumn() > 0) {
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold').setBackground('#1f2937').setFontColor('#ffffff');
    sheet.autoResizeColumns(1, Math.min(sheet.getLastColumn(), 12));
  }
}

function stripHtml_(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function findPrices_(text) {
  const matches = String(text || '').match(/R\$\s*\d{1,3}(?:\.\d{3})*,\d{2}/g) || [];
  return [...new Set(matches.map(p => p.replace(/\s+/g, ' ')))];
}

function parsePrice_(priceText) {
  if (!priceText) return '';
  return Number(String(priceText).replace(/[^\d,]/g, '').replace(',', '.'));
}

function getLastPrice_(history, productId, ref) {
  const data = history.getDataRange().getValues().slice(1).filter(r => r[1] === productId && precoValido_(r[6], ref));
  return data.length ? data[data.length - 1][6] : '';
}

function getMinPrice_(history, productId, current, ref) {
  const prices = history.getDataRange().getValues().slice(1).filter(r => r[1] === productId && precoValido_(r[6], ref)).map(r => r[6]);
  if (precoValido_(current, ref)) prices.push(current);
  return prices.length ? Math.min.apply(null, prices) : '';
}

function precoValido_(preco, ref) {
  if (typeof preco !== 'number' || !(preco > 0)) return false;
  return !ref || preco >= ref * LIMITE_PRECO_SUSPEITO;
}

function round2_(n) {
  return Math.round(n * 100) / 100;
}

function fmtBRL_(n) {
  const partes = Number(n).toFixed(2).split('.');
  return 'R$ ' + partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + partes[1];
}

function getStatusPrice_(price, target, max, parseStatus) {
  if (parseStatus !== 'OK' || !price) return 'ERRO';
  if (target && price <= Number(target)) return 'COMPRAR';
  if (max && price > Number(max)) return 'CARO';
  return 'OK';
}

function simpleHash_(text) {
  let hash = 0;
  const value = String(text || '').slice(0, 50000);
  for (let i = 0; i < value.length; i++) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  return hash;
}

/**
 * Selo Zero Odor — captura de leads do quiz → Google Sheets
 *
 * COMO USAR (resumo):
 * 1. Crie uma planilha Google nova
 * 2. Extensões → Apps Script → cole ESTE arquivo inteiro
 * 3. Salve → Implantar → Nova implantação → Tipo: App da Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 4. Copie a URL da implantação
 * 5. Cole em js/config.js → window.SZO.sheetWebhook = "URL_AQUI"
 *
 * Aba da planilha: "Leads" (criada automaticamente se não existir)
 * Colunas: Data | Nome | Email | WhatsApp | Score | Urgência | Perfil ID | Perfil | Origem
 */

var SHEET_NAME = "Leads";
var HEADERS = [
  "Data",
  "Nome",
  "Email",
  "WhatsApp",
  "Score",
  "Urgência",
  "Perfil ID",
  "Perfil",
  "Origem",
];

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      service: "Selo Zero Odor — lead capture",
      tip: "Use POST com JSON do quiz",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = parseBody_(e);
    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    sheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.whatsapp || "",
      data.score != null ? data.score : "",
      data.urgency || "",
      data.profile || "",
      data.profileName || "",
      data.source || "quiz-raio-x",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    // fallback: campos de formulário
    return (e && e.parameter) || {};
  }
  var raw = e.postData.contents;
  try {
    return JSON.parse(raw);
  } catch (err) {
    // tenta form-urlencoded simples
    return (e && e.parameter) || { raw: raw };
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Teste manual no editor: Executar → testAppend */
function testAppend() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        name: "Teste Lead",
        email: "teste@exemplo.com",
        whatsapp: "11999999999",
        score: 71,
        profile: "enxugar-gelo",
        profileName: "Ciclo do enxugar gelo",
        createdAt: new Date().toISOString(),
        source: "teste-manual",
      }),
    },
  };
  Logger.log(doPost(fake).getContent());
}

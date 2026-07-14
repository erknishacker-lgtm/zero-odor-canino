/**
 * Checkouts PerfectPay — troque os links quando criar os produtos no PerfectPay.
 * Fluxo: vendas → (compra) → upsell → (sim) checkout upsell → obrigado
 *                              ↘ (não) downsell → (sim) checkout downsell → obrigado
 *                                              ↘ (não) obrigado
 */
window.SZO = window.SZO || {};
window.SZO.checkouts = {
  /** Oferta principal (R$ 37) */
  main: "https://go.perfectpay.com.br/PPU38CQE7P8",
  /** Upsell: Protocolo 30 Dias Zero Odor (R$ 57) */
  upsell: "https://go.perfectpay.com.br/PPU38CQE7PF?upsell=true",
  /** Downsell: Pacote Express de Execução (R$ 19,90) */
  downsell: "https://go.perfectpay.com.br/PPU38CQE7PM?upsell=true",
};

/** WhatsApp de suporte (opcional) — ex: 5511999999999 */
window.SZO.whatsapp = "";

/**
 * URL do Google Apps Script (App da Web) que grava leads na planilha.
 * Deixe "" até seguir docs/CAPTURA-LEADS-PLANILHA.md e colar a URL /exec.
 * Ex: "https://script.google.com/macros/s/XXXX/exec"
 */
window.SZO.sheetWebhook = "";

/**
 * Envia lead para a planilha Google (não bloqueia o quiz se falhar).
 */
window.SZO.sendLeadToSheet = function (payload) {
  var url = window.SZO.sheetWebhook;
  if (!url || typeof url !== "string") return;

  var body = JSON.stringify(payload || {});

  // text/plain evita preflight CORS; Apps Script aceita e grava a linha
  try {
    if (navigator.sendBeacon) {
      var ok = navigator.sendBeacon(
        url,
        new Blob([body], { type: "text/plain;charset=UTF-8" })
      );
      if (ok) return;
    }
  } catch (e) {}

  try {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: body,
      keepalive: true,
    }).catch(function () {});
  } catch (e2) {}
};

window.SZO.applyCheckoutLinks = function () {
  var map = window.SZO.checkouts || {};
  document.querySelectorAll("[data-checkout]").forEach(function (el) {
    var key = el.getAttribute("data-checkout");
    if (map[key]) el.setAttribute("href", map[key]);
  });
  var wa = window.SZO.whatsapp;
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (!wa) {
      el.hidden = true;
      return;
    }
    var msg = el.getAttribute("data-wa-msg") || "Olá! Acabei de comprar o Selo Zero Odor.";
    el.setAttribute(
      "href",
      "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg)
    );
  });
};

window.SZO.getLeadName = function () {
  try {
    var last = JSON.parse(localStorage.getItem("szo_last_result") || "null");
    if (last && last.name) return String(last.name).trim().split(/\s+/)[0];
  } catch (e) {}
  var params = new URLSearchParams(window.location.search);
  return params.get("nome") || "";
};

document.addEventListener("DOMContentLoaded", function () {
  window.SZO.applyCheckoutLinks();
  var name = window.SZO.getLeadName();
  document.querySelectorAll("[data-lead-name]").forEach(function (el) {
    if (name) el.textContent = name;
    else if (el.getAttribute("data-lead-fallback")) {
      el.textContent = el.getAttribute("data-lead-fallback");
    }
  });
});

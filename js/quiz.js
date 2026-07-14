/**
 * Raio-X Zero Odor — quiz de dor + score + captura de lead
 */
(function () {
  "use strict";

  const CHECKOUT =
    "https://go.perfectpay.com.br/PPU38CQE7P8";

  const QUESTIONS = [
    {
      id: "retorno",
      title: "Depois que você limpa a boca do cão, em quanto tempo o cheiro volta forte?",
      options: [
        { id: "horas", label: "Em poucas horas", pain: 22, tags: { enxugar: 3, rotina: 1 } },
        { id: "dia", label: "No dia seguinte", pain: 16, tags: { enxugar: 2 } },
        { id: "dias", label: "Em alguns dias", pain: 10, tags: { enxugar: 1 } },
        { id: "raro", label: "Quase não volta — quero prevenir", pain: 6, tags: { mapa: 1 } },
      ],
    },
    {
      id: "tentativas",
      title: "O que você já tentou para o mau hálito?",
      options: [
        {
          id: "tudo",
          label: "Escovação, spray e petisco — e o cheiro continua",
          pain: 24,
          tags: { compra: 3, enxugar: 2 },
        },
        { id: "escova", label: "Principalmente escovação", pain: 12, tags: { enxugar: 2 } },
        { id: "produtos", label: "Spray, petisco ou outros produtos", pain: 14, tags: { compra: 2 } },
        { id: "pouco", label: "Ainda quase nada de forma consistente", pain: 8, tags: { mapa: 2 } },
      ],
    },
    {
      id: "momento",
      title: "Onde o cheiro mais te incomoda no dia a dia?",
      options: [
        { id: "visita", label: "Quando chega visita ou alguém pega no colo", pain: 20, tags: { social: 2 } },
        { id: "sofa", label: "No sofá, na cama ou no carinho de perto", pain: 18, tags: { social: 2 } },
        { id: "sempre", label: "Parece que está forte o tempo todo", pain: 22, tags: { enxugar: 2, rotina: 1 } },
        { id: "manha", label: "Mais de manhã ou em momentos pontuais", pain: 10, tags: { rotina: 1 } },
      ],
    },
    {
      id: "rotina",
      title: "Como está a rotina do seu cão (água, petiscos, horários, higiene)?",
      options: [
        { id: "bagunca", label: "Bem improvisada — muda conforme o dia", pain: 20, tags: { rotina: 3 } },
        { id: "meio", label: "Meio organizada, mas cheia de furos", pain: 14, tags: { rotina: 2 } },
        { id: "ok", label: "Organizada — mesmo assim o cheiro incomoda", pain: 10, tags: { enxugar: 1, mapa: 1 } },
        { id: "nao-sei", label: "Nunca parei para observar a rotina", pain: 16, tags: { mapa: 2, rotina: 1 } },
      ],
    },
    {
      id: "clareza",
      title: "Você sente que sabe por onde começar de verdade?",
      options: [
        { id: "zero", label: "Não faço ideia — fico no escuro", pain: 18, tags: { mapa: 3 } },
        { id: "palpite", label: "Tenho palpites, mas fico perdido na hora de agir", pain: 15, tags: { mapa: 2 } },
        { id: "sei", label: "Sei o que fazer, mas não mantenho a sequência", pain: 12, tags: { rotina: 2 } },
        { id: "plano", label: "Já tenho um caminho, quero validar e organizar", pain: 6, tags: { mapa: 1 } },
      ],
    },
    {
      id: "cao",
      title: "Seu cão é pequeno (raças toy, mini ou até cerca de 10 kg)?",
      options: [
        { id: "sim", label: "Sim — cão pequeno", pain: 8, tags: { ideal: 2 } },
        { id: "medio", label: "Médio ou grande", pain: 4, tags: { ideal: 0 } },
        { id: "talvez", label: "Não tenho certeza do porte", pain: 5, tags: { ideal: 1 } },
      ],
    },
    {
      id: "frustracao",
      title: "Quanto isso te frustra hoje?",
      options: [
        { id: "muito", label: "Muito — já gastei e cansei de tentar no escuro", pain: 22, tags: { compra: 2, enxugar: 1 } },
        { id: "medio", label: "Médio — quero resolver logo com clareza", pain: 14, tags: { mapa: 1 } },
        { id: "pouco", label: "Pouco — é mais curiosidade por enquanto", pain: 4, tags: { mapa: 1 } },
      ],
    },
  ];

  const PROFILES = {
    enxugar: {
      id: "enxugar-gelo",
      name: "Ciclo do enxugar gelo",
      urgency: "alta",
      mirror:
        "Você limpa, sente alívio por um tempo… e o cheiro volta. O problema não é falta de carinho — é tratar o sintoma enquanto a rotina mantém o odor vivo.",
      points: [
        "O alívio rápido da limpeza não mexe na causa que reativa o cheiro",
        "Falta uma triagem do que observar antes de comprar o próximo produto",
        "Um plano curto em sequência evita voltar ao modo “apagando fogo”",
      ],
    },
    compra: {
      id: "compra-aleatoria",
      name: "Compra no escuro",
      urgency: "alta",
      mirror:
        "Você já investiu em spray, petisco e higienização — e ainda assim não tem clareza do que realmente faz diferença. O cansaço vem da tentativa e erro, não da falta de esforço.",
      points: [
        "Produtos soltos sem triagem viram gasto, não solução",
        "O guia prioriza o que ajustar primeiro com baixo custo",
        "Você para de testar “mais uma coisa” sem critério",
      ],
    },
    rotina: {
      id: "rotina-baguncada",
      name: "Rotina que alimenta o odor",
      urgency: "média-alta",
      mirror:
        "O cheiro pode estar sendo alimentado por hábitos do dia a dia — água, petiscos, improvisos e ordem das ações — não só pela boca em si.",
      points: [
        "Pequenos furos na rotina reativam o odor mesmo com boa ração",
        "A triagem mostra o que cortar e o que organizar primeiro",
        "O plano de 14 dias transforma improviso em sequência simples",
      ],
    },
    mapa: {
      id: "sem-mapa",
      name: "Sem mapa de ação",
      urgency: "média",
      mirror:
        "Você quer resolver, mas ainda não tem um caminho claro do “o que observar → o que cortar → o que ajustar”. Sem mapa, qualquer dica da internet vira ruído.",
      points: [
        "Clareza de causa evita ação aleatória",
        "Checklist diário tira o peso de “lembrar de tudo”",
        "Em 14 dias você consolida o básico que importa",
      ],
    },
  };

  const els = {
    progressFill: document.getElementById("progressFill"),
    progressLabel: document.getElementById("progressLabel"),
    progressPct: document.getElementById("progressPct"),
    topBar: document.getElementById("topBar"),
    screens: {
      intro: document.getElementById("screen-intro"),
      question: document.getElementById("screen-question"),
      lead: document.getElementById("screen-lead"),
      result: document.getElementById("screen-result"),
    },
    qTitle: document.getElementById("questionTitle"),
    optionList: document.getElementById("optionList"),
    btnBack: document.getElementById("btnBack"),
    leadForm: document.getElementById("leadForm"),
    resultName: document.getElementById("resultName"),
    profileName: document.getElementById("profileName"),
    profileMirror: document.getElementById("profileMirror"),
    profilePoints: document.getElementById("profilePoints"),
    scoreNumber: document.getElementById("scoreNumber"),
    scoreRing: document.getElementById("scoreRingValue"),
    scoreCaption: document.getElementById("scoreCaption"),
    ctaSales: document.getElementById("ctaSales"),
  };

  const state = {
    step: "intro", // intro | question | lead | result
    qIndex: 0,
    answers: {},
    lead: null,
    result: null,
  };

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setProgress(fraction, label) {
    const pct = Math.round(fraction * 100);
    if (els.progressFill) els.progressFill.style.width = pct + "%";
    if (els.progressPct) els.progressPct.textContent = pct + "%";
    if (els.progressLabel) els.progressLabel.textContent = label;
  }

  function showScreen(name) {
    Object.entries(els.screens).forEach(([key, node]) => {
      if (!node) return;
      node.classList.toggle("is-active", key === name);
    });
    state.step = name;

    if (name === "intro") {
      setProgress(0, "Início");
      if (els.topBar) els.topBar.style.visibility = "visible";
    } else if (name === "question") {
      const total = QUESTIONS.length;
      const done = state.qIndex;
      setProgress((done + 0.15) / (total + 2), `Pergunta ${done + 1} de ${total}`);
    } else if (name === "lead") {
      setProgress((QUESTIONS.length + 0.5) / (QUESTIONS.length + 2), "Seu raio-X");
    } else if (name === "result") {
      setProgress(1, "Resultado");
    }

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function renderQuestion() {
    const q = QUESTIONS[state.qIndex];
    if (!q) return;
    els.qTitle.textContent = q.title;
    els.optionList.innerHTML = "";

    q.options.forEach((opt) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("data-option", opt.id);
      if (state.answers[q.id]?.id === opt.id) btn.classList.add("is-selected");

      btn.innerHTML =
        '<span class="option__radio" aria-hidden="true"></span>' +
        '<span class="option__text"></span>';
      btn.querySelector(".option__text").textContent = opt.label;

      btn.addEventListener("click", () => selectOption(q, opt));
      li.appendChild(btn);
      els.optionList.appendChild(li);
    });

    if (els.btnBack) {
      els.btnBack.hidden = false;
      els.btnBack.textContent = state.qIndex === 0 ? "Voltar ao início" : "Pergunta anterior";
    }

    showScreen("question");
  }

  function selectOption(q, opt) {
    state.answers[q.id] = opt;

    // visual flash
    [...els.optionList.querySelectorAll(".option")].forEach((el) => {
      el.classList.toggle("is-selected", el.getAttribute("data-option") === opt.id);
    });

    window.setTimeout(() => {
      if (state.qIndex < QUESTIONS.length - 1) {
        state.qIndex += 1;
        renderQuestion();
      } else {
        showScreen("lead");
        if (els.btnBack) els.btnBack.hidden = true;
        const nameInput = document.getElementById("leadName");
        if (nameInput) nameInput.focus();
      }
    }, 180);
  }

  function goBack() {
    if (state.step === "question") {
      if (state.qIndex === 0) {
        showScreen("intro");
        if (els.btnBack) els.btnBack.hidden = true;
        return;
      }
      state.qIndex -= 1;
      renderQuestion();
      return;
    }
    if (state.step === "lead") {
      state.qIndex = QUESTIONS.length - 1;
      renderQuestion();
    }
  }

  function computeResult() {
    let pain = 0;
    const tags = { enxugar: 0, compra: 0, rotina: 0, mapa: 0, social: 0, ideal: 0 };

    Object.values(state.answers).forEach((ans) => {
      pain += ans.pain || 0;
      if (ans.tags) {
        Object.entries(ans.tags).forEach(([k, v]) => {
          tags[k] = (tags[k] || 0) + v;
        });
      }
    });

    // max theoretical ~134; normalize to 0–100
    const score = clamp(Math.round((pain / 130) * 100), 12, 98);

    const ranking = [
      ["enxugar", tags.enxugar],
      ["compra", tags.compra],
      ["rotina", tags.rotina],
      ["mapa", tags.mapa],
    ].sort((a, b) => b[1] - a[1]);

    const profileKey = ranking[0][0];
    const profile = PROFILES[profileKey];

    let caption = "Atenção moderada";
    let urgencyLevel = "mid";
    if (score >= 75) {
      caption = "Urgência alta";
      urgencyLevel = "high";
    } else if (score >= 55) {
      caption = "Urgência elevada";
      urgencyLevel = "elevated";
    } else if (score >= 35) {
      caption = "Vale organizar logo";
      urgencyLevel = "mid";
    } else {
      caption = "Prevenção consciente";
      urgencyLevel = "low";
    }

    return {
      score,
      caption,
      urgencyLevel,
      profile,
      tags,
      answers: { ...state.answers },
    };
  }

  function onlyDigits(s) {
    return String(s || "").replace(/\D/g, "");
  }

  function formatPhone(value) {
    const d = onlyDigits(value).slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  function validateLead(data) {
    const errors = {};
    if (!data.name || data.name.trim().length < 2) {
      errors.name = "Digite seu nome";
    }
    const email = (data.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "E-mail inválido";
    }
    const phone = onlyDigits(data.whatsapp);
    if (phone.length < 10 || phone.length > 11) {
      errors.whatsapp = "WhatsApp com DDD (10 ou 11 dígitos)";
    }
    return errors;
  }

  function setFieldError(id, message) {
    const input = document.getElementById(id);
    const err = document.getElementById(id + "Error");
    if (input) input.classList.toggle("is-invalid", Boolean(message));
    if (err) {
      err.textContent = message || "";
      err.classList.toggle("is-visible", Boolean(message));
    }
  }

  function saveLead(lead, result) {
    const payload = {
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      score: result.score,
      profile: result.profile.id,
      profileName: result.profile.name,
      urgency: result.caption || "",
      createdAt: new Date().toISOString(),
      source: "quiz-raio-x",
    };

    try {
      const key = "szo_leads";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
      localStorage.setItem("szo_last_result", JSON.stringify(payload));
    } catch (_) {
      /* storage blocked — still continue funnel */
    }

    // Planilha Google (js/config.js → SZO.sheetWebhook)
    if (window.SZO && typeof window.SZO.sendLeadToSheet === "function") {
      window.SZO.sendLeadToSheet(payload);
    } else if (typeof window.SZO_LEAD_WEBHOOK === "string" && window.SZO_LEAD_WEBHOOK) {
      // compat: webhook genérico antigo
      try {
        navigator.sendBeacon?.(
          window.SZO_LEAD_WEBHOOK,
          new Blob([JSON.stringify(payload)], { type: "text/plain;charset=UTF-8" })
        );
      } catch (_) {}
    }

    return payload;
  }

  function animateScore(score) {
    const circle = els.scoreRing;
    const numberEl = els.scoreNumber;
    const C = 2 * Math.PI * 42; // r=42 (matches SVG)
    if (circle) {
      circle.style.strokeDasharray = String(C);
      circle.style.strokeDashoffset = String(C);
      requestAnimationFrame(() => {
        const offset = C - (score / 100) * C;
        circle.style.strokeDashoffset = String(offset);
      });
    }

    if (!numberEl) return;
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      numberEl.textContent = String(score);
      return;
    }

    const start = performance.now();
    const dur = 850;
    function tick(now) {
      const t = clamp((now - start) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      numberEl.textContent = String(Math.round(score * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderResult() {
    const result = state.result;
    const lead = state.lead;
    if (!result) return;

    const first = (lead?.name || "").trim().split(/\s+/)[0] || "Tutor";
    if (els.resultName) els.resultName.textContent = first;
    if (els.profileName) els.profileName.textContent = result.profile.name;
    if (els.profileMirror) els.profileMirror.textContent = result.profile.mirror;
    if (els.scoreCaption) {
      const textEl = els.scoreCaption.querySelector(".score-urgency__text");
      if (textEl) textEl.textContent = result.caption;
      else els.scoreCaption.textContent = result.caption;
      els.scoreCaption.dataset.level = result.urgencyLevel || "mid";
      els.scoreCaption.classList.remove(
        "is-high",
        "is-elevated",
        "is-mid",
        "is-low",
        "is-pulsing"
      );
      els.scoreCaption.classList.add("is-" + (result.urgencyLevel || "mid"), "is-pulsing");
    }
    const ringWrap = document.getElementById("scoreRingWrap");
    if (ringWrap) {
      ringWrap.dataset.level = result.urgencyLevel || "mid";
      ringWrap.classList.add("is-pulsing");
    }

    if (els.profilePoints) {
      els.profilePoints.innerHTML = "";
      result.profile.points.forEach((text, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${i + 1}</span><div></div>`;
        li.querySelector("div").textContent = text;
        els.profilePoints.appendChild(li);
      });
    }

    const params = new URLSearchParams({
      perfil: result.profile.id,
      score: String(result.score),
      nome: first,
    });
    if (els.ctaSales) {
      els.ctaSales.href = `vendas/?${params.toString()}`;
    }

    showScreen("result");
    animateScore(result.score);
  }

  function onLeadSubmit(e) {
    e.preventDefault();
    const data = {
      name: document.getElementById("leadName")?.value || "",
      email: document.getElementById("leadEmail")?.value || "",
      whatsapp: document.getElementById("leadWhatsapp")?.value || "",
    };

    const errors = validateLead(data);
    setFieldError("leadName", errors.name || "");
    setFieldError("leadEmail", errors.email || "");
    setFieldError("leadWhatsapp", errors.whatsapp || "");
    if (Object.keys(errors).length) {
      const firstKey = Object.keys(errors)[0];
      document.getElementById(
        firstKey === "name" ? "leadName" : firstKey === "email" ? "leadEmail" : "leadWhatsapp"
      )?.focus();
      return;
    }

    state.result = computeResult();
    state.lead = {
      name: data.name.trim(),
      email: data.email.trim(),
      whatsapp: onlyDigits(data.whatsapp),
    };
    saveLead(state.lead, state.result);
    renderResult();
  }

  function bind() {
    document.getElementById("btnStart")?.addEventListener("click", () => {
      state.qIndex = 0;
      renderQuestion();
    });

    els.btnBack?.addEventListener("click", goBack);

    document.getElementById("btnLeadBack")?.addEventListener("click", () => {
      state.qIndex = QUESTIONS.length - 1;
      renderQuestion();
    });

    els.leadForm?.addEventListener("submit", onLeadSubmit);

    const phone = document.getElementById("leadWhatsapp");
    phone?.addEventListener("input", () => {
      phone.value = formatPhone(phone.value);
    });

    // expose checkout for any secondary CTA
    document.querySelectorAll("[data-checkout]").forEach((a) => {
      a.setAttribute("href", CHECKOUT);
    });
  }

  bind();
  showScreen("intro");
})();

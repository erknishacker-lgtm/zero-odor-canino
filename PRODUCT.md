# Product

## Register

brand

## Users

Tutores de cães pequenos (spitz, yorkshire, shih tzu, poodle toy…) no celular, cansados de escovar, comprar spray e petisco e sentir o cheiro voltar em poucas horas. Querem clareza rápida: o que está piorando o odor e o que ajustar primeiro em casa, sem gastar com mil produtos.

## Product Purpose

Funil em duas páginas:

1. **Quiz “Raio-X Zero Odor”** — identifica a dor, calcula score de urgência, define um perfil, captura nome + e-mail + WhatsApp e entrega um diagnóstico espelhado.
2. **Página de vendas** — converte para o produto digital **Selo Zero Odor Canino** (ebook + checklist + plano de 14 dias) a **R$ 37,00** via PerfectPay.

Sucesso = lead qualificado + clique no checkout com sensação de “isso foi feito pro meu caso”.

## Brand Personality

**Clínico · carinhoso · decisivo.**

Como uma triagem honesta de pet shop de confiança: sem milagre, sem fofura infantil, sem “SaaS genérico”. Empatia com a frustração (“enxugar gelo”) e autoridade prática (“o que cortar primeiro”).

## Anti-references

- Landing pet pastel com pata/emoji em todo canto
- SaaS cream/beige + cards idênticos com ícone
- Infoproduto gritando vermelho/preto de “URGENTE”
- Quiz infantil de revista (só engajamento, zero diagnóstico)

## Design Principles

1. **Uma decisão por tela** — no quiz, nunca sobrecarregar.
2. **Espelhar a dor antes de vender** — o resultado fala o problema da pessoa com as palavras dela.
3. **Polegar primeiro** — alvos grandes, CTA no alcance do polegar, progresso sempre visível.
4. **Clareza > enfeite** — cada elemento ou avança o funil ou reforça confiança.
5. **Honestidade clínica** — não promete milagre; promete rotina e triagem.

## Accessibility & Inclusion

- Contraste de texto ≥ 4.5:1
- Alvos de toque ≥ 44px
- `prefers-reduced-motion` respeitado
- Labels reais em formulários; erros legíveis em português
- Conteúdo legível em tela estreita (320–430px como prioridade)

## Offer

- Preço de tabela de referência: R$ 97,00
- Preço de oferta: **R$ 37,00** (ou 4x de R$ 9,25)
- Checkout: https://go.perfectpay.com.br/PPU38CQE7P8
- Bônus: checklist diário, mapa das 5 causas, plano 14 dias, lista de sinais de alerta
- Garantia: 7 dias

## Funil pós-compra

```
quiz (index) → vendas → PerfectPay (R$ 37)
                              ↓
                           upsell.html  → SIM → PerfectPay upsell (R$ 57) → obrigado.html
                              ↓ NÃO
                           downsell.html → SIM → PerfectPay downsell (R$ 19,90) → obrigado.html
                              ↓ NÃO
                           obrigado.html
```

| Página | Oferta | Preço | Arquivo |
|--------|--------|-------|---------|
| Principal | Selo Zero Odor Canino | R$ 37 | `vendas.html` |
| Upsell | Protocolo 30 Dias Zero Odor | R$ 57 | `upsell.html` |
| Downsell | Pacote Express de Execução | R$ 19,90 | `downsell.html` |
| Obrigado | Acessos + próximos passos | — | `obrigado.html` |

Links de checkout e WhatsApp: editar `js/config.js` (`SZO.checkouts` e `SZO.whatsapp`).

| Checkout | URL |
|----------|-----|
| Principal | https://go.perfectpay.com.br/PPU38CQE7P8 |
| Upsell | https://go.perfectpay.com.br/PPU38CQE7PF?upsell=true |
| Downsell | https://go.perfectpay.com.br/PPU38CQE7PM?upsell=true |

No PerfectPay: configurar URL de redirecionamento pós-compra da oferta principal para `/upsell.html` (ou URL completa hospedada).

## Captura de leads (Google Planilhas)

- Código do site: `js/config.js` → `SZO.sheetWebhook` + `SZO.sendLeadToSheet`
- Script Google: `google-apps-script/Code.gs`
- Passo a passo: `docs/CAPTURA-LEADS-PLANILHA.md`

Fluxo: quiz preenche nome/e-mail/WhatsApp → POST para Apps Script → linha na aba **Leads**.

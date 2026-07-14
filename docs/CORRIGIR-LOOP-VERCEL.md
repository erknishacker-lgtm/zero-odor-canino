# Corrigir loop “Redirecionando…” no domínio

## Diagnóstico

| Onde | Status |
|------|--------|
| GitHub (`main`) | ✅ páginas reais (upsell ~5 KB, sem redirect) |
| GitHub Pages | ✅ funciona |
| `www.zeroodorcanino.lat` (Vercel) | ❌ ainda serve stub de 421 bytes que redireciona para si mesmo |

O domínio **não está publicando** os commits novos do repositório. Por isso o loop continua.

## Solução A — Redeploy na Vercel (recomendado)

1. Abra https://vercel.com/dashboard
2. Entre no projeto ligado a **zeroodorcanino.lat**
3. **Settings → Git**
   - Repositório deve ser: `erknishacker-lgtm/zero-odor-canino`
   - Branch de produção: `main`
4. **Deployments**
   - Abra o deployment mais recente do commit `a32811d` (ou o último da main)
   - Se não existir deployment novo: **Deploy** → importe/conecte o repo de novo
5. No deployment atual: **⋯ → Redeploy**
   - **Desmarque** “Use existing Build Cache”
6. Aguarde **Ready**
7. Teste em aba anônima:
   - https://www.zeroodorcanino.lat/upsell.html
   - https://www.zeroodorcanino.lat/downsell.html
   - https://www.zeroodorcanino.lat/obrigado.html

Se o HTML ainda disser “Redirecionando…”, o projeto Vercel **não é** este repositório — reconecte o Git.

## Solução B — Usar GitHub Pages agora (já funciona)

PerfectPay / testes (sem loop):

| Página | URL |
|--------|-----|
| Quiz | https://erknishacker-lgtm.github.io/zero-odor-canino/ |
| Vendas | https://erknishacker-lgtm.github.io/zero-odor-canino/vendas.html |
| Upsell | https://erknishacker-lgtm.github.io/zero-odor-canino/upsell.html |
| Downsell | https://erknishacker-lgtm.github.io/zero-odor-canino/downsell.html |
| Obrigado | https://erknishacker-lgtm.github.io/zero-odor-canino/obrigado.html |

## PerfectPay (depois que o domínio atualizar)

| Produto | Redirect |
|---------|----------|
| Principal | `https://www.zeroodorcanino.lat/upsell.html` |
| Upsell | `https://www.zeroodorcanino.lat/obrigado.html` |
| Downsell | `https://www.zeroodorcanino.lat/obrigado.html` |

Até o domínio atualizar, use as URLs do **GitHub Pages** acima.

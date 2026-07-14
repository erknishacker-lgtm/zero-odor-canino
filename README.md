# Zero Odor Canino

Site estático. Cada pasta = rota no domínio.

```
/                 → quiz (index.html)
/vendas/          → página de vendas
/upsell/          → upsell
/downsell/        → downsell
/obrigado/        → obrigado
```

## Links que funcionam agora (GitHub Pages)

- Quiz: https://erknishacker-lgtm.github.io/zero-odor-canino/
- Vendas: https://erknishacker-lgtm.github.io/zero-odor-canino/vendas/
- Upsell (Plano Zero Odor Express): https://erknishacker-lgtm.github.io/zero-odor-canino/upsell/
- Downsell: https://erknishacker-lgtm.github.io/zero-odor-canino/downsell/
- Obrigado: https://erknishacker-lgtm.github.io/zero-odor-canino/obrigado/

## PerfectPay (cole estes redirects)

1. Compra principal → `https://erknishacker-lgtm.github.io/zero-odor-canino/upsell/`
2. Upsell pago → `https://erknishacker-lgtm.github.io/zero-odor-canino/obrigado/`
3. Downsell pago → `https://erknishacker-lgtm.github.io/zero-odor-canino/obrigado/`

## Domínio www.zeroodorcanino.lat

Só vai servir estas pastas se a **Vercel** estiver ligada a este repositório e fizer deploy da branch `main`.
Hoje o domínio ainda tem deploy antigo. Até republicar:

**Settings → Git → conectar `erknishacker-lgtm/zero-odor-canino` → Redeploy sem cache.**

Depois disso:
- https://www.zeroodorcanino.lat/upsell
- https://www.zeroodorcanino.lat/downsell
- https://www.zeroodorcanino.lat/obrigado
- https://www.zeroodorcanino.lat/vendas

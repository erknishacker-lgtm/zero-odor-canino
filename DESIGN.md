# Design System — Selo Zero Odor Canino

## Visual Theme

**Selo de boutique veterinária à noite.** Fundo verde-floresta quase preto, metal dourado do logo como compromisso de marca, tipografia de certificado. Luz de abajur em latão — não pastel pet shop, não SaaS cream.

Cena física: consultório boutique ao entardecer — madeira escura, latão, selo dourado gravado, tutor no celular buscando clareza.

## Color strategy

**Full palette** anchored in the logo:

| Token | OKLCH | Role |
|-------|--------|------|
| `--bg` | `oklch(0.14 0.018 155)` | Page dark forest |
| `--bg-deep` | `oklch(0.10 0.015 155)` | Hero / sticky |
| `--surface` | `oklch(0.18 0.022 155)` | Cards on dark |
| `--surface-lift` | `oklch(0.22 0.024 155)` | Elevated panels |
| `--ink` | `oklch(0.96 0.01 95)` | Primary text on dark |
| `--muted` | `oklch(0.78 0.02 145)` | Secondary on dark |
| `--gold` | `oklch(0.78 0.12 85)` | Primary brand / CTA |
| `--gold-deep` | `oklch(0.62 0.12 78)` | Pressed gold |
| `--gold-ink` | `oklch(0.18 0.03 85)` | Text on gold buttons |
| `--forest` | `oklch(0.32 0.06 155)` | Mid green panels |
| `--light` | `oklch(0.98 0.005 95)` | Light reading sections |
| `--light-ink` | `oklch(0.22 0.03 155)` | Text on light |
| `--light-muted` | `oklch(0.42 0.025 155)` | Muted on light |
| `--border-dark` | `oklch(0.28 0.03 155)` | Hairlines dark |
| `--border-light` | `oklch(0.90 0.01 155)` | Hairlines light |
| `--danger` | `oklch(0.68 0.16 25)` | Errors |

## Typography

- **Display:** Bodoni Moda — carimbo de certificado / selo
- **UI / body:** Source Sans 3 — clínico e legível no mobile

Letter-spacing display: `-0.02em` floor never below `-0.04em`.

## Imagery

| Asset | Use |
|-------|-----|
| `logo-web.png` | Header, resultado, oferta |
| `hero-tutor.jpg` | Hero vendas + intro quiz |
| `cao-york.jpg` | Bloco emocional / social |
| `cao-shih.jpg` | Prova social visual |
| `rotina-casa.jpg` | Mecanismo / rotina |
| `kit-cuidado.jpg` | Como funciona |
| `produto-still.jpg` | Oferta / produto |

## Components

- Logo mark (img) never CSS fake seal
- Gold pill CTAs on dark; dark forest CTAs on light gold strip optional
- Progress bar gold on forest track
- Option cards surface-lift with gold selected ring
- Score ring gold stroke
- Sticky header dark with logo + mini CTA

## Motion

220–320ms ease-out expo; reduced-motion → opacity only.

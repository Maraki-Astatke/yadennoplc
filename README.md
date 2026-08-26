# Yadenno Plastics PLC — Product Showcase Site

A React + Vite + Tailwind CSS marketing site for an Ethiopian UPVC pipe
manufacturer. It uses a bright, responsive light-blue design and includes an
English/Amharic language switch.

## Vercel deployment

This source package is ready for the existing Vercel project connected to `yade.vercel.app`.

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

The production build creates route-specific HTML metadata for `/`, `/products`,
`/about`, and `/contact`. The included `vercel.json` serves those route files
directly and preserves React Router fallback behavior. Quotation forms prepare a
WhatsApp message for the customer to review and send; they do not store information
in a backend.

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/
    Layout.jsx              # Navbar + metadata + page content + Footer shell
    Navbar.jsx              # logo, nav links, Request Quote CTA, EN/AMH toggle
    RouteMeta.jsx           # route-specific browser metadata
    Hero.jsx                # responsive split-layout product hero
    Footer.jsx
  context/
    LanguageContext.jsx      # EN/AMH language state + t() translation helper
  data/
    translations.js          # flat EN/AMH string dictionary
    products.js              # UPVC pipe product line data
  pages/
    Home.jsx
    Products.jsx
    About.jsx
    Contact.jsx
  App.jsx                     # route definitions
  main.jsx                    # app entry point, providers, router
  index.css                   # Tailwind layers + custom "pipe-panel" CSS

scripts/
  generate-route-pages.mjs  # emits crawlable per-route HTML after Vite builds

public/                     # compressed WebP assets, video, favicon, sitemap and robots
```

## Customizing

- **Colors**: edit the `primary` / `steel` / `accent` / `surface` palette in
  `tailwind.config.js`.
- **Copy / translations**: edit `src/data/translations.js` — every string in
  the site is pulled from there via `t('key')`.
- **Products**: edit `src/data/products.js`.
- **Images**: use compressed WebP files in `public/` and update their references
  in the relevant component or data file.

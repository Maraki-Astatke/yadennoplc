import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { BASE_URL, PAGE_META, OG_LOCALE, localePath, absoluteUrl } from '../src/data/pageMeta.js'

// Pre-render function from the SSR bundle (built by `vite build --ssr src/entry-server.jsx`)
const ssrModulePath = pathToFileURL(resolve('dist-ssr/entry-server.js')).href
const { render } = await import(ssrModulePath)

// One business description, used on every page. Must match the Google Business Profile word for word.
const business = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Yadenno Plastics PLC',
  legalName: 'Yadeno Tiers and Plastics Work PLC',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/logo.webp`,
  image: `${BASE_URL}/og-image.jpg`,
  description: 'Ethiopian manufacturer of uPVC pressure and drainage pipes, PN4–PN16, 50–250 mm, 6 m lengths. Wholesale only.',
  telephone: '+251961363636',
  email: 'hello@yadenno.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tatek Industry Zone',
    addressLocality: 'Sheger City',
    addressRegion: 'Oromia',
    addressCountry: 'ET',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.037928,
    longitude: 38.637822,
  },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=9.037928,38.637822',
  areaServed: { '@type': 'Country', 'name': 'Ethiopia' },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+251961363636', email: 'hello@yadenno.com', contactType: 'sales', availableLanguage: ['English', 'Amharic'] },
    { '@type': 'ContactPoint', telephone: '+251967363636', email: 'yadennoplc@gmail.com', contactType: 'sales', availableLanguage: ['English', 'Amharic'] },
  ],
  sameAs: ['https://www.facebook.com/<your-page>'],
}

// The kind of page, for Google
const pageTypes = {
  '/': 'WebPage',
  '/products': 'CollectionPage',
  '/about': 'AboutPage',
  '/contact': 'ContactPage',
}

const template = await readFile('dist/index.html', 'utf8')

for (const [path, languages] of Object.entries(PAGE_META)) {
  const enUrl = absoluteUrl(path)
  const amUrl = absoluteUrl(localePath(path, 'am'))

  for (const [lang, meta] of Object.entries(languages)) {
    const outputPath = localePath(path, lang)
    const url = absoluteUrl(outputPath)
    const otherLang = lang === 'am' ? 'en' : 'am'

    // Full page text, rendered in the right language for this address
    const bodyHtml = render(outputPath)

    // Business info + this page, in the page's language
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        business,
        {
          '@type': pageTypes[path] || 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: meta.title,
          description: meta.description,
          inLanguage: lang,
          about: { '@id': business['@id'] },
        },
      ],
    }
    const jsonLdString = JSON.stringify(jsonLd, null, 2)

    // Canonical plus hreflang: tells Google these pages are the same content in two languages
    const linkTags = [
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
      `<link rel="alternate" hreflang="am" href="${amUrl}" />`,
      `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    ].join('\n  ')

    const ogTags = [
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
      `<meta property="og:locale:alternate" content="${OG_LOCALE[otherLang]}" />`,
    ].join('\n  ')

    const html = template
      .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
      .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
      .replace(/<link rel="canonical" href="[^"]*"\s*\/?>(?:\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>)*/g, linkTags)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/?>(?:\s*<meta property="og:locale(?::alternate)?" content="[^"]*"\s*\/?>)*/g, ogTags)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${jsonLdString}\n</script>`)
      .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)

    if (outputPath === '/') {
      await writeFile('dist/index.html', html)
    } else {
      const directory = `dist${outputPath}`
      await mkdir(directory, { recursive: true })
      await writeFile(`${directory}/index.html`, html)
    }
  }
}

// Clean up temporary SSR build files
await rm('dist-ssr', { recursive: true, force: true })

console.log('Prerendered English and Amharic pages with full text, JSON-LD and hreflang (8 pages).')
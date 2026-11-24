import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const baseUrl = 'https://yadenno.com'

// Import pre-render function from SSR bundle
const ssrModulePath = resolve('dist-ssr/entry-server.js')
const { render } = await import(ssrModulePath)

const commonBusinessInfo = {
  name: 'Yadenno Plastics PLC',
  legalName: 'Yadenno Plastics Private Limited Company',
  url: 'https://yadenno.com/',
  logo: 'https://yadenno.com/logo.webp',
  image: 'https://yadenno.com/orange-bg.webp',
  telephone: ['+251961363636', '+251967363636'],
  email: ['hello@yadenno.com', 'yadennoplc@gmail.com'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ashewa Meda, Tatek Industry Zone',
    addressLocality: 'Burayu',
    addressRegion: 'Oromia',
    addressCountry: 'ET',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.02,
    longitude: 38.74,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+251961363636',
      contactType: 'sales',
      areaServed: 'ET',
      availableLanguage: ['English', 'Amharic'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+251967363636',
      contactType: 'sales',
      areaServed: 'ET',
      availableLanguage: ['English', 'Amharic'],
    },
  ],
}

const routes = {
  '/': {
    title: 'UPVC Pipe Manufacturer in Ethiopia | Yadenno Plastics PLC',
    description: 'Yadenno Plastics PLC manufactures certified UPVC pressure and sewerage pipes from 50–250 mm and PN4–PN16 in Ethiopia.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ManufacturingBusiness',
      '@id': 'https://yadenno.com/#organization',
      ...commonBusinessInfo,
      description: 'Certified UPVC pressure and sewerage pipes manufactured in Ethiopia from 50–250 mm and PN4–PN16 for water supply, irrigation, boreholes, and drainage.',
    },
  },
  '/products': {
    title: 'UPVC Pressure & Sewerage Pipes | Yadenno Plastics Ethiopia',
    description: 'Explore Yadenno UPVC pressure and sewerage pipes for water supply, irrigation, boreholes and drainage projects across Ethiopia.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://yadenno.com/products#webpage',
      name: 'UPVC Pressure & Sewerage Pipes | Yadenno Plastics Ethiopia',
      url: 'https://yadenno.com/products',
      description: 'Explore Yadenno UPVC pressure and sewerage pipes for water supply, irrigation, boreholes and drainage projects across Ethiopia.',
      provider: {
        '@type': 'Organization',
        name: commonBusinessInfo.name,
        url: commonBusinessInfo.url,
        logo: commonBusinessInfo.logo,
        telephone: commonBusinessInfo.telephone,
        email: commonBusinessInfo.email,
      },
    },
  },
  '/about': {
    title: 'About Yadenno Plastics PLC | Ethiopian UPVC Pipe Manufacturer',
    description: 'Learn about Yadenno Plastics PLC, its Tatek Industry Zone factory, quality controls and certified UPVC pipe manufacturing in Ethiopia.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://yadenno.com/about#webpage',
      name: 'About Yadenno Plastics PLC | Ethiopian UPVC Pipe Manufacturer',
      url: 'https://yadenno.com/about',
      description: 'Learn about Yadenno Plastics PLC, its Tatek Industry Zone factory, quality controls and certified UPVC pipe manufacturing in Ethiopia.',
      about: {
        '@type': 'Organization',
        ...commonBusinessInfo,
      },
    },
  },
  '/contact': {
    title: 'Request an UPVC Pipe Quote | Yadenno Plastics Ethiopia',
    description: 'Request factory pricing, availability and delivery support for Yadenno UPVC pipes. Contact sales by WhatsApp, phone or email.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ContactPage'],
      '@id': 'https://yadenno.com/contact#localbusiness',
      ...commonBusinessInfo,
      url: 'https://yadenno.com/contact',
      description: 'Contact Yadenno Plastics PLC for factory pricing, availability and delivery support for UPVC pressure and sewerage pipes across Ethiopia.',
      priceRange: '$$',
    },
  },
}

const template = await readFile('dist/index.html', 'utf8')

for (const [route, meta] of Object.entries(routes)) {
  const url = `${baseUrl}${route}`
  const bodyHtml = render(route)
  const jsonLdString = JSON.stringify(meta.jsonLd, null, 2)

  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${jsonLdString}\n  </script>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)

  if (route === '/') {
    await writeFile('dist/index.html', html)
  } else {
    const directory = `dist${route}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}/index.html`, html)
  }
}

// Clean up temporary SSR build artifacts
await rm('dist-ssr', { recursive: true, force: true })

console.log('Successfully prerendered HTML content & JSON-LD metadata for /, /products, /about, and /contact.')

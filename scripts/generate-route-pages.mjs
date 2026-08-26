import { mkdir, readFile, writeFile } from 'node:fs/promises'

const baseUrl = 'https://yade.vercel.app'
const routes = {
  '/': {
    title: 'UPVC Pipe Manufacturer in Ethiopia | Yadenno Plastics PLC',
    description: 'Yadenno Plastics PLC manufactures certified UPVC pressure and sewerage pipes from 50–250 mm and PN4–PN16 in Ethiopia.',
  },
  '/products': {
    title: 'UPVC Pressure & Sewerage Pipes | Yadenno Plastics Ethiopia',
    description: 'Explore Yadenno UPVC pressure and sewerage pipes for water supply, irrigation, boreholes and drainage projects across Ethiopia.',
  },
  '/about': {
    title: 'About Yadenno Plastics PLC | Ethiopian UPVC Pipe Manufacturer',
    description: 'Learn about Yadenno Plastics PLC, its Tatek Industry Zone factory, quality controls and certified UPVC pipe manufacturing in Ethiopia.',
  },
  '/contact': {
    title: 'Request an UPVC Pipe Quote | Yadenno Plastics Ethiopia',
    description: 'Request factory pricing, availability and delivery support for Yadenno UPVC pipes. Contact sales by WhatsApp, phone or email.',
  },
}

const template = await readFile('dist/index.html', 'utf8')

for (const [route, meta] of Object.entries(routes)) {
  const url = `${baseUrl}${route === '/' ? '' : route}`
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)

  if (route === '/') {
    await writeFile('dist/index.html', html)
  } else {
    const directory = `dist${route}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}/index.html`, html)
  }
}

console.log('Generated route-specific HTML metadata for /, /products, /about and /contact.')

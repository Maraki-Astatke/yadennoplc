import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { PAGE_META, OG_LOCALE, localePath, absoluteUrl } from '../src/data/pageMeta.js'

const template = await readFile('dist/index.html', 'utf8')

for (const [path, languages] of Object.entries(PAGE_META)) {
  const enUrl = absoluteUrl(path)
  const amUrl = absoluteUrl(localePath(path, 'am'))

  for (const [lang, meta] of Object.entries(languages)) {
    const outputPath = localePath(path, lang)
    const url = absoluteUrl(outputPath)
    const otherLang = lang === 'am' ? 'en' : 'am'

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
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, linkTags)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, ogTags)

    if (outputPath === '/') {
      await writeFile('dist/index.html', html)
    } else {
      const directory = `dist${outputPath}`
      await mkdir(directory, { recursive: true })
      await writeFile(`${directory}/index.html`, html)
    }
  }
}

console.log('Generated English and Amharic HTML for /, /products, /about and /contact (8 pages).')
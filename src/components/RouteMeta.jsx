import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { PAGE_META, OG_LOCALE, localePath, absoluteUrl } from '../data/pageMeta.js'

function setAttr(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

/**
 * Keeps the page title, description, canonical and hreflang tags correct
 * while visitors move between pages, in both English and Amharic.
 * Uses the same data as scripts/generate-route-pages.mjs.
 */
export default function RouteMeta() {
  const { lang, basePath } = useLanguage()

  useEffect(() => {
    const path = PAGE_META[basePath] ? basePath : '/'
    const meta = PAGE_META[path][lang]
    const url = absoluteUrl(localePath(path, lang))
    const enUrl = absoluteUrl(path)
    const amUrl = absoluteUrl(localePath(path, 'am'))

    document.title = meta.title
    document.documentElement.lang = lang
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('meta[property="og:locale"]', 'content', OG_LOCALE[lang])
    setAttr('meta[property="og:locale:alternate"]', 'content', OG_LOCALE[lang === 'am' ? 'en' : 'am'])
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('link[rel="alternate"][hreflang="en"]', 'href', enUrl)
    setAttr('link[rel="alternate"][hreflang="am"]', 'href', amUrl)
    setAttr('link[rel="alternate"][hreflang="x-default"]', 'href', enUrl)
  }, [lang, basePath])

  return null
}
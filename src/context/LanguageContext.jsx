import { createContext, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translations } from '../data/translations.js'

const LanguageContext = createContext(null)

/**
 * The language comes from the page address:
 *   /am, /am/products, /am/about, /am/contact → Amharic
 *   everything else → English
 * so each language has its own pages that Google can find.
 */
export function LanguageProvider({ children }) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  const lang = pathname === '/am' || pathname.startsWith('/am/') ? 'am' : 'en'

  // The page address without the /am part, e.g. /am/products → /products
  const basePath = lang === 'am' ? pathname.slice(3) || '/' : pathname

  // Builds the right address for a language, e.g. localePath('/contact') → /am/contact in Amharic
  const localePath = (path, target = lang) => {
    if (target !== 'am') return path
    return path === '/' ? '/am' : `/am${path}`
  }

  // Tell the browser (and Google) which language the page is in
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const changeLanguage = (next) => {
    if (next === lang) return
    navigate(localePath(basePath, next) + hash)
  }

  const t = (key) => {
    const dict = translations[lang] || translations.en
    return dict[key] ?? translations.en[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, localePath, basePath }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const BASE_URL = 'https://yadenno.com'
const ROUTES = {
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

function setMeta(selector, attribute, value) {
  if (typeof document === 'undefined') return
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

export default function RouteMeta() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()

  useEffect(() => {
    const route = ROUTES[pathname] || ROUTES['/']
    const url = `${BASE_URL}${pathname}`
    document.title = route.title
    document.documentElement.lang = lang
    setMeta('meta[name="description"]', 'content', route.description)
    setMeta('meta[property="og:title"]', 'content', route.title)
    setMeta('meta[property="og:description"]', 'content', route.description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [lang, pathname])

  return null
}

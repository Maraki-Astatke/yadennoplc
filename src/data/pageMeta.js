// Titles and descriptions for every page, in both languages.
// Used by BOTH scripts/generate-route-pages.mjs (at build time)
// and src/components/RouteMeta.jsx (in the browser), so they always match.

export const BASE_URL = 'https://yadenno.com'

export const OG_LOCALE = { en: 'en_US', am: 'am_ET' }

export const PAGE_META = {
  '/': {
    en: {
      title: 'UPVC Pipe Manufacturer in Ethiopia | Yadenno Plastics PLC',
      description: 'Yadenno Plastics PLC manufactures certified UPVC pressure and sewerage pipes from 50–250 mm and PN4–PN16 in Ethiopia.',
    },
    am: {
      title: 'የUPVC ቧንቧ አምራች በኢትዮጵያ | ያደኖ ፕላስቲክስ ኃ.የተ.የግ.ማ',
      description: 'ያደኖ ፕላስቲክስ ኃ.የተ.የግ.ማ ከ50–250 ሚሜ እና ከPN4–PN16 የተረጋገጡ የUPVC የጫና እና የፍሳሽ ቧንቧዎችን በኢትዮጵያ ያመርታል።',
    },
  },
  '/products': {
    en: {
      title: 'UPVC Pressure & Sewerage Pipes | Yadenno Plastics Ethiopia',
      description: 'Explore Yadenno UPVC pressure and sewerage pipes for water supply, irrigation, boreholes and drainage projects across Ethiopia.',
    },
    am: {
      title: 'የUPVC የጫና እና የፍሳሽ ቧንቧዎች | ያደኖ ፕላስቲክስ ኢትዮጵያ',
      description: 'ለውሃ አቅርቦት፣ ለመስኖ፣ ለጥልቅ ጉድጓዶች እና ለፍሳሽ ፕሮጀክቶች በመላው ኢትዮጵያ የያደኖ UPVC የጫና እና የፍሳሽ ቧንቧዎችን ይመልከቱ።',
    },
  },
  '/about': {
    en: {
      title: 'About Yadenno Plastics PLC | Ethiopian UPVC Pipe Manufacturer',
      description: 'Learn about Yadenno Plastics PLC, its Tatek Industry Zone factory, quality controls and certified UPVC pipe manufacturing in Ethiopia.',
    },
    am: {
      title: 'ስለ ያደኖ ፕላስቲክስ ኃ.የተ.የግ.ማ | የኢትዮጵያ UPVC ቧንቧ አምራች',
      description: 'ስለ ያደኖ ፕላስቲክስ፣ በታጠቅ ኢንዱስትሪ ዞን ስለሚገኘው ፋብሪካው፣ ስለ ጥራት ቁጥጥሩ እና ስለ ተረጋገጠው የUPVC ቧንቧ ምርቱ ይወቁ።',
    },
  },
  '/contact': {
    en: {
      title: 'Request an UPVC Pipe Quote | Yadenno Plastics Ethiopia',
      description: 'Request factory pricing, availability and delivery support for Yadenno UPVC pipes. Contact sales by WhatsApp, phone or email.',
    },
    am: {
      title: 'የUPVC ቧንቧ ዋጋ ይጠይቁ | ያደኖ ፕላስቲክስ ኢትዮጵያ',
      description: 'ለያደኖ UPVC ቧንቧዎች የፋብሪካ ዋጋ፣ አቅርቦት እና የማድረሻ ድጋፍ ይጠይቁ። በWhatsApp፣ በስልክ ወይም በኢሜይል ሽያጭን ያግኙ።',
    },
  },
}

// '/products' + 'am' → '/am/products', '/' + 'am' → '/am'
export const localePath = (path, lang) => {
  if (lang !== 'am') return path
  return path === '/' ? '/am' : `/am${path}`
}

// '/' → 'https://yadenno.com/', '/am/products' → 'https://yadenno.com/am/products'
export const absoluteUrl = (path) => (path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`)
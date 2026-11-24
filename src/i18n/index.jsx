import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from './es.js'
import en from './en.js'

// Los diccionarios son objetos JS planos: cambiar de idioma es leer otra propiedad,
// sin parseo ni lógica condicional por texto.
const dictionaries = { es, en }
const STORAGE_KEY = 'lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved in dictionaries) return saved
  } catch { /* localStorage no disponible */ }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const LangContext = createContext({ t: es, lang: 'es', toggleLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = t.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription)
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignorar */ }
  }, [lang, t])

  const toggleLang = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), [])
  const value = useMemo(() => ({ t, lang, toggleLang }), [t, lang, toggleLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

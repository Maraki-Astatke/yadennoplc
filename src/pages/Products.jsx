import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Products() {
  const { t, localePath } = useLanguage()

  return (
    <div className="pt-20">
      {/* Page header */}
      <section className="bg-primary border-b border-black/5">
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t('products_title')}</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">{t('products_subtitle')}</p>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-container py-16">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col p-6 rounded-sm border border-black/10 bg-white hover:border-accent transition-colors duration-300"
            >
              <div className="h-48 sm:h-56 -mx-2 -mt-2 mb-4 overflow-hidden flex items-center justify-center">
                <img src={product.image} alt={t(product.nameKey)} className="h-full w-full object-contain" />
              </div>
              <h2 className="font-semibold text-lg text-primary mb-2">{t(product.nameKey)}</h2>
              <p className="text-base text-steel leading-relaxed mb-4 flex-1">
                {t(product.descriptionKey)}
              </p>

              <dl className="text-sm font-sans space-y-1.5 border-t border-black/5 pt-4">
                <div className="flex justify-between gap-2">
                  <dt className="text-steel">{t('products_spec_pressure')}</dt>
                  <dd className="text-primary font-semibold">{t(product.pressureKey)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-steel">{t('products_spec_diameter')}</dt>
                  <dd className="text-primary font-semibold">{t(product.diameterKey)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-steel">{t('products_spec_use')}</dt>
                  <dd className="text-primary font-semibold text-right">{t(product.useKey)}</dd>
                </div>
              </dl>

              <Link
                to={localePath('/contact')}
                className="mt-5 text-sm font-semibold text-accent hover:text-accent-dark inline-flex items-center gap-1 transition-colors"
              >
                {t('products_learn_more')} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
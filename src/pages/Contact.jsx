import { useLanguage } from '../context/LanguageContext.jsx'
import QuoteForm from '../components/QuoteForm.jsx'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <div className="pt-20">
      <section className="bg-primary border-b border-black/5">
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t('contact_title')}</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">{t('contact_subtitle')}</p>
        </div>
      </section>

      <section id="quote" className="section-container py-16 grid gap-12 lg:grid-cols-2 items-start">
        {/* Factory quotation information */}
        <div className="lg:py-8">
          <p className="text-accent font-mono text-sm font-bold uppercase tracking-widest mb-3">{t('contact_quote_eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
            {t('contact_quote_title')}
            <span className="block text-accent">{t('contact_quote_title_accent')}</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-steel">
            {t('contact_quote_desc')}
          </p>

          <div className="mt-6 grid gap-8 sm:grid-cols-2 items-start">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-1">
                {t('contact_office_label')}
              </h3>
              <p className="text-steel leading-relaxed">{t('contact_office_address')}</p>
            </div>

            <a href="tel:+251961363636" className="border-l-4 border-accent pl-4 hover:text-accent transition-colors">
              <span className="block text-xs font-mono font-bold uppercase tracking-widest text-accent">{t('contact_call_sales')}</span>
              <span className="mt-1 block text-lg font-semibold text-primary">+251 961 36 36 36</span>
            </a>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-1">
                Factory
              </h3>
              <p className="font-semibold text-primary leading-relaxed">Ashewa Meda, Tatek Industry Zone, Sheger City</p>
            </div>

            <a href="mailto:yadennoplc@gmail.com" className="border-l-4 border-accent pl-4 hover:text-accent transition-colors">
              <span className="block text-xs font-mono font-bold uppercase tracking-widest text-accent">{t('contact_email')}</span>
              <span className="mt-1 block break-all text-lg font-semibold text-primary">yadennoplc@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Quotation form */}
        <QuoteForm idPrefix="contact" />
      </section>

      <section className="mb-2 bg-primary text-white">
        <div className="section-container py-16">
          <div className="mb-8">
            <p className="text-accent font-mono text-sm font-bold uppercase tracking-widest mb-3">
              {t('contact_location_eyebrow')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('contact_location_title')}
            </h2>
          </div>
          <div className="overflow-hidden border border-white/10 bg-white/5 aspect-[16/5] min-h-[200px]">
            <iframe
              title={t('contact_map_title')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.60%2C8.85%2C39.05%2C9.15&layer=mapnik&marker=9.02%2C38.74"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <a
            href="https://www.openstreetmap.org/?mlat=9.02&mlon=38.74#map=12/9.02/38.74"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm text-accent hover:text-white transition-colors"
          >
            {t('contact_open_map')}
          </a>
        </div>
      </section>
    </div>
  )
}

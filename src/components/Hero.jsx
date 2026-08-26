import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#eaf6fc] pt-28 sm:pt-32" aria-label="Yadenno Plastics PLC hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(255,255,255,.95),transparent_38%)]" aria-hidden="true" />
      <div className="section-container relative grid min-h-[660px] items-center gap-8 py-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[.18em] text-accent before:h-[3px] before:w-9 before:bg-accent">
            {t('hero_certified')}
          </p>
          <h1 className="text-[42px] font-black leading-[.98] tracking-[-.045em] text-primary sm:text-6xl lg:text-7xl">
            {t('hero_brand_prefix')} <span className="text-accent">{t('hero_brand_plastics')}</span> {t('hero_brand_suffix')}
          </h1>
          <p className="mt-6 text-xl font-bold text-primary sm:text-2xl">{t('hero_tagline')}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-steel-dark sm:text-lg">{t('hero_description')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact#quote" className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-light">{t('nav_quote')}</Link>
            <Link to="/products" className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary transition hover:bg-primary/10 hover:-translate-y-0.5">{t('hero_cta')}</Link>
          </div>
          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-primary/15 pt-6">
            <div><strong className="block text-base text-primary sm:text-xl">50–250 mm</strong><span className="text-[10px] font-bold uppercase tracking-wider text-steel">{t('home_spec_diameter')}</span></div>
            <div><strong className="block text-base text-primary sm:text-xl">PN4–PN16</strong><span className="text-[10px] font-bold uppercase tracking-wider text-steel">{t('home_spec_pressure')}</span></div>
            <div><strong className="block text-sm text-primary sm:text-lg">ES ISO 1452</strong><span className="text-[10px] font-bold uppercase tracking-wider text-steel">{t('home_spec_quality')}</span></div>
          </div>
        </div>

        <div className="relative min-h-[390px] lg:min-h-[560px]">
          <div className="absolute inset-0 overflow-hidden rounded-[30px_30px_8px_30px] border border-[#c7e1ee] bg-white shadow-[0_28px_75px_rgba(19,45,70,.16)]">
            <img
              src="/orange-bg.webp"
              alt="Yadenno UPVC pipe range"
              fetchPriority="high"
              className="h-full w-full object-contain p-3 sm:p-6"
            />
          </div>
          <div className="absolute -bottom-3 -left-3 flex h-24 w-24 flex-col items-center justify-center rounded-full border-[6px] border-[#eaf6fc] bg-primary text-center text-white sm:h-32 sm:w-32">
            <strong className="text-sm tracking-wider text-accent sm:text-base">QUALITY</strong>
            <span className="mt-1 max-w-20 text-[8px] leading-tight sm:text-[10px]">Checked pipe by pipe</span>
          </div>
        </div>
      </div>
    </section>
  )
}

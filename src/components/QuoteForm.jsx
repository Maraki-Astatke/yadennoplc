import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const INITIAL_FORM = { name: '', phone: '', diameter: '', pnClass: '', orderDetails: '' }

/**
 * Factory quotation form: collects order details and hands them off to
 * WhatsApp as a pre-filled message. Used on both the Home and Contact
 * pages so the logic and field set only need to be maintained in one
 * place. `idPrefix` keeps input ids unique when the form is rendered
 * more than once on the same page.
 */
export default function QuoteForm({ idPrefix = 'quote' }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (submitted) setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = [
      'Hello Yadenno Sales, I would like a factory quotation.',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Pipe diameter: ${form.diameter}`,
      `PN class: ${form.pnClass}`,
      `Order details: ${form.orderDetails}`,
    ].join('\n')
    window.open(`https://wa.me/251961363636?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    setForm(INITIAL_FORM)
  }

  const fields = [
    { id: `${idPrefix}-name`, key: 'name', label: t('home_full_name'), type: 'text', placeholder: t('home_full_name_placeholder') },
    { id: `${idPrefix}-phone`, key: 'phone', label: t('home_phone_number'), type: 'tel', placeholder: '+251 9XX XXX XXX' },
    { id: `${idPrefix}-diameter`, key: 'diameter', label: t('home_pipe_diameter'), type: 'text', placeholder: t('home_pipe_diameter_placeholder') },
    { id: `${idPrefix}-pn-class`, key: 'pnClass', label: t('home_pn_class'), type: 'text', placeholder: t('home_pn_class_placeholder') },
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-full grid-cols-1 sm:grid-cols-2 gap-5 rounded-sm border-2 border-accent/30 bg-surface-light p-6 sm:p-8"
    >
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-primary">{field.label}</label>
          <input
            id={field.id}
            name={field.key}
            type={field.type}
            required
            value={form[field.key]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full rounded-md border border-black/10 bg-white px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      ))}

      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-order-details`} className="mb-1.5 block text-sm font-medium text-primary">{t('home_order_details')}</label>
        <textarea
          id={`${idPrefix}-order-details`}
          name="orderDetails"
          required
          value={form.orderDetails}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none rounded-md border border-black/10 bg-white px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button type="submit" className="btn-accent inline-flex w-full justify-center sm:col-span-2">
        {t('hero_whatsapp')}
      </button>

      {submitted && (
        <p className="text-sm text-green-600 text-center sm:col-span-2 pt-2">
          {t('contact_form_success')}
        </p>
      )}
      <p className="text-center text-sm text-steel sm:col-span-2">{t('home_quote_note')}</p>
    </form>
  )
}

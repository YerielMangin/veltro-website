import { useState } from 'react'
import SectionWrapper from '../components/shared/SectionWrapper'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/ui/MagneticButton'

const contactCards = [
  {
    icon: 'payments',
    title: 'Sales',
    description: "Interested in Veltro for your team? Let's talk about how we can accelerate your operations.",
    email: 'sales@getveltro.com',
  },
  {
    icon: 'support_agent',
    title: 'Support',
    description: "Already a customer? We're here to help you solve any operational challenge or technical issue.",
    email: 'support@getveltro.com',
  },
  {
    icon: 'handshake',
    title: 'Partnerships',
    description: "Want to integrate or resell? Let's explore how we can build a better operational ecosystem together.",
    email: 'partners@getveltro.com',
  },
]

function InputField({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="font-label text-[10px] uppercase tracking-widest text-primary/60 px-1 block">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'bg-surface-container-high rounded-[1.5rem] px-5 py-4 font-body border-0 outline-none focus:bg-surface-container-highest focus:ring-1 focus:ring-primary/10 w-full transition-colors duration-200'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 bg-surface">
        <ScrollReveal>
          <h2 className="font-headline font-bold text-primary/60 tracking-tight text-xl mb-2">
            Get in touch
          </h2>
          <h1 className="font-display italic text-5xl md:text-7xl text-primary leading-tight">
            We'd love to hear from you.
          </h1>
        </ScrollReveal>
      </header>

      {/* Content */}
      <SectionWrapper className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left — Form */}
          <ScrollReveal>
            <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_40px_60px_-15px_rgba(24,42,33,0.04)]">
              {submitted ? (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
                    check_circle
                  </span>
                  <h3 className="font-headline font-bold text-2xl text-primary mb-2">Message sent!</h3>
                  <p className="font-body text-primary/60">We typically respond within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name">
                      <input type="text" placeholder="John" className={inputClass} />
                    </InputField>
                    <InputField label="Last Name">
                      <input type="text" placeholder="Doe" className={inputClass} />
                    </InputField>
                  </div>

                  <InputField label="Email">
                    <input type="email" placeholder="john@company.com" className={inputClass} />
                  </InputField>

                  <InputField label="Company">
                    <input type="text" placeholder="Veltro Corp" className={inputClass} />
                  </InputField>

                  <InputField label="Subject">
                    <select className={inputClass + ' text-primary/60'}>
                      <option>General Inquiry</option>
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Partnership</option>
                    </select>
                  </InputField>

                  <InputField label="Message">
                    <textarea
                      placeholder="How can we help you?"
                      rows={4}
                      className={inputClass + ' resize-none'}
                    />
                  </InputField>

                  <div className="pt-2 flex flex-col gap-4">
                    <MagneticButton
                      variant="clay"
                      className="w-full justify-center py-4 text-lg"
                      type="submit"
                    >
                      Send Message
                      <span className="material-symbols-outlined text-xl">send</span>
                    </MagneticButton>
                    <p className="font-label text-[11px] text-primary/40 text-center tracking-tight">
                      We typically respond within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right — Info Cards */}
          <div className="space-y-4">
            {contactCards.map((card) => (
              <ScrollReveal key={card.title}>
                <div className="rounded-xl bg-surface-container-low p-6 flex items-start gap-6 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">{card.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline font-bold text-xl text-primary">{card.title}</h3>
                    <p className="font-body text-on-surface/60 leading-relaxed">{card.description}</p>
                    <a
                      href={`mailto:${card.email}`}
                      className="inline-block font-label text-secondary font-bold hover:underline"
                    >
                      {card.email}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

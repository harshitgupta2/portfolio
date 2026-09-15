import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'
import MagneticButton from '../components/MagneticButton'
import { site, toHref } from '../data/site'

const ease = [0.16, 1, 0.3, 1]

export default function Contact() {
  const email = toHref(site.email, { mailto: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })


  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  /**
   * No server to post to, so the form hands off to the visitor's mail client
   * with everything already written. It says so under the button.
   */
  const onSubmit = (event) => {
    event.preventDefault()
    if (!email) return
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `${email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-pad" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Contact"
          title="Let's build something."
          subtitle="Looking for a software developer who enjoys learning, solving problems and building useful products? Let's connect."
          id="contact-title"
        />

        <div className="grid-12 mt-14 gap-y-12 lg:mt-20">
          {/* Direct channels sit in the rail, matching every other section. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5"
          >
            <MagneticButton
              href={email}
              arrow="right"
              variant="solid"
              unavailableLabel="Add your email address in src/data/site.js"
            >
              Get in touch
            </MagneticButton>

          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            onSubmit={onSubmit}
            className="lg:col-span-6 lg:col-start-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" value={form.name} onChange={update('name')} />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <Field
              id="message"
              label="Message"
              textarea
              className="mt-4"
              value={form.message}
              onChange={update('message')}
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <MagneticButton type="submit" variant="solid" arrow="right" disabled={!email}>
                Send message
              </MagneticButton>
              <p className="max-w-[22rem] text-sm text-muted">
                {email
                  ? 'Opens in your mail app with the message ready to send.'
                  : 'Add your email address in src/data/site.js to enable this form.'}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, type = 'text', textarea = false, className = '', ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="t-label mb-2 block text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={6} required className="field resize-y" {...rest} />
      ) : (
        <input id={id} name={id} type={type} required className="field" {...rest} />
      )}
    </div>
  )
}

import { ArrowUp, Mail } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { site, toHref } from '../data/site'
import { scrollToTop } from '../utils/smoothScroll'

export default function Footer() {
  const links = [
    { label: 'GitHub', href: toHref(site.github), Icon: SiGithub },
    { label: 'LinkedIn', href: toHref(site.linkedin), Icon: FaLinkedinIn },
    { label: 'Email', href: toHref(site.email, { mailto: true }), Icon: Mail },
  ]

  return (
    <footer className="section-line bg-surface/40">
      <div className="shell py-12 sm:py-14">
        <div className="flex flex-col gap-8 border-b border-[color:var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[1.5rem] tracking-tight">{site.name}</p>
            <p className="mt-1 text-muted">
              {site.role} / {site.secondaryRole}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {links.map(({ label, href, Icon }) =>
              href ? (
                <li key={label}>
                  <a
                    href={href}
                    {...(label === 'Email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex h-11 items-center gap-2.5 rounded-full border border-[color:var(--line)] px-4 text-sm no-underline transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-accent-soft"
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ) : (
                <li
                  key={label}
                  className="flex h-11 items-center gap-2.5 rounded-full border border-[color:var(--line)] px-4 text-sm text-muted opacity-50"
                  title={`Add your ${label} link in src/data/site.js`}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-5 pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-fg"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line)] transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:border-accent">
              <ArrowUp size={15} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}

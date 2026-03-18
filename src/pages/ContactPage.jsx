import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { SplitLines } from '../components/Splittext'
import MagneticButton from '../components/MagenticButton'

const contacts = [
  { label: 'Email', value: 'naseefrahman90@gmail.com', href: 'mailto:naseefrahman90@gmail.com', copy: true },
  { label: 'LinkedIn', value: 'linkedin.com/naseefu', href: 'https://www.linkedin.com/in/naseefu-rahman-karumannil/', copy: false },
  { label: 'GitHub', value: 'github.com/naseefu', href: 'https://github.com/naseefu', copy: false },
]

function ContactRow({ item, index }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!item.copy) return
    navigator.clipboard.writeText(item.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="contact-row"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      whileHover={{ background: '#fafafa' }}
    >
      <span className="contact-row-label">{item.label}</span>
      <a href={item.href} target={item.copy ? '_self' : '_blank'} rel="noopener noreferrer" className="contact-row-value">
        {item.value}
      </a>
      {item.copy && (
        <motion.button
          className={`contact-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg> Copy</>
          )}
        </motion.button>
      )}
      {!item.copy && (
        <motion.a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-copy-btn"
          whileHover={{ scale: 1.05 }}
        >
          ↗ Open
        </motion.a>
      )}
    </motion.div>
  )
}

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, wire to EmailJS / Formspree / backend
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <PageTransition>
      <div className="page-wrapper">
        <div className="page-header">
          <SplitLines lines={["Let's get to", 'know each other']} className="page-title-huge" delay={0.1} />
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Open to new opportunities, collaborations, and interesting conversations.
          </motion.p>
        </div>

        <div className="contact-grid">
          {/* Left: contact links */}
          <div className="contact-links-col">
            <motion.p
              className="contact-col-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Reach me at
            </motion.p>
            <div className="contact-rows">
              {contacts.map((c, i) => (
                <ContactRow key={c.label} item={c} index={i} />
              ))}
            </div>

            <motion.div
              className="contact-availability"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="status-dot-green" style={{ display: 'inline-block' }} />
              <p>Currently <strong>available</strong> for freelance projects in backend / distributed systems engineering.</p>
            </motion.div>
          </div>

          {/* Right: message form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="contact-col-label">Send a message</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-row">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-row">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                />
              </div>
              <MagneticButton
                className={`form-submit-btn ${sent ? 'sent' : ''}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {sent ? '✓ Message sent!' : 'Send message →'}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
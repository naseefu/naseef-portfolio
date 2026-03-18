import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SplitLines } from './Splittext'
import MagneticButton from './MagenticButton'

const footerLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Articles', to: '/articles' },
  { label: 'Awards', to: '/awards' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const copyEmail = () => {
    navigator.clipboard.writeText('naseefrahman90@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer className="footer" id="contact">
      <div ref={ref} className="footer-cta">
        <SplitLines lines={["Let's get to know", 'each other']} className="footer-title-huge" delay={0.05} />
        <motion.div style={{ marginTop: 60 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}>
          <MagneticButton className={`footer-email-btn ${copied ? 'copied' : ''}`} onClick={copyEmail}>
            <span>{copied ? 'EMAIL COPIED!' : 'N.RAHMAN@EMAIL.COM'}</span>
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div className="footer-nav-row"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.65, duration: 0.5 }}>
        {footerLinks.map(({ label, to }) => (
          <Link key={label} to={to} className="footer-nav-link">{label}</Link>
        ))}
      </motion.div>

      <motion.div className="footer-bottom"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}>
        <div className="footer-socials">
          {[['LI','https://www.linkedin.com/in/naseefu-rahman-karumannil/'],['GH','https://github.com/naseefu'],['TW','https://x.com/naseefur']].map(([label, href]) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="footer-social-link" whileHover={{ opacity: 0.4 }}>
              {label}
            </motion.a>
          ))}
        </div>
        <p className="footer-copy">NASEEFU RAHMAN – {new Date().getFullYear()}©</p>
      </motion.div>
    </footer>
  )
}
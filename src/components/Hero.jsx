import { useState } from 'react'
import { motion } from 'framer-motion'
import { SplitLines } from './SplitText'
import MagneticButton from './MagenticButton'

// ── SET YOUR PHOTO URL HERE ──────────────────────────────────────
// Paste a direct image URL (Cloudinary, GitHub, etc.)
// Leave empty string "" to show the animated initials fallback
const PROFILE_IMAGE_URL = "https://github.com/naseefu/naseef-portfolio/blob/main/naseefuDP.png?raw=true"
// ────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] },
})

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('naseefrahman90@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        {/* LEFT: Avatar */}
        <motion.div className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}>
          <div className="hero-avatar-wrap">
            <motion.div className="hero-avatar-circle"
              animate={PROFILE_IMAGE_URL ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              {PROFILE_IMAGE_URL ? (
                <img
                  src={PROFILE_IMAGE_URL}
                  alt="Naseef Rahman"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <span className="hero-avatar-initials">NR</span>
              )}
            </motion.div>

            {/* rotating orbit ring */}
            <motion.div style={{
              position: 'absolute', inset: -10,
              border: '1px dashed rgba(10,10,10,0.15)',
              borderRadius: '50%',
            }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

            {/* status badge */}
            <motion.div className="hero-badge-pill"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
              <span className="status-dot-green" />
              Available for freelance
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Text */}
        <div className="hero-right">
          <motion.p className="hero-eyebrow" {...fadeUp(0.35)}>
            Backend & Product Engineer
          </motion.p>
          <SplitLines lines={['Backend', 'Engineer.']} className="hero-title" delay={0.45} />
          <motion.p className="hero-desc" {...fadeUp(0.75)}>
            Currently leading the design & development of TCS's enterprise
            notification platform called "Alerts & Notification Hub."
          </motion.p>
          <motion.p className="hero-desc" style={{ marginTop: 14 }} {...fadeUp(0.82)}>
            In my spare time, I build side projects and explore AI-integrated
            distributed systems.
          </motion.p>
          <motion.div className="hero-email-row" {...fadeUp(0.95)}>
            <MagneticButton className={`hero-email-btn ${copied ? 'copied' : ''}`} onClick={copyEmail}>
              {copied ? (
                <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>EMAIL COPIED!</span></>
              ) : (
                <><span>N.RAHMAN@EMAIL.COM</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></>
              )}
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

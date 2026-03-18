import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import awards from '../data/Awards.json'
import PageTransition from '../components/PageTransition'
import { SplitWords } from '../components/SplitText'

function AwardPopup({ award, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  // Reset loading state whenever a new award opens
  const handleOpen = () => setImgLoaded(false)

  return (
    <AnimatePresence>
      {award && (
        <>
          <motion.div
            className="award-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <div className="award-popup-positioner">
            <motion.div
              className="award-popup"
              initial={{ opacity: 0, scale: 0.82, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onAnimationStart={handleOpen}
            >
              <motion.button
                className="award-popup-close"
                onClick={onClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
                aria-label="Close"
              >
                ✕
              </motion.button>

              <motion.div
                className="award-popup-shine"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ delay: 0.35, duration: 0.9, ease: 'easeInOut' }}
              />

              <motion.div
                className="award-popup-img-wrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {/* Skeleton — sits behind the image, hidden once loaded */}
                {!imgLoaded && (
                  <div className="award-popup-skeleton">
                    <div className="award-popup-skeleton-shimmer" />
                  </div>
                )}

                <img
                  src={award.awardUrl}
                  alt={award.title}
                  className="award-popup-img"
                  style={{ opacity: imgLoaded ? 1 : 0 }}
                  onLoad={() => setImgLoaded(true)}
                />
              </motion.div>

              <motion.div
                className="award-popup-info"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
              >
                <span className="award-popup-emoji">{award.emoji}</span>
                <h2 className="award-popup-title">{award.title}</h2>
                <p className="award-popup-org">{award.org} · {award.year}</p>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function AwardCard({ award, index, onView }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="award-card"
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.1}s`,
      }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
    >
      <div className="award-card-top">
        <motion.span
          className="award-card-emoji"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
        >
          {award.emoji}
        </motion.span>
        <span className="award-card-category">{award.category}</span>
      </div>

      <h3 className="award-card-title">{award.title}</h3>
      <p className="award-card-org">{award.org} · {award.year}</p>
      <p className="award-card-desc">{award.desc}</p>

      {award.awardUrl && (
        <motion.button
          className="award-view-btn"
          onClick={() => onView(award)}
          whileHover="hover"
        >
          View Award
          <motion.span
            className="award-view-btn-arrow"
            variants={{ hover: { x: 4 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            →
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default function AwardsPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })
  const [activeAward, setActiveAward] = useState(null)

  return (
    <PageTransition>
      <div className="page-wrapper">
        <div className="page-header">
          <SplitWords text="Awards" className="page-title-huge" delay={0.1} />
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Recognition for performance, innovation & impact
          </motion.p>
        </div>

        <div
          ref={statsRef}
          className="awards-stats-row"
          style={{ opacity: statsInView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}
        >
          {[
            { num: awards.length, label: 'Total Awards' },
            { num: '1+', label: 'Years at TCS' },
            { num: '5', label: 'TCS Recognitions' },
          ].map(({ num, label }) => (
            <div className="awards-stat" key={label}>
              <span className="awards-stat-num">{num}</span>
              <span className="awards-stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="awards-grid">
          {awards.map((a, i) => (
            <AwardCard key={a.id} award={a} index={i} onView={setActiveAward} />
          ))}
        </div>
      </div>

      <AwardPopup award={activeAward} onClose={() => setActiveAward(null)} />
    </PageTransition>
  )
}

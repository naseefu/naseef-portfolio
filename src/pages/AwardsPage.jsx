import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import awards from '../data/Awards.json'
import PageTransition from '../components/PageTransition'
import { SplitWords } from '../components/Splittext'

function AwardCard({ award, index }) {
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
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        >{award.emoji}</motion.span>
        <span className="award-card-category">{award.category}</span>
      </div>
      <h3 className="award-card-title">{award.title}</h3>
      <p className="award-card-org">{award.org} · {award.year}</p>
      <p className="award-card-desc">{award.desc}</p>
    </motion.div>
  )
}

export default function AwardsPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <PageTransition>
      <div className="page-wrapper">
        <div className="page-header">
          <SplitWords text="Awards" className="page-title-huge" delay={0.1} />
          <motion.p className="page-subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}>
            Recognition for performance, innovation & impact
          </motion.p>
        </div>

        <div
          ref={statsRef}
          className="awards-stats-row"
          style={{ opacity: statsInView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}
        >
          {[{ num: awards.length, label: 'Total Awards' }, { num: '1+', label: 'Years at TCS' }, { num: '5', label: 'TCS Recognitions' }].map(({ num, label }) => (
            <div className="awards-stat" key={label}>
              <span className="awards-stat-num">{num}</span>
              <span className="awards-stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="awards-grid">
          {awards.map((a, i) => <AwardCard key={a.id} award={a} index={i} />)}
        </div>
      </div>
    </PageTransition>
  )
}
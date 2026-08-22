import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitWords } from './SplitText'
import { useApi } from '../hooks/useApi'
import { api } from '../api/client'

function StackCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="stack-card"
      style={{
        background: item.color,
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.07}s`,
        // no y-transform — avoids pointer-event blocking
      }}
      whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}
    >
      <div className="stack-card-header">
        <motion.span
          className="stack-emoji"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        >{item.emoji}</motion.span>
        <span className="stack-category" style={{ color: item.accent }}>{item.category}</span>
      </div>
      <h3 className="stack-name" style={{color:'black'}}>{item.name}</h3>
      <p className="stack-desc">{item.desc}</p>
    </motion.div>
  )
}

export default function FavStack() {
  const { data: stackList, loading } = useApi(() => api.getStack())
  const stack = stackList || []

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="favstack-section">
      <div ref={headerRef} className="section-header-row">
        <SplitWords text="Favourite Stack" className="section-title-large" delay={0} />
        <motion.p
          className="section-count"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >{stack.length} technologies</motion.p>
      </div>
      <div className="stack-grid">
        {stack.map((item, i) => <StackCard key={item.name} item={item} index={i} />)}
      </div>
    </section>
  )
}

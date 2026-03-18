import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Motivation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section className="motivation-section" ref={ref}>
      {/* Marquee lines */}
      <div className="motivation-marquee-wrap">
        <motion.div className="motivation-marquee-row" style={{ x: x1 }}>
          {['Build.', 'Ship.', 'Scale.', 'Repeat.', 'Build.', 'Ship.', 'Scale.', 'Repeat.', 'Build.', 'Ship.', 'Scale.', 'Repeat.'].map((w, i) => (
            <span key={i} className={`marquee-word ${i % 2 === 0 ? 'marquee-filled' : 'marquee-outline'}`}>{w}</span>
          ))}
        </motion.div>
        <motion.div className="motivation-marquee-row" style={{ x: x2 }}>
          {['Code.', 'Deploy.', 'Iterate.', 'Grow.', 'Code.', 'Deploy.', 'Iterate.', 'Grow.', 'Code.', 'Deploy.', 'Iterate.', 'Grow.'].map((w, i) => (
            <span key={i} className={`marquee-word ${i % 2 !== 0 ? 'marquee-filled' : 'marquee-outline'}`}>{w}</span>
          ))}
        </motion.div>
      </div>

      {/* Central quote */}
      <motion.div
        className="motivation-quote"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <span className="motivation-quote-mark">"</span>
        <p className="motivation-quote-text">
          I believe great software is invisible — it just works, reliably, at any scale.
          Every system I build is a step toward that ideal.
        </p>
        <p className="motivation-quote-author">— Naseef Rahman, Backend Engineer</p>
      </motion.div>
    </section>
  )
}
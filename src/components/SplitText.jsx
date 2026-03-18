import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function SplitWords({ text, className, style, delay = 0, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'block', overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.06,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SplitLines({ lines, className, style, delay = 0}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <span ref={ref} className={className} style={{ display: 'block', ...style }}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
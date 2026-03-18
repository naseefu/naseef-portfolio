import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => { setDone(true); onDone() }, 300)
          return 100
        }
        return prev + Math.floor(Math.random() * 14) + 4
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, background: '#0a0a0a',
            zIndex: 9998, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 32,
          }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            style={{
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ffffff',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Naseefu Rahman
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: '#ffffff', borderRadius: 1 }}
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(count, 100)}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>

          <div style={{
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {Math.min(count, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.92 }}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="theme-toggle-track"
        animate={{ background: dark ? '#1a1a1a' : '#e5e5e5' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="theme-toggle-thumb"
          animate={{ x: dark ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span style={{ fontSize: '0.6rem', lineHeight: 1, color:!dark?'white':'black' }}>
            {dark ? 'D' : 'L'}
          </span>
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
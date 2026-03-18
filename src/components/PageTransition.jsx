import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

export default function PageTransition({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}
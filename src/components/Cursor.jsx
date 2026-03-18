import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function isMobile() {
  return window.matchMedia('(max-width: 900px)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
}

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [mobile, setMobile] = useState(isMobile)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const scaleMotion = useMotionValue(1)
  const springX = useSpring(cursorX, { damping: 20, stiffness: 300, mass: 0.5 })
  const springY = useSpring(cursorY, { damping: 20, stiffness: 300, mass: 0.5 })
  const scaleSpring = useSpring(scaleMotion, { damping: 18, stiffness: 280 })

  useEffect(() => {
    const onResize = () => setMobile(isMobile())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (mobile) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => scaleMotion.set(2.4)
    const leave = () => scaleMotion.set(1)

    window.addEventListener('mousemove', move)

    const attach = () => {
      document.querySelectorAll('a, button, .project-row, .tag, .skill-tag, .award-chip, .expertise-row, .stack-card, .work-card, .article-card, .award-card, .timeline-row, .exp-card').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [mobile])

  if (mobile || !visible) return null

  return (
    <>
      <motion.div style={{
        position: 'fixed', left: springX, top: springY, x: '-50%', y: '-50%',
        width: 36, height: 36, border: '1.5px solid rgba(10,10,10,0.35)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999, scale: scaleSpring,
      }} />
      <motion.div style={{
        position: 'fixed', left: cursorX, top: cursorY, x: '-50%', y: '-50%',
        width: 5, height: 5, background: '#0a0a0a', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999,
      }} />
    </>
  )
}
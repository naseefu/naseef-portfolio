import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitWords } from './SplitText'
import { useApi } from '../hooks/useApi'
import { api } from '../api/client'

function TimelineRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <div
      ref={ref}
      className="timeline-row"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <p className="timeline-period">{item.period}</p>
      <div>
        <p className="timeline-role-company">{item.role}</p>
        <p className="timeline-location">{item.location}</p>
        <p className="timeline-desc-text">{item.desc}</p>
      </div>
    </div>
  )
}

export default function About() {
  const { data: profile } = useApi(() => api.getProfile())
  const about = profile?.about || {}
  const skills    = about.skills    || []
  const timeline  = about.timeline  || []
  const awardChips = about.awardChips || []

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const bioRef = useRef(null)
  const bioInView = useInView(bioRef, { once: true, margin: '-40px' })
  const skillsRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-40px' })

  return (
    <section className="about-section" id="about">
      <div ref={headerRef} className="about-header">
        <SplitWords text="About" className="about-title-huge" delay={0} />
      </div>

      <div className="about-bio-row" ref={bioRef}>
        <div
          className="about-bio-left"
          style={{ opacity: bioInView ? 1 : 0, transition: 'opacity 0.7s ease 0.05s' }}
        >
          <p className="about-tagline">
            {about.tagline || 'Building robust backend systems that scale without breaking a sweat.'}
          </p>
        </div>
        <div
          className="about-bio-right"
          style={{ opacity: bioInView ? 1 : 0, transition: 'opacity 0.7s ease 0.18s' }}
        >
          <p className="about-bio-text">
            {about.bio || ''}
          </p>
          <div className="about-skills" ref={skillsRef}>
            {skills.map((s, i) => (
              <motion.span
                className="skill-tag" key={s}
                style={{ opacity: skillsInView ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.04}s` }}
                whileHover={{ scale: 1.1, y: -2 }}
              >{s}</motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="timeline-rows">
        {timeline.map((item, i) => <TimelineRow key={i} item={item} index={i} />)}
      </div>

      <div className="awards-strip">
        {awardChips.map((a, i) => (
          <motion.span
            className="award-chip" key={a.label}
            style={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span>{a.emoji}</span><span>{a.label}</span>
          </motion.span>
        ))}
      </div>
    </section>
  )
}

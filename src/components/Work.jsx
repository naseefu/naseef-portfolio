import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SplitWords } from './Splittext'
import projects from '../data/projects.json'

const featured = projects.slice(0, 3)

function ProjectMedia({ bg, emoji, accentBg, image, name }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <div
      className="project-row-image"
      ref={ref}
      style={{ background: image ? '#111' : bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div className="project-row-image-inner" style={{ y }}>
        {image ? (
          <motion.img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', scale }} />
        ) : (
          <motion.div
            style={{ background: accentBg, borderRadius: 28, width: '72%', height: '72%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 32px 80px rgba(0,0,0,0.13)', scale }}
            animate={hovered ? { scale: 1.06, rotate: 1 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              style={{ fontSize: '4.5rem', display: 'block' }}
              animate={hovered ? { scale: 1.2, rotate: -8 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
            >{emoji}</motion.span>
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.08)',
              display: 'flex', alignItems: 'flex-end', padding: 32, pointerEvents: 'none' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.span
              style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: '0.72rem',
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: image ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.5)' }}
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            >{name}</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectRow({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="project-row" ref={ref}>
      <ProjectMedia bg={project.bg} emoji={project.emoji} accentBg={project.accentBg} image={project.image} name={project.name} />
      <div
        className="project-row-content"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
        }}
      >
        <p className="project-number">{project.num} — Project</p>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map(t => (
            <motion.span className="tag" key={t} whileHover={{ scale: 1.08 }}>{t}</motion.span>
          ))}
        </div>
        <Link to={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
          <span className="project-cta">View case study →</span>
        </Link>
      </div>
    </div>
  )
}

export default function Work() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const footerRef = useRef(null)
  const footerInView = useInView(footerRef, { once: true })

  return (
    <section className="work-section" id="work">
      <div ref={headerRef} className="work-header">
        <SplitWords text="Featured work" className="work-title-huge" delay={0} />
        <p className="work-subtitle" style={{ opacity: headerInView ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
          (scroll to explore)
        </p>
      </div>

      <div className="projects-list">
        {featured.map(p => <ProjectRow key={p.id} project={p} />)}
      </div>

      {/* View all — plain div, no y-transform that could offset click target */}
      <div
        ref={footerRef}
        className="work-view-all"
        style={{ opacity: footerInView ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <Link to="/work" className="work-view-all-link">
          View all {projects.length} projects →
        </Link>
      </div>
    </section>
  )
}
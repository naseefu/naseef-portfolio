import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import projects from '../data/projects.json'
import PageTransition from '../components/PageTransition'
import { SplitWords } from '../components/Splittext'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}>
      <Link to={`/work/${project.id}`} className="work-card-link">
        <div className="work-card">
          <div className="work-card-image" style={{ background: project.image ? '#000' : project.bg }}>
            {project.image ? (
              <img src={project.image} alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <motion.div className="work-card-emoji"
                style={{ background: project.accentBg }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}>
                {project.emoji}
              </motion.div>
            )}
          </div>
          <div className="work-card-body">
            <div className="work-card-top">
              <span className="work-card-num">{project.num}</span>
              <span className="work-card-status">{project.status}</span>
            </div>
            <h3 className="work-card-name">{project.name}</h3>
            <p className="work-card-tagline">{project.tagline}</p>
            <p className="work-card-desc">{project.desc}</p>
            <div className="work-card-tags">
              {project.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="work-card-footer">
              <span className="work-card-company">{project.company} · {project.year}</span>
              <motion.span className="work-card-arrow" whileHover={{ x: 4 }}>
                View case study →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WorksPage() {
  return (
    <PageTransition>
      <div className="page-wrapper">
        <div className="page-header">
          <SplitWords text="All Work" className="page-title-huge" delay={0.1} />
          <motion.p className="page-subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}>
            {projects.length} projects across backend, fullstack & AI
          </motion.p>
        </div>
        <div className="works-grid">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </PageTransition>
  )
}
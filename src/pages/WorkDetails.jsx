import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import projects from '../data/Projects.json'
import PageTransition from '../components/PageTransition'
import { SplitLines } from '../components/Splittext'

export default function WorkDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const currentIndex = projects.findIndex(p => p.id === id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  if (!project) return (
    <div style={{ textAlign: 'center', paddingTop: 160 }}>
      <h2>Project not found</h2>
      <Link to="/work">← Back to Work</Link>
    </div>
  )

  const paragraphs = project.fullDesc.split('\n\n')

  return (
    <PageTransition>
      <div className="work-detail-wrapper">

        {/* Hero */}
        <div
          className="work-detail-hero"
          style={{ background: project.image ? '#000' : project.bg }}
        >
          <div className="work-detail-hero-inner">
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9
                }}
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              />
            ) : (
              <motion.div
                className="work-detail-emoji-wrap"
                style={{ background: project.accentBg }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <motion.span
                  style={{ fontSize: '5rem', display: 'block' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {project.emoji}
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="work-detail-header">
          <div className="work-detail-meta-row">
            <span className="work-detail-num">{project.num}</span>
            <span className="work-detail-status">{project.status}</span>
            <span className="work-detail-company">
              {project.company} · {project.year}
            </span>
          </div>

          <SplitLines
            lines={[project.name]}
            className="work-detail-title"
            delay={0.1}
          />

          <motion.p
            className="work-detail-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {project.tagline}
          </motion.p>
        </div>

        {/* Content */}
        <div className="work-detail-grid">

          {/* LEFT */}
          <div className="work-detail-left">

            {/* Overview */}
            <motion.div
              className="work-detail-section"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="work-detail-section-title">Overview</h3>
              {paragraphs.map((p, i) => (
                <p key={i} className="work-detail-body-text">{p}</p>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="work-detail-section"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <h3 className="work-detail-section-title">Key Highlights</h3>
              <ul className="work-detail-highlights">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="work-detail-highlight-item"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.07,
                      duration: 0.5
                    }}
                  >
                    <span className="highlight-arrow">→</span>
                    {h}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

{project.architectureGif && (
  <motion.div
    className="work-detail-section"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <h3 className="work-detail-section-title">
      Architecture Diagram
    </h3>

    <div className="architecture-diagram-wrapper">
      <img
        src={project.architectureGif}
        alt={`${project.name} architecture`}
        className="architecture-diagram"
        loading="lazy"
      />
    </div>
  </motion.div>
)}

          </div>

          {/* RIGHT SIDEBAR */}
          <motion.div
            className="work-detail-sidebar"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.65 }}
          >
            <div className="sidebar-card">
              {[
                ['Role', project.role],
                ['Company', project.company],
                ['Year', project.year],
                ['Status', project.status]
              ].map(([label, value]) => (
                <div className="sidebar-row" key={label}>
                  <span className="sidebar-label">{label}</span>
                  <span className={`sidebar-value ${label === 'Status' ? 'sidebar-status' : ''}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="sidebar-card">
              <p className="sidebar-label" style={{ marginBottom: 14 }}>
                Tech Stack
              </p>
              <div className="sidebar-tags">
                {project.tech.map(t => (
                  <motion.span
                    key={t}
                    className="tag"
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="sidebar-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-link-btn"
              >
                <span>GitHub</span><span>↗</span>
              </a>

              {project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-link-btn"
                >
                  <span>Live</span><span>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Next Project */}
        <div className="work-detail-next">
          <p className="next-label">Next Project</p>

          <Link to={`/work/${nextProject.id}`} className="next-project-link">
            <motion.div
              className="next-project-row"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="next-project-emoji"
                style={{
                  background: nextProject.image ? '#000' : '#f5f5f5'
                }}
              >
                {nextProject.image ? (
                  <img
                    src={nextProject.image}
                    alt={nextProject.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 12
                    }}
                  />
                ) : (
                  nextProject.emoji
                )}
              </div>

              <div>
                <h3 className="next-project-name">{nextProject.name}</h3>
                <p className="next-project-tagline">{nextProject.tagline}</p>
              </div>

              <span className="next-arrow">→</span>
            </motion.div>
          </Link>
        </div>

      </div>
    </PageTransition>
  )
}
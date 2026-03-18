import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitWords } from './Splittext'

const experience = [
  {
    company: 'Tata Consultancy Services',
    logoUrl: 'https://cdn.brandfetch.io/idK2mWG2SJ/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    logoFallback: 'TCS',
    logoColor: '#e8f0f5',
    location: 'Kochi, Kerala, India',
    roles: [
      {
        title: 'Product Engineer',
        period: 'May 2025 – Present',
        duration: '11 mos',
        type: 'Full-time',
        bullets: [
          'Designed and implemented event-driven alert processing using Apache Kafka and ActiveMQ for registering, processing, and delivering notifications',
          'Integrated Kafka producers/consumers and ActiveMQ listeners for alert registration, message routing, and multi-channel notification delivery',
          'Implemented delayed message handling using ActiveMQ native delay and a custom Kafka delay mechanism via DB-backed scheduler (AN_DELAYEDMESSAGE)',
          'Built a fail-safe registration utility (an-register-utility) to persist alert payloads during ANHUB downtime (AN_DBREGISTRATION) and replay them after recovery',
          'Developed a bulk resend service to reprocess failed notifications due to unreachable channels or on-hold/delayed states',
          'Designed and implemented asynchronous notification sending to improve throughput and scalability',
          'Successfully tested notification delivery to 20,000+ subscribers/day',
          'Identified performance issues from growing JPA persistence context; implemented manual EntityManager flush and clear after configurable thresholds (200–300 entities via YAML)',
          'Optimized data access by eliminating nested queries, adding batch inserts, and reducing unnecessary database interactions — achieved ~60% reduction in DB calls and ~50–70% improvement in processing latency',
          'Implemented a centralized notification integration utility supporting Email, SMS, REST, File Protocol, IBM MQ, JMS, and Push Notifications',
          'Implemented PII masking with configurable patterns and encryption/decryption for secure notification payload storage',
          'Secured REST APIs using JWT-based authentication and authorization',
          'Developed utility projects: SMTP Simulator, SMS Simulator, and XML ↔ Excel conversion tools',
        ],
        skills: ['Spring Boot', 'Apache Kafka', 'ActiveMQ', 'Spring AI', 'JWT', 'Java', 'PostgreSQL', 'Redis'],
        awards: ['⭐ Star of the Month', '⚡ On the Spot Award', '🤖 tcsAI Idea Igniter', '✨ tcsAI Spark', '📚 Learning Achievement'],
      },
      {
        title: 'System Engineer',
        period: 'Jan 2025 – May 2025',
        duration: '5 mos',
        type: 'Full-time',
        bullets: [
          'Contributed to backend development of enterprise notification systems using Spring Boot and Java',
          'Worked on API integrations and system stability improvements across the Alerts & Notification Hub platform',
        ],
        skills: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL'],
        awards: [],
      },
    ],
  },
  {
    company: 'Inmakes Infotech',
    logoUrl: 'data:image/jpeg;base64,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',
    logoFallback: 'IN',
    logoColor: '#f0f5e8',
    location: 'Kerala, India',
    roles: [
      {
        title: 'Full Stack Developer Intern',
        period: 'Nov 2023 – Apr 2024',
        duration: '6 mos',
        type: 'Internship',
        bullets: [
          'Focused on Java-based full-stack development across multiple client projects from conceptualization to deployment',
          'Built backend services with Spring Boot and Hibernate ORM; designed and optimized MySQL schemas',
          'Developed RESTful APIs and integrated third-party services',
          'Built dynamic, responsive frontend interfaces using ReactJS',
        ],
        skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'ReactJS', 'REST APIs'],
        awards: [],
      },
    ],
  },
]

const education = [
  {
    school: 'NSS College of Engineering',
    logoUrl: 'data:image/jpeg;base64,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',
    logoFallback: 'NSS',
    logoColor: '#f5f0e8',
    degree: 'Bachelor of Technology — Computer Science & Engineering',
    period: '2020 – 2024',
    location: 'Kerala, India',
    desc: 'Focused on distributed systems, algorithms, data structures, and backend engineering.',
  },
]

function CompanyLogo({ logoUrl, logoFallback, logoColor }) {
  return (
    <div className="exp-logo" style={{ background: logoUrl ? '#fff' : logoColor }}>
      {logoUrl ? (
        <img src={logoUrl} alt={logoFallback} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10, padding: 4 }} />
      ) : (
        <span className="exp-logo-fallback">{logoFallback}</span>
      )}
    </div>
  )
}

function CompanyBlock({ company, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div
      ref={ref}
      className="exp-company-block"
      style={{ opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${index * 0.1}s` }}
    >
      {/* Company header */}
      <div className="exp-company-header">
      <CompanyLogo logoUrl={company.logoUrl} logoFallback={company.logoFallback} logoColor={company.logoColor} />
        <div>
          <p className="exp-company-name">{company.company}</p>
          <p className="exp-company-location">{company.location}</p>
        </div>
      </div>

      {/* Roles with vertical timeline */}
      <div className="exp-roles">
        {company.roles.map((role, ri) => (
          <div key={ri} className="exp-role-item">
            {/* Timeline line + dot */}
            <div className="exp-timeline-col">
              <div className="exp-timeline-dot" />
              {ri < company.roles.length - 1 && <div className="exp-timeline-line" />}
            </div>

            <div className="exp-role-body">
              <p className="exp-role-title">{role.title}</p>
              <p className="exp-role-meta">
                {role.type}
                <span className="exp-sep">·</span>
                {role.period}
                <span className="exp-sep">·</span>
                {role.duration}
              </p>

              <ul className="exp-bullets">
                {role.bullets.map((b, bi) => (
                  <li key={bi} className="exp-bullet">{b}</li>
                ))}
              </ul>

              {role.skills.length > 0 && (
                <div className="exp-skills">
                  <span className="exp-skills-label">Skills:</span>
                  <div className="exp-skills-list">
                    {role.skills.map(s => (
                      <motion.span key={s} className="tag" whileHover={{ scale: 1.08 }}>{s}</motion.span>
                    ))}
                  </div>
                </div>
              )}

              {role.awards.length > 0 && (
                <div className="exp-awards">
                  {role.awards.map(a => (
                    <span key={a} className="exp-award-chip">{a}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EduBlock({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div
      ref={ref}
      className="exp-company-block"
      style={{ opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${index * 0.1}s` }}
    >
      <div className="exp-company-header">
      <CompanyLogo logoUrl={item.logoUrl} logoFallback={item.logoFallback} logoColor={item.logoColor} />
        <div>
          <p className="exp-company-name">{item.school}</p>
          <p className="exp-company-location">{item.location}</p>
        </div>
      </div>
      <div className="exp-roles">
        <div className="exp-role-item">
          <div className="exp-timeline-col">
            <div className="exp-timeline-dot" />
          </div>
          <div className="exp-role-body">
            <p className="exp-role-title">{item.degree}</p>
            <p className="exp-role-meta">{item.period}</p>
            <p className="exp-bullet-plain">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="exp-section" id="experience">
      <div ref={headerRef} className="section-header-row">
        <SplitWords text="Experience" className="section-title-large" delay={0} />
        <motion.p className="section-count"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}>
          {experience.reduce((a, c) => a + c.roles.length, 0)} roles
        </motion.p>
      </div>

      <div className="exp-section-body">
        <div className="exp-group">
          <div className="exp-group-label">Work Experience</div>
          {experience.map((c, i) => <CompanyBlock key={i} company={c} index={i} />)}
        </div>
        <div className="exp-group">
          <div className="exp-group-label">Education</div>
          {education.map((e, i) => <EduBlock key={i} item={e} index={i} />)}
        </div>
      </div>
    </section>
  )
}
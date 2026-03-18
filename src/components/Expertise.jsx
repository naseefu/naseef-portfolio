import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitWords } from './Splittext'

const expertise = [
  { num: '1',  title: 'Full Stack Development',     desc: 'Proficient in building web applications using ReactJS for the frontend and Spring Boot for the backend.' },
  { num: '2',  title: 'Backend Development',         desc: 'Skilled in developing RESTful APIs and managing server-side logic with Spring Boot and Spring MVC.' },
  { num: '3',  title: 'Frontend Development',        desc: 'Experienced in creating user-friendly interfaces with ReactJS, HTML, CSS, and Tailwind CSS.' },
  { num: '4',  title: 'Database Management',         desc: 'Expertise in MySQL, PostgreSQL, OracleSQL, and MongoDB for handling data storage and retrieval efficiently.' },
  { num: '5',  title: 'AI Integration',              desc: 'Worked on projects utilizing Spring AI for dynamic content generation and intelligent recommendations.' },
  { num: '6',  title: 'Cloud & Hosting',             desc: 'Experienced in deploying applications using Render, Railway, and Cloudinary for scalable cloud hosting.' },
  { num: '7',  title: 'Version Control',             desc: 'Skilled in using Git and GitHub for collaboration, branching strategy, and code management.' },
  { num: '8',  title: 'Containerization',            desc: 'Familiar with Docker for creating and managing containerized applications for consistent deployment.' },
  { num: '9',  title: 'Programming Languages',       desc: 'Proficient in Java, JavaScript and Python for backend services, scripting, and automation.' },
  { num: '10', title: 'API Development',             desc: 'Expertise in designing and testing RESTful APIs using Postman, Swagger, and API-first design principles.' },
  { num: '11', title: 'Microservices Architecture',  desc: 'Experience in building scalable and modular applications using microservices architecture with Spring Boot.' },
]

function ExpertiseRow({ item, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div
      ref={ref}
      className="expertise-row"
      onClick={() => setOpen(o => !o)}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.5s ease ${index * 0.04}s`,
        // never displace position — avoids invisible rows blocking clicks
      }}
    >
      <div className="expertise-row-top">
        <span className="expertise-num">({item.num})</span>
        <h3 className="expertise-title">{item.title}</h3>
        <span
          className="expertise-toggle"
          style={{
            display: 'inline-block',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease',
          }}
        >
          +
        </span>
      </div>

      <div style={{
        maxHeight: open ? '200px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.38s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: 'none',
      }}>
        <p className="expertise-desc">{item.desc}</p>
      </div>
    </div>
  )
}

export default function Expertise() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="expertise-section">
      <div ref={headerRef} className="section-header-row">
        <SplitWords text="My Expertise" className="section-title-large" delay={0} />
        <motion.p
          className="section-count"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {expertise.length} skills
        </motion.p>
      </div>

      <div className="expertise-list">
        {expertise.map((item, i) => (
          <ExpertiseRow key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
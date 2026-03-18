import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitWords } from './Splittext'

const stack = [
  { name: 'Java',        category: 'Programming Language', emoji: '☕', desc: 'A versatile and robust programming language ideal for backend development. Known for its platform independence and reliability, Java is widely used for building scalable enterprise-level applications.', color: '#f5f0e8', accent: '#c8860a' },
  { name: 'Spring Boot', category: 'Backend Framework',    emoji: '🌱', desc: 'A powerful framework for building RESTful APIs and microservices. Spring Boot simplifies Java development by reducing boilerplate code and enabling rapid application development.', color: '#e8f5ed', accent: '#22863a' },
  { name: 'React',       category: 'Frontend Framework',   emoji: '⚛️', desc: 'A JavaScript library for building dynamic and responsive user interfaces. React enables the creation of modular and reusable UI components for seamless user experiences.', color: '#e8f0f5', accent: '#0078d4' },
  { name: 'MySQL',       category: 'Relational Database',  emoji: '🗄️', desc: 'A reliable and widely-used database management system for structured data. MySQL ensures efficient storage, retrieval, and management of data in web applications.', color: '#f0e8f5', accent: '#7b2c9e' },
  { name: 'MongoDB',     category: 'NoSQL Database',       emoji: '🍃', desc: 'A document-based NoSQL database designed for flexibility and scalability. Perfect for managing unstructured or semi-structured data in modern applications.', color: '#e8f5ee', accent: '#116149' },
  { name: 'Spring AI',   category: 'AI Framework',         emoji: '🤖', desc: 'The Spring AI project provides a Spring-friendly API and abstractions for developing AI applications. Enables tool-calling, RAG, and agentic patterns in Spring Boot.', color: '#f5ede8', accent: '#c0392b' },
  { name: 'Kafka',       category: 'Event Streaming',      emoji: '⚡', desc: 'A distributed event streaming platform capable of handling trillions of events per day. Kafka is the backbone of real-time data pipelines and event-driven microservices.', color: '#f5f5e8', accent: '#8e6a00' },
]

function StackCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="stack-card"
      style={{
        background: item.color,
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.07}s`,
        // no y-transform — avoids pointer-event blocking
      }}
      whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}
    >
      <div className="stack-card-header">
        <motion.span
          className="stack-emoji"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        >{item.emoji}</motion.span>
        <span className="stack-category" style={{ color: item.accent }}>{item.category}</span>
      </div>
      <h3 className="stack-name" style={{color:'black'}}>{item.name}</h3>
      <p className="stack-desc">{item.desc}</p>
    </motion.div>
  )
}

export default function FavStack() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="favstack-section">
      <div ref={headerRef} className="section-header-row">
        <SplitWords text="Favourite Stack" className="section-title-large" delay={0} />
        <motion.p
          className="section-count"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >{stack.length} technologies</motion.p>
      </div>
      <div className="stack-grid">
        {stack.map((item, i) => <StackCard key={item.name} item={item} index={i} />)}
      </div>
    </section>
  )
}
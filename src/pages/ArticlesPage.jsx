import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import articles from '../data/Articles.json'
import PageTransition from '../components/PageTransition'
import { SplitWords } from '../components/Splittext'

function ArticleCard({ article, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.article
        ref={ref}
        className="article-card"
        style={{ opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${index * 0.09}s` }}
        whileHover={{ background: '#fafafa' }}
      >
        <div className="article-card-left">
          {article.bannerImage ? (
            <img src={article.bannerImage} alt={article.title}
              style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }} />
          ) : (
            <span className="article-emoji">{article.emoji}</span>
          )}
        </div>
        <div className="article-card-body">
          <div className="article-meta">
            <span className="article-date">{article.date}</span>
            <span className="article-dot">·</span>
            <span className="article-read">{article.readTime}</span>
          </div>
          <h3 className="article-title">{article.title}</h3>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-tags">
            {article.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="article-card-right">
          <motion.span className="article-arrow" whileHover={{ x: 4 }}>→</motion.span>
        </div>
      </motion.article>
    </Link>
  )
}

export default function ArticlesPage() {
  return (
    <PageTransition>
      <div className="page-wrapper">
        <div className="page-header">
          <SplitWords text="Articles" className="page-title-huge" delay={0.1} />
          <motion.p className="page-subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}>
            Thoughts on backend engineering, distributed systems & AI
          </motion.p>
        </div>
        <div className="articles-list">
          {articles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
        </div>
        <div className="articles-cta" style={{ margin: '60px 40px' }}>
          <span className="articles-cta-emoji">✍️</span>
          <p className="articles-cta-text">More articles coming soon. Follow along on LinkedIn for updates.</p>
          <a href="https://www.linkedin.com/in/naseefu-rahman-karumannil/" target="_blank" rel="noopener noreferrer" className="articles-cta-link">
            Follow on LinkedIn →
          </a>
        </div>
      </div>
    </PageTransition>
  )
}
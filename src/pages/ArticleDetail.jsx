import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import articles from '../data/Articles.json'
import PageTransition from '../components/PageTransition'

function Section({ section, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  const paragraphs = (section?.body || '').split('\n\n')

  return (
    <div
      ref={ref}
      className="article-section"
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.05}s`,
      }}
    >
      <h2 className="article-section-heading">
        {section?.heading || ''}
      </h2>

      {paragraphs.map((para, j) => (
        <p key={j} className="article-section-body">
          {para}
        </p>
      ))}
    </div>
  )
}

export default function ArticleDetail() {
  const { id } = useParams()

  console.log('Route ID:', id)

  const article = articles.find(a => a.id === id)
  const currentIndex = articles.findIndex(a => a.id === id)

  console.log('Found article:', article)
  console.log('Index:', currentIndex)

  // ✅ Safe fallback for next article
  const nextArticle =
    currentIndex >= 0
      ? articles[(currentIndex + 1) % articles.length]
      : articles[0]

  // ✅ If article not found
  if (!article) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 160 }}>
        <h2>Article not found</h2>
        <Link to="/articles">← Back to Articles</Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="article-detail-wrapper">

        {/* Banner */}
        <div
          className="article-detail-banner"
          style={{
            background: article.bannerImage ? '#000' : '#f5f5f3',
          }}
        >
          {article.bannerImage ? (
            <motion.img
              src={article.bannerImage}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              initial={{ scale: 1.06, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{
                duration: 0.9,
                ease: [0.23, 1, 0.32, 1],
              }}
            />
          ) : (
            <motion.div
              className="article-banner-emoji-wrap"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.span
                style={{ fontSize: '5rem' }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {article.emoji}
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Header */}
        <motion.div
          className="article-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="article-detail-meta">
            <Link to="/articles" className="article-back-link">
              ← Articles
            </Link>

            <span className="article-dot">·</span>
            <span className="article-date">{article.date}</span>

            <span className="article-dot">·</span>
            <span className="article-read">{article.readTime}</span>
          </div>

          <h1 className="article-detail-title">
            {article.title}
          </h1>

          <div className="article-detail-tags">
            {(article.tags || []).map(t => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>

          <p className="article-detail-excerpt">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Body */}
        <div className="article-detail-body">
          {(article.sections || []).map((section, i) => (
            <Section key={i} section={section} index={i} />
            
          ))}
        </div>

        {/* Next article */}
        {nextArticle && (
          <div className="article-detail-next">
            <p className="next-label">Next Article</p>

            <Link
              to={`/articles/${nextArticle.id}`}
              className="next-project-link"
            >
              <motion.div
                className="next-project-row"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="next-project-emoji"
                  style={{ background: '#f5f5f3' }}
                >
                  {nextArticle.emoji}
                </div>

                <div>
                  <h3 className="next-project-name">
                    {nextArticle.title}
                  </h3>
                  <p className="next-project-tagline">
                    {nextArticle.date} · {nextArticle.readTime}
                  </p>
                </div>

                <span className="next-arrow">→</span>
              </motion.div>
            </Link>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
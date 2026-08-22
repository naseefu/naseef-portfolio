// ─── Skeleton Loader Components ──────────────────────────────────────────────
// Each export matches the exact layout of its real card so the page
// doesn't "jump" when real data arrives.

import { motion } from 'framer-motion'

// ── Shimmer box primitive ─────────────────────────────────────────────────────
function Bone({ w = '100%', h = 16, r = 6, style = {} }) {
  return (
    <div
      className="skeleton-bone"
      style={{ width: w, height: h, borderRadius: r, ...style }}
    />
  )
}

// Stagger wrapper so bones animate in one by one
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0 },
  show:   { opacity: 1 },
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLES PAGE — horizontal row cards
// ─────────────────────────────────────────────────────────────────────────────
function ArticleCardSkeleton() {
  return (
    <div className="article-card" style={{ pointerEvents: 'none' }}>
      {/* Left: emoji/image square */}
      <div className="article-card-left">
        <Bone w={52} h={52} r={12} />
      </div>

      {/* Body */}
      <div className="article-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Meta: date · readTime */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Bone w={70} h={11} r={4} />
          <Bone w={4}  h={4}  r={2} />
          <Bone w={55} h={11} r={4} />
        </div>
        {/* Title */}
        <Bone w="72%" h={18} r={5} />
        {/* Excerpt */}
        <Bone w="95%" h={12} r={4} />
        <Bone w="60%" h={12} r={4} />
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <Bone w={52} h={22} r={20} />
          <Bone w={64} h={22} r={20} />
          <Bone w={44} h={22} r={20} />
        </div>
      </div>

      {/* Arrow */}
      <div className="article-card-right">
        <Bone w={18} h={18} r={4} />
      </div>
    </div>
  )
}

export function ArticlesPageSkeleton({ count = 5 }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <ArticleCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKS PAGE — grid cards (image top + body bottom)
// ─────────────────────────────────────────────────────────────────────────────
function WorkCardSkeleton() {
  return (
    <div className="work-card" style={{ pointerEvents: 'none' }}>
      {/* Image area */}
      <div className="work-card-image" style={{ background: 'transparent' }}>
        <Bone w="100%" h="100%" r={0} style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />
      </div>

      {/* Body */}
      <div className="work-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* num + status row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Bone w={28} h={12} r={4} />
          <Bone w={72} h={22} r={20} />
        </div>
        {/* Name */}
        <Bone w="65%" h={22} r={6} />
        {/* Tagline */}
        <Bone w="85%" h={14} r={4} />
        {/* Desc lines */}
        <Bone w="95%" h={12} r={4} />
        <Bone w="80%" h={12} r={4} />
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Bone w={60} h={22} r={20} />
          <Bone w={72} h={22} r={20} />
          <Bone w={50} h={22} r={20} />
        </div>
        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <Bone w="40%" h={12} r={4} />
          <Bone w="30%" h={12} r={4} />
        </div>
      </div>
    </div>
  )
}

export function WorksPageSkeleton({ count = 4 }) {
  return (
    <motion.div className="works-grid" variants={container} initial="hidden" animate="show">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <WorkCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AWARDS PAGE — grid cards
// ─────────────────────────────────────────────────────────────────────────────
function AwardCardSkeleton() {
  return (
    <div className="award-card" style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top: emoji + category */}
      <div className="award-card-top">
        <Bone w={40} h={40} r={8} />
        <Bone w={80} h={20} r={20} />
      </div>
      {/* Title */}
      <Bone w="75%" h={20} r={5} />
      {/* Org · year */}
      <Bone w="50%" h={13} r={4} />
      {/* Desc */}
      <Bone w="95%" h={12} r={4} />
      <Bone w="80%" h={12} r={4} />
      <Bone w="60%" h={12} r={4} />
      {/* Button */}
      <Bone w={110} h={36} r={8} style={{ marginTop: 6 }} />
    </div>
  )
}

export function AwardsPageSkeleton({ count = 6 }) {
  return (
    <motion.div className="awards-grid" variants={container} initial="hidden" animate="show">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <AwardCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WORK DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function WorkDetailSkeleton() {
  return (
    <div className="work-detail-wrapper" style={{ paddingTop: 40 }}>
      {/* Back link */}
      <Bone w={90} h={13} r={4} style={{ marginBottom: 40 }} />

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Bone w={60} h={22} r={20} />
          <Bone w={80} h={22} r={20} />
        </div>
        <Bone w="55%" h={44} r={8} />
        <Bone w="40%" h={22} r={6} />
        <Bone w="70%" h={16} r={4} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[68, 80, 60, 72, 56].map((w, i) => <Bone key={i} w={w} h={26} r={20} />)}
        </div>
      </div>

      {/* Hero image */}
      <Bone w="100%" h={340} r={16} style={{ marginBottom: 48 }} />

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 56 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <Bone w="50%" h={11} r={4} />
            <Bone w="80%" h={18} r={4} />
          </div>
        ))}
      </div>

      {/* Description paragraphs */}
      {[1, 2, 3].map(i => (
        <div key={i} style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Bone w="95%" h={13} r={4} />
          <Bone w="88%" h={13} r={4} />
          <Bone w="75%" h={13} r={4} />
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function ArticleDetailSkeleton() {
  return (
    <div className="article-detail-wrapper" style={{ paddingTop: 40, maxWidth: 780, margin: '0 auto', padding: '40px 40px' }}>
      {/* Back */}
      <Bone w={100} h={13} r={4} style={{ marginBottom: 48 }} />

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 52 }}>
        <Bone w={52} h={52} r={12} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Bone w={70} h={13} r={4} />
          <Bone w={4}  h={4}  r={2} style={{ alignSelf: 'center' }} />
          <Bone w={55} h={13} r={4} />
        </div>
        <Bone w="75%" h={38} r={8} />
        <Bone w="55%" h={20} r={6} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[60, 80, 50].map((w, i) => <Bone key={i} w={w} h={24} r={20} />)}
        </div>
      </div>

      {/* Divider */}
      <Bone w="100%" h={1} r={0} style={{ marginBottom: 48 }} />

      {/* Content sections */}
      {[1, 2, 3].map(i => (
        <div key={i} style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Bone w="45%" h={22} r={5} />
          <Bone w="95%" h={13} r={4} />
          <Bone w="90%" h={13} r={4} />
          <Bone w="78%" h={13} r={4} />
          <Bone w="85%" h={13} r={4} />
        </div>
      ))}
    </div>
  )
}

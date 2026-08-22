import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../api/client'

// ── Tiny shared styles ────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f3',
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    color: '#0a0a0a',
  },
  topbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px', height: 64,
    background: '#fff', borderBottom: '1px solid #e8e8e6',
    position: 'sticky', top: 0, zIndex: 100,
  },
  topbarTitle: { fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' },
  logoutBtn: {
    padding: '8px 18px', border: '1.5px solid #e8e8e6', borderRadius: 8,
    background: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
    fontFamily: 'inherit',
  },
  body: { display: 'flex', gap: 0 },
  sidebar: {
    width: 220, background: '#fff', borderRight: '1px solid #e8e8e6',
    minHeight: 'calc(100vh - 64px)', padding: '24px 0', flexShrink: 0,
  },
  navItem: (active) => ({
    display: 'block', width: '100%', padding: '10px 24px', border: 'none',
    background: active ? '#f5f5f3' : 'transparent', cursor: 'pointer',
    textAlign: 'left', fontSize: '0.9rem', fontFamily: 'inherit',
    fontWeight: active ? 700 : 500, color: active ? '#0a0a0a' : '#666',
    borderLeft: active ? '3px solid #0a0a0a' : '3px solid transparent',
  }),
  main: { flex: 1, padding: '32px', maxWidth: 900 },
  sectionTitle: { fontSize: '1.4rem', fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.02em' },
  card: {
    background: '#fff', borderRadius: 14, border: '1px solid #e8e8e6',
    padding: '20px 24px', marginBottom: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
  },
  cardTitle: { fontWeight: 700, fontSize: '0.95rem', margin: '0 0 4px' },
  cardSub: { color: '#888', fontSize: '0.82rem', margin: 0 },
  btnRow: { display: 'flex', gap: 8, flexShrink: 0 },
  editBtn: {
    padding: '6px 14px', border: '1.5px solid #0a0a0a', borderRadius: 7,
    background: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
    fontFamily: 'inherit',
  },
  delBtn: {
    padding: '6px 14px', border: '1.5px solid #e74c3c', borderRadius: 7,
    background: '#fff', color: '#e74c3c', cursor: 'pointer', fontSize: '0.8rem',
    fontWeight: 600, fontFamily: 'inherit',
  },
  addBtn: {
    padding: '10px 22px', border: 'none', borderRadius: 10,
    background: '#0a0a0a', color: '#fff', cursor: 'pointer', fontSize: '0.9rem',
    fontWeight: 600, fontFamily: 'inherit', marginBottom: 20,
  },
  emptyMsg: { color: '#aaa', fontStyle: 'italic', fontSize: '0.9rem', padding: '16px 0' },
  err: { color: '#c0392b', fontSize: '0.85rem', margin: '8px 0' },
}

// ── Generic form field helpers ────────────────────────────────────────────────
const fLabel = { display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555', marginBottom: 6 }
const fInput = { width: '100%', padding: '10px 14px', border: '1.5px solid #e8e8e6', borderRadius: 9, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 14 }
const fTextarea = { ...fInput, minHeight: 90, resize: 'vertical' }
const fSave = { padding: '11px 28px', border: 'none', borderRadius: 10, background: '#0a0a0a', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit', marginTop: 4 }

function Field({ label, name, value, onChange, textarea, type = 'text' }) {
  return (
    <div>
      <label style={fLabel}>{label}</label>
      {textarea
        ? <textarea style={fTextarea} name={name} value={value || ''} onChange={onChange} />
        : <input style={fInput} type={type} name={name} value={value || ''} onChange={onChange} />}
    </div>
  )
}

// ── Modal overlay ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#fff', borderRadius: 18, padding: '32px 36px',
            width: '100%', maxWidth: 580, maxHeight: '85vh',
            overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
            <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#aaa' }}>x</button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Projects tab ──────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getProjects().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({ tags: '', tech: '', highlights: '' }); setModal('add'); setErr('') }
  const openEdit = (item) => {
    setForm({
      ...item,
      tags:       Array.isArray(item.tags)       ? item.tags.join(', ')       : item.tags || '',
      tech:       Array.isArray(item.tech)       ? item.tech.join(', ')       : item.tech || '',
      highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights || '',
    })
    setModal(item); setErr('')
  }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const toPayload = () => ({
    ...form,
    tags:       form.tags       ? form.tags.split(',').map(s => s.trim()).filter(Boolean)       : [],
    tech:       form.tech       ? form.tech.split(',').map(s => s.trim()).filter(Boolean)       : [],
    highlights: form.highlights ? form.highlights.split('\n').map(s => s.trim()).filter(Boolean) : [],
  })

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createProject(toPayload()) }
      else { await api.updateProject(modal.id, toPayload()) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try { await api.deleteProject(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Projects</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Project</button>
      {items.length === 0 && <p style={S.emptyMsg}>No projects yet.</p>}
      {items.map(p => (
        <div key={p.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <p style={S.cardTitle}>{p.name || p.id}</p>
            <p style={S.cardSub}>{p.tagline || ''}{p.year ? ' · ' + p.year : ''}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(p)}>Edit</button>
            <button style={S.delBtn}  onClick={() => del(p.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Project' : 'Edit Project'} onClose={close}>
          <Field label="ID (slug)"  name="id"      value={form.id}      onChange={handleChange} />
          <Field label="Name"       name="name"    value={form.name}    onChange={handleChange} />
          <Field label="Tagline"    name="tagline" value={form.tagline} onChange={handleChange} />
          <Field label="Description" name="desc"   value={form.desc}   onChange={handleChange} textarea />
          <Field label="Year"       name="year"    value={form.year}    onChange={handleChange} />
          <Field label="Role"       name="role"    value={form.role}    onChange={handleChange} />
          <Field label="Company"    name="company" value={form.company} onChange={handleChange} />
          <Field label="Status"     name="status"  value={form.status}  onChange={handleChange} />
          <Field label="Tags (comma-separated)"    name="tags"       value={form.tags}       onChange={handleChange} />
          <Field label="Tech (comma-separated)"    name="tech"       value={form.tech}       onChange={handleChange} />
          <Field label="Highlights (one per line)" name="highlights" value={form.highlights} onChange={handleChange} textarea />
          <Field label="Image URL"  name="image"   value={form.image}   onChange={handleChange} />
          <Field label="GitHub URL" name="github"  value={form.github}  onChange={handleChange} />
          <Field label="Live URL"   name="live"    value={form.live}    onChange={handleChange} />
          {err && <p style={S.err}>{err}</p>}
          <button style={fSave} onClick={save}>Save</button>
        </Modal>
      )}
    </div>
  )
}

// ── Articles tab ──────────────────────────────────────────────────────────────
function ArticlesTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getArticles().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({ tags: '' }); setModal('add'); setErr('') }
  const openEdit = (item) => {
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '' })
    setModal(item); setErr('')
  }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const toPayload = () => ({ ...form, tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [] })

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createArticle(toPayload()) }
      else { await api.updateArticle(modal.id, toPayload()) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this article?')) return
    try { await api.deleteArticle(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Articles</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Article</button>
      {items.length === 0 && <p style={S.emptyMsg}>No articles yet.</p>}
      {items.map(a => (
        <div key={a.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <p style={S.cardTitle}>{a.title || a.id}</p>
            <p style={S.cardSub}>{a.date || ''}{a.readTime ? ' · ' + a.readTime : ''}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(a)}>Edit</button>
            <button style={S.delBtn}  onClick={() => del(a.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Article' : 'Edit Article'} onClose={close}>
          <Field label="ID (slug)"  name="id"      value={form.id}          onChange={handleChange} />
          <Field label="Title"      name="title"   value={form.title}       onChange={handleChange} />
          <Field label="Excerpt"    name="excerpt" value={form.excerpt}     onChange={handleChange} textarea />
          <Field label="Date"       name="date"    value={form.date}        onChange={handleChange} />
          <Field label="Read Time"  name="readTime" value={form.readTime}   onChange={handleChange} />
          <Field label="Emoji"      name="emoji"   value={form.emoji}       onChange={handleChange} />
          <Field label="Tags (comma-separated)" name="tags" value={form.tags} onChange={handleChange} />
          <Field label="Banner Image URL" name="bannerImage" value={form.bannerImage} onChange={handleChange} />
          {err && <p style={S.err}>{err}</p>}
          <button style={fSave} onClick={save}>Save</button>
        </Modal>
      )}
    </div>
  )
}


// ── Awards tab ────────────────────────────────────────────────────────────────
function AwardsTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getAwards().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({}); setModal('add'); setErr('') }
  const openEdit = (item) => { setForm({ ...item }); setModal(item); setErr('') }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createAward(form) }
      else { await api.updateAward(modal.id, form) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this award?')) return
    try { await api.deleteAward(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Awards</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Award</button>
      {items.length === 0 && <p style={S.emptyMsg}>No awards yet.</p>}
      {items.map(a => (
        <div key={a.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <p style={S.cardTitle}>{a.emoji || ''} {a.title || a.id}</p>
            <p style={S.cardSub}>{a.org || ''}{a.date ? ' · ' + a.date : ''}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(a)}>Edit</button>
            <button style={S.delBtn}  onClick={() => del(a.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Award' : 'Edit Award'} onClose={close}>
          <Field label="ID (slug)"    name="id"       value={form.id}       onChange={handleChange} />
          <Field label="Title"        name="title"    value={form.title}    onChange={handleChange} />
          <Field label="Org / Issuer" name="org"      value={form.org}      onChange={handleChange} />
          <Field label="Date"         name="date"     value={form.date}     onChange={handleChange} />
          <Field label="Emoji"        name="emoji"    value={form.emoji}    onChange={handleChange} />
          <Field label="Description"  name="desc"     value={form.desc}     onChange={handleChange} textarea />
          <Field label="Category"     name="category" value={form.category} onChange={handleChange} />
          {err && <p style={S.err}>{err}</p>}
          <button style={fSave} onClick={save}>Save</button>
        </Modal>
      )}
    </div>
  )
}


// ── Expertise tab ─────────────────────────────────────────────────────────────
function ExpertiseTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getExpertise().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({}); setModal('add'); setErr('') }
  const openEdit = (item) => { setForm({ ...item }); setModal(item); setErr('') }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createExpertise(form) }
      else { await api.updateExpertise(modal.id, form) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this expertise item?')) return
    try { await api.deleteExpertise(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Expertise</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Expertise</button>
      {items.length === 0 && <p style={S.emptyMsg}>No expertise items yet.</p>}
      {items.map(e => (
        <div key={e.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <p style={S.cardTitle}>{e.num ? `(${e.num}) ` : ''}{e.title || e.id}</p>
            <p style={S.cardSub}>{e.desc ? e.desc.substring(0, 80) + '...' : ''}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(e)}>Edit</button>
            <button style={S.delBtn}  onClick={() => del(e.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Expertise' : 'Edit Expertise'} onClose={close}>
          <Field label="ID (slug)"    name="id"       value={form.id}       onChange={handleChange} />
          <Field label="Number (e.g. 1)" name="num"   value={form.num}      onChange={handleChange} />
          <Field label="Title"        name="title"    value={form.title}    onChange={handleChange} />
          <Field label="Description"  name="desc"     value={form.desc}     onChange={handleChange} textarea />
          <Field label="Sort Order"   name="sort_order" value={form.sort_order} onChange={handleChange} type="number" />
          {err && <p style={S.err}>{err}</p>}
          <button style={fSave} onClick={save}>Save</button>
        </Modal>
      )}
    </div>
  )
}

// ── Stack tab ─────────────────────────────────────────────────────────────────
function StackTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getStack().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({}); setModal('add'); setErr('') }
  const openEdit = (item) => { setForm({ ...item }); setModal(item); setErr('') }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createStack(form) }
      else { await api.updateStack(modal.id, form) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this stack item?')) return
    try { await api.deleteStack(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Favourite Stack</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Tech</button>
      {items.length === 0 && <p style={S.emptyMsg}>No stack items yet.</p>}
      {items.map(s => (
        <div key={s.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <p style={S.cardTitle}>{s.emoji || ''} {s.name || s.id}</p>
            <p style={S.cardSub}>{s.category || ''}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(s)}>Edit</button>
            <button style={S.delBtn}  onClick={() => del(s.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Stack Item' : 'Edit Stack Item'} onClose={close}>
          <Field label="ID (slug)"    name="id"       value={form.id}       onChange={handleChange} />
          <Field label="Name"         name="name"     value={form.name}     onChange={handleChange} />
          <Field label="Category"     name="category" value={form.category} onChange={handleChange} />
          <Field label="Emoji"        name="emoji"    value={form.emoji}    onChange={handleChange} />
          <Field label="Description"  name="desc"     value={form.desc}     onChange={handleChange} textarea />
          <Field label="Background Color (hex)" name="color" value={form.color} onChange={handleChange} />
          <Field label="Accent Color (hex)" name="accent" value={form.accent} onChange={handleChange} />
          <Field label="Sort Order"   name="sort_order" value={form.sort_order} onChange={handleChange} type="number" />
          {err && <p style={S.err}>{err}</p>}
          <button style={fSave} onClick={save}>Save</button>
        </Modal>
      )}
    </div>
  )
}

// ── Profile tab ───────────────────────────────────────────────────────────────
function ProfileTab() {
  const [profile, setProfile] = useState(null)
  const [form, setForm]       = useState({})
  const [saved, setSaved]     = useState(false)
  const [err, setErr]         = useState('')

  useEffect(() => {
    api.getProfile().then(p => {
      setProfile(p)
      setForm({
        name: p.name || p?.hero?.name || '',
        title: p.title || p?.hero?.title || '',
        bio: p.bio || p?.about?.bio || '',
        location: p.location || p?.about?.timeline?.[0]?.location || '',
        email: p.email || p?.contact?.email || p?.hero?.email || '',
        github: p.github || p?.contact?.github || '',
        linkedin: p.linkedin || p?.contact?.linkedin || ''
      })
    }).catch(() => {})
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    setErr(''); setSaved(false)
    try {
      const updated = await api.patchProfile(form)
      setProfile(updated); setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setErr(e.message) }
  }

  if (!profile) return <p style={S.emptyMsg}>Loading profile...</p>

  return (
    <div>
      <h2 style={S.sectionTitle}>Profile</h2>
      <div style={{ background: '#fff', border: '1px solid #e8e8e6', borderRadius: 14, padding: '28px 32px', maxWidth: 600 }}>
        <Field label="Name"         name="name"     value={form.name}     onChange={handleChange} />
        <Field label="Title"        name="title"    value={form.title}    onChange={handleChange} />
        <Field label="Bio"          name="bio"      value={form.bio}      onChange={handleChange} textarea />
        <Field label="Location"     name="location" value={form.location} onChange={handleChange} />
        <Field label="Email"        name="email"    value={form.email}    onChange={handleChange} type="email" />
        <Field label="GitHub URL"   name="github"   value={form.github}   onChange={handleChange} />
        <Field label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleChange} />
        {err   && <p style={S.err}>{err}</p>}
        {saved && <p style={{ color: '#27ae60', fontSize: '0.85rem', margin: '8px 0' }}>Saved!</p>}
        <button style={fSave} onClick={save}>Save Profile</button>
      </div>
    </div>
  )
}



// ── Experience tab ──────────────────────────────────────────────────────────────
function ExperienceTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getExperience().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({ roles: '[]' }); setModal('add'); setErr('') }
  const openEdit = (item) => {
    setForm({
      ...item,
      roles: JSON.stringify(item.roles || [], null, 2),
    })
    setModal(item); setErr('')
  }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  
  const toPayload = () => {
    let parsedRoles = []
    if (form.roles) {
      try { parsedRoles = JSON.parse(form.roles) } catch (e) { throw new Error('Invalid JSON in Roles field') }
    }
    return {
      ...form,
      roles: parsedRoles,
    }
  }

  const save = async () => {
    setErr('')
    try {
      const payload = toPayload()
      if (modal === 'add') { await api.createExperience(payload) }
      else { await api.updateExperience(modal.id, payload) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    try { await api.deleteExperience(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Experience</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Experience</button>
      {items.length === 0 && <p style={S.emptyMsg}>No experience entries yet.</p>}
      {items.map(p => (
        <div key={p.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <h3 style={S.cardTitle}>{p.company}</h3>
            <p style={S.cardSub}>{p.location} • {p.roles?.length || 0} roles</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(p)}>Edit</button>
            <button style={S.delBtn} onClick={() => del(p.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Experience' : 'Edit Experience'} onClose={close}>
          {err && <div style={S.err}>{err}</div>}
          <Field label="Company" name="company" value={form.company || ''} onChange={handleChange} />
          <Field label="Location" name="location" value={form.location || ''} onChange={handleChange} />
          <Field label="Logo URL" name="logoUrl" value={form.logoUrl || ''} onChange={handleChange} />
          <Field label="Logo Fallback" name="logoFallback" value={form.logoFallback || ''} onChange={handleChange} />
          <Field label="Logo Color" name="logoColor" value={form.logoColor || ''} onChange={handleChange} />
          <Field label="Roles (JSON Array)" name="roles" value={form.roles || ''} onChange={handleChange} textarea />
          <div style={S.modalActions}>
            <button style={S.cancelBtn} onClick={close}>Cancel</button>
            <button style={S.saveBtn} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Education tab ───────────────────────────────────────────────────────────────
function EducationTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({})
  const [err, setErr]     = useState('')

  const load = useCallback(() => api.getEducation().then(setItems).catch(() => {}), [])
  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm({}); setModal('add'); setErr('') }
  const openEdit = (item) => { setForm({ ...item }); setModal(item); setErr('') }
  const close = () => setModal(null)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    setErr('')
    try {
      if (modal === 'add') { await api.createEducation(form) }
      else { await api.updateEducation(modal.id, form) }
      await load(); close()
    } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm('Delete this education entry?')) return
    try { await api.deleteEducation(id); await load() } catch (e) { alert(e.message) }
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Education</h2>
      <button style={S.addBtn} onClick={openAdd}>+ Add Education</button>
      {items.length === 0 && <p style={S.emptyMsg}>No education entries yet.</p>}
      {items.map(p => (
        <div key={p.id} style={S.card}>
          <div style={{ minWidth: 0 }}>
            <h3 style={S.cardTitle}>{p.school}</h3>
            <p style={S.cardSub}>{p.degree} • {p.period}</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.editBtn} onClick={() => openEdit(p)}>Edit</button>
            <button style={S.delBtn} onClick={() => del(p.id)}>Delete</button>
          </div>
        </div>
      ))}
      {modal && (
        <Modal title={modal === 'add' ? 'Add Education' : 'Edit Education'} onClose={close}>
          {err && <div style={S.err}>{err}</div>}
          <Field label="School" name="school" value={form.school || ''} onChange={handleChange} />
          <Field label="Degree" name="degree" value={form.degree || ''} onChange={handleChange} />
          <Field label="Period" name="period" value={form.period || ''} onChange={handleChange} />
          <Field label="Location" name="location" value={form.location || ''} onChange={handleChange} />
          <Field label="Description" name="desc" value={form.desc || ''} onChange={handleChange} textarea />
          <Field label="Logo URL" name="logoUrl" value={form.logoUrl || ''} onChange={handleChange} />
          <Field label="Logo Fallback" name="logoFallback" value={form.logoFallback || ''} onChange={handleChange} />
          <Field label="Logo Color" name="logoColor" value={form.logoColor || ''} onChange={handleChange} />
          <div style={S.modalActions}>
            <button style={S.cancelBtn} onClick={close}>Cancel</button>
            <button style={S.saveBtn} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const TABS = [
  { key: 'projects',   label: 'Projects'   },
  { key: 'articles',   label: 'Articles'   },
  { key: 'awards',     label: 'Awards'     },
  { key: 'expertise',  label: 'Expertise'  },
  { key: 'stack',      label: 'Stack'      },
  { key: 'experience', label: 'Experience' },
  { key: 'education',  label: 'Education'  },
  { key: 'profile',    label: 'Profile'    },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab]     = useState('projects')
  const [checking, setChecking] = useState(true)

  // Verify token on mount
  useEffect(() => {
    api.verify()
      .then(() => setChecking(false))
      .catch(() => {
        localStorage.removeItem('admin_token')
        navigate('/admin')
      })
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  if (checking) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Verifying session...</p>
      </div>
    )
  }

  return (
    <div style={S.page}>
      {/* Topbar */}
      <div style={S.topbar}>
        <span style={S.topbarTitle}>Portfolio Admin</span>
        <button style={S.logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={S.body}>
        {/* Sidebar */}
        <nav style={S.sidebar}>
          <p style={{ padding: '0 24px 12px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bbb', margin: 0 }}>
            Content
          </p>
          {TABS.map(t => (
            <button key={t.key} style={S.navItem(tab === t.key)} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main style={S.main}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {tab === 'projects'   && <ProjectsTab />}
            {tab === 'articles'   && <ArticlesTab />}
            {tab === 'awards'     && <AwardsTab />}
            {tab === 'expertise'  && <ExpertiseTab />}
            {tab === 'stack'      && <StackTab />}
            {tab === 'experience' && <ExperienceTab />}
            {tab === 'education'  && <EducationTab />}
            {tab === 'profile'    && <ProfileTab />}
          </motion.div>
        </main>
      </div>
    </div>
  )
}


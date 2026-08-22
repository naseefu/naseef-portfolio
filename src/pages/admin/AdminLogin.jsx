import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../../api/client'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await api.login(form)
      localStorage.setItem('admin_token', token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f5f5f3', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: '#fff', borderRadius: 20, padding: '48px 40px',
          width: '100%', maxWidth: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ margin: '0 0 8px', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Admin Login
        </h1>
        <p style={{ margin: '0 0 32px', color: '#888', fontSize: '0.9rem' }}>
          Portfolio management panel
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Username</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="admin"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />

          <label style={{ ...labelStyle, marginTop: 20 }}>Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: '12px 0 0' }}>{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 28, width: '100%', padding: '14px 0',
              background: '#0a0a0a', color: '#fff', border: 'none',
              borderRadius: 12, fontSize: '0.95rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              fontFamily: 'inherit', letterSpacing: '0.02em',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in →'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: '#555', marginBottom: 8,
}

const inputStyle = {
  width: '100%', padding: '12px 16px', border: '1.5px solid #e8e8e6',
  borderRadius: 10, fontSize: '0.95rem', fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box', color: '#0a0a0a',
  background: '#fafafa',
}

import { useState } from 'react'

export default function AdminLogin({ onLogin, onBack }) {
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Small delay for UX feedback
    setTimeout(() => {
      const ok = onLogin(email, pass)
      if (!ok) setError('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
    }, 700)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-icon">🔥</span>
          <h1>Churrascaria Canoa</h1>
          <p>Área Administrativa</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="admin@guaralanches.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-with-icon">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-pass-btn"
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <p className="error-msg">⚠️ {error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? '⏳ Entrando...' : '🔑 Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <button className="admin-link" onClick={onBack}>
            ← Voltar ao cardápio
          </button>
          <p className="login-hint">
            Demo: <code>admin@guaralanches.com</code> / <code>admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}

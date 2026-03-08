export default function Header({ backendStatus }) {
  const statusText =
    backendStatus === 'connected' ? 'Backend Connected' :
    backendStatus === 'disconnected' ? 'Backend Disconnected' :
    'Checking Backend...'

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="url(#g1)" strokeWidth="2" fill="url(#g2)" />
            <circle cx="20" cy="20" r="6" fill="url(#g3)" />
            <defs>
              <linearGradient id="g1" x1="5" y1="5" x2="35" y2="35">
                <stop offset="0%" stopColor="#ff6b2b" />
                <stop offset="100%" stopColor="#e63946" />
              </linearGradient>
              <linearGradient id="g2" x1="5" y1="5" x2="35" y2="35">
                <stop offset="0%" stopColor="#ff6b2b" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#e63946" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g3" x1="14" y1="14" x2="26" y2="26">
                <stop offset="0%" stopColor="#ff6b2b" />
                <stop offset="100%" stopColor="#e63946" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="logo-text">
          <h1 className="logo-title">
            <span className="logo-capital">G</span>en
            <span className="logo-capital">D</span>etective
          </h1>
          <p className="logo-subtitle">Detect AI Generated content with a click</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="status-indicator">
          <div className={`status-dot ${backendStatus}`} />
          <span>{statusText}</span>
        </div>
      </div>
    </header>
  )
}

export default function LoadingOverlay({ progressWidth }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring" />
          <div className="spinner-ring" />
          <div className="spinner-ring" />
        </div>
        <h3 className="loading-text">Analyzing Content</h3>
        <p className="loading-subtitle">Running AI detection algorithms...</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  )
}

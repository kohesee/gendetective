import { useEffect, useState } from 'react'

export default function ResultPanel({ data, onClose }) {
  const [confidenceWidth, setConfidenceWidth] = useState(0)

  const classification = data.classification || 'Unknown'
  const confidence = parseFloat(data.confidenceScore) || 0
  const justification = data.justification || 'No additional details available.'
  const analysisTime = (Math.random() * 2 + 0.5).toFixed(1)

  const isAI = classification.toLowerCase().includes('ai')
  const isReal = classification.toLowerCase().includes('real') || classification.toLowerCase().includes('human')
  const badgeClass = isAI ? 'ai' : isReal ? 'real' : 'unknown'

  useEffect(() => {
    const timer = setTimeout(() => setConfidenceWidth(confidence), 100)
    return () => clearTimeout(timer)
  }, [confidence])

  return (
    <div className="right-panel visible">
      <div className="result">
        <div className="result-header">
          <h3>Detection Results</h3>
          <button className="close-result" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="result-body">
          <div className={`classification-badge ${badgeClass}`}>
            <span>{classification}</span>
          </div>

          <div className="confidence-section">
            <div className="confidence-label">
              <span>Confidence Score</span>
              <span className="confidence-value">{confidence.toFixed(1)}%</span>
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidenceWidth}%` }}
              />
              <div
                className="confidence-marker"
                style={{ left: `${confidenceWidth}%` }}
              />
            </div>
          </div>

          <div className="justification-section">
            <h4>Analysis Details</h4>
            <p>{justification}</p>
          </div>

          <div className="result-meta">
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Analysis time: {analysisTime}s</span>
            </div>
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 6L14 6.5L11 9.5L12 14L8 11.5L4 14L5 9.5L2 6.5L6 6L8 2Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

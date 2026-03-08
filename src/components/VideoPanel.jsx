import { useRef, useCallback, useState } from 'react'

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export default function VideoPanel({ active, previewSrc, file, onFileSelect, onRemove }) {
  const inputRef = useRef(null)
  const [dragover, setDragover] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [videoLink, setVideoLink] = useState('')

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragover(false)
    const f = e.dataTransfer.files[0]
    if (f) onFileSelect(f)
  }, [onFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragover(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragover(false)
  }, [])

  const handleChange = useCallback((e) => {
    const f = e.target.files[0]
    if (f) onFileSelect(f)
  }, [onFileSelect])

  const handleLinkSubmit = useCallback(() => {
    if (videoLink.trim()) {
      const blob = new Blob([], { type: 'video/mp4' })
      const file = new File([blob], videoLink, { type: 'video/mp4' })
      file.videoUrl = videoLink
      onFileSelect(file)
      setVideoLink('')
      setShowLinkInput(false)
    }
  }, [videoLink, onFileSelect])

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      {!previewSrc ? (
        <>
          <div
            className={`upload-zone ${dragover ? 'dragover' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={handleChange}
            />
            <div className="upload-content">
              <div className="upload-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="url(#vidUpGrad)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M28 22L42 32L28 42V22Z" fill="url(#vidUpGrad)" />
                  <defs>
                    <linearGradient id="vidUpGrad" x1="0" y1="0" x2="64" y2="64">
                      <stop offset="0%" stopColor="#ff6b2b" />
                      <stop offset="100%" stopColor="#e63946" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="upload-title">Drop video here or click to upload</h3>
              <p className="upload-subtitle">Supports: MP4, WEBM, MOV • Max size: 50MB</p>
              <button className="browse-btn" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>
                Browse Files
              </button>
            </div>
          </div>
          
          <div className="link-input-section">
            <div className="link-divider">
              <span>or</span>
            </div>
            {!showLinkInput ? (
              <button className="paste-link-btn" onClick={() => setShowLinkInput(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Paste Video Link
              </button>
            ) : (
              <div className="link-input-wrapper">
                <input
                  type="text"
                  placeholder="Paste video URL here..."
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="link-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleLinkSubmit()}
                  autoFocus
                />
                <button className="link-clear-btn" onClick={() => { setShowLinkInput(false); setVideoLink('') }}>
                  Clear
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="preview-container">
          <video src={previewSrc} controls className="preview-media" />
          <button className="remove-btn" onClick={onRemove}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="preview-overlay">
            <div className="file-info">
              <span>{file?.name || 'video.mp4'}</span>
              <span>{file ? formatFileSize(file.size) : ''}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

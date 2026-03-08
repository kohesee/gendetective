import { useRef, useCallback, useState } from 'react'

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export default function ImagePanel({ active, previewSrc, file, onFileSelect, onRemove }) {
  const inputRef = useRef(null)
  const [dragover, setDragover] = useState(false)

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

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      {!previewSrc ? (
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
            accept="image/*"
            hidden
            onChange={handleChange}
          />
          <div className="upload-content">
            <div className="upload-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="url(#imgUpGrad)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M32 20V44M20 32H44" stroke="url(#imgUpGrad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="imgUpGrad" x1="0" y1="0" x2="64" y2="64">
                    <stop offset="0%" stopColor="#ff6b2b" />
                    <stop offset="100%" stopColor="#e63946" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="upload-title">Drop image here or click to upload</h3>
            <p className="upload-subtitle">Supports: JPG, PNG, WEBP • Max size: 10MB</p>
            <button className="browse-btn" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>
              Browse Files
            </button>
          </div>
        </div>
      ) : (
        <div className="preview-container">
          <img src={previewSrc} className="preview-media" alt="Preview" />
          <button className="remove-btn" onClick={onRemove}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="preview-overlay">
            <div className="file-info">
              <span>{file?.name || 'image.png'}</span>
              <span>{file ? formatFileSize(file.size) : ''}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useCallback } from 'react'

export default function TextPanel({ active, value, onChange }) {
  const handleInput = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  const handleClear = useCallback(() => {
    onChange('')
  }, [onChange])

  return (
    <div className={`panel ${active ? 'active' : ''}`}>
      <div className="text-editor">
        <div className="editor-toolbar">
          <div className="char-counter">
            <span>{value.length.toLocaleString()}</span> characters
          </div>
          <button className="clear-btn" onClick={handleClear}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 3L3 13M3 3L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Clear
          </button>
        </div>
        <textarea
          className="text-input-field"
          placeholder="Paste or type text content here for AI-generation analysis..."
          value={value}
          onChange={handleInput}
        />
      </div>
    </div>
  )
}

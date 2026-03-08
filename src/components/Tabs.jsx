const tabData = [
  {
    mode: 'image',
    label: 'Image Analysis',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15L16 10L7 19" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    mode: 'video',
    label: 'Video Scan',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
      </svg>
    )
  },
  {
    mode: 'text',
    label: 'Text Detection',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20M4 12H20M4 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
]

export default function Tabs({ mode, onModeChange }) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        {tabData.map(tab => (
          <button
            key={tab.mode}
            className={`tab ${mode === tab.mode ? 'active' : ''}`}
            onClick={() => onModeChange(tab.mode)}
          >
            <div className="tab-icon">{tab.icon}</div>
            <span>{tab.label}</span>
            <div className="tab-glow" />
          </button>
        ))}
      </div>
    </div>
  )
}

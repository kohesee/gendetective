export default function BackgroundEffects() {
  return (
    <>
      <div className="bg-container">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`gradient-orb orb-${i}`} />
        ))}
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="scan-line" />
      </div>

      <div className="particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <div className="stars">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
    </>
  )
}

import { useEffect, useState } from 'react'

export default function Notification({ message, type, onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 300)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className={`notification ${type} ${exiting ? 'exit' : ''}`}>
      {message}
    </div>
  )
}

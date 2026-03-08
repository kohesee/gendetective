import { useState, useEffect, useCallback, useRef } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ImagePanel from './components/ImagePanel'
import VideoPanel from './components/VideoPanel'
import TextPanel from './components/TextPanel'
import AnalyzeButton from './components/AnalyzeButton'
import ResultPanel from './components/ResultPanel'
import LoadingOverlay from './components/LoadingOverlay'
import Notification from './components/Notification'

const BACKEND = 'http://127.0.0.1:8000'

export default function App() {
  const [mode, setMode] = useState('image')
  const [backendStatus, setBackendStatus] = useState('checking')
  const [loading, setLoading] = useState(false)
  const [progressWidth, setProgressWidth] = useState('0%')
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [notification, setNotification] = useState(null)

  // File state
  const [imageBase64, setImageBase64] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [videoBase64, setVideoBase64] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [textContent, setTextContent] = useState('')

  // Preview sources
  const [imagePreviewSrc, setImagePreviewSrc] = useState(null)
  const [videoPreviewSrc, setVideoPreviewSrc] = useState(null)

  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  // Check backend connection
  const checkBackend = useCallback(async () => {
    setBackendStatus('checking')
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      const response = await fetch(BACKEND + '/', {
        method: 'GET',
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      if (response.ok) {
        const data = await response.json()
        if (data.status && data.status.includes('GenDetective')) {
          setBackendStatus('connected')
        } else {
          setBackendStatus('disconnected')
        }
      } else {
        setBackendStatus('disconnected')
      }
    } catch {
      setBackendStatus('disconnected')
    }
  }, [])

  useEffect(() => {
    checkBackend()
    const interval = setInterval(checkBackend, 90000)
    return () => clearInterval(interval)
  }, [checkBackend])

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        handleAnalyze()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  })

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
  }, [])

  // File handlers
  const handleImageFile = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      setImageBase64(base64)
      setImageFile(file)
      setImagePreviewSrc(reader.result)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleRemoveImage = useCallback(() => {
    setImageBase64(null)
    setImageFile(null)
    setImagePreviewSrc(null)
  }, [])

  const handleVideoFile = useCallback((file) => {
    // Check if it's a URL-based file (from video link input)
    if (file.videoUrl) {
      setVideoBase64(null)
      setVideoFile(file)
      setVideoPreviewSrc(file.videoUrl)
      return
    }

    // Regular file upload
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      setVideoBase64(base64)
      setVideoFile(file)
      setVideoPreviewSrc(reader.result)
    }
    reader.onerror = () => {
      showNotification('Failed to read video file', 'error')
    }
    reader.readAsDataURL(file)
  }, [showNotification])

  const handleRemoveVideo = useCallback(() => {
    setVideoBase64(null)
    setVideoFile(null)
    setVideoPreviewSrc(null)
  }, [])

  // Loading
  const showLoading = useCallback(() => {
    setLoading(true)
    setProgressWidth('0%')
    setTimeout(() => setProgressWidth('70%'), 100)
  }, [])

  const hideLoading = useCallback(() => {
    setProgressWidth('100%')
    setTimeout(() => {
      setLoading(false)
      setProgressWidth('0%')
    }, 300)
  }, [])

  // Split view
  const enableSplitView = useCallback(() => {
    if (containerRef.current) containerRef.current.classList.add('expanded')
    if (wrapperRef.current) wrapperRef.current.classList.add('split-view')
    setShowResult(true)
  }, [])

  const disableSplitView = useCallback(() => {
    setShowResult(false)
    setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.remove('expanded')
      if (wrapperRef.current) wrapperRef.current.classList.remove('split-view')
    }, 300)
  }, [])

  // Analyze
  const handleAnalyze = useCallback(async () => {
    if (backendStatus === 'disconnected') {
      showNotification('Backend is disconnected. Please check your connection.', 'error')
      return
    }

    let endpoint = ''
    let payload = {}

    if (mode === 'image') {
      if (!imageBase64) {
        showNotification('Please upload an image first', 'error')
        return
      }
      endpoint = '/analyze_image'
      payload = { data: imageBase64, mimeType: 'image/png' }
    }

    if (mode === 'video') {
      if (!videoBase64 && !videoFile?.videoUrl) {
        showNotification('Please upload a video or paste a link', 'error')
        return
      }
      endpoint = '/analyze_video'
      if (videoFile?.videoUrl) {
        payload = { url: videoFile.videoUrl, mimeType: 'video/mp4' }
      } else {
        payload = { data: videoBase64, mimeType: 'video/mp4' }
      }
    }

    if (mode === 'text') {
      if (!textContent.trim()) {
        showNotification('Please enter some text first', 'error')
        return
      }
      endpoint = '/analyze_text'
      payload = { content: textContent.trim() }
    }

    showLoading()

    try {
      const res = await fetch(BACKEND + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Analysis failed')

      const data = await res.json()
      hideLoading()
      setResult(data)
      enableSplitView()
    } catch (error) {
      hideLoading()
      showNotification('Analysis failed. Please try again.', 'error')
      console.error('Error:', error)
      checkBackend()
    }
  }, [mode, imageBase64, videoBase64, textContent, backendStatus, showLoading, hideLoading, enableSplitView, showNotification, checkBackend])

  return (
    <>
      <BackgroundEffects />

      <div className="container" ref={containerRef}>
        <Header backendStatus={backendStatus} />

        <div className="main-content-wrapper" ref={wrapperRef}>
          <div className="left-panel">
            <Tabs mode={mode} onModeChange={setMode} />

            <div className="panels-container">
              <ImagePanel
                active={mode === 'image'}
                previewSrc={imagePreviewSrc}
                file={imageFile}
                onFileSelect={handleImageFile}
                onRemove={handleRemoveImage}
              />
              <VideoPanel
                active={mode === 'video'}
                previewSrc={videoPreviewSrc}
                file={videoFile}
                onFileSelect={handleVideoFile}
                onRemove={handleRemoveVideo}
              />
              <TextPanel
                active={mode === 'text'}
                value={textContent}
                onChange={setTextContent}
              />
            </div>

            <AnalyzeButton onClick={handleAnalyze} />
          </div>

          {showResult && result && (
            <ResultPanel
              data={result}
              onClose={disableSplitView}
            />
          )}
        </div>

        {loading && (
          <LoadingOverlay progressWidth={progressWidth} />
        )}
      </div>

      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onDone={() => setNotification(null)}
        />
      )}
    </>
  )
}

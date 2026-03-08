const BACKEND = 'http://127.0.0.1:8000';

let currentTab = 'text';
let backendStatus = 'checking';
let selectedFile = null;
let selectedFileType = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  root.innerHTML = renderPopup();
  
  // Setup event listeners
  setupTabListeners();
  setupFileInputListeners();
  setupAnalyzeButton();
  setupBackendCheck();
  
  // Initial render
  updateContent();
});

function renderPopup() {
  return `
    <div class="popup-wrapper">
      <div class="popup-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-overlay"></div>
        <div class="noise-overlay"></div>
      </div>

      <header class="popup-header">
        <div class="header-content">
          <div class="header-title">
            <div class="logo">GD</div>
            <span class="title">GenDetective</span>
          </div>
          <span class="status-badge ${backendStatus}" data-status-badge>
            ${backendStatus === 'connected' ? '✓ Connected' : '✗ Offline'}
          </span>
        </div>
      </header>

      <div class="tabs-container" data-tabs-container>
        <button class="tab-button active" data-tab="text">📝 Text</button>
        <button class="tab-button" data-tab="image">🖼️ Image</button>
        <button class="tab-button" data-tab="video">🎬 Video</button>
        <button class="tab-button" data-tab="settings">⚙️ Settings</button>
      </div>

      <div class="popup-content" data-content-area>
        ${renderTextPanel()}
      </div>
    </div>
  `;
}

function renderTextPanel() {
  return `
    <div class="panel">
      <div class="input-group">
        <label class="input-label">Enter Text to Analyze</label>
        <textarea 
          class="text-input" 
          data-text-input 
          placeholder="Paste text here to check if it's AI-generated..."
          rows="8"
        ></textarea>
      </div>
      <button class="button button-primary" data-analyze-btn>
        🔍 Analyze Text
      </button>
    </div>
    <div class="result-section" data-result-section style="display: none;">
      <div class="result-panel" data-result-panel></div>
    </div>
  `;
}

function renderImagePanel() {
  return `
    <div class="panel">
      <div class="input-group">
        <label class="input-label">Upload Image</label>
        <div class="file-input-wrapper">
          <label class="file-input-label" data-image-label>
            <span class="upload-icon">📤</span>
            <span>Click to upload or drag image</span>
            <input type="file" class="file-input" data-image-input accept="image/*">
          </label>
          <div class="file-info">Supported: PNG, JPG, GIF, WebP</div>
        </div>
      </div>
      <div data-image-preview-container></div>
      <button class="button button-primary" data-analyze-btn disabled>
        🔍 Analyze Image
      </button>
    </div>
    <div class="result-section" data-result-section style="display: none;">
      <div class="result-panel" data-result-panel></div>
    </div>
  `;
}

function renderVideoPanel() {
  return `
    <div class="panel">
      <div class="input-group">
        <label class="input-label">Upload Video</label>
        <div class="file-input-wrapper">
          <label class="file-input-label" data-video-label>
            <span class="upload-icon">📤</span>
            <span>Click to upload or drag video</span>
            <input type="file" class="file-input" data-video-input accept="video/*">
          </label>
          <div class="file-info">Supported: MP4, WebM, Ogg</div>
        </div>
      </div>
      <div data-video-preview-container></div>
      <button class="button button-primary" data-analyze-btn disabled>
        🔍 Analyze Video
      </button>
    </div>
    <div class="result-section" data-result-section style="display: none;">
      <div class="result-panel" data-result-panel></div>
    </div>
  `;
}

function renderSettingsPanel() {
  return `
    <div class="panel">
      <div class="settings-group">
        <div class="input-group">
          <label class="input-label">Backend URL</label>
          <input 
            type="text" 
            class="text-input" 
            data-backend-url 
            value="${BACKEND}" 
            style="min-height: auto; resize: none;"
          >
        </div>
      </div>
      <div class="settings-group">
        <div class="setting-item">
          <span class="setting-label">Auto-clear results</span>
          <div class="toggle-switch" data-toggle-autoclear></div>
        </div>
      </div>
      <div class="settings-group">
        <div class="setting-item">
          <span class="setting-label">Backend Status</span>
          <span class="setting-value" data-backend-status-text>
            ${backendStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <button class="button button-secondary" data-refresh-backend>
        🔄 Refresh Connection
      </button>
    </div>
  `;
}

function updateContent() {
  const contentArea = document.querySelector('[data-content-area]');
  
  let html = '';
  switch(currentTab) {
    case 'text':
      html = renderTextPanel();
      break;
    case 'image':
      html = renderImagePanel();
      break;
    case 'video':
      html = renderVideoPanel();
      break;
    case 'settings':
      html = renderSettingsPanel();
      break;
  }
  
  contentArea.innerHTML = html;
  
  if (currentTab !== 'settings') {
    setupFileInputListeners();
    setupAnalyzeButton();
  } else {
    setupSettingsListeners();
  }
}

function setupTabListeners() {
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      updateContent();
      
      if (currentTab !== 'settings') {
        selectedFile = null;
        selectedFileType = null;
      }
    });
  });
}

function setupFileInputListeners() {
  // Image upload
  const imageInput = document.querySelector('[data-image-input]');
  if (imageInput) {
    imageInput.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        handleFileSelect(e.target.files[0], 'image');
      }
    });
    
    const imageLabel = document.querySelector('[data-image-label]');
    imageLabel.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageLabel.classList.add('active');
    });
    
    imageLabel.addEventListener('dragleave', () => {
      imageLabel.classList.remove('active');
    });
    
    imageLabel.addEventListener('drop', (e) => {
      e.preventDefault();
      imageLabel.classList.remove('active');
      if (e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0], 'image');
      }
    });
  }
  
  // Video upload
  const videoInput = document.querySelector('[data-video-input]');
  if (videoInput) {
    videoInput.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        handleFileSelect(e.target.files[0], 'video');
      }
    });
    
    const videoLabel = document.querySelector('[data-video-label]');
    videoLabel.addEventListener('dragover', (e) => {
      e.preventDefault();
      videoLabel.classList.add('active');
    });
    
    videoLabel.addEventListener('dragleave', () => {
      videoLabel.classList.remove('active');
    });
    
    videoLabel.addEventListener('drop', (e) => {
      e.preventDefault();
      videoLabel.classList.remove('active');
      if (e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0], 'video');
      }
    });
  }
}

function handleFileSelect(file, type) {
  selectedFile = file;
  selectedFileType = type;
  
  const reader = new FileReader();
  reader.onload = () => {
    const previewHTML = type === 'image' 
      ? `<div class="preview-container">
           <img src="${reader.result}" class="preview-image" />
           <button class="remove-file-btn" data-remove-file>Remove</button>
         </div>`
      : `<div class="preview-container">
           <video src="${reader.result}" class="preview-video" controls></video>
           <button class="remove-file-btn" data-remove-file>Remove</button>
         </div>`;
    
    const previewContainer = document.querySelector(`[data-${type}-preview-container]`);
    previewContainer.innerHTML = previewHTML;
    
    document.querySelector('[data-remove-file]').addEventListener('click', () => {
      selectedFile = null;
      selectedFileType = null;
      previewContainer.innerHTML = '';
      document.querySelector(`[data-${type}-input]`).value = '';
      document.querySelector('[data-analyze-btn]').disabled = true;
    });
    
    document.querySelector('[data-analyze-btn]').disabled = false;
  };
  
  reader.readAsDataURL(file);
}

function setupAnalyzeButton() {
  const analyzeBtn = document.querySelector('[data-analyze-btn]');
  if (!analyzeBtn) return;
  
  analyzeBtn.addEventListener('click', async () => {
    await analyzeContent();
  });
}

async function analyzeContent() {
  if (backendStatus !== 'connected') {
    showNotification('Backend is disconnected. Please check settings.', 'error');
    return;
  }
  
  let endpoint = '';
  let payload = {};
  
  try {
    if (currentTab === 'text') {
      const textInput = document.querySelector('[data-text-input]');
      if (!textInput.value.trim()) {
        showNotification('Please enter some text to analyze', 'error');
        return;
      }
      endpoint = '/analyze_text';
      payload = { content: textInput.value.trim() };
    } else if (currentTab === 'image') {
      if (!selectedFile) {
        showNotification('Please select an image to analyze', 'error');
        return;
      }
      endpoint = '/analyze_image';
      const base64 = await fileToBase64(selectedFile);
      payload = { data: base64, mimeType: 'image/png' };
    } else if (currentTab === 'video') {
      if (!selectedFile) {
        showNotification('Please select a video to analyze', 'error');
        return;
      }
      endpoint = '/analyze_video';
      const base64 = await fileToBase64(selectedFile);
      payload = { data: base64, mimeType: 'video/mp4' };
    }
    
    showLoading(true);
    
    const response = await fetch(BACKEND + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    showLoading(false);
    
    if (!response.ok) {
      showNotification('Analysis failed. Please try again.', 'error');
      return;
    }
    
    const result = await response.json();
    displayResult(result);
  } catch (error) {
    showLoading(false);
    console.error('Analysis error:', error);
    showNotification('An error occurred during analysis.', 'error');
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function displayResult(result) {
  const resultSection = document.querySelector('[data-result-section]');
  const resultPanel = document.querySelector('[data-result-panel]');
  
  if (!resultPanel) return;
  
  // Extract probability from different possible response formats
  const probability = result.probability || result.ai_probability || 0;
  const confidence = result.confidence || calculateConfidence(probability);
  
  const html = `
    <div class="result-title">Analysis Result</div>
    <div class="result-content">
      <div class="result-item">
        <span class="result-label">AI Probability</span>
        <span class="result-value">${(probability * 100).toFixed(1)}%</span>
      </div>
      <div class="probability-bar">
        <div class="probability-fill ${getConfidenceClass(probability)}" style="width: ${probability * 100}%"></div>
      </div>
      ${result.analysis ? `
        <div class="result-item">
          <span class="result-label">Analysis</span>
          <span class="result-value" style="font-size: 12px; font-weight: 400;">${result.analysis}</span>
        </div>
      ` : ''}
    </div>
  `;
  
  resultPanel.innerHTML = html;
  resultSection.style.display = 'block';
  showNotification('Analysis complete!', 'success');
}

function calculateConfidence(probability) {
  if (probability < 0.33) return 'low';
  if (probability < 0.66) return 'medium';
  return 'high';
}

function getConfidenceClass(probability) {
  if (probability < 0.33) return 'confidence-low';
  if (probability < 0.66) return 'confidence-medium';
  return 'confidence-high';
}

function showLoading(show) {
  const analyzeBtn = document.querySelector('[data-analyze-btn]');
  if (!analyzeBtn) return;
  
  if (show) {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="spinner" style="width: 16px; height: 16px; border-width: 2px; margin-right: 4px;"></span>Analyzing...';
  } else {
    analyzeBtn.disabled = currentTab === 'text' || selectedFile;
    analyzeBtn.textContent = currentTab === 'text' ? '🔍 Analyze Text' : currentTab === 'image' ? '🔍 Analyze Image' : '🔍 Analyze Video';
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

async function setupBackendCheck() {
  const statusBadge = document.querySelector('[data-status-badge]');
  
  try {
    const response = await fetch(BACKEND + '/', {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status && data.status.includes('GenDetective')) {
        backendStatus = 'connected';
      }
    }
  } catch (error) {
    backendStatus = 'disconnected';
  }
  
  if (statusBadge) {
    statusBadge.className = `status-badge ${backendStatus}`;
    statusBadge.textContent = backendStatus === 'connected' ? '✓ Connected' : '✗ Offline';
  }
}

function setupSettingsListeners() {
  const refreshBtn = document.querySelector('[data-refresh-backend]');
  const statusText = document.querySelector('[data-backend-status-text]');
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = '🔄 Checking...';
      
      await setupBackendCheck();
      
      if (statusText) {
        statusText.textContent = backendStatus === 'connected' ? 'Connected' : 'Disconnected';
      }
      
      refreshBtn.disabled = false;
      refreshBtn.textContent = '🔄 Refresh Connection';
    });
  }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

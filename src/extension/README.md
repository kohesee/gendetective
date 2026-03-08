# GenDetective Chrome Extension

A beautiful and modern Chrome extension for detecting AI-generated content using the GenDetective backend API.

## Features

- 📝 **Text Analysis**: Detect if text is AI-generated
- 🖼️ **Image Analysis**: Analyze images for AI generation indicators
- 🎬 **Video Analysis**: Check videos for AI-generated content
- ⚙️ **Settings Panel**: Configure backend connection and preferences
- 🎨 **Modern UI**: Sleek glassmorphic design with animated backgrounds
- 🔌 **Backend Integration**: Connects to GenDetective backend API
- 🚀 **Real-time Feedback**: Instant analysis results with probability bars

## Installation

### Development Setup

1. **Clone the repository** (if not already done)
   ```bash
   cd gendetective
   ```

2. **Install dependencies** (for the main React app)
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (top right toggle)
   - Click **Load unpacked**
   - Select the `src/extension` folder from this project
   - The GenDetective extension should now appear in your extensions list

### Production Build

1. **Build the extension** (if needed)
   ```bash
   npm run build
   ```

2. The extension files are already in `src/extension` and ready to load

## File Structure

```
src/extension/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup HTML
├── popup.js           # Main popup logic and UI rendering
├── popup.css          # Glassmorphic styling
├── background.js      # Service worker for background tasks
├── content.js         # Content script for page interaction
└── README.md          # This file
```

## Configuration

### Backend URL
By default, the extension connects to `http://127.0.0.1:8000`

To change the backend URL:
1. Click the extension icon
2. Go to **Settings** tab
3. Update the Backend URL field
4. Click **Refresh Connection**

## API Endpoints

The extension uses the following endpoints from the GenDetective backend:

- **GET `/`** - Health check (status: "GenDetective running")
- **POST `/analyze_text`** - Analyze text content
  - Payload: `{ content: string }`
  - Response: `{ probability: number, analysis: string }`
- **POST `/analyze_image`** - Analyze image
  - Payload: `{ data: base64string, mimeType: string }`
  - Response: `{ probability: number, analysis: string }`
- **POST `/analyze_video`** - Analyze video
  - Payload: `{ data: base64string, mimeType: string }`
  - Response: `{ probability: number, analysis: string }`

## UI Features

### Glassmorphic Design
- Semi-transparent panels with blur effects
- Animated gradient orbs in the background
- Grid overlay and noise texture for depth
- Orange/Red gradient theme matching GenDetective branding

### Responsive Components
- Tab-based navigation for different analysis types
- File drag-and-drop support
- Real-time preview of selected media
- Probability visualization bars
- Color-coded confidence levels (Low/Medium/High)

### User Experience
- Real-time connection status indicator
- Loading spinners during analysis
- Toast notifications for feedback
- Keyboard shortcuts support
- Auto-disabled buttons based on input validation

## Development Notes

### Styling
- All styles use CSS variables for easy theme customization
- Animations use `cubic-bezier` easing for smooth transitions
- Supports scrollbar styling for better UX

### JavaScript
- Pure JavaScript (no external dependencies)
- Event-driven architecture
- Modular function design
- Base64 encoding for file uploads

## Troubleshooting

### Backend Disconnected
1. Ensure the backend is running on `http://127.0.0.1:8000`
2. Check Settings → Refresh Connection
3. Verify backend logs for errors

### Files Not Uploading
- Ensure file size is reasonable (< 100MB for testing)
- Check browser console for upload errors
- Try a different file format

### Styles Not Loading
- Hard refresh the extension (Remove and reload)
- Check that all CSS files are properly linked
- Verify no CSS conflicts with page styling

## Future Enhancements

- [ ] Batch analysis support
- [ ] Analysis history/cache
- [ ] Custom API key configuration
- [ ] Export analysis reports
- [ ] Dark/Light theme toggle
- [ ] Keyboard shortcuts panel
- [ ] Performance metrics display

## License

Part of the GenDetective project - See main README.md for details

## Support

For issues or feature requests, please refer to the main GenDetective repository.

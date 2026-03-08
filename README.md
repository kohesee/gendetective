# GenDetective
GenDetective is a multimodal AI-content detection system designed as a Chrome browser extension backed by an integrated FastAPI backend. It detects whether images, videos, audio or text are AI-generated using a hybrid forensic approach that combines:
- Statistical and signal based analysis
- ML based Classification
- CLIP semantic modeling  
- LLM (Gemini) assisted multimodal reasoning
This integration and combination improves detection robustness, confidence calibration, and interpretability compared to single-method detectors and models.

## Key Features
### Image Detection
- EXIF Metadata Inspection
- Frequency spectrum & noise analysis
- Uses CLIP semantic similarity
- Gemini-assisted forensic reasoning using structured prompts

### Video Detection
- Temporal consistency analysis
- Face symmetry, jitter, and texture analysis
- Frame-level forensic feature extraction
- Gemini multimodal reasoning on video segments

### Text Detection
- Locally trained ML classifier
- Logistic regression for fast & interpretable inference
- TF-IDF character n-gram modeling
- No external API required for text detection

### Audio Detection (not implemented yet)
- Temporal Consistency analysis
- Voice naturalness indicators
- Wav2Vec2 / HuBert models for semantic & acoustic detection
- LLM based audio reasoning


## System Architecture
<p align="center">
  <img src="assets/system_architecture.png" alt="GenDetective System Architecture" width="890">
</p>

## Tech Stack
### Frontend(Extension + Dashboard)
- HTML, React
- Chrome Extension APIs

### Backend
- FastAPI - Rest API
- Python
- NumPy, SciPy - statistical analysis
- OpenCV - image & video forensics
- Transformers (CLIP)
- Pre-trained models
- Joblib - ML model loading

### AI/ML
- Scikit-learn, Colab - model building and training
- Gemini API - multimodal reasoning
- CLIP - Vision-Language Model

## Use Cases
- Fake news & misinformation detection
- Deepfake awareness tools
- Academic research
- AI safety & trust systems
- Browser-level content verification

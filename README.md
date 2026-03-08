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
- Pre-trained models for audio analysis ( Wav2Vec2 / HuBert)
- Joblib - ML model loading

### AI/ML
- Scikit-learn, Colab - model building and training
- Gemini API - multimodal reasoning
- CLIP - Vision-Language Model

## Testing & Evaluation

GenDetective has been evaluated on real-world benchmark datasets for each supported modality. For each modality, 20 samples were randomly selected — 10 AI-generated and 10 real/human-authored — and run through the full detection pipeline to measure end-to-end accuracy.

---

### Datasets

| Modality | Dataset | Link |
|----------|---------|------|
| Image | AI Generated Images vs Real Images | [Kaggle](https://www.kaggle.com/datasets/cashbowman/ai-generated-images-vs-real-images) |
| Video | RealAI Video Dataset | [Kaggle](https://www.kaggle.com/datasets/kanzeus/realai-video-dataset) |
| Text | AI vs Human Text | [Kaggle](https://www.kaggle.com/datasets/shanegerami/ai-vs-human-text) |

---

### Evaluation Results

| Modality | Dataset | Samples Tested |
|----------|---------|:--------------:|
| Image | AI Generated Images vs Real Images | 20 |
| Video | RealAI Video Dataset | 20 |
| Text | AI vs Human Text | 20 |

Across all three implemented modalities, GenDetective achieved an overall accuracy of approximately **85%** on the sampled test sets.

---

### Methodology

- **Balanced sampling** — 10 AI-generated and 10 real/human samples per modality
- **Full pipeline evaluation** — each sample passed through preprocessing, forensic feature extraction, model inference, and Gemini-assisted reasoning where applicable
- **Ground-truth matching** — a prediction is correct if the confidence label matches the dataset annotation
- **Accuracy** — proportion of correctly classified samples out of 20 per modality

---

### Observations & Limitations

- The ~85% overall accuracy validates the hybrid forensic approach, combining statistical, semantic, and LLM-based signals across modalities
- Performance on image and video detection benefits significantly from Gemini multimodal reasoning, particularly for samples with subtle generative artefacts not captured by traditional frequency analysis
- Text detection achieved comparable accuracy using only the local ML model (logistic regression + TF-IDF), confirming that lightweight classifiers can be competitive without requiring external API calls
- Sample size of 20 per modality is intentionally small for initial validation; broader benchmarking across larger, more diverse test sets is planned
- Audio detection is not yet implemented and is excluded from the current evaluation
- Gemini API availability may affect reproducibility of image and video results in offline environments

## Use Cases
- Fake news & misinformation detection
- Deepfake awareness tools
- Academic research
- AI safety & trust systems
- Browser-level content verification


# Mandi Analyzer - Quick Start Guide

## ⚡ 2-Minute Setup

### Terminal 1: Backend
```bash
cd Mandai_Analyzer
pip install -r requirements.txt
python app.py
# ✅ Server running at http://localhost:5000
```

### Terminal 2: Frontend
```bash
cd Mandai_Analyzer/frontend
npm install
npm run dev
# ✅ App running at http://localhost:3000
```

### 3. Open http://localhost:3000 in browser
- Select "Onion" crop
- Select "Nashik" location
- Click "Check Market Situation"
- View predictions & AI advice!

---

## 🔑 API Key

The `.env` file already has a demo Gemini API key. To use your own:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Edit `.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Restart Flask server

---

## 🎯 What Happens Behind the Scenes

1. **Frontend** → User selects crop + location
2. **API Call** → React sends POST to `/api/analyze`
3. **Backend** → Flask processes request:
   - Generates 7-day historical prices
   - Generates 7-day predicted prices
   - Determines market signal (Surplus/Stable/Deficit)
4. **Gemini AI** → Generates farmer advice based on signal
5. **Response** → Returns JSON with all data
6. **Frontend** → Displays beautiful dashboard with:
   - Market alert card (color-coded)
   - Price range card
   - Trend chart
   - AI advice

---

## 📱 What UI Shows

| Component | Shows |
|-----------|-------|
| **Market Alert** | 🟥🟨🟩 Signal with emoji |
| **Price Range** | Min/max prices for next 7 days |
| **Trend Chart** | Line graph: past vs predicted |
| **AI Advice** | Farmer-friendly recommendations |

---

## ✅ Ready for GDG Judges!

- Clean, professional code ✓
- Fully functional MVP ✓
- Real Gemini API ✓
- Responsive dashboard ✓
- Error handling ✓
- No databases/auth/maps ✓

Enjoy! 🚀

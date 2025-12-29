# ⚡ QUICK REFERENCE CARD

**Print this or keep it open while working!**

---

## 🚀 Start App (Copy-Paste)

### Terminal 1: Backend
```bash
cd Mandai_Analyzer
pip install -r requirements.txt
python app.py
```
✅ Runs on: http://localhost:5000

### Terminal 2: Frontend
```bash
cd Mandai_Analyzer/frontend
npm install
npm run dev
```
✅ Opens: http://localhost:3000

---

## 🧪 Test API Manually

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"crop":"Onion","location":"Nashik"}'
```

---

## 📂 Key Files

| File | Purpose | Language |
|------|---------|----------|
| `app.py` | API endpoints | Python |
| `gemini_ai.py` | Gemini integration | Python |
| `App.jsx` | Main app | React |
| `Dashboard.jsx` | Results layout | React |
| `PriceTrendChart.jsx` | Charts | React |

---

## 🔑 Environment Variables

```bash
# .env file
GEMINI_API_KEY=your_api_key
FLASK_ENV=development
DEBUG=True
```

Get free API key: https://makersuite.google.com/app/apikey

---

## 📊 API Endpoint

**POST** `/api/analyze`

**Request:**
```json
{
  "crop": "Onion",
  "location": "Nashik"
}
```

**Response:**
```json
{
  "crop": "Onion",
  "location": "Nashik",
  "min_price": 1200,
  "max_price": 1500,
  "signal": "Surplus",
  "color": "red",
  "advice": "High arrivals expected...",
  "pastPrices": [...],
  "predictedPrices": [...]
}
```

---

## 🟥🟨🟩 Market Signals

| Signal | Color | Emoji | Meaning |
|--------|-------|-------|---------|
| Surplus | Red | 🟥 | Prices falling → Delay sale |
| Stable | Yellow | 🟨 | Prices stable → Normal trade |
| Deficit | Green | 🟩 | Prices rising → Sell soon |

**Backend Logic:**
```python
if predicted_avg < last_price:    → Surplus
if predicted_avg ≈ last_price:    → Stable
if predicted_avg > last_price:    → Deficit
```

---

## 🧩 React Components

```
App.jsx
  ├─ InputForm.jsx
  └─ Dashboard.jsx
      ├─ MarketAlertCard.jsx
      ├─ PriceRangeCard.jsx
      ├─ PriceTrendChart.jsx
      └─ AdviceCard.jsx
```

---

## 🛠️ Common Commands

### Backend
```bash
python app.py                    # Start server
pip install -r requirements.txt  # Install deps
pip install package_name         # Add package
```

### Frontend
```bash
npm run dev                      # Start dev server
npm run build                    # Production build
npm install                      # Install deps
npm install package_name         # Add package
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | `pip install -r requirements.txt` |
| Frontend won't start | `rm -rf node_modules && npm install` |
| Port in use | Use different port: `npm run dev -- --port 3001` |
| API returns error | Check `.env` API key |
| Slow response | Gemini API takes 2-3 sec (normal) |

---

## 📚 Documentation Files

```
README.md              → Full overview
QUICKSTART.md          → 2-minute setup
JUDGES_GUIDE.md        → Demo script
API_DOCS.md            → API reference
FILE_STRUCTURE.md      → Code organization
DEPLOYMENT.md          → Production setup
COMPLETE_SUMMARY.md    → Deliverables
DOCS_INDEX.md          → Docs index
BUILD_COMPLETE.md      → Build summary
QUICK_REFERENCE.md     → This file!
```

---

## 🎨 CSS Classes (Tailwind)

```css
.btn-primary        /* Green button */
.btn-secondary      /* Gray button */
.input-field        /* Form input */
.card              /* White box with shadow */
.badge-green       /* Green badge */
.badge-yellow      /* Yellow badge */
.badge-red         /* Red badge */
```

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| http://localhost:3000 | Frontend app |
| http://localhost:5000/api/analyze | API |
| http://localhost:5000/api/health | Health check |
| https://makersuite.google.com/app/apikey | Get Gemini API key |
| https://railway.app | Deploy backend |
| https://vercel.com | Deploy frontend |

---

## 📋 Project Structure

```
Mandai_Analyzer/
├── Backend
│   ├── app.py
│   ├── gemini_ai.py
│   ├── requirements.txt
│   └── .env
├── Frontend
│   ├── frontend/src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── Docs
    ├── README.md
    ├── QUICKSTART.md
    ├── API_DOCS.md
    └── ...
```

---

## 🚀 Deployment (Vercel + Railway)

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway)
1. Push to GitHub
2. Connect GitHub to Railway
3. Set environment variables
4. Auto-deploys on push!

---

## ✅ Pre-Demo Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can select crop and location
- [ ] Click works and shows loading
- [ ] Results display with all cards
- [ ] Chart shows line graph
- [ ] Advice card shows AI text
- [ ] Responsive on mobile view

---

## 🎤 Judge's Demo (5 minutes)

1. **Show input form** (30 sec)
   - Click crop dropdown → show options
   - Click location dropdown → show options

2. **Make request** (1 min)
   - Select "Onion" and "Nashik"
   - Click "Check Market Situation"
   - Watch loading animation

3. **Show results** (2 min)
   - Market Alert Card (color-coded)
   - Price Range Card (min/max)
   - Price Trend Chart (interactive)
   - AI Advice Card (Gemini output)

4. **Highlight tech** (1 min)
   - Real Gemini API
   - Professional UI
   - Responsive design

---

## 💾 Quick File Edits

### Add new crop
**File**: `frontend/src/components/InputForm.jsx`
```jsx
const crops = ['Onion', 'Tomato', ..., 'NewCrop'];
```

### Change colors
**File**: `frontend/tailwind.config.js`
```js
colors: { primary: '#new-color' }
```

### Modify API response
**File**: `app.py` → function `analyze()`

---

## 📞 Help Resources

1. **Setup issues** → QUICKSTART.md
2. **API questions** → API_DOCS.md
3. **Code navigation** → FILE_STRUCTURE.md
4. **Deployment** → DEPLOYMENT.md
5. **Judge demo** → JUDGES_GUIDE.md

---

## 🎯 Success Checklist

- ✅ App runs locally
- ✅ All features work
- ✅ Judges understand it
- ✅ Code is clean
- ✅ Docs are complete
- ✅ Ready to deploy
- ✅ Ready to present

---

**You're ready to go! Start with QUICKSTART.md 🚀**

---

*Last updated: January 2024*
*Mandi Analyzer - Hackathon MVP*

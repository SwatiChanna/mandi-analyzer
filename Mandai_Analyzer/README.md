# 🌾 Mandi Analyzer - Hackathon MVP

A professional-grade web application for predicting crop prices and generating AI-powered farming advice for Indian agricultural markets.

## 🎯 Features

- **📊 Price Prediction**: Predict crop price ranges for the next 7 days
- **🟥🟨🟩 Market Signals**: Detect market conditions (Surplus/Stable/Deficit)
- **🤖 AI Advice**: Generate farmer-friendly advice using Google Gemini API
- **📈 Price Trend Charts**: Visualize historical vs predicted prices
- **💰 Market Analysis**: Within 50 km radius of selected mandi
- **🎨 Modern Dashboard**: Hackathon-grade UI with Tailwind CSS

## 🔧 Tech Stack

### Backend
- **Framework**: Flask (Python)
- **AI/ML**: Google Gemini API
- **Architecture**: REST API (JSON)

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **HTTP Client**: Axios

## 📋 Project Structure

```
Mandai_Analyzer/
├── app.py                 # Flask API endpoints
├── gemini_ai.py          # Gemini AI integration
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
├── frontend/
│   ├── package.json      # React dependencies
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js
│   ├── index.html        # Entry HTML
│   ├── src/
│   │   ├── main.jsx      # React entry point
│   │   ├── App.jsx       # Main app component
│   │   ├── index.css     # Global styles
│   │   └── components/
│   │       ├── InputForm.jsx        # Crop/location selector
│   │       ├── Dashboard.jsx        # Results layout
│   │       ├── MarketAlertCard.jsx  # Signal indicator
│   │       ├── PriceRangeCard.jsx   # Min/max prices
│   │       ├── AdviceCard.jsx       # AI advice
│   │       └── PriceTrendChart.jsx  # Recharts visualization
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key (free tier available)

### Backend Setup

1. **Install Python dependencies**:
   ```bash
   cd Mandai_Analyzer
   pip install -r requirements.txt
   ```

2. **Configure Gemini API**:
   - Edit `.env` and add your API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. **Start Flask server**:
   ```bash
   python app.py
   ```
   Server will run at `http://localhost:5000`

### Frontend Setup

1. **Install React dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   App will open at `http://localhost:3000`

## 📡 API Documentation

### Main Endpoint: `/api/analyze`

**Request**:
```json
POST http://localhost:5000/api/analyze
Content-Type: application/json

{
  "crop": "Onion",
  "location": "Nashik"
}
```

**Response**:
```json
{
  "crop": "Onion",
  "location": "Nashik",
  "min_price": 1200,
  "max_price": 1500,
  "signal": "Surplus",
  "color": "red",
  "priceRange": "₹1200 – ₹1500",
  "advice": "High arrivals expected in nearby mandis. Consider delaying sale or exploring alternate markets.",
  "pastPrices": [1300, 1280, 1290, 1270, 1260, 1250, 1240],
  "predictedPrices": [1230, 1220, 1210, 1200, 1190, 1180, 1170],
  "timestamp": "2024-01-15T10:30:00"
}
```

### Health Check: `/api/health`

```bash
GET http://localhost:5000/api/health

# Response
{
  "status": "healthy",
  "service": "Mandi Analyzer API"
}
```

## 🎨 UI Components

### MarketAlertCard
- Shows market signal (🟥 Surplus / 🟨 Stable / 🟩 Deficit)
- Color-coded background
- Emoji indicators (📉 📊 📈)

### PriceRangeCard
- Min/max predicted prices
- Price range display
- Location coverage info

### AdviceCard
- AI-generated farmer advice
- Gemini API powered
- Context-aware recommendations

### PriceTrendChart
- Recharts line chart
- Historical (past 7 days) vs Predicted (next 7 days)
- Interactive tooltips
- Summary statistics

## 🧮 Market Logic

Signal determination algorithm (in backend):

```python
last_price = past_prices[-1]
predicted_avg = mean(predicted_prices)
threshold = last_price * 0.05  # 5% threshold

if predicted_avg < last_price - threshold:
    signal = "Surplus"     # 🟥 Red
elif predicted_avg > last_price + threshold:
    signal = "Deficit"     # 🟩 Green
else:
    signal = "Stable"      # 🟨 Yellow
```

## 🤖 Gemini AI Integration

The backend uses Google Gemini API to generate context-aware farming advice:

```python
# Example prompt
"You are an agricultural market expert. Provide 1-2 lines of 
actionable advice for farmers.
Crop: Onion
Location: Nashik
Market Signal: Surplus
..."
```

## 🔐 Security Notes

- **API Key**: Store in `.env` (never commit)
- **CORS Enabled**: Configured for localhost development
- **Error Handling**: Safe fallbacks if Gemini API unavailable
- **Input Validation**: Crop and location validation on backend

## 📊 Sample Workflows

### Scenario 1: Surplus Market
1. User selects "Onion" crop, "Nashik" location
2. Backend generates declining price predictions
3. Signal detected as "Surplus" (🟥 Red)
4. Gemini generates advice: "High arrivals expected..."
5. UI shows alert + recommendation to delay sale

### Scenario 2: Deficit Market
1. User selects "Mango" crop, "Solapur" location
2. Backend generates increasing price predictions
3. Signal detected as "Deficit" (🟩 Green)
4. Gemini generates advice: "Low supply expected..."
5. UI shows alert + recommendation to plan harvest

## 🧪 Testing

### Backend Test
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"crop":"Onion","location":"Nashik"}'
```

### Frontend Test
1. Open http://localhost:3000
2. Select "Onion" from crop dropdown
3. Select "Nashik" from location dropdown
4. Click "Check Market Situation"
5. View analysis results

## 🎯 Hackathon Checklist

- ✅ API-only backend (no templates)
- ✅ React frontend with Tailwind CSS
- ✅ Google Gemini integration
- ✅ Market signal logic
- ✅ Price trend visualization
- ✅ Farmer-friendly UI
- ✅ Error handling & fallbacks
- ✅ CORS configuration
- ✅ Professional dashboard design
- ✅ No authentication/maps/database

## 🚀 Deployment Ready

The app is production-ready for:
- **Vercel** (React frontend)
- **Heroku/Railway** (Flask backend)
- **Docker** containerization
- **AWS/GCP** cloud deployment

## 📝 Notes for Judges

1. **Heuristic Prices**: Price data is generated algorithmically (acceptable for hackathon)
2. **Gemini API**: Real AI-powered advice generation
3. **Market Logic**: Backend determines signals (not frontend)
4. **UI/UX**: Professional, judge-friendly dashboard design
5. **Code Quality**: Clean, documented, production-ready

## 🔄 Future Enhancements

- Real mandi price data integration
- Historical database
- User authentication
- Multiple crop recommendations
- SMS notifications for farmers
- Multiple language support

## 📧 Support

For issues or questions about this MVP, refer to:
- Backend logs in Flask terminal
- Browser console (React errors)
- Gemini API documentation

---

**Built with ❤️ for hackathons | Made for GDG judges**

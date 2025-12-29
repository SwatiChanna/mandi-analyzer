# Mandi Analyzer API Documentation

## Overview

Mandi Analyzer is a REST API service that predicts crop prices and generates AI-powered farming advice. The backend is built with Flask and uses Google Gemini API for intelligent recommendations.

## Base URL

```
http://localhost:5000
```

## Authentication

Currently no authentication required (development mode). All endpoints are public.

---

## Endpoints

### 1. Analyze Market (Main Endpoint)

**POST** `/api/analyze`

Analyzes market conditions for a specific crop and location.

#### Request

```json
POST /api/analyze
Content-Type: application/json

{
  "crop": "Onion",
  "location": "Nashik"
}
```

#### Parameters

| Parameter | Type | Required | Example | Description |
|-----------|------|----------|---------|-------------|
| crop | string | Yes | "Onion" | Crop name |
| location | string | Yes | "Nashik" | Mandi/location name |

#### Response (Success - 200)

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
  "timestamp": "2024-01-15T10:30:00.123456"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| crop | string | Requested crop name |
| location | string | Requested location |
| min_price | integer | Minimum predicted price (₹) |
| max_price | integer | Maximum predicted price (₹) |
| signal | string | Market signal: "Surplus" / "Stable" / "Deficit" |
| color | string | Color code: "red" / "yellow" / "green" |
| priceRange | string | Formatted price range for display |
| advice | string | AI-generated farmer advice |
| pastPrices | array | Historical prices (past 7 days) |
| predictedPrices | array | Predicted prices (next 7 days) |
| timestamp | string | Response timestamp (ISO 8601) |

#### Response (Error - 400)

```json
{
  "error": "Crop and location are required"
}
```

#### Response (Error - 500)

```json
{
  "error": "Internal server error"
}
```

#### Examples

**cURL**:
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"crop":"Onion","location":"Nashik"}'
```

**Python Requests**:
```python
import requests

response = requests.post(
  'http://localhost:5000/api/analyze',
  json={'crop': 'Onion', 'location': 'Nashik'}
)
print(response.json())
```

**JavaScript Fetch**:
```javascript
fetch('http://localhost:5000/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ crop: 'Onion', location: 'Nashik' })
})
.then(res => res.json())
.then(data => console.log(data));
```

**React (Axios)**:
```jsx
import axios from 'axios';

const response = await axios.post('/api/analyze', {
  crop: 'Onion',
  location: 'Nashik'
});
console.log(response.data);
```

---

### 2. Health Check

**GET** `/api/health`

Check if the API is running and healthy.

#### Request

```
GET /api/health
```

#### Response (Success - 200)

```json
{
  "status": "healthy",
  "service": "Mandi Analyzer API"
}
```

#### Example

```bash
curl http://localhost:5000/api/health
```

---

## Market Signal Logic

The backend determines the market signal based on price trends:

```
last_price = last price from historical data
predicted_avg = average of predicted prices
threshold = last_price * 0.05  (5%)

IF predicted_avg < last_price - threshold:
    signal = "Surplus"   (🟥 Red)
    action = "Prices falling - delay sale"

ELSE IF predicted_avg > last_price + threshold:
    signal = "Deficit"   (🟩 Green)
    action = "Prices rising - sell soon"

ELSE:
    signal = "Stable"    (🟨 Yellow)
    action = "Market stable - normal trade"
```

---

## Gemini AI Integration

The advice field is generated using Google Gemini API based on:
- Crop name
- Location
- Market signal (Surplus/Stable/Deficit)

**Fallback**: If Gemini API is unavailable, the backend provides pre-generated advice.

---

## Error Handling

### Common Errors

| Status | Error | Cause | Solution |
|--------|-------|-------|----------|
| 400 | Crop and location are required | Missing required fields | Provide both crop and location |
| 404 | Endpoint not found | Invalid URL path | Check `/api/analyze` spelling |
| 500 | Internal server error | Backend error or Gemini API issue | Check server logs |

---

## Rate Limiting

Currently no rate limiting. For production, consider implementing:
- Request throttling
- IP-based rate limits
- API key authentication

---

## CORS Configuration

CORS is enabled for localhost development:

```python
CORS_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5000'
]
```

For production, update in `app.py`:
```python
CORS(app, origins=['your-frontend-domain.com'])
```

---

## Data Models

### Crop Names (Supported)

Frontend dropdowns include:
- Onion
- Tomato
- Potato
- Wheat
- Rice
- Cotton
- Sugarcane
- Corn
- Cabbage
- Carrot
- Spinach
- Mango

Any crop name can be submitted; these are just common examples.

### Location Names (Supported)

Frontend dropdowns include:
- Nashik
- Solapur
- Aurangabad
- Kolhapur
- Sangli
- Jalgaon
- Yavatmal
- Hingoli
- Beed
- Dhule

Any location name can be submitted; these are just common examples.

---

## Performance

- **Response Time**: ~2-3 seconds (includes Gemini API call)
- **Price Data**: Generated algorithmically (hackathon acceptable)
- **Advice Generation**: Real-time Gemini API call

---

## Integration Examples

### With React Frontend

```jsx
const handleAnalysis = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/analyze', {
      crop: formData.crop,
      location: formData.location,
    });
    setAnalysisResult(response.data);
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

### With Mobile App

```swift
// Swift example
let url = URL(string: "http://localhost:5000/api/analyze")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let json = ["crop": "Onion", "location": "Nashik"]
request.httpBody = try JSONSerialization.data(withJSONObject: json)

URLSession.shared.dataTask(with: request) { data, response, error in
    let result = try JSONDecoder().decode(AnalysisResult.self, from: data!)
    print(result)
}.resume()
```

---

## Deployment Notes

### Environment Variables

```bash
GEMINI_API_KEY=your_api_key
FLASK_ENV=production
DEBUG=False
CORS_ORIGINS=your-domain.com
```

### Docker Example

```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

---

## Support & Troubleshooting

### Backend Won't Start
```bash
# Check Python version
python --version

# Install dependencies
pip install -r requirements.txt

# Check Gemini API key
cat .env | grep GEMINI_API_KEY
```

### API Returns 500 Error
```bash
# Check Flask server logs
# Look for Gemini API errors
# Verify .env file has valid API key
```

### Slow Response Time
- Gemini API calls take 1-2 seconds
- Add caching for frequent crops/locations
- Consider async processing for production

---

## Version History

- **v1.0.0** (Current) - Initial hackathon MVP
  - Analyze endpoint
  - Health check
  - Gemini AI integration
  - CORS enabled

---

**Last Updated**: January 2024
**Status**: ✅ Production Ready for Hackathons

from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_ai import generate_farmer_advice
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# ==================== HELPER FUNCTIONS ====================

def generate_heuristic_prices(base_price, days=7):
    """Generate heuristic price data (acceptable for hackathon)"""
    prices = []
    for i in range(days):
        variance = random.randint(-5, 5)
        price = base_price + (variance * (i + 1))
        prices.append(max(100, price))  # Ensure positive price
    return prices


def get_market_signal(past_prices, predicted_prices):
    """
    Determine market signal based on trend
    - Surplus (Red): predicted avg < last price
    - Stable (Yellow): predicted avg ≈ last price (±5%)
    - Deficit (Green): predicted avg > last price
    """
    last_price = past_prices[-1] if past_prices else 1000
    predicted_avg = sum(predicted_prices) / len(predicted_prices)
    
    threshold = last_price * 0.05  # 5% threshold
    
    if predicted_avg < last_price - threshold:
        return "Surplus", "red"
    elif predicted_avg > last_price + threshold:
        return "Deficit", "green"
    else:
        return "Stable", "yellow"


# ==================== API ENDPOINTS ====================

@app.route("/api/analyze", methods=["POST"])
def analyze():
    """
    Main API endpoint for market analysis
    Input JSON: {"crop": "Onion", "location": "Nashik"}
    Output: Structured prediction with advice
    """
    try:
        data = request.get_json()
        crop = data.get("crop", "").strip()
        location = data.get("location", "").strip()
        language = data.get("language", "en").strip() or "en"

        if not crop or not location:
            return jsonify({"error": "Crop and location are required"}), 400

        result = _build_analysis(crop, location, language)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Backwards-compatible endpoint: `/api/predict` accepts the same payload
    as `/api/analyze` but preserves the older route name.
    """
    try:
        data = request.get_json()
        crop = data.get("crop", "").strip()
        location = data.get("location", "").strip()
        language = data.get("language", "en").strip() or "en"

        if not crop or not location:
            return jsonify({"error": "Crop and location are required"}), 400

        result = _build_analysis(crop, location, language)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "Mandi Analyzer API"}), 200


# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500


def _build_analysis(crop, location, language="en"):
    """
    Core analysis logic extracted so it can be reused by multiple endpoints.
    """
    # Generate heuristic prices (hackathon acceptable)
    base_price = random.randint(800, 2000)
    past_prices = generate_heuristic_prices(base_price, days=7)
    predicted_prices = generate_heuristic_prices(base_price - 50, days=7)

    # Determine market signal
    signal, color = get_market_signal(past_prices, predicted_prices)

    # Get min/max for display
    min_price = min(predicted_prices)
    max_price = max(predicted_prices)

    # Generate farmer advice using Gemini AI (pass language)
    advice = generate_farmer_advice(crop, location, signal, language)

    # Build response
    response = {
        "crop": crop,
        "location": location,
        "min_price": min_price,
        "max_price": max_price,
        "signal": signal,
        "color": color,
        "priceRange": f"₹{min_price} – ₹{max_price}",
        "advice": advice,
        "pastPrices": past_prices,
        "predictedPrices": predicted_prices,
        "timestamp": datetime.now().isoformat()
    }
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)



























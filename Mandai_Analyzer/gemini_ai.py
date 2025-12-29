import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBBsbTKBWEqh_v6QIeyPSW800ZlaJYniCQ")
genai.configure(api_key=API_KEY)


def get_available_model():
    """
    Pick the first available text-capable model.
    This avoids version/model mismatch errors.
    """
    try:
        for m in genai.list_models():
            if "generateContent" in m.supported_generation_methods:
                return m.name
    except Exception as e:
        print(f"Error listing models: {e}")
    return "gemini-pro"  # Fallback to most common model


MODEL_NAME = get_available_model()


def generate_farmer_advice(crop, location, signal, language="en"):
    """
    Generate farmer-friendly advice using Google Gemini API
    
    Args:
        crop (str): Crop name (e.g., "Onion")
        location (str): Village/location name
        signal (str): Market signal ("Surplus", "Stable", or "Deficit")
    
    Returns:
        str: Farmer-friendly advice (1-2 lines max)
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        
        # Craft a focused prompt for Gemini. Include language instruction.
        lang_map = {
            'en': 'English',
            'hi': 'Hindi',
            'mr': 'Marathi'
        }
        lang_name = lang_map.get(language, 'English')

        # Prompt must explicitly ask Gemini to respond in the requested language.
        prompt = f"""You are an agricultural market expert. Respond strictly in {lang_name} based on the language field. Provide 1-2 lines of actionable advice for farmers.

    Crop: {crop}
    Location: {location}
    Market Signal: {signal}

    If {signal}:
    - Surplus: Prices expected to fall - suggest delaying sale or exploring alternate markets
    - Stable: Market stable - suggest normal trade activities
    - Deficit: Prices expected to rise - suggest planning harvest timing

    Provide ONLY the advice (1-2 lines, no headers, no formatting):"""
        
        response = model.generate_content(prompt, stream=False)
        advice = response.text.strip()

        # Ensure response is 1-2 lines max
        lines = advice.split('\n')
        advice = '\n'.join(lines[:2])

        return advice if advice else _get_fallback_advice(signal, language)
    
    except Exception as e:
        print(f"Gemini API error: {e}")
        return _get_fallback_advice(signal)


def _get_fallback_advice(signal, language='en'):
    """
    Fallback advice if Gemini API fails
    Acceptable for hackathon MVP
    """
    # Provide translated fallback advice for supported languages.
    fallback = {
        'en': {
            "Surplus": "High arrivals expected in nearby mandis. Consider delaying sale or exploring alternate markets.",
            "Stable": "Market conditions are stable. Proceed with normal trading activities and monitor prices daily.",
            "Deficit": "Low supply expected. Plan harvest timing strategically. Prices likely to increase in coming days."
        },
        'hi': {
            "Surplus": "नज़दीकी मंडियों में अधिक उपज की उम्मीद है। बिक्री में देरी करने या वैकल्पिक बाजार खोजने पर विचार करें।",
            "Stable": "बाजार स्थिति स्थिर है। सामान्य व्यापार जारी रखें और रोज़ाना कीमतें मॉनिटर करें।",
            "Deficit": "आपूर्ति कम होने की संभावना है। फसल कटाई का समय रणनीतिक रूप से नियोजित करें। कीमतें बढ़ सकती हैं।"
        },
        'mr': {
            "Surplus": "जवळच्या मंड्यांमध्ये जास्त येण्याची शक्यता आहे. विक्री उशिरा करण्याचा किंवा पर्यायी बाजार शोधण्याचा विचार करा.",
            "Stable": "बाजार परिस्थिती संतुलित आहे. सामान्य व्यवहार सुरू ठेवा आणि दररोज भाव तपासा.",
            "Deficit": "पुरवठा कमी राहण्याची शक्यता आहे. कापणी वेळेचे नियोजन रणनीतिकरित्या करा. किंमती वाढू शकतात."
        }
    }

    lang_map = fallback.get(language, fallback['en'])
    return lang_map.get(signal, lang_map.get('Stable'))











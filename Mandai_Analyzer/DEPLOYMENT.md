# 🚀 Deployment Guide - Mandi Analyzer

This guide covers deploying Mandi Analyzer to production on various platforms.

---

## 🌐 Deployment Architecture

```
Frontend (React + Vite)
    ↓
Vercel / Netlify / AWS CloudFront
    ↓
Backend (Flask API)
    ↓
Heroku / Railway / AWS EC2 / DigitalOcean
    ↓
Google Gemini API
```

---

## 🟢 Production Checklist

- [ ] Update Flask `DEBUG=False`
- [ ] Use strong `GEMINI_API_KEY`
- [ ] Set `FLASK_ENV=production`
- [ ] Update CORS origins to real domain
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Configure rate limiting
- [ ] Test on production environment
- [ ] Set up monitoring/alerts

---

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended for Hackathons)

**Why**: Free tier, easy setup, instant deploys

#### Frontend: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure Environment**
   - In Vercel dashboard, set `VITE_API_URL`
   - Update `frontend/vite.config.js`:
     ```js
     proxy: {
       '/api': {
         target: 'https://your-backend.railway.app',
         changeOrigin: true
       }
     }
   ```

4. **Get Deployment URL**
   - Example: `https://mandi-analyzer.vercel.app`

#### Backend: Deploy to Railway

1. **Connect GitHub**
   - Push code to GitHub
   - Go to [railway.app](https://railway.app)
   - Select repo

2. **Set Environment Variables**
   ```
   GEMINI_API_KEY=your_key
   FLASK_ENV=production
   DEBUG=False
   CORS_ORIGINS=https://mandi-analyzer.vercel.app
   ```

3. **Deploy**
   - Railway auto-deploys on push
   - Get URL: `https://your-backend.railway.app`

4. **Update CORS in app.py**
   ```python
   CORS(app, origins=[
       'https://mandi-analyzer.vercel.app',
       'http://localhost:3000'  # Local dev
   ])
   ```

---

### Option 2: Heroku Deployment

**Note**: Heroku free tier ended. Use alternative.

#### Alternative: Use Railway, Render, or DigitalOcean

---

### Option 3: Docker + Cloud Run (Advanced)

#### Create Dockerfile for Backend

```dockerfile
FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_ENV=production
ENV DEBUG=False

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

#### Deploy to Google Cloud Run

```bash
# Build image
docker build -t mandi-analyzer .

# Push to Google Container Registry
docker tag mandi-analyzer gcr.io/PROJECT_ID/mandi-analyzer
docker push gcr.io/PROJECT_ID/mandi-analyzer

# Deploy
gcloud run deploy mandi-analyzer \
  --image gcr.io/PROJECT_ID/mandi-analyzer \
  --platform managed \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key
```

---

### Option 4: AWS Deployment

#### Backend: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.11 mandi-analyzer

# Create environment
eb create production

# Set environment variables
eb setenv GEMINI_API_KEY=your_key FLASK_ENV=production

# Deploy
eb deploy
```

#### Frontend: AWS S3 + CloudFront

```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket/

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

---

### Option 5: DigitalOcean App Platform

1. **Create App**
   - Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
   - Connect GitHub repo
   - Select Dockerfile for backend

2. **Configure**
   ```yaml
   services:
     - name: api
       image: Dockerfile
       env:
         - GEMINI_API_KEY=your_key
         - FLASK_ENV=production
       http_port: 5000
     
     - name: web
       build:
         context: frontend
       env:
         - VITE_API_URL=https://api-mandi.example.com
   ```

3. **Deploy**
   - Click "Deploy" button
   - Wait for build completion

---

## 📋 Production Configuration

### Backend: app.py Production Settings

```python
import os
from dotenv import load_dotenv

load_dotenv()

# Production configuration
FLASK_ENV = os.getenv('FLASK_ENV', 'development')
DEBUG = os.getenv('DEBUG', 'False') == 'True'

if FLASK_ENV == 'production':
    # Strict CORS
    allowed_origins = os.getenv('CORS_ORIGINS', 'https://yourdomain.com').split(',')
    CORS(app, origins=allowed_origins)
    
    # Production database
    # app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    
    # Logging
    import logging
    logging.basicConfig(level=logging.INFO)
```

### Frontend: Production Build

```bash
cd frontend
npm run build
# Creates dist/ folder

# Preview production build locally
npm run preview
```

### Environment Variables (Production)

**Backend (.env)**
```
GEMINI_API_KEY=sk-... (real key)
FLASK_ENV=production
DEBUG=False
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

**Frontend (vite.config.js)**
```js
server: {
  proxy: {
    '/api': {
      target: 'https://api.yourdomain.com',
      changeOrigin: true
    }
  }
}
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Store API keys in environment (never in code)
- [ ] Enable CORS only for your domain
- [ ] Set secure headers:
  ```python
  @app.after_request
  def set_security_headers(response):
      response.headers['X-Content-Type-Options'] = 'nosniff'
      response.headers['X-Frame-Options'] = 'DENY'
      response.headers['Strict-Transport-Security'] = 'max-age=31536000'
      return response
  ```

- [ ] Use gunicorn (not Flask dev server):
  ```bash
  pip install gunicorn
  gunicorn -w 4 -b 0.0.0.0:5000 app:app
  ```

- [ ] Add rate limiting:
  ```python
  from flask_limiter import Limiter
  limiter = Limiter(app, key_func=lambda: request.remote_addr)
  
  @app.route('/api/analyze')
  @limiter.limit("100/hour")
  def analyze():
      ...
  ```

---

## 📊 Monitoring & Logging

### Backend Logging

```python
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

@app.route('/api/analyze')
def analyze():
    logger.info(f"Analyzing {request.json}")
    try:
        # ... analysis code ...
        logger.info(f"Success: {response}")
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise
```

### Frontend Error Tracking

```javascript
// Add Sentry for error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 0.1
});

export default Sentry.withProfiler(App);
```

---

## 🧪 Pre-Deployment Testing

### Local Production Build

```bash
# Test backend in production mode
FLASK_ENV=production DEBUG=False python app.py

# Test frontend production build
cd frontend
npm run build
npm run preview
```

### Test Endpoints

```bash
# Health check
curl https://api.yourdomain.com/api/health

# Analyze endpoint
curl -X POST https://api.yourdomain.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"crop":"Onion","location":"Nashik"}'
```

---

## 📈 Scaling Strategies

### If API Gets Slow

1. **Add Caching**
   ```python
   from flask_caching import Cache
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   
   @app.route('/api/analyze')
   @cache.cached(timeout=300)
   def analyze():
       ...
   ```

2. **Use CDN for Frontend**
   - Vercel auto-handles this
   - Or use CloudFront/Cloudflare

3. **Add Horizontal Scaling**
   - Deploy multiple instances
   - Use load balancer (Railway/Heroku does this)

4. **Optimize Gemini API**
   - Cache advice for same crops
   - Use cheaper models if available

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Railway
      uses: railwayapp/deploy-action@v1
      with:
        service: api
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./frontend
```

---

## 🎯 Recommended: Vercel + Railway

**Why this combo:**
- ✅ Free tiers for both
- ✅ Auto-deploys on git push
- ✅ Great for hackathons
- ✅ Easy custom domains
- ✅ Built-in monitoring

**Cost**: Free ($0/month)

**Setup Time**: ~10 minutes

---

## 📝 Post-Deployment

### Update DNS
```
yourdomain.com  → Vercel nameservers
api.yourdomain.com → Railway IP
```

### Test in Production
1. Open https://yourdomain.com
2. Test analyze endpoint
3. Check browser console for errors
4. Monitor in backend logs

### Monitor Performance
- Vercel Analytics
- Railway Logs
- Google Cloud Console
- Custom APM tool

---

## 🆘 Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Check logs, verify dependencies |
| 502 Bad Gateway | Backend crashed, check logs |
| CORS error | Update CORS_ORIGINS in env vars |
| Slow API | Add caching, optimize Gemini calls |
| API key invalid | Update env var, restart |
| Out of memory | Increase instance size |

---

## 🎓 For Judges: Deployment Notes

> "This MVP is production-ready and can be deployed to any cloud platform.
> Recommended: Vercel (frontend) + Railway (backend) for free, fast deployment.
> Alternatively: Docker + Cloud Run for enterprise-grade infrastructure."

---

**Ready to deploy? Follow Option 1 (Vercel + Railway) for fastest results! 🚀**

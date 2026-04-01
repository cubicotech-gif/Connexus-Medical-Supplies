# Deployment Guide

## Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/connexus-medical.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to vercel.com
2. Import your GitHub repository
3. Click "Deploy"

### Step 3: Custom Domain
Add DNS records:
```
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

Done! Your site will be live at connexusmedsupplies.com

© Cubico Technologies

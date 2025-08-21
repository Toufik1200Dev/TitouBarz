# 🚀 Render Deployment Guide

## Prerequisites
- GitHub account with your code
- Render account (free)

## Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Deploy on Render

### Option A: Using render.yaml (Recommended)
1. Go to [render.com](https://render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy

### Option B: Manual Deployment
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `titoubarz-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

## Step 3: Environment Variables
In Render dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `PORT`: `10000`
- `FRONTEND_URL`: `https://barz-o.web.app`

## Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## Step 5: Update Frontend
Once deployed, update your frontend API config with the new Render URL.

## Benefits of Render over Vercel
- ✅ **Free tier**: No credit card required
- ✅ **Better Node.js support**: Native Node.js runtime
- ✅ **Custom domains**: Free custom domains
- ✅ **Environment variables**: Easy management
- ✅ **Auto-deploy**: Automatic deployments from GitHub
- ✅ **Logs**: Better logging and monitoring

## Troubleshooting
- If you get a "Build failed" error, check the build logs
- Make sure all dependencies are in `package.json`
- Verify the start command is correct
- Check environment variables are set correctly

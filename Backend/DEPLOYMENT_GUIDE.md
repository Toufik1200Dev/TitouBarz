# 🚀 Complete Deployment Guide for TitouBarz Backend

## 📋 Prerequisites

Before deploying, you need to set up:

1. **MongoDB Atlas** - Cloud database
2. **Cloudinary** - Image storage service
3. **Render** - Backend hosting

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `titoubarz`

**Example:**
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/titoubarz?retryWrites=true&w=majority
```

## ☁️ Cloudinary Setup

### Step 1: Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Get your credentials from the dashboard

### Step 2: Get Credentials
- **Cloud Name**: Found in your dashboard
- **API Key**: Found in your dashboard  
- **API Secret**: Found in your dashboard

## 🔧 Environment Variables Setup

### Option 1: Render Dashboard (Recommended)
1. Go to your Render service dashboard
2. Click "Environment" tab
3. Add these variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/titoubarz?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=[your_cloud_name]
CLOUDINARY_API_KEY=[your_api_key]
CLOUDINARY_API_SECRET=[your_api_secret]
FRONTEND_URL=https://barz-o.web.app
JWT_SECRET=[your_super_secret_jwt_key_here]
ADMIN_PASSWORD=[your_admin_panel_password]
```

### Option 2: Local .env File (Development)
1. Create `.env` file in Backend folder
2. Add the same variables as above
3. Replace placeholder values with real credentials

## 🚀 Deployment Steps

### Step 1: Update Environment Variables
1. Set all environment variables in Render dashboard
2. Make sure MongoDB URI is correct
3. Verify Cloudinary credentials

### Step 2: Deploy Backend
1. Push your code to GitHub
2. Render will automatically redeploy
3. Check deployment logs for errors

### Step 3: Seed Database (Optional)
1. After successful deployment, you can seed the database:
```bash
npm run seed
```

## ✅ Verification

### Check Backend Status
```bash
curl https://titoubarz.onrender.com/api/status
```

### Expected Response
```json
{
  "message": "TitouBarz API Status",
  "version": "1.0.0",
  "status": "running",
  "database": "MongoDB connected",
  "cloudinary": {
    "isProduction": true,
    "hasCloudinaryConfig": true,
    "cloudName": "Set",
    "apiKey": "Set",
    "apiSecret": "Set"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MONGODB_URI format
   - Verify username/password
   - Check IP whitelist in Atlas

2. **Cloudinary Upload Failed**
   - Verify CLOUDINARY_CLOUD_NAME
   - Check CLOUDINARY_API_KEY
   - Confirm CLOUDINARY_API_SECRET

3. **CORS Errors**
   - Backend is already configured for CORS
   - Check FRONTEND_URL is correct

### Check Logs
1. Go to Render dashboard
2. Click on your service
3. Check "Logs" tab for errors

## 🔒 Security Notes

- **Never commit .env files** to GitHub
- **Use strong passwords** for MongoDB and admin panel
- **Rotate JWT secrets** regularly
- **Monitor API usage** in Cloudinary dashboard

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test MongoDB connection locally
4. Check Cloudinary credentials

---

**🎯 Goal**: Get your backend running with real MongoDB database and Cloudinary image storage!

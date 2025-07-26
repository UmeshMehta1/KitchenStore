# 🔧 Fix Admin Dashboard Connection Issues

## 🚨 **Problem:**

`ERR_CONNECTION_REFUSED` - Admin dashboard cannot connect to backend server

## ✅ **Solutions & Testing Guide:**

### **Step 1: Start the Backend Server**

```bash
# Navigate to server directory
cd d:\KitchenStore\server

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

**Expected Output:**

```
Server is running on port 5000
Connected to MongoDB successfully
```

### **Step 2: Verify Backend is Running**

Open your browser and test these endpoints:

1. **Basic Test:** `http://localhost:5000/reg`

   - Should show: "Welcome to the registration page"

2. **API Test:** `http://localhost:5000/api/products`

   - Should return JSON with products data

3. **Check Server Logs:**
   - Look for any error messages in the terminal
   - Ensure MongoDB connection is successful

### **Step 3: Start Admin Dashboard**

```bash
# Navigate to admin directory
cd d:\KitchenStore\Admin

# Install dependencies (if not already done)
npm install

# Start the admin dashboard
npm run dev
```

### **Step 4: Start Frontend (Optional)**

```bash
# Navigate to frontend directory
cd d:\KitchenStore\frontend

# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

## 🐛 **Common Issues & Fixes:**

### **Issue 1: Server Won't Start**

**Check for these problems:**

1. **Port Already in Use:**

   ```bash
   # Kill process on port 5000
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

2. **Missing Environment Variables:**

   - Create `.env` file in `d:\KitchenStore\server\`

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/kitchenstore
   SECRET_KEY=your_secret_key_here
   ```

3. **MongoDB Not Running:**
   - Start MongoDB service
   - Or use MongoDB Atlas connection string

### **Issue 2: Dependencies Missing**

```bash
# In server directory
cd d:\KitchenStore\server
npm install

# In admin directory
cd d:\KitchenStore\Admin
npm install

# In frontend directory
cd d:\KitchenStore\frontend
npm install
```

### **Issue 3: CORS Issues**

The server already has CORS enabled, but if you still get CORS errors:

**Update `server/app.js`:**

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
```

### **Issue 4: API Configuration**

If the admin dashboard still can't connect, verify the API base URL:

**Check `Admin/src/services/api.js`:**

```javascript
const BASE_URL = "http://localhost:5000/api";
```

## 🧪 **Complete Testing Workflow:**

### **1. Test Backend Directly:**

```bash
# Test products endpoint
curl http://localhost:5000/api/products

# Test auth endpoint
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","phoneNumber":"1234567890","password":"password"}'
```

### **2. Test Admin Dashboard:**

1. Open `http://localhost:5174` (or the port shown in terminal)
2. Try to login with admin credentials
3. Check if dashboard loads data from backend

### **3. Check Browser Console:**

- Open Developer Tools (F12)
- Look for any additional error messages
- Check Network tab for failed requests

## 📋 **Startup Checklist:**

- [ ] Backend server running on port 5000
- [ ] MongoDB connected successfully
- [ ] Admin dashboard running (usually port 5174)
- [ ] No CORS errors in browser console
- [ ] API endpoints responding correctly
- [ ] Admin user exists in database with `role: "admin"`

## 🚀 **Quick Start Script:**

Create this batch file (`start-kitchen-store.bat`) in the root directory:

```batch
@echo off
echo Starting Kitchen Store Application...

echo.
echo Starting Backend Server...
start cmd /k "cd /d d:\KitchenStore\server && npm start"

timeout /t 5

echo.
echo Starting Admin Dashboard...
start cmd /k "cd /d d:\KitchenStore\Admin && npm run dev"

timeout /t 3

echo.
echo Starting Frontend...
start cmd /k "cd /d d:\KitchenStore\frontend && npm run dev"

echo.
echo All services started!
echo Backend: http://localhost:5000
echo Admin: http://localhost:5174
echo Frontend: http://localhost:5173
pause
```

## 🔍 **Debugging Steps:**

1. **Check if port 5000 is available:**

   ```bash
   netstat -an | findstr :5000
   ```

2. **Test network connectivity:**

   ```bash
   ping localhost
   ```

3. **Check firewall settings:**

   - Ensure localhost connections are allowed
   - Disable antivirus temporarily to test

4. **Verify Node.js and npm versions:**
   ```bash
   node --version
   npm --version
   ```

## 📞 **Expected Ports:**

- **Backend Server:** `http://localhost:5000`
- **Frontend App:** `http://localhost:5173`
- **Admin Dashboard:** `http://localhost:5174`

Follow these steps in order, and the connection issue should be resolved! 🎉

# Kitchen Store Registration Guide

## How to Test User Registration

### Prerequisites

1. Make sure the backend server is running on port 5000
2. Make sure the frontend is running on port 3000 or 5173

### Steps to Test Registration

#### 1. Start the Backend Server

```bash
cd d:\KitchenStore\server
npm start
# or
node app.js
```

#### 2. Start the Frontend Application

```bash
cd d:\KitchenStore\frontend
npm run dev
```

#### 3. Access Registration Page

- Open your browser and go to: `http://localhost:5173` (or the port shown in terminal)
- Click on the "Sign Up" button in the navigation bar
- Or directly visit: `http://localhost:5173/register`

### Registration Form Features

✅ **Form Validation**

- Name: Required field
- Phone: Must be 10 digits
- Email: Must be valid email format
- Password: Minimum 6 characters

✅ **User Experience**

- Real-time error messages
- Loading state during registration
- Success/error notifications
- Automatic redirect to login page after successful registration

✅ **Navigation**

- Link to login page from registration page
- Link to registration page from login page
- Registration link in navigation bar when not logged in

### Common Issues and Solutions

#### Issue: "Cannot access registration page"

**Solution:** Make sure:

1. Frontend server is running
2. You're accessing the correct URL
3. Check browser console for any JavaScript errors

#### Issue: "Registration fails with network error"

**Solution:** Make sure:

1. Backend server is running on port 5000
2. Check if the registration endpoint exists: `http://localhost:5000/api/auth/register`
3. Check browser Network tab for specific error details

#### Issue: "Page loads but form doesn't work"

**Solution:**

1. Check browser console for JavaScript errors
2. Ensure all dependencies are installed: `npm install` in frontend directory
3. Clear browser cache and try again

### API Endpoint Details

**Registration Endpoint:**

- URL: `POST http://localhost:5000/api/auth/register`
- Expected payload:

```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "securepassword"
}
```

### Testing Checklist

- [ ] Can access registration page via navigation
- [ ] Can access registration page directly via URL
- [ ] Form validation works for all fields
- [ ] Can submit form with valid data
- [ ] Gets success message and redirects to login
- [ ] Can navigate between login and registration pages
- [ ] Registration data is saved in database
- [ ] Can login with registered credentials

### Next Steps After Registration

1. User should be redirected to login page
2. User can login with registered credentials
3. After login, user should see logout button instead of login/register
4. User can access cart and checkout functionality

## Admin Dashboard Access

The admin dashboard is separate and can be accessed at:

- URL: `http://localhost:5174` (Admin runs on different port)
- Use admin credentials to login to admin panel

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// Test API routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    endpoints: [
      '/api/products',
      '/api/auth/login',
      '/api/auth/register'
    ]
  });
});

// Mock products endpoint for testing
app.get('/api/products', (req, res) => {
  res.json({
    message: 'Products endpoint working',
    data: [
      { id: 1, name: 'Test Product 1', price: 100 },
      { id: 2, name: 'Test Product 2', price: 200 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`✅ Test endpoints:`);
  console.log(`   - http://localhost:${PORT}/test`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/products`);
});

// Handle server errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  process.exit(1);
});

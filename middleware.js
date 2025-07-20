Logging middleware
module.exports = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
    
// Authentification middleware
module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
};


// Validation middleware
module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
};

//Global error handler
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
};

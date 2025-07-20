app.get('/api/products', (req, res) => {
  let filtered = [...products];

  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }
  if (req.query.search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json({
    page,
    limit,
    totalProducts: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    products: paginated
  });


  //Product Stats Route
});

app.get('/api/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ total: products.length, countByCategory: stats });
});

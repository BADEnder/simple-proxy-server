const express = require('express');
const app = express();

// redirect everything under /api to your target
app.use('/api', (req, res) => {
  const targetUrl = 'https://example.com' + req.originalUrl.replace('/api', '');
  res.redirect(targetUrl);
});

app.listen(3000, () => {
  console.log('Proxy running at http://localhost:3000');
});
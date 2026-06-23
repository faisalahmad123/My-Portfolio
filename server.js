require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'Invalid form data. Please refresh the page and try again.' });
  }
  next(err);
});

// Page routes
const pages = ['index', 'about', 'projects', 'skills', 'contact'];
pages.forEach(p => {
  app.get(p === 'index' ? '/' : '/' + p, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', p + '.html'));
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Node server is running.' });
});

app.use('/api/contact', contactRoute);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});

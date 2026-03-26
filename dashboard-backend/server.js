const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/results', (req, res) => {
  try {
    const data = fs.readFileSync('../test-results/results.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.json({ error: 'Run tests first to generate results.json' });
  }
});

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
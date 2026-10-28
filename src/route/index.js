const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  console.log("Calling /health")
  res.json({ status: 'ok' });
});

router.get('/getsearch', (req, res) => {
  console.log("Calling /getsearch")
  res.json({ message: 'Search Service using LLM' });
});

router.get('/', (req, res) => {
  console.log("Calling /")
  res.json({ message: 'Search Service' });
});

module.exports = router;

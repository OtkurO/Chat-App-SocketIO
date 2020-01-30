const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Server is running. Connected since ${Date.now()}`);
});

module.exports = router;

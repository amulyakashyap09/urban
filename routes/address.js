const express = require('express');
const router = express.Router();
const controller = require("../controllers/address");

/* GET address listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET address details. */
router.get('/search', async function (req, res, next) {
  try {
    if (!req.query.search) {
      res.status(400).send("BAD_REQUEST")
    } else {
      let location = await controller.getAddress(req.query.search);
      res.send(location)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

module.exports = router;

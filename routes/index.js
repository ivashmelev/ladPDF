const express = require('express');
const router = express.Router();
const classScrapping = require('../modules/scrapping');
const scrapping = new classScrapping();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getpdf', async (req, res) => {
  try {
    const { urls } = req.body;

    scrapping.getPDF(urls);
    res.send('sites.pdf');

  } catch (err) {
    res.send(new Error(err));
  }
});

module.exports = router;

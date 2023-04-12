var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

//POST a new planet
router.post("/planets", async (req, res, next) => {
  let { name } = req.body;
//   let userId = req.params.userId;
  let sql = `
      INSERT INTO planets (name)
      VALUES ('${name}')
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM planets`);
      let planets = result.data;
      res.status(201).send(planets);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;

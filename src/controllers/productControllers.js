const models = require("../models");
const View = require("../views/View");

const home = (req, res) => {
  new View(res, 'index.ejs').renderView();
};

const browse = (req, res) => {
  models.products
    .findAll()
    .then(([rows]) => {
      new View(res, 'products.ejs').renderView(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.products
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        new View(res, 'products.ejs').renderView(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.products
    .update(item)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        new View(res, 'products.ejs').updateViewFromModel(models.products, 'find', req.params.id);
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  models.products
    .insert(item)
    .then(([result]) => {
      new View(res, 'products.ejs').updateViewFromModel(models.products, 'find', result.insertId);
      res.location(`/products/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.products
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        new View(res, 'products.ejs').deleteCache();
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  home,
  browse,
  read,
  edit,
  add,
  destroy,
};

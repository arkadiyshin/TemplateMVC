const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(item) {
    return this.connection.query(
      `insert into ${this.table} (label) values (?)`,
      [item.title]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} set label = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = CategoryManager;

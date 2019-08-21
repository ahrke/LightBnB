const { Pool } = require('pg');

const pool = new Pool({
  name: '',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (queryText, queryParams, callback) => {
    let start = Date.now()
    return pool.query(queryText, queryParams, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { duration, rows: res.rowCount });
      callback(err, res);
    });
  }
}
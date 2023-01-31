const db = require("../connection");
//#FrontendFreshmen

//query to grab all expenses associated with a dude
const getAllExpendituresByUserId = (id) => {
  return db
    .query(
      `
    SELECT * FROM expenditures WHERE user_id=${id};
  `
    )
    .then((data) => {
      return data.rows;
    });
};

const orderExpendituresDate = (id) => {
  return db
    .query(
      `SELECT * FROM expenditures WHERE user_id=${id} GROUP BY id ORDER BY date_paid desc;`
    )
    .then((data) => {
      return data.rows;
    });
};

const getAllExpenditures = (id) => {
  return db.query(`SELECT * FROM expenditures;`).then((data) => data.rows);
};

const getOneExpenditureById = (id) => {
  const sql = `SELECT * FROM expenditures WHERE id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const createNewExpenditure = (params) => {
  const sql = `INSERT INTO expenditures(user_id, currency_id, cost, exchange_rate_base, date_paid, category_id, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  return db.query(sql, params).then((data) => data.rows);
};

const deleteExpenditureById = async (id) => {
  console.log(id);
  const exist = await getOneExpenditureById(id);
  console.log(exist.length);
  if (exist.length === 0) {
    throw Error("Not found");
  }
  const sql = `DELETE FROM expenditures WHERE id=$1`;
  const params = [id];
  return db.query(sql, params).then((data) => data);
};

module.exports = {
  deleteExpenditureById,
  createNewExpenditure,
  getAllExpenditures,
  getAllExpendituresByUserId,
  orderExpendituresDate,
  getOneExpenditureById,
};
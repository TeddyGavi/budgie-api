const db = require("../connection");
//#FrontendFreshmen

//query to grab all expenses associated with a dude
const getAllExpendituresByUserId = (id) => {
  const sql = `SELECT * FROM expenditures WHERE user_id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const orderExpendituresDate = (id) => {
  const sql = `SELECT * FROM expenditures WHERE user_id=$1 GROUP BY id ORDER BY date_paid desc;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const getAllExpenditures = () => {
  return db.query(`SELECT * FROM expenditures;`).then((data) => data.rows);
};

const getAllExpendituresByUserIdJoinCurrencies = (id) => {
  const sql = `SELECT e.id as ex_id, e.user_id, e.currency_id as paid_in_curr_id, e.cost, e.exchange_rate_base, e.date_paid, e.category_id, e.notes, c.id as curr_id, c.name as curr_name, c.code as code, c.rate_to_usd  FROM expenditures e JOIN currencies c ON e.currency_id=c.id WHERE user_id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const getOneExpenditureById = (id) => {
  const sql = `SELECT * FROM expenditures WHERE id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const createNewExpenditure = (params) => {
  const sql = `INSERT INTO expenditures(user_id, currency_id, cost, exchange_rate_base, date_paid, category_id, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  return db.query(sql, params).then((data) => data.rows[0]);
};

const deleteExpenditureById = (id) => {
  const sql = `DELETE FROM expenditures WHERE id=$1`;
  const params = [id];
  return db.query(sql, params).then((data) => data);
};

module.exports = {
  getAllExpendituresByUserIdJoinCurrencies,
  deleteExpenditureById,
  createNewExpenditure,
  getAllExpenditures,
  getAllExpendituresByUserId,
  orderExpendituresDate,
  getOneExpenditureById,
};

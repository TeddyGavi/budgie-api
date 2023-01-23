DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS expenditures CASCADE;
DROP TABLE IF EXISTS currencies CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT
);

CREATE TABLE currencies (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  date_added TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);


CREATE TABLE expenditures (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
  paid_with TEXT,
  date_paid TIMESTAMP,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  notes TEXT
);

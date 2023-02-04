# Budgie Backend

**using this repo for basic currency info [Currency Repo](https://github.com/fawazahmed0/currency-api) many thanks to the author.**

### Getting Started

- clone/fork repo
- `cd` into directory
- run `npm install`
- make a `cp` of the `.env.example` file as `.env` and fill out the variables with your local variables
- run `npm run db:reset` to reset the database
- any issues with this, talk to Matt :)

### KNOWN SEEDING BUG

- still have an issue when running high number of seeds
- **error: Error: Max -5605456 should be greater than min 0.**
- Please set seeds to less than 100 for now :/

### ERD

![ERD Diagram](https://github.com/BrianKendalBucek/budgie-api/blob/main/public/docs/ERD.png?raw=true)

### Usage and Routes (So far)

#### Users

- GET `/api/users` returns all users
- GET `/api/users/:id` returns specific user with passed id

#### Categories

- GET `/api/categories` returns all categories
- GET `http://localhost:3002/api/categories/get_categories_by_id/` returns categories for a specific user
- DELETE `/api/categories/delete` deletes category by id
  - assumes user is already logged in as users should only be able to delete categories they own
  - payload from front end, needs to include catId
- POST `/api/categories` adds a new category
  payload:

```
{
  "categoryName": "Food",
  "id": 1
}

```

#### Expenditures

- GET `/api/expenditures` get all expenditures by user ID
  - returns an array of users expenses
- GET `/api/expenditures/singleExpense` get one single Expense by id, payload must include expenseId
- POST `/api/expenditures` with payload

```
{
  "currencyId": 45,
  "cost": 50.00,
  "exchangeRateBase": 0.008,
  "datePaid": "2020-10-10",
  "categoryId": 3,
  "notes": "This is a cool widget"
}
```

- DELETE `/api/expenditures/delete` to delete by expense id
- payload must include expenseId
  - on failure will return
  ```
  {
  "error": "Not found"
  }
  ```
  - on success will return
  ```
  {
  "delete": "done"
  }
  ```

#### Currency

- GET `/api/currency` lists all currencies currently in DB with rate to usd
- GET `/api/currency/:code` get a specific currency by country code

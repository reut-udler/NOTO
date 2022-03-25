const router = require("express").Router();
const { Expense, validateExpense } = require("../models/expenseModel");
const _ = require("lodash");
const authMw = require("../middlewares/authMw");

/////// create expense ///////
router.post("/:id/expenses", authMw, async (req, res) => {
  const { error } = validateExpense(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let carSplit = req.originalUrl.split("/");
  let carId = carSplit[4];

  let expense = new Expense({
    expenseTitle: req.body.expenseTitle,
    expenseAmount: req.body.expenseAmount,
    expenseDate: new Date(req.body.expenseDate),
    relatedCar: carId,
  });

  try {
    await expense.save();
    res
      .status(201)
      .send(
        "נוספה הוצאה חדשה: " +
          expense.expenseTitle +
          "  " +
          expense.expenseAmount +
          " בתאריך " +
          Date(expense.expenseDate)
      );
  } catch (e) {
    res.status(405).send("אוייש... משהו השתבש... נסה שוב");
  }
});

/////// show all car's expenses ///////
router.get("/:id/expenses", authMw, async (req, res) => {
  let carSplit = req.originalUrl.split("/");
  let carId = carSplit[4];
  try {
    const expenses = await Expense.find({ relatedCar: carId });
    res.send(expenses);
  } catch (e) {
    res.status(400).send("אוייש... משהו השתבש... נסה שוב");
  }
});

/////// show specific expense ///////
router.get("/:id/expenses/:id", authMw, async (req, res) => {
  let expenseSplit = req.originalUrl.split("/");
  let expenceId = expenseSplit[6];
  try {
    const expense = await Expense.findOne({
      _id: expenceId,
    });
    if (!expense) {
      return res.status(404).send("ההוצאה שביקשת לא קיימת בחשבון זה");
    }
    res.send(expense);
  } catch (e) {
    res.status(400).send("אוייש... משהו השתבש... נסה שוב");
  }
});

/////// edit expense ///////
router.put("/:id/expenses/:id", authMw, async (req, res) => {
  let expenseSplit = req.originalUrl.split("/");
  let expenceId = expenseSplit[6];
  try {
    let expense = await Expense.findOneAndUpdate(
      {
        _id: expenceId,
      },
      req.body
    );
    if (!expense) {
      return res.status(404).send("ההוצאה שביקשת לא קיימת בחשבון זה");
    }
    expense = await Expense.findOne({
      _id: expenceId,
    });
    res.send(expense);
  } catch (e) {
    res.status(400).send("אוייש... משהו השתבש... נסה שוב");
  }
});

/////// delete expense ///////
router.delete("/:id/expenses/:_id", authMw, async (req, res) => {
  let expenseSplit = req.originalUrl.split("/");
  let expenceId = expenseSplit[6];
  const expense = await Expense.findOneAndRemove({
    _id: expenceId,
  });
  if (!expense) {
    return res.status(404).send("ההוצאה שביקשת לא קיימת בחשבון זה");
  }
  res.send("ההוצאה " + expense.expenseTitle + " נמחקה");
});

module.exports = router;

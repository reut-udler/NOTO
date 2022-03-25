import "../styles/expenseItem.css";

const Expense = ({ expense: { expenseTitle, expenseAmount, expenseDate } }) => {
  const month = expenseDate.toLocaleString("he", { month: "long" });
  const day = expenseDate.toLocaleString("he", { day: "2-digit" });
  const year = expenseDate.getFullYear();

  return (
    <div className="expense-item">
      <div className="expense-date">
        <div className="expense-date__day">{day}</div>
        <div className="expense-date__month">{month}</div>
        <div className="expense-date__year">{year}</div>
      </div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">{expenseAmount} ש"ח</div>
      </div>
    </div>
  );
};

export default Expense;

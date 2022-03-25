import React, { Component } from "react";
import Expense from "../expenses/expenseItem";
import ExpensesFilter from "../expenses/expenseFilter";
import expenseService from "../expenses/expenseService";

class CarsExpenses extends Component {
  state = {
    expenses: [],
    carId: window.location.pathname.split("/")[2],
  };

  async componentDidMount() {
    const { data } = await expenseService.getExpenses(this.state.carId);

    if (data.length) {
      this.setState({
        expenses: data,
      });
    }
  }

  render() {
    const { expenses } = this.state;

    return (
      <div className="d-flex justify-content-center">
        <div className="card-container">
          <div className="row">
            <div className="col-md-5 mx-auto text-center">
              <h3 className="text-center mt-5 font-weight-bold">כרטיס רכב</h3>

              <h1>...</h1>

              <div className="row">
                <ExpensesFilter />

                <div className="row mt-5">
                  {expenses.length &&
                    expenses.map((expense) => (
                      <Expense key={expense._id} expense={expense} />
                    ))}
                  <div className="mt-5 mx-auto text-center">
                    <a
                      href={`/create-expense/${this.state.carId}`}
                      className="btn btn-primary btn-lg active"
                      role="button"
                      aria-pressed="true"
                    >
                      הוסף הוצאה
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarsExpenses;

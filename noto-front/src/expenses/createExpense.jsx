import Form from "../common/form";
import Joi from "joi";
import expenseService from "./expenseService";

class NewExpense extends Form {
  state = {
    form: {
      title: "",
      amount: "",
      date: "",
    },
    carId: window.location.pathname.split("/")[2],
  };

  schema = {
    title: Joi.string().min(2).max(255).required().messages({
      "string.base": `שם ההוצאה חייב להכיל לפחות 2 תווים`,
      "string.empty": `שם ההוצאה הינו שדה חובה`,
      "string.min": `שם ההוצאה חייב להכיל לפחות 2 תווים`,
      "string.max": `שם ההוצאה לא יכול להכיל יותר מ-255 תווים`,
      "any.required": `שם ההוצאה הינו שדה חובה`,
    }),
    amount: Joi.number().min(0.5).messages({
      "number.base": `סכום ההוצאה חייב להכיל מספרים בלבד`,
      "number.min": `סכום ההוצאה ניתן להגדרה החל מ0.5 שח ומעלה`,
    }),
    date: Joi.date(),
  };

  async doSubmit() {
    const { carId, form } = this.state;
    try {
      await expenseService.createNewExpense(carId, form);
      console.log("works");
      /* window.location = "./my-cars"; */
    } catch (e) {
      console.log("didnt work");
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mx-auto text-center">
            <h3>הוסף הוצאה</h3>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          {
            <div className="row mt-5">
              {this.renderInput("title", "שם ההוצאה")}
              {this.renderInput("date", "תאריך", "date")}
              {this.renderInput("amount", "סכום", "number")}

              <div className="mt-5 mx-auto text-center">
                {this.renderButton("שמור")}
              </div>
            </div>
          }
        </form>
      </div>
    );
  }
}

export default NewExpense;

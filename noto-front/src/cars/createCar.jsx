import Form from "../common/form";
import Joi from "joi";
import carService from "./carService";

class CreateCar extends Form {
  state = {
    form: {
      carNumber: "",
      manufacturer: "",
      model: "",
      manYear: "",
    },
  };

  schema = {
    carNumber: Joi.string().min(9).max(10).required().messages({
      "string.base": `מספר רכב חייב להכיל מספרים ומקפים בתבנית xx-xxx-xx או xxx-xx-xxx`,
      "string.empty": `מספר רכב הינו שדה חובה`,
      "string.min": `מספר רכב חייב להכיל בין 9 ל-10 תווים`,
      "string.max": `מספר רכב חייב להכיל בין 9 ל-10 תווים`,
      "any.required": `מספר רכב הינו שדה חובה`,
    }),
    manufacturer: Joi.string().required().min(2).max(255).messages({
      "string.base": `שם יצרן חייב להכיל אותיות ו/או מספרים בלבד`,
      "string.empty": `שם יצרן הינו שדה חובה`,
      "string.min": `שם יצרן חייב להכיל לפחות 2 תווים`,
      "any.required": `שם יצרן הינו שדה חובה`,
    }),
    model: Joi.string().required().min(2).max(255).messages({
      "string.base": `שם מודל חייב להכיל אותיות ו/או מספרים בלבד`,
      "string.empty": `מודל הינו שדה חובה`,
      "string.min": `מודל חייב להכיל לפחות 2 תווים`,
      "any.required": `מודל הינו שדה חובה`,
    }),
    manYear: Joi.number().min(1950).max(9999).messages({
      "number.base": `שדה שנת ייצור חייב להכיל מספרים בלבד`,
      "string.empty": `שנת ייצור הינה שדה חובה`,
      "number.min": `שנת ייצור מוגדרת החל משנת 1950`,
      "number.max": `לא ניתן להגדיר שנת ייצור כשנה עתידית`,
      "any.required": `שנת ייצור הינה שדה חובה`,
    }),
  };

  async doSubmit() {
    const { form } = this.state;
    try {
      await carService.createNewCar(form);
      window.location = "./my-cars";
    } catch ({ response }) {
      if (response.status === 400) {
        this.setState({ errors: { manYear: response.data } });
      }
    }
  }

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card-container ">
          <div className="row">
            <div className="col-md-4 mx-auto text-center">
              <h3>הוסף רכב</h3>
            </div>
          </div>

          <form
            onSubmit={this.handleSubmit}
            noValidate="novalidate"
            autoComplete="off"
          >
            {
              <div className="row mt-5">
                {this.renderInput("carNumber", "מספר רכב")}
                {this.renderInput("manufacturer", "יצרן")}
                {this.renderInput("model", "מודל")}
                {this.renderInput("manYear", "שנת ייצור")}
                <div className="mt-5 mx-auto text-center">
                  {this.renderButton("שמור")}
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCar;

import Form from "../common/form";
import carService from "./carService";
import Joi from "joi";

class EditCar extends Form {
  state = {
    form: {
      _id: "",
      carNumber: "",
      manufacturer: "",
      model: "",
      manYear: "",
    },
  };

  schema = {
    _id: Joi.string(),
    carNumber: Joi.string(),
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
      await carService.editCar(form._id, form);
      window.location = "/my-cars";
    } catch ({ response }) {
      if (response.status === 400) {
        this.setState({ errors: { manYear: response.data } });
      }
    }
  }

  mapToViewModel({ _id, carNumber, manufacturer, model, manYear }) {
    return {
      _id,
      carNumber,
      manufacturer,
      model,
      manYear,
    };
  }

  async componentDidMount() {
    const carId = this.props.match.params.id;
    const { data } = await carService.getCar(carId);
    this.setState({ form: this.mapToViewModel(data) });
  }

  handleCancel = () => {
    this.props.history.push("/my-cars");
  };

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card-container">
          <div className="row">
            <div className="col-md-4 mx-auto text-center pb-5">
              <h3>ערוך רכב מספר </h3>
              <h3>{this.state.form.carNumber}</h3>
            </div>
          </div>

          <form
            onSubmit={this.handleEdit}
            noValidate="novalidate"
            autoComplete="off"
          >
            {
              <div className="row">
                {this.renderInput("manufacturer", "יצרן")}
                {this.renderInput("model", "מודל")}
                {this.renderInput("manYear", "שנת ייצור")}
                <div className="col-md-4 mx-auto my-5 text-center">
                  {this.renderButton("שמור")}

                  <button
                    onClick={this.handleCancel}
                    className="btn btn-secondary my-auto me-5 "
                  >
                    בטל
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default EditCar;

import React from "react";
import Joi from "joi";
import Form from "../common/form";
import Logo from "../common/logo";
import userService from "../users/userService";

class SignUp extends Form {
  state = {
    form: {
      name: "",
      email: "",
      password: "",
    },
  };

  schema = {
    name: Joi.string().required().min(6).messages({
      "string.base": `שם משתמש חייב להכיל מספרים ו/או אותיות`,
      "string.empty": `שם משתמש הינו שדה חובה`,
      "string.min": `שם משתמש חייב להכיל 6 תווים או יותר`,
      "any.required": `שם משתמש הינו שדה חובה`,
    }),
    email: Joi.string()
      .required()
      .min(6)
      .email({ tlds: { allow: false } })
      .messages({
        "string.empty": `דואר אלקטרוני הינו שדה חובה`,
        "string.min": `דואר אלקטרוני חייב להכיל 6 תווים או יותר`,
        "string.email": `הכתובת איננה חוקית`,
        "any.required": `דואר אלקטרוני הינו שדה חובה`,
      }),

    password: Joi.string().required().min(6).messages({
      "string.empty": `סיסמא הינה שדה חובה`,
      "string.min": `הסיסמא חייבת להכיל 6 תווים או יותר`,
      "any.required": `סיסמא הינה שדה חובה`,
    }),
  };

  async doSubmit() {
    const { form } = this.state;
    const { email, password } = this.state.form;
    try {
      await userService.createUser(form);
      await userService.login(email, password);
      window.location = "/my-cars";
      this.props.history.replace("/");
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { password: response.data } });
      }
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mx-auto text-center">
            <h1 className="text-primary">
              הצטרפו ל-
              <Logo />
            </h1>
            <h3>פנקס הרכב החכם</h3>
          </div>
        </div>

        <form
          onSubmit={this.handleSubmit}
          noValidate="novalidate"
          autoComplete="off"
        >
          <div className="row mt-5">
            {this.renderInput("name", "שם משתמש")}
            {this.renderInput("email", "דואר אלקטרוני")}
            {this.renderInput("password", "סיסמא", "password")}

            <div className="mt-5 mx-auto text-center">
              {this.renderButton("שלח")}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;

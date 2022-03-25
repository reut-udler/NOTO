import React from "react";
import Joi from "joi";
import Form from "../common/form";
import Logo from "../common/logo";
import userService from "../users/userService";

class SignIn extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        "string.empty": `דואר אלקטרוני הינו שדה חובה`,
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
    const { email, password } = this.state.form;
    try {
      await userService.login(email, password);
      if (this.props.location.state?.from) {
        window.location = this.props.location.state.from.pathname;
        this.props.history.replace("/");
        return;
      }
      window.location = "/my-cars";
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
              התחברו ל-
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

export default SignIn;

import React, { Component } from "react";
import Input from "./input";
import Joi from "joi";

class Form extends Component {
  validateInput({ name, value }) {
    const data = {
      [name]: value,
    };
    const schema = Joi.object({
      [name]: this.schema[name],
    });
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
  }

  validate = () => {
    const {
      schema,
      state: { form },
    } = this;
    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) {
      console.log(errors);
      return errors;
    }
    this.doSubmit();
  };

  handleChange = ({ target }) => {
    const { form, errors } = this.state;
    const errorMessage = this.validateInput(target);
    this.setState({
      form: {
        ...form,
        [target.name]: target.value,
      },
      errors: {
        ...errors,
        [target.name]: errorMessage,
      },
    });
  };

  handleEdit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) {
      console.log(errors);
      return errors;
    }
    this.doSubmit();
  };

  handleEditBiz = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const { error } = Joi.object({ ...this.schema }).validate(form, {
      abortEarly: false,
    });
    if (!error) {
      this.doSubmit();
    } else {
      return error;
    }
  };

  //render all text input
  renderInput(name, label, type = "text") {
    const { form, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        onChange={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
      />
    );
  }

  //handle bizImage
  handleUpload = ({ target }) => {
    this.setState({
      file: target.files[0],
      newBizImage: true,
    });
  };

  //rendering bizImage
  renderUpload(name, label, type) {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        onChange={this.handleUpload}
      />
    );
  }

  //save button
  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }
}

export default Form;

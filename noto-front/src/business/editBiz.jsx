import Joi from "joi";
import Form from "../common/form";
import bizService from "./bizService";

class EditBizCard extends Form {
  state = {
    form: {
      _id: "",
      owner: "",
      bizName: "",
      bizCategory: "",
      bizDescription: "",
      bizAdress: "",
      bizPhone: "",
      bizImage: "",
    },
  };

  schema = {
    _id: Joi.string(),
    owner: Joi.string(),
    bizName: Joi.string().min(2).max(255).required().messages({
      "string.base": `שם עסק חייב להכיל אותיות ו/או מספרים`,
      "string.empty": `שם עסק הינו שדה חובה`,
      "string.min": `שם עסק חייב להכיל לפחות 2 תווים`,
      "string.max": `הגעת למספר התווים המקסימלי לשדה זה`,
      "any.required": `שם עסק הינו שדה חובה`,
    }),
    bizCategory: Joi.string().min(2).max(255).required().messages({
      "string.base": `שדה קטגוריה חייב להכיל אותיות ו/או מספרים`,
      "string.empty": `תאור העסק הינו שדה חובה`,
      "string.min": `שדה קטגוריה חייב להכיל לפחות 2 תווים`,
      "string.max": `הגעת למספר התווים המקסימלי לשדה זה`,
      "any.required": `שדה קטגוריה הינו שדה חובה`,
    }),
    bizDescription: Joi.string().min(2).max(1024).required().messages({
      "string.base": `שדה תאור העסק חייב להכיל אותיות ו/או מספרים`,
      "string.empty": `תאור העסק הינו שדה חובה`,
      "string.min": `שדה תיאור העסק חייב להכיל לפחות 2 תווים`,
      "string.max": `הגעת למספר התווים המקסימלי לשדה זה`,
      "any.required": `תאור העסק הינו שדה חובה`,
    }),
    bizAdress: Joi.string().min(2).max(255).required().messages({
      "string.base": `שדה כתובת חייב להכיל אותיות ו/או מספרים`,
      "string.empty": `שדה כתובת הינו שדה חובה`,
      "string.min": `שדה כתובת חייב להכיל לפחות 2 תווים`,
      "string.max": `הגעת למספר התווים המקסימלי לשדה זה`,
      "any.required": `שדה כתובת הינו שדה חובה`,
    }),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .messages({
        "string.base": `נא להזין מספר טלפון תקין ללא רווחים או מקפים`,
        "string.empty": `טלפון הינו שדה חובה`,
        "string.min": `נא להזין מספר טלפון תקין ללא רווחים או מקפים`,
        "string.max": `נא להזין מספר טלפון תקין ללא רווחים או מקפים`,
        "any.required": `טלפון הינו שדה חובה`,
      }),
  };

  async doSubmit() {
    const { form, file } = this.state;
    const data = new FormData();
    data.append("_id", form._id);
    data.append("owner", form.owner);
    data.append("bizName", form.bizName);
    data.append("bizCategory", form.bizCategory);
    data.append("bizDescription", form.bizDescription);
    data.append("bizAdress", form.bizAdress);
    data.append("bizPhone", form.bizPhone);
    data.append("bizImage", file);

    try {
      await bizService.editBiz(data);
      window.location = "/my-biz-cards";
    } catch ({ response }) {
      if (response.status === 400) {
        this.setState({ errors: { bizAdress: response.data } });
      }
    }
  }

  //////////////////////////////////

  mapToViewModel({
    _id,
    owner,
    bizName,
    bizCategory,
    bizDescription,
    bizAdress,
    bizPhone,
    bizImage,
  }) {
    return {
      _id,
      owner,
      bizName,
      bizCategory,
      bizDescription,
      bizAdress,
      bizPhone,
      bizImage,
    };
  }
  mapToViewImage({ bizImage }) {
    return {
      bizImage,
    };
  }

  async componentDidMount() {
    const bizId = this.props.match.params.id;
    const { data } = await bizService.getBizCard(bizId);

    this.setState({
      form: this.mapToViewModel(data),
    });
  }

  handleCancel = () => {
    this.props.history.push("/my-biz-cards");
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { form, file } = this.state;
    const { error } = Joi.object({ ...this.schema }).validate(form, file, {
      abortEarly: false,
    });
    if (!error) {
      this.doSubmit();
    }
    console.log(error);
    return error;
  };

  ///////////////////////////

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto text-center">
            <h3>ערוך עסק</h3>
          </div>
        </div>

        <form
          onSubmit={this.handleEdit}
          noValidate="novalidate"
          autoComplete="off"
          method="post"
          encType="multipart/form-data"
        >
          {
            <div className="row mt-5">
              {this.renderInput("bizName", "שם העסק")}
              {this.renderInput("bizCategory", "קטגוריה")}
              {this.renderInput("bizDescription", "תיאור העסק ו/או השירות")}
              {this.renderInput("bizAdress", "כתובת")}
              {this.renderInput("bizPhone", "טלפון")}
              {this.renderUpload("bizImage", "תמונה", "file")}

              <div className="mt-5 mx-auto text-center">
                {this.renderButton("שמור")}

                <button
                  onClick={this.handleCancel}
                  className="btn btn-dark my-auto me-5 "
                >
                  בטל
                </button>
              </div>
            </div>
          }
        </form>
      </div>
    );
  }
}

export default EditBizCard;

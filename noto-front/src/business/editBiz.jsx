import Joi from "joi";
import Form from "../common/form";
import bizService from "./bizService";

class EditBizCard extends Form {
  state = {
    form: {
      bizName: "",
      bizCategory: "",
      bizDescription: "",
      bizAdress: "",
      bizPhone: "",
      bizImage: "",
    },
    newBizImage: false,
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
    data.set("bizName", form.bizName);
    data.set("bizCategory", form.bizCategory);
    data.set("bizDescription", form.bizDescription);
    data.set("bizAdress", form.bizAdress);
    data.set("bizPhone", form.bizPhone);

    if (this.state.newBizImage) {
      data.set("bizImage", file);
    }

    try {
      await bizService.editBizCard(form._id, data);
      window.location = "/my-biz-cards";
    } catch ({ response }) {
      console.log(response);
    }
  }

  mapToViewModel({
    _id,
    owner,
    bizName,
    bizCategory,
    bizDescription,
    bizAdress,
    bizPhone,
  }) {
    return {
      _id,
      owner,
      bizName,
      bizCategory,
      bizDescription,
      bizAdress,
      bizPhone,
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
      file: this.mapToViewImage(data).bizImage,
    });
  }

  handleCancel = () => {
    this.props.history.push("/my-biz-cards");
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto text-center">
            <h3>ערוך עסק</h3>
          </div>
        </div>

        <form
          onSubmit={this.handleEditBiz}
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

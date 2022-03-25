import React, { Component } from "react";
import bizService from "./bizService";
import userService from "./../users/userService";
import BizCard from "./bizCard";

class Business extends Component {
  state = {
    bizCards: [],
    favorites: [],
  };
  userInputName = React.createRef();
  userInputCategory = React.createRef();

  hartHandler() {
    for (let i = 0; i < this.state.favorites.length; i++) {
      return console.log(this.state.favorites._id);
    }
  }

  async componentDidMount() {
    const { data } = await bizService.getAllBizCards();
    const fav = await userService.getFavorites();
    if (data.length) {
      this.setState({
        bizCards: data,
        favorites: fav.data,
      });
    }
  }

  findBizNameHandle = async () => {
    const bizName = this.userInputName.current.value;
    try {
      const { data } = await bizService.findBizName(bizName);
      this.setState({ bizCards: data });
    } catch (error) {
      console.log(error);
    }
  };

  findBizCategoryHandle = async () => {
    const bizCategory = this.userInputCategory.current.value;
    try {
      const { data } = await bizService.findBizCategory(bizCategory);
      this.setState({ bizCards: data });
    } catch (error) {
      console.log(error);
    }
  };

  favoritesHandler = (favorite) => {
    const data = { favorite };
    bizService.addFavorites(data);
  };

  render() {
    const { bizCards } = this.state;

    return (
      <div className="page-container mt-5 p-2">
        <div className="row ">
          <div>
            <a
              href="/create-business"
              className="btn btn-outline-primary m-3"
              role="button"
              aria-pressed="true"
            >
              הרשם כנותן שירות
            </a>
          </div>
          <div className="col-ml-5 mx-auto text-center">
            <h3 className="text-center font-weight-bold">הי נהגוס</h3>
            <h5> מחפש בעל מקצוע איכותי? </h5>
            <h5>מוזמן להתרשם מנותני שירות שקיבלו המלצות ממשתמשי NOTO אחרים</h5>
          </div>
        </div>

        <div className="row p-5 ">
          <div className="col-md-5 p-1 d-flex justify-content-center">
            <label htmlFor="bizName">חיפוש לפי שם העסק</label>
            <input
              ref={this.userInputName}
              type="text"
              name="inputBizName"
              id="bizName"
              className="me-2"
            />
            <button
              onClick={this.findBizNameHandle}
              className="btn-primary"
              type="search"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
          <div className="col-md-5 p-1 d-flex justify-content-center">
            <label htmlFor="bizName">חיפוש לפי קטגוריה</label>
            <input
              ref={this.userInputCategory}
              type="text"
              name="inputBizCategory"
              id="bizCategory"
              className="me-2"
            />
            <button
              onClick={this.findBizCategoryHandle}
              className="btn-primary"
              type="search"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div className="row">
          {bizCards.map((bizCard) => (
            <BizCard
              className="biz-card"
              key={bizCard._id}
              bizCard={bizCard}
              onFavorites={this.favoritesHandler}
              favorites={this.state.favorites}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Business;

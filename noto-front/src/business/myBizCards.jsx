import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import bizService from "./bizService";
import BizCard from "./bizCard";

class MyBizCards extends Component {
  state = {
    bizCards: [],
    favorites: [],
    loader: true,
  };

  async componentDidMount() {
    const data = await bizService.getMyBizCards();
    const carData = data.data;
    if (carData.length) {
      this.setState({
        bizCards: carData,
        loader: false,
      });
    }
    {
      this.setState({
        loader: false,
      });
    }
  }

  getText() {
    const { bizCards } = this.state;
    return bizCards.length > 0 ? (
      <h3>רשימת העסקים שלך:</h3>
    ) : (
      <div>
        <h3>אין לך עסקים רשומים</h3>
        <h5>לחץ על כפתור 'הרשם כנותן שירות' כדי להוסיף עסק</h5>
      </div>
    );
  }

  render() {
    const { bizCards } = this.state;

    return (
      <div className="mx-auto text-center mt-5">
        {this.state.loader ? (
          <ClipLoader size={150} color={"#fff"} loading={this.state.loader} />
        ) : (
          <div className="container mt-5 ">
            <div className="row">
              <div className="text-end">
                <a
                  href="/create-business"
                  className="btn btn-primary btn-circle btn-xl"
                  role="button"
                  aria-pressed="true"
                >
                  הוסף עסק
                </a>
              </div>
              <div className="col-md-8 mx-auto text-center">
                <div className="text-center font-weight-bold">
                  {this.getText()}
                </div>
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
                  location={this.props.location.pathname}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyBizCards;

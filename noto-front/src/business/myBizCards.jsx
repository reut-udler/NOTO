import React, { Component } from "react";
import bizService from "./bizService";
import BizCard from "./bizCard";

class MyBizCards extends Component {
  state = { bizCards: [] };

  async componentDidMount() {
    const { data } = await bizService.getMyBizCards();

    if (data.length) {
      this.setState({
        bizCards: data,
      });
    }
  }

  getText() {
    const { bizCards } = this.state;
    return bizCards.length > 0 ? (
      <h5> "העסקים שלך:"</h5>
    ) : (
      <h5>
        אין לך עסקים רשומים. לחץ על כפתור 'הרשם כנותן שירות' כדי להוסיף עסק
      </h5>
    );
  }

  render() {
    const { bizCards } = this.state;

    return (
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-md-4 mx-auto text-center">
            <h3 className="text-center font-weight-bold">אהלן אהלן</h3>
            {this.getText()}
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          {bizCards.map((bizCard) => (
            <BizCard key={bizCard._id} bizCard={bizCard} />
          ))}
          <div className="mt-5 mx-auto text-center">
            <a
              href="/create-business"
              className="btn btn-primary btn-lg active"
              role="button"
              aria-pressed="true"
            >
              הוסף עסק
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MyBizCards;

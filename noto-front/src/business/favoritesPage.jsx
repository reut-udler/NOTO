import React, { Component } from "react";
import BizCard from "./bizCard";
import userService from "./../users/userService";
import bizService from "./bizService";

class FavoritesPage extends Component {
  state = {
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await userService.getFavorites();
    if (data.length) {
      this.setState({
        favorites: data,
      });
    }
  }

  getText() {
    const { favorites } = this.state;
    return favorites.length > 0
      ? "העסקים המועדפים שלך:"
      : "אין לך עסקים מועדפים";
  }

  favoritesHandler = (favorite) => {
    const data = { favorite };
    bizService.addFavorites(data);
  };

  render() {
    const { favorites } = this.state;

    return (
      <div className="page-container mt-5 p-5">
        <div className="row ">
          <div className="col-ml-5 mx-auto text-center">
            <h3 className="text-center font-weight-bold">{this.getText()}</h3>
          </div>
        </div>

        <div className="row mt-5">
          {favorites.map((bizCard) => (
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

export default FavoritesPage;

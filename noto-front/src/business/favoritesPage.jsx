import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BizCard from "./bizCard";
import userService from "./../users/userService";
import bizService from "./bizService";

class FavoritesPage extends Component {
  state = {
    favorites: [],
    loader: true,
  };

  async componentDidMount() {
    const { data } = await userService.getFavorites();
    if (data.length) {
      this.setState({
        favorites: data,
        loader: false,
      });
    } else {
      this.setState({
        loader: false,
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
      <div className="mx-auto text-center mt-5">
        {this.state.loader ? (
          <ClipLoader size={150} color={"#fff"} loading={this.state.loader} />
        ) : (
          <div className="page-container mt-5 p-5">
            <div className="row ">
              <div className="col-ml-5 mx-auto text-center">
                <h3 className="text-center font-weight-bold">
                  {this.getText()}
                </h3>
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
        )}
      </div>
    );
  }
}

export default FavoritesPage;

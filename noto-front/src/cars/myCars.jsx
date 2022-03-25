import React, { Component } from "react";
import carService from "./carService";
import Car from "./car";

class MyCars extends Component {
  state = { cars: [] };

  async componentDidMount() {
    const { data } = await carService.getMyCars();

    if (data.length) {
      this.setState({
        cars: data,
      });
    }
  }

  getText() {
    const { cars } = this.state;
    return cars.length > 0
      ? "כנס לכרטיס הרכב כדי לעדכן, להוסיף או למחוק מידע"
      : "אין לך רכבים רשומים. לחץ על כפתור 'הוסף רכב' כדי להכניס רכב חדש";
  }

  render() {
    const { cars } = this.state;

    return (
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-md-4 mx-auto text-center">
            <h3 className="text-center font-weight-bold">הי נהגוס</h3>
            <h5>{this.getText()}</h5>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          {cars.map((car) => (
            <Car key={car._id} car={car} />
          ))}
          <div className="mt-5 mx-auto text-center">
            <a
              href="/create-car"
              className="btn btn-primary btn-lg active"
              role="button"
              aria-pressed="true"
            >
              הוסף רכב
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCars;
import { Component } from "react";
import carService from "./carService";
import DeleteModal from "./deleteModal";

class DeleteCar extends Component {
  state = {
    deleteOption: true,
  };

  handleDelet = () => {
    carService.deleteCar(this.props.match.params.id);
    this.setState.deleteOption = false;
    window.location = "/my-cars";
    this.props.history.replace("/my-cars");
  };

  handelCancel = () => {
    this.setState.deleteOption = false;
    window.location = "/my-cars";
  };

  render() {
    return (
      <DeleteModal
        deleteOption={this.state.deleteOption}
        handleDelet={this.handleDelet}
        handelCancel={this.handelCancel}
      />
    );
  }
}

export default DeleteCar;

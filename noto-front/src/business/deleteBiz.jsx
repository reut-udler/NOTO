import { Component } from "react";
import bizService from "./bizService";
import DeleteBizModal from "./deleteBizModal";

class DeleteCar extends Component {
  state = {
    deleteOption: true,
  };

  handleDelet = () => {
    bizService.deleteBiz(this.props.match.params.id);
    this.setState.deleteOption = false;
    window.location = "/my-biz-cards";
    this.props.history.replace("/my-biz-cards");
  };

  handelCancel = () => {
    this.setState.deleteOption = false;
    window.location = "/my-biz-cards";
  };

  render() {
    return (
      <DeleteBizModal
        deleteOption={this.state.deleteOption}
        handleDelet={this.handleDelet}
        handelCancel={this.handelCancel}
      />
    );
  }
}

export default DeleteCar;

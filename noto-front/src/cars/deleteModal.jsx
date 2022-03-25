import React from "react";
import Modal from "react-modal";
import "../styles/deleteModal.css";

Modal.setAppElement("#root");

const DeleteModal = (props) => {
  return (
    <Modal
      isOpen={!!props.deleteOption}
      contentLabel="deleteCar"
      closeTimeoutMS={300}
      className="classModal"
    >
      <h3>למחוק את הרכב מחשבונך? בטוח-בטוח? </h3>
      <button
        className="btn btn-outline-primary m-3 mt-5"
        onClick={props.handleDelet}
      >
        בטוח. מחק.
      </button>
      <button
        className="btn btn-outline-primary m-3 mt-5"
        onClick={props.handelCancel}
      >
        מה פתאום. קבל ביטול
      </button>
    </Modal>
  );
};

export default DeleteModal;

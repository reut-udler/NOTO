import React from "react";
import Modal from "react-modal";
import "../styles/deleteModal.css";

Modal.setAppElement("#root");

const DeleteBizModal = (props) => {
  return (
    <Modal
      isOpen={!!props.deleteOption}
      contentLabel="deleteBiz"
      closeTimeoutMS={300}
      className="classModal"
    >
      <h3>למחוק את העסק מחשבונך?</h3>
      <button
        className="btn btn-outline-primary m-3 mt-5"
        onClick={props.handleDelet}
      >
        מחק
      </button>
      <button
        className="btn btn-outline-primary m-3 mt-5"
        onClick={props.handelCancel}
      >
        ביטול
      </button>
    </Modal>
  );
};

export default DeleteBizModal;

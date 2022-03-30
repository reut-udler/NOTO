import React from "react";
import { useEffect, useState } from "react";

const BizCard = (props) => {
  let [hart, setHart] = useState(false);
  let bizId = props.bizCard._id;
  const data = `http://localhost:8080/api/biz/${bizId}/bizImage`;
  const BizImage = () => <img src={data} alt="business-img" />;

  useEffect(() => {
    const bizId = props.bizCard._id;
    let favoritesArray = [];

    for (let i = 0; i < props.favorites.length; i++) {
      let favoritesId = props.favorites[i]._id;
      favoritesArray.push(favoritesId);

      if (favoritesArray.includes(bizId)) {
        setHart(true);
      }
    }
  }, [props.bizCard._id, props.favorites]);

  const clickHandler = (e) => {
    const _id = props.bizCard._id;
    props.onFavorites(_id);
    setHart(!hart);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card flex-row mb-2 box-shadow">
            <BizImage className="img-fluid col-5 rounded float-left" />
            <div className="card-body d-flex flex-column align-items-start">
              <h6 className="d-inline-block mb-2 text-primary">
                <b>קטגוריה: </b>
                {props.bizCard.bizCategory}
              </h6>
              <h3 className="row">{props.bizCard.bizName}</h3>
              <p className="card-text mb-auto">
                <b>תיאור העסק: </b>
                {props.bizCard.bizDescription}
              </p>
              <p className="card-text mb-auto">
                <b>כתובת: </b>
                {props.bizCard.bizAdress}
              </p>
              <p className="card-text mb-auto">
                <b>טלפון: </b>
                {props.bizCard.bizPhone}
              </p>
            </div>
            <div>
              {props.location === "/my-biz-cards" ? (
                <div></div>
              ) : (
                <h3>
                  <i
                    className={
                      hart === true
                        ? "bi bi-heart-fill m-4 text-primary"
                        : "bi bi-heart m-4 text-primary"
                    }
                    type="button"
                    onClick={clickHandler}
                  ></i>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizCard;

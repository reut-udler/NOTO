import "../styles/car.css";

const Car = ({ car: { carNumber, manufacturer, model, manYear, _id } }) => {
  return (
    <div className="car-container">
      <div className="car-card">
        <div className="card-body">
          <h4 className="card-text ">
            <b>{carNumber}</b>
          </h4>
          <p className="card-title border-top pt-2">
            <b>יצרן: </b> {manufacturer}
          </p>
          <p className="card-title">
            <b>מודל: </b>
            {model}
          </p>
          <p className="card-text">
            <b>שנת ייצור: </b>
            {manYear}
          </p>
          <div className="mt-5 mx-auto text-center">
            <a
              href={`/my-cars/edit/${_id}`}
              className="btn btn-outline-primary m-2"
              role="button"
              aria-pressed="true"
            >
              כרטיס רכב
            </a>

            <a
              href={`/my-cars/delete/${_id}`}
              className="btn btn-outline-primary m-2"
              role="button"
              aria-pressed="true"
            >
              מחק רכב
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;

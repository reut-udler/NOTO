const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="myform form ">
            <label htmlFor={name}>{label}</label>
            <input {...rest} id={name} name={name} className="form-control" />
            {error && <span className="text-danger">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;

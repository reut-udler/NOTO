import Logo from "./../common/logo";

const Home = ({ user }) => {
  return (
    <div className="row">
      <div className="col-12 mt-5 text-center">
        <h3 className="text-center font-weight-bold">הי, כיף שבאת</h3>
        <h1 className="text-primary text-center font-weight-bold mt-5">
          <span>ברוך הבא ל-</span>
          <span>
            <Logo></Logo>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Home;

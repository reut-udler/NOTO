import Logo from "./logo";

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer-container d-flex flex-wrap justify-content-around my-5 border-top">
        <p className="col-md-4 mb-0 text-white">
          <Logo />
        </p>

        <span className="col-md-4 mb-0 text-white">
          <p>לא משנה לאן אתה נוסע, העיקר שתהנה מהדרך</p>
        </span>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="/statistics" className="nav-link px-2 text-muted">
              <p className="text-white">סטטיסטיקות</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link px-2 text-muted">
              <p className="text-white">אודות</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
              <p className="text-white">דף הבית</p>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

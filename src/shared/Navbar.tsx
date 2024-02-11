const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a
        className="navbar-brand"
        href="https://github.com/ikenley/quicksort-ranker"
        target="_blank"
        rel="noreferrer"
      >
        Quicksort Ranker
      </a>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/quicksort-ranker?list=cocktails">
              Cocktails
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://github.com/ikenley/quicksort-ranker"
            >
              Source
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

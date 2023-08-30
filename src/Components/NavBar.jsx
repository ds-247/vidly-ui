import { Link, NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg"
      style={{
        backgroundColor: "#8fd9ff",
        height: "70px",
        fontWeight: 900,
        fontSize: "15px",
        marginBottom: "16px",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          VIDLY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
            {!user && (
              <>
                <NavLink className="nav-link" to="/login-form">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register-form">
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink className="nav-link" to="/me">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;

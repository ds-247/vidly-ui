import React, { useEffect, useState } from "react";
import Movies from "./Components/Movies";
import NavBar from "./Components/NavBar";
import Customers from "./Components/Customers";
import MoviesForm from "./Components/MoviesForm";
import NotFound from "./Components/NotFound";
import Rentals from "./Components/Rentals";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Logout from "./Components/logout";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./Components/common/protectedRoute";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = () => {
      const user = auth.getCurrentUser();
      setUser(user);
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route
              exact
              path={["/", "/movies"]}
              render={(prop) => <Movies {...prop} user={user} />}
            />
            <ProtectedRoute path="/movies/:id" component={MoviesForm} />
            <Route exact path="/rentals">
              <Rentals />
            </Route>
            <Route exact path="/customers">
              <Customers />
            </Route>
            <Route exact path="/login-form">
              <LoginForm />
            </Route>
            <Route exact path="/register-form">
              <RegisterForm />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/not-found">
              <NotFound />
            </Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;

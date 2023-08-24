import Movies from "./Components/Movies";
import NavBar from "./Components/NavBar";
import Customers from "./Components/Customers";
import MoviesForm from "./Components/MoviesForm";
import NotFound from "./Components/NotFound";
import Rentals from "./Components/Rentals";
import React from "react";
import LoginForm from "./Components/LoginForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <main className="container">
          <Switch>
            <Route exact path={["/", "/movies"]}>
              <Movies />
            </Route>
            <Route
              path="/movies/:id"
              render={(prop) => <MoviesForm {...prop} />}
            />
            <Route exact path="/rentals">
              <Rentals />
            </Route>
            <Route exact path="/customers">
              <Customers />
            </Route>
            <Route exact path="/moviesForm">
              <MoviesForm />
            </Route>
            <Route exact path="/not-found">
              <NotFound />
            </Route>
            <Route exact path="/login-form">
              <LoginForm />
            </Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { fakeAuth } from "./helpers";
import NoMatch from "./components/UI/NoMatch";
import LoginPage from "./components/AuthLoading/LoginPage";
import RegisterForm from "./components/AuthLoading/RegisterForm";
import ForgetPassword from "./components/AuthLoading/ForgetPassword";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute  path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/forget_password">
          <ForgetPassword />
        </Route>
        <Route extract path="/">
          <Home />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let authenticated = window.localStorage.getItem("authenticated");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // fakeAuth.isAuthenticated ? (
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage() {
  let history = useHistory();
  return (
    <div>
      <h3>Bình luận - Tin nhắn </h3>
      <button onClick={() => history.goBack()}>Quay về</button>
    </div>
  );
}

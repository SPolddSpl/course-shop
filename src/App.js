import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/">
      <Welcome />
    </Route>
  </Switch>;
}

export default App;

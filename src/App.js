import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// @ts-ignore
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";

const BooksApp = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={SearchBar} />
        </Switch>
      </div>
    </Router>
  );
};

export default BooksApp;

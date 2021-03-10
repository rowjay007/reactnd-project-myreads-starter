import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
// @ts-ignore
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";

const BooksApp = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={SearchBar} />
    </div>
  );
};

export default BooksApp;

import React from "react";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
import "./App.scss";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/moive/:imdbID" exact component={MovieDetails} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </Routes>
    </div>
  );
}

export default App;

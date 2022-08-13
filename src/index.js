import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./home";
import MovieDetails from "./moviedetails";
import LikedMovies from "./likedmovies";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="/:id" element={<MovieDetails />}>
            MovieDetails
          </Route>
          <Route path="/home/:id" element={<LikedMovies />}>
            LikedMovies
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

render(<App />, document.getElementById("root"));

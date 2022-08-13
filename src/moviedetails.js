import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// API - http://www.omdbapi.com/?i=tt3896198&apikey=92601d32  // i - index  // s - name
// API - http://www.omdbapi.com/?apikey=1f89eecb&s=marvel

var searchText;

const MovieDetails = () => {
  let { id } = useParams();
  console.log(id);

  const [movies, setMovies] = useState([]);

  const getMovies = async (texts) => {
    // console.log(texts);
    const movies = await axios.get(
      `http://www.omdbapi.com/?s=${texts}&apikey=92601d32`
    );
    console.log(movies.data.Search);
    setMovies(movies.data.Search);
  };

  useEffect(() => {
    if (localStorage.getItem("moviename")) {
      searchText = JSON.parse(localStorage.getItem("moviename"));
    } else {
      localStorage.setItem("moviename", JSON.stringify("marvel"));
    }
    getMovies(searchText);
  }, []);

  return (
    <>
      <h1 className="details">Movie Details</h1>
      <br />
      <br />
      <div className="movies"></div>
      {movies.map((movie) => {
        return id === movie.imdbID ? (
          <div className="moviesdetails">
            <div>
              <img alt="tes" src={movie.Poster}></img>
            </div>
            <div>
              <h2 className="moviename">Title - {movie.Title}</h2>
              <h2>Year - {movie.Year}</h2>
              <h2>Type - {movie.Type}</h2>
              <h2>imdbID - {movie.imdbID}</h2>
            </div>
          </div>
        ) : (
          <div></div>
        );
      })}
    </>
  );
};

export default MovieDetails;

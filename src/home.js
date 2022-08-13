import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import MovieDetails from "./moviedetails";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [likedList, setLikedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const Like = (movie) => {
    setLikedList([...likedList, movie]);
  };
  // console.log(params.id);

  const getMovies = async (texts) => {
    console.log(texts);
    const movies = await axios.get(
      `http://www.omdbapi.com/?s=${texts}&apikey=92601d32`
    );
    console.log(movies.data.Search);
    setMovies(movies.data.Search);
  };

  useEffect(() => {
    if (localStorage.getItem("moviename")) {
      setSearchText(JSON.parse(localStorage.getItem("moviename")));
      getMovies(JSON.parse(localStorage.getItem("moviename")));
    } else {
      localStorage.setItem("moviename", JSON.stringify("marvel"));
      setSearchText("marvel");
      getMovies("marvel");
    }
    if (localStorage.getItem("likedMoviesList")) {
      setLikedList(JSON.parse(localStorage.getItem("likedMoviesList")));
    } else {
      localStorage.setItem("likedMoviesList", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedMoviesList", JSON.stringify(likedList));
  }, [likedList]);

  useEffect(() => {
    localStorage.setItem("moviename", JSON.stringify(searchText));
  }, [searchText]);

  const Add = () => {
    if (searchText.length >= 3) {
      getMovies(searchText);
      // console.log(searchText);
    } else {
      alert("Small Text To Search");
    }
  };

  return (
    <>
      <div className="searchBox">
        <h1>Movies Details</h1>
        <input
          type="text"
          value={searchText}
          onChange={function (e) {
            setSearchText(e.target.value);
          }}
        />{" "}
        &nbsp;
        <button
          onClick={function () {
            Add();
          }}
        >
          <img
            alt="Tes"
            src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
            height={"12px"}
          />
        </button>{" "}
        <br /> <br />
        <Link to={"/home/likedlist"}>
          <button>Liked Movies</button>
        </Link>
      </div>

      <div className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.imdbID} className="movie">
              <Link to={movie.imdbID}>
                <img alt="tes" src={movie.Poster}></img>
              </Link>
              <h2 className="moviename">{movie.Title}</h2>
              <button
                onClick={function () {
                  {
                    var alreadypresentmovie = true;
                    likedList.map((likedmovie) => {
                      if (movie.imdbID === likedmovie.imdbID)
                        alreadypresentmovie = false;
                    });
                    if (alreadypresentmovie) Like(movie);
                  }
                  // console.log(alreadypresentmovie);
                }}
              >
                Like
              </button>{" "}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;

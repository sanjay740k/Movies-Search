import React, { useEffect, useState } from "react";

const LikedMovies = () => {
  const [likedList, setLikedList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("likedMoviesList")) {
      setLikedList(JSON.parse(localStorage.getItem("likedMoviesList")));
    } else {
      localStorage.setItem("likedMoviesList", JSON.stringify([]));
    }
    // console.log(likedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("likedMoviesList", JSON.stringify(likedList));
  }, [likedList]);

  const Dislike = (imdbID) => {
    setLikedList(likedList.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <>
      <div>
        <h1>Liked Movies List</h1>
        <div className="movies">
          {likedList.map((movie) => {
            return (
              <div key={movie.imdbID} className="movie">
                <img alt="tes" src={movie.Poster}></img>
                <h2 className="moviename">{movie.Title}</h2>
                <button
                  onClick={function () {
                    Dislike(movie.imdbID);
                  }}
                >
                  Dislike
                </button>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikedMovies;

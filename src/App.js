/* eslint-disable */
import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

function App() {
  
  const featured_movies = process.env.REACT_APP_FEATURED_URL;
  const search = process.env.REACT_APP_SEARCH_URL;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      getMovies(featured_movies)
  }, []);

  const getMovies = (api) => {
    fetch(api)
    .then(res => res.json())
    .then(data => {
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      getMovies(search + searchTerm);
    }
    setSearchTerm('');
    }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }
 
  const handleNavigation = (e) => {
    e.preventDefault();
    getMovies(featured_movies);
  }

  return (
  <div>
    <header>
      <button className="moviedb" onClick={handleNavigation}><h1>MOVIEDB</h1></button>
      <form onSubmit={handleOnSubmit}>
      <input className="search" type="search" placeholder="Search" value={searchTerm} onChange={handleOnChange} />
      </form>
    </header>

    <div className="movie-container">
      {movies.length > 0 && movies.map((movie) => (
        <Movie {...movie} key={movie.id} />
      ))}
    </div>

  </div>
  );
}

export default App;

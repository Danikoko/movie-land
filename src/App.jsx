import { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_KEY = 'a0eab34e';
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCount, setSearchCount] = useState(0);

  const searchMovies = async title => {
    const response = await axios(`${API_URL}&s=${title}`);
    setMovies(response.data.Search);
    setSearchCount(prevSearchCount => prevSearchCount + 1);
  }

  useEffect(() => {
    movies?.length === 0
    ?
    document.title = 'Home - MovieLand'
    :
    document.title = `${movies?.length} movie${movies?.length >= 2 ? 's' : '' } found - MovieLand`;
  }, [movies]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Seach for movies" 
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {
                movies?.map(movie => (
                  <MovieCard 
                    movie={movie} 
                    key={movie.imdbID}
                  />
                ))
              }
            </div>
          ) : (
            <div className="empty">
              <h2>
                {
                  searchCount === 0
                  ?
                  'Search movies above'
                  :
                  'No movies found'
                }
              </h2>
            </div>
          )
      }
    </div>
  )
}

export default App;

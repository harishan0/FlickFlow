import { useState } from 'react'
import { useEffect } from 'react' 
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'

//4ea191ac

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=4ea191ac';

const movie1 = {
  "Title": "The Batman",
  "Year": "2022",
  "imdbID": "tt1877830",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg"
}


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() =>{
    searchMovies("Batman");
  }, [])

  return (
   <div className = "app">
    <h1>MovieLand</h1>
    
    <div className = "search">
      <input placeholder = "Search for Movies" value = {searchTerm}
      onChange = {(e) => setSearchTerm(e.target.value)} type="text" />
      <img onClick = {()=>searchMovies(searchTerm)} src={SearchIcon} alt="search"/>
    </div>

    {movies?.length > 0 ? (
        <div className ="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className = "empty"> 
          <h2>No Movies Found</h2>
        </div>
      )}
    
   </div>
  );
}

export default App

import React, { useState, useEffect } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../services/api";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ name: "", genre: "", year: "" });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  };

  const handleAddMovie = async () => {
    await addMovie(newMovie);
    fetchMovies();
    setNewMovie({ name: "", genre: "", year: "" });
  };

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    fetchMovies();
    return (
      <div>
        <h2>Movies</h2>
        <input
          type="text"
          placeholder="Name"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Year"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
        />
        <button onClick={handleAddMovie}>Add Movie</button>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.name} - {movie.genre} - {movie.year}
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
}

import React, { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../services/api";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
// import { BsFillFilterSquareFill } from "react-icons/bs";
import { BsFillFilterSquareFill } from "react-icons/bs";
import "./movie.css";
import "./search.css";
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({ name: "", genre: "", year: "" });
  const [editMovie, setEditMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortBy, setSortBy] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showSearch, setshowSearch] = useState(false);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies(
        searchTerm,
        searchBy,
        sortBy,
        isAscending
      );
      console.log(response);
      setMovies(response);
    } catch (err) {
      setError("Failed to fetch movies");
    }
  };

  const handleAddMovie = async () => {
    try {
      await addMovie(newMovie);
      setNewMovie({ name: "", genre: "", year: "" });
      fetchMovies();
      setShowAddForm(false);
    } catch (err) {
      setError("Failed to add movie");
    }
  };

  const handleUpdateMovie = async (id) => {
    try {
      await updateMovie(id, editMovie);
      setEditMovie(null);
      fetchMovies();
    } catch (err) {
      setError("Failed to update movie");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      setError("Failed to delete movie");
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const handleSort = () => {
    fetchMovies();
  };
  const toggleFilter = () => {
    setshowSearch(!showSearch);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchBy("name");
    setSortBy("");
    setIsAscending(true);
    fetchMovies();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="head">Movies List</h1>
      <div onClick={toggleFilter}>
        <BsFillFilterSquareFill className="filter-icon" />
      </div>
      {showSearch && (
        <div className="search-filter">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="dropdown"
            >
              <option value="name">Name</option>
              <option value="genre">Genre</option>
              <option value="year">Year</option>
            </select>
            <button onClick={handleSearch} className="btn">
              Search
            </button>
            <button onClick={handleClear} className="btn clear-btn">
              Clear
            </button>
          </div>
          <div className="sort-section">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="dropdown"
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="year">Year</option>
            </select>
            <select
              value={isAscending ? "true" : "false"}
              onChange={(e) => setIsAscending(e.target.value === "true")}
              className="dropdown"
            >
              <option value="true">Ascending</option>
              <option value="false">Descending</option>
            </select>
            <button onClick={handleSort} className="btn">
              Sort
            </button>
          </div>
        </div>
      )}

      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div className="movie-details">
              <span>{movie.name}</span>
              <span>Genre: {movie.genre}</span>
              <span>ReleaseYear: {movie.year}</span>
            </div>
            <div className="movie-actions">
              <FaEdit
                className="icon edit-icon"
                onClick={() => setEditMovie(movie)}
              />
              <FaTrashAlt
                className="icon delete-icon"
                onClick={() => handleDeleteMovie(movie.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="btn add-btn"
      >
        <FaPlus /> Add Movie
      </button>

      {showAddForm && (
        <div className="form-group">
          <h2>Add New Movie</h2>
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
            onChange={(e) =>
              setNewMovie({ ...newMovie, genre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Release Year"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
          />
          <button onClick={handleAddMovie} className="btn">
            Add Movie
          </button>
        </div>
      )}

      {editMovie && (
        <div className="form-group">
          <h2>Edit Movie</h2>
          <input
            type="text"
            placeholder="Name"
            value={editMovie.name}
            onChange={(e) =>
              setEditMovie({ ...editMovie, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Genre"
            value={editMovie.genre}
            onChange={(e) =>
              setEditMovie({ ...editMovie, genre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Release Year"
            value={editMovie.year}
            onChange={(e) =>
              setEditMovie({ ...editMovie, year: e.target.value })
            }
          />
          <button
            onClick={() => handleUpdateMovie(editMovie.id)}
            className="btn"
          >
            Update Movie
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;

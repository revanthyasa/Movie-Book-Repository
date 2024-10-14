import React, { useState } from "react";
import { FaFilm, FaBook } from "react-icons/fa";
import MoviesList from "../component/MoviesList";
import BooksList from "../component/BooksList";
import Login from "../component/Login";
import Register from "../component/Register";
import "./App.css";
import "../component/login.css";
import { TbMoodEmpty } from "react-icons/tb";
import { MdCloseFullscreen } from "react-icons/md";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showMoviesList, setShowMoviesList] = useState(false);
  const [showBooksList, setShowBooksList] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleRegisterSuccess = () => {
    setShowLogin(true);
  };

  const toggleMoviesList = () => {
    setShowMoviesList(!showMoviesList);
    if (showBooksList) setShowBooksList(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    setShowMoviesList(false);
    setShowBooksList(false);
  };

  const toggleBooksList = () => {
    setShowBooksList(!showBooksList);
    if (showMoviesList) setShowMoviesList(false);
  };

  return (
    <div className="app-container">
      <h1
        className="heading"
        onClick={() => {
          setShowMoviesList(false);
          setShowBooksList(false);
        }}
      >
        RAPTORS
      </h1>
      {!isAuthenticated ? (
        showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        )
      ) : (
        <>
          <div className="sidebar">
            <div
              className="icon-container"
              onClick={toggleMoviesList}
              style={showMoviesList ? { opacity: 0.5 } : {}}
            >
              <FaFilm className="big-icon" />
              <div className="icon-text">Movies</div>
            </div>
            <div
              className="icon-container"
              onClick={toggleBooksList}
              style={showBooksList ? { opacity: 0.5 } : {}}
            >
              <FaBook className="big-icon" />
              <div className="icon-text">Books</div>
            </div>
            <div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
          <div className="content">
            {showMoviesList && (
              <div className="list-container movies-list">
                {/* <button className="close-btn" onClick={() => setShowMoviesList(false)}>Close</button> */}
                <MdCloseFullscreen
                  className="close-btn"
                  onClick={() => setShowMoviesList(false)}
                />
                <MoviesList onClose={() => setShowMoviesList(false)} />
              </div>
            )}
            {showBooksList && (
              <div className="list-container books-list">
                {/* <button className="close-btn" onClick={() => setShowBooksList(false)}>Close</button> */}
                <MdCloseFullscreen
                  className="close-btn"
                  onClick={() => setShowBooksList(false)}
                />

                <BooksList onClose={() => setShowBooksList(false)} />
              </div>
            )}
            {!showBooksList && !showMoviesList && (
              <div>
                <div className="empty-container">
                  <TbMoodEmpty className="empty-icon" />
                  <div>
                    <h1 className="empty-text">
                      Please Click On The Icons On <br />
                      The Left To Display Content
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!isAuthenticated && (
        <div className="auth-toggle">
          {showLogin ? (
            <p>
              Don't have an account? <br />
              <button className="btn" onClick={() => setShowLogin(false)}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account? <br />
              <button className="btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

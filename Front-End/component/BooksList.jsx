import React, { useEffect, useState } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../services/api";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import "./book.css";
import "./search.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState({ title: "", author: "", year: "" });
  const [editBook, setEditBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [sortBy, setSortBy] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks(
        searchTerm,
        searchBy,
        sortBy,
        isAscending
      );
      console.log(response);
      setBooks(response);
    } catch (err) {
      setError("Failed to fetch books");
    }
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      setNewBook({ title: "", author: "", year: "" });
      fetchBooks();
      setShowAddForm(false);
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const handleUpdateBook = async (id) => {
    try {
      await updateBook(id, editBook);
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const handleSearch = () => {
    fetchBooks();
  };

  const handleSort = () => {
    fetchBooks();
  };

  const toggleFilter = () => {
    setShowSearch(!showSearch);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchBy("title");
    setSortBy("");
    setIsAscending(true);
    fetchBooks();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="head">Books List</h1>
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
              <option value="title">Title</option>
              <option value="author">Author</option>
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
              <option value="title">Title</option>
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

      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              <span>{book.title}-</span>
              <span>{book.author}-</span>
              <span>{book.year}</span>
            </div>
            <div className="book-actions">
              <FaEdit
                className="icon edit-icon"
                onClick={() => setEditBook(book)}
              />
              <FaTrashAlt
                className="icon delete-icon"
                onClick={() => handleDeleteBook(book.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="btn add-btn"
      >
        <FaPlus /> Add Book
      </button>

      {showAddForm && (
        <div className="form-group">
          <h2>Add New Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Publication Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
          />
          <button onClick={handleAddBook} className="btn">
            Add Book
          </button>
        </div>
      )}

      {editBook && (
        <div className="form-group">
          <h2>Edit Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={editBook.title}
            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={editBook.author}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Publication Year"
            value={editBook.year}
            onChange={(e) => setEditBook({ ...editBook, year: e.target.value })}
          />
          <button onClick={() => handleUpdateBook(editBook.id)} className="btn">
            Update Book
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksList;

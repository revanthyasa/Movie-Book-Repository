import React, { useState } from 'react';
import './search.css';

const Search = ({ onSearch, onSort, onClear }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [sortBy, setSortBy] = useState('');
    const [isAscending, setIsAscending] = useState(true);

    const handleSearch = () => {
        onSearch(searchTerm, searchBy);
    };

    const handleSort = () => {
        onSort(sortBy, isAscending);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchBy('name');
        setSortBy('');
        setIsAscending(true);
        onClear();
    };

    return (
        <div className="search-filter">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="dropdown">
                    <option value="name">Name</option>
                    <option value="genre">Genre</option>
                    <option value="year">Year</option>
                </select>
                <button onClick={handleSearch} className="btn">Search</button>
                <button onClick={handleClear} className="btn clear-btn">Clear</button>
            </div>
            <div className="sort-section">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="dropdown">
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="year">Year</option>
                </select>
                <select value={isAscending ? 'true' : 'false'} onChange={(e) => setIsAscending(e.target.value === 'true')} className="dropdown">
                    <option value="true">Ascending</option>
                    <option value="false">Descending</option>
                </select>
                <button onClick={handleSort} className="btn">Sort</button>
            </div>
        </div>
    );
};

export default Search;

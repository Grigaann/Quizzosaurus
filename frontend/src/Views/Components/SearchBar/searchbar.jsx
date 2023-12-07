import React, { useState, useEffect } from 'react';
import './searchbar.css';

export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm, onSearch]);

    return (
        <div id="search-bar">
            <input
                id="search-input"
                type="search"
                placeholder="Search a question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/search?query=${searchTerm}`);
            onSearch(response.data); // Pass the search results to the parent component
        } catch (error) {
            console.error('Error in search:', error);
        }
    };

    return (
        <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            style={{ margin: '10px 0' }}
        />
    );
};

export default SearchBar;


import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchSortBar = ({ searchTerm, setSearchTerm, sortOrder, setSortOrder, totalCourses }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: 'background.paper', borderRadius: 2, mb: 4 }}>
      <TextField
        variant="outlined"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '40%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {totalCourses} courses
        </Typography>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="desc">Newest First</MenuItem>
          <MenuItem value="asc">Oldest First</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default SearchSortBar;
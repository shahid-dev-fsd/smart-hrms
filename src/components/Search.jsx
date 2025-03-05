import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const Search = props => {
    const { placeholder, sx, ...rest } = props;
    return (
        <Paper
            component='form'
            variant='outlined'
            onClick={e => e.stopPropagation()}
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'custom.search.main',
                minHeight: '30px',
                border:0,
                width: {
                    sm: '100%',
                    md:'240px'
                },
                borderRadius: '5px',
                px: 1.5,
                ...sx,
            }}>
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    fontSize:'10px',
                    'input::placeholder': {
                        fontSize: '10px',
                    },
                }}
                onClick={e => e.stopPropagation()}
                placeholder={placeholder ? placeholder : 'Search......'}
                {...rest}
            />

            
                <SearchIcon sx={{fontSize : '15px'}} fontSize='small' />
            
        </Paper>
    );
};

export default Search;

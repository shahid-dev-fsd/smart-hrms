import {
    Box,
    Button,
    Select as MuiSelect,
    Stack,
    IconButton,
    InputBase,
    Paper,
    CircularProgress,
    FormHelperText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';

const SelectSearch = props => {
    const { children, filter, clear, sx, focus, placeholder, defaultValue, ...rest } = props;
    const [select, setSelect] = useState(false);
    const [selected, setSelected] = useState('');

    const closeSelect = () => setSelect(false);
    const openSelect = () => setSelect(true);

    useEffect(() => {
        if (filter) setSelected(filter);
    }, [filter]);

    return (
        <Box sx={{ position: 'relative', p: 0, m: 0 }}>
            <MuiSelect
                variant='outlined'
                type='filter'
                defaultValue={defaultValue}
                open={select}
                placeholder={placeholder}
                onClose={!focus && closeSelect}
                onOpen={e => {
                    e.stopPropagation();
                    openSelect();
                }}
                size='small'
                sx={{
                    py: 0.5,
                    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                        px: selected && 5,
                    },
                    ...sx,
                }}
                {...rest}>
                {children}
            </MuiSelect>
            {selected && (
                <Stack
                    direction='row'
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        backgroundColor: 'custom.selectedCard',
                        borderRadius: '8px',
                        // alignItems: 'stretch',
                    }}>
                    <Button
                        startIcon={<Done />}
                        onClick={openSelect}
                        sx={{
                            flexBasis: '100%',
                            color: 'text.primary',
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                            '&:hover': {
                                backgroundColor: 'custom.selectedHover',
                            },
                        }}>
                        {typeof selected === 'string'
                            ? selected[0].toUpperCase() + selected.slice(1)
                            : selected}
                    </Button>
                    <Button
                        onClick={() => {
                            clear();
                            setSelected('');
                        }}
                        sx={{
                            p: 0,
                            flexBasis: '30px',
                            minWidth: '30px',
                            color: 'text.primary',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                            '&:hover': {
                                backgroundColor: 'custom.selectedHover',
                            },
                        }}>
                        <Close sx={{ fontSize: '18px' }} />
                    </Button>
                </Stack>
            )}
        </Box>
    );
};

const SelectWithSearch = props => {
    const { children, filter, clear, placeholder, SearchProps, disabled, isError, error, ...rest } =
        props;
    const [select, setSelect] = useState(false);

    const closeSelect = () => setSelect(false);
    const openSelect = () => setSelect(true);

    return (
        <Box sx={{ mb: 2 }}>
            <MuiSelect
                variant='outlined'
                open={select}
                onClose={closeSelect}
                onOpen={e => {
                    e.stopPropagation();
                    openSelect();
                }}
                MenuProps={{
                    onKeyDown: e => e.stopPropagation(),
                    onKeyDownCapture: e => e.stopPropagation(),
                }}
                disabled={disabled}
                error={isError}
                size='small'
                {...rest}>
                <Stack direction='row'>
                    <Paper
                        component='form'
                        variant='outlined'
                        onClick={e => e.stopPropagation()}
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            bgcolor: 'transparent',
                            minHeight: '46px',
                            border: 'none',
                            px: 1,
                        }}>
                        <IconButton type='button' aria-label='search'>
                            <SearchIcon fontSize='small' />
                        </IconButton>
                        <InputBase
                            sx={{
                                ml: 1,
                                flex: 1,
                                'input::placeholder': {
                                    fontSize: '12px',
                                },
                            }}
                            inputRef={input => input && input.focus()}
                            placeholder={placeholder ? placeholder : 'Search......'}
                            onFocusCapture={e => e.target.focus()}
                            onBlur={e => e.target.focus()}
                            {...SearchProps}
                        />
                    </Paper>
                    {SearchProps.loader && (
                        <CircularProgress
                            sx={{
                                mx: 1,
                                width: '20px !important',
                                height: '20px !important',
                            }}
                        />
                    )}
                </Stack>
                {children}
            </MuiSelect>
            <FormHelperText error={isError} sx={{ ml: 2 }}>
                {error}
            </FormHelperText>
        </Box>
    );
};

export { SelectWithSearch, SelectSearch };

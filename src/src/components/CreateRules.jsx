import {
    Box,
    Button,
    Card,
    Chip,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMessage } from './Header';
import useLoader from '../hooks/useLoader';
import useErrorHandler from '../hooks/useErrorHandler';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import axios from 'axios';
import Loading from './Loading';
import { Input } from '../hooks/useForm/inputs';
import { SelectWithSearch } from './Select';

const CreateRules = props => {
    const { closeModal, refresh, rule } = props;
    const [text, setText] = useState('');
    const { showError, showSuccess } = useMessage();
    const { loaderState, start, end } = useLoader();
    const errorHandler = useErrorHandler();
    const [departments, setDepartments] = useState({});
    const [saveDepartments, setSaveDepartments] = useState({});

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const handleChange = value => {
        setText(value);
    };

    const handlers = useForm(
        useMemo(
            () => ({
                name: { required: true },
                departmentIds: { required: true, value: [] },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;
    const errors = handlers.errors;

    const onSubmit = res => {
        const { success, message } = res.data;

        if (!success) return showError(message);

        closeModal();
        refresh();
        showSuccess('Rules saved successfully');
    };

    const multipleChangeHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: typeof value === 'string' ? value.split(',') : value });
    };

    const fetchRule = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/hr/rules/${id}`);
                const rule = response.data.rule;
                const { name, description, departmentIds, departments } = rule;
                setValues({ name, departmentIds });
                setText(description);
                const format = {};

                departments.forEach(dept => (format[dept._id] = dept.name));

                setSaveDepartments(prev => ({ ...prev, ...format }));
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, setValues, start, end]
    );

    const getDepartments = useCallback(
        async search => {
            try {
                const params = {
                    pageSize: 10,
                };
                if (search) {
                    params.searchBy = 'title';
                    params.search = search;
                }

                const response = await axios.get(`/hr/department`, { params });
                const departments = response.data.departments;

                setDepartments({});
                const format = {};

                departments.forEach(department => (format[department._id] = department.name));

                setDepartments(format);
                setSaveDepartments(prev => ({ ...prev, ...format }));
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    useEffect(() => {
        getDepartments();
    }, [getDepartments]);

    useEffect(() => {
        if (rule) fetchRule(rule);
    }, [rule, fetchRule]);

    return (
        <Card
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                borderRadius: '8px',
                maxWidth: '1300px',
                width: '100%',
                p: 4,
                mx: 2,
                overflowX: 'hidden',
                maxHeight: '85vh',
                overflowY: 'auto',
            }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h6' fontWeight={500}>
                    {rule ? 'Edit' : 'Create'} Rules and Regulations
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {loaderState ? (
                <Loading message='Please wait, while your Rules are loading...' />
            ) : (
                <Box pb={8}>
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        onError={errorHandler}
                        action={rule ? `/hr/rules/${rule}` : '/hr/rules'}
                        method={rule ? 'patch' : 'post'}
                        final={values => ({
                            ...values,
                            description: text,
                        })}>
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Name
                        </Typography>
                        <Input name='name' fullWidth size='small' />
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Select Departments
                        </Typography>
                        <SelectWithSearch
                            displayEmpty
                            name='departmentIds'
                            onChange={multipleChangeHandler}
                            value={handlers.values.departmentIds}
                            isError={Boolean(errors.departmentIds)}
                            error={errors.departmentIds}
                            multiple
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value => {
                                        return (
                                            <Chip
                                                key={value}
                                                label={saveDepartments[value]}
                                                size='small'
                                                variant='outlined'
                                                color='primary'
                                            />
                                        );
                                    })}
                                </Box>
                            )}
                            fullWidth
                            SearchProps={{
                                onChange: e => getDepartments(e.target.value),
                            }}>
                            {Object.keys(departments).map((dept, i) => (
                                <MenuItem value={dept} key={i} sx={{ px: 1.2 }}>
                                    {departments[dept]}
                                </MenuItem>
                            ))}
                        </SelectWithSearch>

                        <ReactQuill
                            value={text}
                            modules={modules}
                            formats={formats}
                            onChange={handleChange}
                            className='.richtextWrap'
                        />
                        <Submit>
                            {loader => (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={loader || !text}
                                    endIcon={loader}
                                    sx={{ float: 'right', my: 4 }}>
                                    {rule ? 'Done' : 'Create'}
                                </Button>
                            )}
                        </Submit>
                    </Form>
                </Box>
            )}
        </Card>
    );
};

export default CreateRules;

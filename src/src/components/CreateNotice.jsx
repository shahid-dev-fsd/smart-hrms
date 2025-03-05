import {
    Box,
    Button,
    Card,
    Chip,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Select,
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
import { SelectWithSearch } from './Select';
import { Input } from '../hooks/useForm/inputs';


const CreateNotice = props => {
    const { closeModal, refresh, notice } = props;
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
                title: { required: true },
                departmentIds: { required: true, value: [] },
                status: { required: true, value: 'active' },
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
        showSuccess('Notice saved successfully');
    };

    const multipleChangeHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: typeof value === 'string' ? value.split(',') : value });
    };

    const customChangeHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: value });
    };

    const fetchNotice = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/hr/notice/${id}`);
                const notice = response.data.notice;
                const { title, content, departmentIds, departments, status } = notice;
                setValues({ title, departmentIds, status });
                setText(content);
                const format = {};

                departments.forEach(department => (format[department._id] = department.name));

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
        if (notice) fetchNotice(notice);
    }, [notice, fetchNotice]);

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
                    {notice ? 'Edit' : 'Create'} Notice
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {loaderState ? (
                <Loading message='Please wait, while your Notice are loading...' />
            ) : (
                <Box pb={8}>
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        onError={errorHandler}
                        action={notice ? `/hr/notice/${notice}` : '/hr/notice'}
                        method={notice ? 'patch' : 'post'}
                        final={values => ({
                            ...values,
                            content: text,
                        })}>
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Title
                        </Typography>
                        <Input name='title' fullWidth size='small' />
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Select department
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
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Status
                        </Typography>

                        <Select
                            displayEmpty
                            size='small'
                            sx={{ mb: 3 }}
                            name='status'
                            onChange={customChangeHandler}
                            value={handlers.values.status}
                            fullWidth>
                            <MenuItem value='active' sx={{ px: 1.2 }}>
                                Active
                            </MenuItem>
                            <MenuItem value='inActive' sx={{ px: 1.2 }}>
                                In active
                            </MenuItem>
                        </Select>

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
                                    {notice ? 'Done' : 'Create'}
                                </Button>
                            )}
                        </Submit>
                    </Form>
                </Box>
            )}
        </Card>
    );
};

export default CreateNotice;

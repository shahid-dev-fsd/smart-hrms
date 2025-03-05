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
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { Form, Submit, useForm } from '../../hooks/useForm';
import { Input } from '../../hooks/useForm/inputs';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import Loading from '../../components/Loading';
import { SelectWithSearch } from '../../components/Select';
import ImageResize from 'quill-image-resize-module-react';
import { useMessage } from '../../components/Header';
import useLoader from '../../hooks/useLoader';

const CreateDocs = props => {
    const { closeModal, refresh, doc } = props;
    const [text, setText] = useState('');
    const { showError, showSuccess } = useMessage();
    const { loaderState, start, end } = useLoader();
    const errorHandler = useErrorHandler();
    const [jobListing, setJobListing] = useState({});
    const [saveListing, setSaveListing] = useState({});
    const isEditing = Boolean(doc); 
    const isCopying = props.isCopying; 

    Quill.register('modules/imageResize', ImageResize);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
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
                jobIds: { required: true, value: [] },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;
    const errors = handlers.errors;

    const onSubmit = async res => {
        const { success, message } = res.data;

        if (!success) return showError(message);

        closeModal();
        refresh();
        showSuccess('Docs saved successfully');
    };

    const customChangeHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: typeof value === 'string' ? value.split(',') : value });
    };

    const fetchDoc = useCallback(
        async id => {
            if (!id) return; // Early return if no id provided
            start();
            try {
                const response = await axios.get(`/hr/docs/${id}`);
                const doc = response.data.doc;
                const { title, content, jobIds, joblistings } = doc;
                setValues({ title, jobIds });
                setText(content);
                const format = {};

                joblistings.forEach(job => (format[job._id] = job.title));

                setSaveListing(prev => ({ ...prev, ...format }));
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, setValues, start, end]
    );

    const getJobListings = useCallback(
        async search => {
            try {
                const params = {
                    searchBy: 'title',
                    sortBy: 'order',
                    direction: -1,
                    pageSize: 10,
                };
                if (search) params.search = search;

                const response = await axios.get(`/hr/job-listing`, { params });
                const body = response.data;
                const { jobs } = body;

                const format = {};
                jobs.forEach(job => (format[job._id] = job.title));

                setJobListing(format);
                setSaveListing(prev => ({ ...prev, ...format }));
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    useEffect(() => {
        getJobListings();
    }, [getJobListings]);

    useEffect(() => {
        if (isEditing && doc) fetchDoc(doc);
    }, [doc, fetchDoc, isEditing]);

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
                    {isEditing ? (isCopying ? 'Create' : 'Edit') : 'Create'} Docs
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {loaderState ? (
                <Loading message='Please wait, while your Document is loading...' />
            ) : (
                <Box pb={8}>
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        onError={errorHandler}
                        action={isEditing ? (isCopying ? '/hr/docs' : `/hr/docs/${doc}`) : '/hr/docs'}
                        method={isEditing ? (isCopying ? 'post' : 'patch') : 'post'}
                        final={values => ({
                            ...values,
                            content: text,
                        })}>
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Title
                        </Typography>
                        <Input name='title' fullWidth size='small' />
                        <Typography variant='subtitle01' component='p' mb={1}>
                            Select job types
                        </Typography>
                        <SelectWithSearch
                            displayEmpty
                            name='jobIds'
                            onChange={customChangeHandler}
                            value={handlers.values.jobIds}
                            isError={Boolean(errors.jobIds)}
                            error={errors.jobIds}
                            multiple
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value => (
                                        <Chip
                                            key={value}
                                            label={saveListing[value]}
                                            size='small'
                                            variant='outlined'
                                            color='primary'
                                        />
                                    ))}
                                </Box>
                            )}
                            fullWidth
                            SearchProps={{
                                onChange: e => getJobListings(e.target.value),
                            }}>
                            {Object.keys(jobListing).map((job, i) => (
                                <MenuItem value={job} key={i} sx={{ px: 1.2 }}>
                                    {jobListing[job]}
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
                                    {isEditing ? (isCopying ? 'Create' : 'Update') : 'Create'}
                                </Button>
                            )}
                        </Submit>
                    </Form>
                </Box>
            )}
        </Card>
    );
};

export default CreateDocs;

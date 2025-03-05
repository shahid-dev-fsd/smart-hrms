import {
    Container,
    IconButton,
    MenuItem,
    Select,
    Toolbar,
    TextField,
    InputLabel,
    FormControl,
    Stack,
} from '@mui/material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import { useMessage } from './Header';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import Loading from './Loading';
import { SelectWithSearch } from './SelectSearch';
import useErrorHandler from '../hooks/useErrorHandler';

function AddQuestion({ handleClose, selectedQuestion, refresh, setSelectedQuestion }) {
    const { id = null, action = null } = selectedQuestion;
    const [questions, setQuestions] = useState([
        { question: '', options: { a: '', b: '', c: '', d: '' }, answer: '' },
    ]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(Boolean(id));
    const errorHandler = useErrorHandler();
    const { showError, showSuccess } = useMessage();
    // console.log('Add Question');
    // const TextField = (props) => {
    //     console.log('TextField Redering');
    //     return <MuiTextField {...props} />;
    // };

    const handlers = useForm(
        useMemo(
            () => ({
                questions: {
                    value: '',
                },
                jobId: {
                    value: '',
                },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;

    const jobId = handlers.values.jobId;

    const fetchJobListing = useCallback(
        async (search = '') => {
            try {
                const response = await axios.get(
                    `/hr/job-listing?searchBy=title&search=${search}&pageSize=10`
                );
                const jobs = response.data.jobs;
                setCategories({});
                const formattedJob = {};

                jobs.forEach(job => (formattedJob[job._id] = `${job.title}`));

                setCategories(formattedJob);
            } catch (e) {
                console.warn(e);
            }
        },
        [setCategories]
    );

    const customChangeHandler = e => {
        const { name, value } = e.target;
        if (name && value) handlers.setValues({ [name]: value });
    };

    const addNewQuestion = () => {
        const newQuestion = [
            ...questions,
            { question: '', options: { a: '', b: '', c: '', d: '' }, answer: '' },
        ];
        setQuestions(newQuestion);
    };

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/hr/question/${id}`);
            const question = response.data.question;
            const { jobId, questions } = question;
            setValues({
                jobId,
                questions,
            });
            setQuestions(questions);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [id, setValues]);

    const removeQuestion = i => {
        questions.splice(i, 1);
        setQuestions([...questions]);
    };

    const handleQuestionChange = (e, i) => {
        const { value, name } = e.target;

        if (['a', 'b', 'c', 'd'].includes(name)) {
            questions[i].options[name] = value;
        } else {
            questions[i][name] = value;
        }
        setQuestions([...questions]);
    };

    // const handleTagChange = (e, i) => {
    //     const newTag = e.target.value;
    //     details[i].tag = newTag;
    //     setDetails([...details]);
    // };

    const onSubmit = res => {
        const { errors, success } = res.data;

        if (success) {
            setSelectedQuestion({});
            handleClose();
            refresh();
            return showSuccess('Question Created Sucessfully');
        }

        showError(errors);
    };

    const onError = function (err) {
        console.log(err)
    };

    useEffect(() => {
        if (id) {
            console.log(id);
            fetchQuestions();
        }
    }, [id, fetchQuestions]);

    useEffect(() => {
        fetchJobListing();
    }, [fetchJobListing]);

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                minHeight: '100%',
            }}>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    onClick={() => {
                        handleClose();
                        setSelectedQuestion({});
                    }}
                    aria-label='close'>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Container>
                <Box p={2}>
                    <Typography variant='h2'>
                        {action === 'edit'
                            ? 'Edit Interview Questions'
                            : 'Create Interview Questions'}
                    </Typography>
                    <hr color='#E5E5E5' />
                    {loading ? (
                        <Loading message='Please wait, while your Questions are loading...' />
                    ) : (
                        <Form
                            handlers={handlers}
                            onSubmit={onSubmit}
                            final={values => ({
                                ...values,
                                questions,
                            })}
                            action={'/hr/question'}
                            method={action === 'edit' ? 'patch' : 'post'}
                            onError={errorHandler}>
                            <Box mt={2}>
                                <FormControl fullWidth size='small' disabled={action === 'edit'}>
                                    <SelectWithSearch
                                        displayEmpty
                                        fullWidth
                                        filter={jobId && categories[jobId]}
                                        value={jobId}
                                        clear={() => handlers.setValues({ jobId: '' })}
                                        renderValue={v => {
                                            if (!jobId) return 'Select Category';
                                            return categories[jobId];
                                        }}
                                        name='jobId'
                                        disabled={action === 'edit'}
                                        onChange={customChangeHandler}
                                        SearchProps={{
                                            onChange: e => fetchJobListing(e.target.value),
                                        }}>
                                        {Object.keys(categories).map(category => (
                                            <MenuItem
                                                value={category}
                                                disableEnforceFocus
                                                disableRestoreFocus
                                                disabledAutoFocus>
                                                {categories[category]}
                                            </MenuItem>
                                        ))}
                                    </SelectWithSearch>
                                </FormControl>

                                {questions?.map((question, i) => (
                                    <Box key={i} my={2}>
                                        <Stack
                                            direction='horizontal'
                                            justifyContent='space-between'
                                            alignItems='center'>
                                            <Typography variant='subtitle2' color='text.secondary'>
                                                Question: {i + 1}
                                            </Typography>

                                            <IconButton onClick={() => removeQuestion(i)}>
                                                <Delete fontSize='small' />
                                            </IconButton>
                                        </Stack>
                                        <Grid container spacing={1} key={i} mt={1.5}>
                                            <Grid item xs={9}>
                                                <TextField
                                                    name='question'
                                                    size='small'
                                                    variant='outlined'
                                                    value={question.question}
                                                    onChange={e => handleQuestionChange(e, i)}
                                                    placeholder='Add Question'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl fullWidth size='small'>
                                                    <InputLabel>Answer</InputLabel>
                                                    <Select
                                                        label='Answer'
                                                        size='small'
                                                        value={question.answer}
                                                        fullWidth
                                                        name='answer'
                                                        sx={{ pb: 0.2 }}
                                                        onChange={e => handleQuestionChange(e, i)}>
                                                        <MenuItem value='a'>A</MenuItem>
                                                        <MenuItem value='b'>B</MenuItem>
                                                        <MenuItem value='c'>C</MenuItem>
                                                        <MenuItem value='d'>D</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    onChange={e => handleQuestionChange(e, i)}
                                                    name='a'
                                                    size='small'
                                                    value={question.options.a}
                                                    placeholder='Option A'
                                                    variant='outlined'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    onChange={e => handleQuestionChange(e, i)}
                                                    name='b'
                                                    placeholder='Option B'
                                                    size='small'
                                                    value={question.options.b}
                                                    variant='outlined'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    onChange={e => handleQuestionChange(e, i)}
                                                    name='c'
                                                    placeholder='Option C'
                                                    value={question.options.c}
                                                    size='small'
                                                    variant='outlined'
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    onChange={e => handleQuestionChange(e, i)}
                                                    name='d'
                                                    placeholder='Option D'
                                                    size='small'
                                                    value={question.options.d}
                                                    variant='outlined'
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Box>
                            <Box my={2} textAlign='left'>
                                <Button variant='text' fullWidth onClick={addNewQuestion}>
                                    Add more
                                </Button>
                            </Box>
                            <Box mt={2} textAlign='right'>
                                <Submit>
                                    {loader => (
                                        <Button
                                            variant='contained'
                                            type='submit'
                                            disabled={Boolean(loader)}
                                            sx={{
                                                fontWeight: '500',
                                                textTransform: 'capitalize',
                                                letterSpacing: '1px',
                                            }}
                                            endIcon={loader}>
                                            {action === 'edit' ? 'Update' : 'Create'}
                                        </Button>
                                    )}
                                </Submit>
                            </Box>
                        </Form>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default AddQuestion;

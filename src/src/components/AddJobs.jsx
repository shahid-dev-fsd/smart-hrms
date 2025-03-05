import {
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    TextField as MuiTextField,
    Toolbar,
    Input,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useMessage } from './Header';
import Loading from './Loading';

function AddJobs({ refresh, handleClose, selectedJob, setSelectedJob }) {
    const { id = null, action = null } = selectedJob;
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(Boolean(id));
    const [departments, setDepartments] = useState({});
    const { showError, showSuccess } = useMessage();

    const TextField = props => {
        console.log('TextField Rendering');
        return <MuiTextField {...props} />;
    };

    const handlers = useForm(
        useMemo(
            () => ({
                title: {
                    required: true,
                },
                department: {
                    required: true,
                },
                experience: {
                    required: true,
                },
                location: {
                    required: true,
                },
                salary: {
                    required: true,
                },
                currency: {
                    required: true,
                },
                jobType: {
                    required: true,
                    value: 'Part Time',
                },
                remote: {
                    required: true,
                    value: 'true',
                },
            }),
            []
        ),
        { Input: TextField }
    );
    const setValues = handlers.setValues;
    const errors = handlers.errors;

    const fetchJob = useCallback(
        async id => {
            setLoading(true);
            try {
                const response = await axios.get(`/hr/job-listing/${id}`);
                const job = response.data.job;
                const {
                    title,
                    department,
                    experience,
                    location,
                    salary,
                    jobType,
                    remote,
                    details,
                } = job;

                setValues({
                    title,
                    department,
                    experience,
                    location,
                    salary: salary.amount,
                    currency: salary.currency,
                    jobType,
                    remote,
                });
                setDetails(details);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
        [setValues]
    );

    const addNewDetail = () => {
        const newDetails = [
            ...details,
            {
                content: '',
                tag: 'h4',
            },
        ];
        setDetails(newDetails);
    };

    const removeDetail = (d, i) => {
        details.splice(i, 1);
        setDetails([...details]);
    };

    const copyDetail = (detail, i) => {
        if (detail._id) delete detail._id;

        const newDetail = {
            content: detail.content,
            tag: detail.tag,
        };

        details.splice(++i, 0, newDetail);

        setDetails([...details]);
    };

    console.log(details);

    const handleContentChange = (e, i) => {
        console.log('onChange', i);
        console.log(e);
        const newValue = e.target.value;
        details[i].content = newValue;
        console.log(details);
        setDetails([...details]);
    };

    const handleTagChange = (e, i) => {
        const newTag = e.target.value;
        details[i].tag = newTag;
        setDetails([...details]);
    };

    const customChangeHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: value });
    };

    const onSubmit = async (values) => {
        console.log("onSubmit function called");
        const payload = {
            ...values,
            salary: {
                amount: values.salary,
                currency: values.currency,
            },
            details,
        };

        try {
            const response = await axios.post('/hr/job-listing', payload);
            const { message, success } = response.data;

            if (success) {
                handleClose();
                setSelectedJob({});
                showSuccess(action === 'edit' ? 'Job Updated Successfully' : 'Job Added Successfully');
                return refresh();
            }
            showError(message);
        } catch (error) {
            console.log(error);
            showError('An error occurred while submitting the form.');
        }
    };

    const getDepartments = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/department`);
            const departments = response.data.departments;

            const format = {};

            departments.forEach(department => (format[department._id] = department.name));

            setDepartments(format);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getDepartments();
    }, [getDepartments]);

    useEffect(() => {
        if (id) {
            fetchJob(id);
        }
    }, [id, fetchJob]);

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
            }}>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    onClick={() => {
                        handleClose();
                        setSelectedJob({});
                    }}
                    aria-label='close'>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Container>
                <Box p={2}>
                    <Typography id='modal-modal-title' variant='h2' component='h2'>
                        {action === 'edit'
                            ? 'Edit question for listing'
                            : 'Add question job for listing'}
                    </Typography>
                    <hr color='#E5E5E5' />
                    {loading ? (
                        <Loading message='Please wait, while your job is loading...' />
                    ) : (
                        <Form
                            handlers={handlers}
                            onSubmit={onSubmit}
                            final={values => ({
                                ...values,
                                salary: {
                                    amount: values.salary,
                                    currency: values.currency,
                                },
                                details,
                            })}
                            action={action === 'edit' ? `/hr/job-listing/${id}` : '/hr/job-listing'}
                            method={action === 'edit' ? 'patch' : 'post'}
                            onError={console.log}>
                            <Grid container spacing={1}>
                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Title</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Input
                                        name='title'
                                        size='small'
                                        id='outlined-basic'
                                        variant='outlined'
                                        fullWidth
                                        small
                                    />
                                </Grid>
                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Department</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Select
                                        size='small'
                                        displayEmpty
                                        name='department'
                                        onChange={customChangeHandler}
                                        value={handlers.values.department}
                                        isError={Boolean(errors.department)}
                                        error={errors.department}
                                        renderValue={selected =>
                                            selected ? departments[selected] : ''
                                        }
                                        fullWidth>
                                        {Object.keys(departments).map((dept, i) => (
                                            <MenuItem value={dept} key={i} sx={{ px: 1.2 }}>
                                                {departments[dept]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Years of Experience</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Input
                                        type='number'
                                        name='experience'
                                        size='small'
                                        id='outlined-basic'
                                        variant='outlined'
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Location</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Input
                                        name='location'
                                        size='small'
                                        id='outlined-basic'
                                        variant='outlined'
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={8} mb={1}>
                                    <Typography variant='h6'>Salary</Typography>
                                </Grid>
                                <Grid item xs={4} mb={1}>
                                    <Typography variant='h6'>Currency</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Input
                                        type='number'
                                        name='salary'
                                        size='small'
                                        id='outlined-basic'
                                        variant='outlined'
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        name='currency'
                                        size='small'
                                        id='outlined-basic'
                                        variant='outlined'
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Contract</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Select
                                        size='small'
                                        value={handlers.values.jobType}
                                        fullWidth
                                        name='jobType'
                                        onChange={customChangeHandler}>
                                        <MenuItem value='Part Time'>Part Time</MenuItem>
                                        <MenuItem value='Full Time'>Full Time</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Working Location</Typography>
                                </Grid>
                                <Grid item lg={12}>
                                    <Select
                                        size='small'
                                        value={handlers.values.remote}
                                        name='remote'
                                        fullWidth
                                        onChange={customChangeHandler}>
                                        <MenuItem value='true'>Remote</MenuItem>
                                        <MenuItem value='false'>On Premise</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item lg={12} mb={1}>
                                    <Typography variant='h6'>Details</Typography>
                                </Grid>
                                <Button onClick={addNewDetail}>Add Detail</Button>
                                {details.map((detail, i) => (
                                    <Grid container key={i} spacing={2}>
                                        <Grid item xs>
                                            <TextField
                                                // name={'dtitle'}
                                                size='small'
                                                id='outlined-basic'
                                                variant='outlined'
                                                value={detail.content}
                                                onChange={e => handleContentChange(e, i)}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Select
                                                size='small'
                                                value={detail.tag}
                                                fullWidth
                                                onChange={e => handleTagChange(e, i)}>
                                                <MenuItem value='h1'>Heading 1</MenuItem>
                                                <MenuItem value='h2'>Heading 2</MenuItem>
                                                <MenuItem value='h3'>Heading 3</MenuItem>
                                                <MenuItem value='h4'>Heading 4</MenuItem>
                                                <MenuItem value='h5'>Heading 5</MenuItem>
                                                <MenuItem value='h6'>Heading 6</MenuItem>
                                                <MenuItem value='p'>Paragraph</MenuItem>
                                                <MenuItem value='li'>List</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => copyDetail(detail, i)}>
                                                <ContentCopyIcon />
                                            </IconButton>
                                            <IconButton onClick={() => removeDetail(detail, i)}>
                                                <CloseIcon
                                                    sx={{
                                                        color: 'error.dark',
                                                    }}
                                                />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}

                                <Grid item lg={12}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label='I have read and agree to the Privacy Notice'
                                    />
                                </Grid>

                                <Box textAlign='center'>
                                    {/* <Submit debug>
                                        {loader => (
                                            <Button
                                                variant='contained'
                                                type='submit'
                                                sx={{
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    letterSpacing: '1px',
                                                }}
                                                endIcon={loader}>
                                                {action === 'edit' ? 'Update' : 'Add Job'}
                                            </Button>
                                        )}
                                    </Submit> */}
                                    <button>Save</button>
                                </Box>
                            </Grid>
                        </Form>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default AddJobs;

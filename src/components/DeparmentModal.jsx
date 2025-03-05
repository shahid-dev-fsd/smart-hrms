import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Input } from '../hooks/useForm/inputs';
import { Form, useForm, Submit} from '../hooks/useForm/useForm';
import { useMessage } from './Header';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth :600 ,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const DeparmentModal = ({ handleClose, fetchDepartment, id }) => {
    const handlers = useForm(
        useMemo(
            () => ({
                name: '',
            }),
            []
        ),
        { Input: TextField }
    );

    const title = id ? 'Edit Department' : 'Add Department';
    const buttonText = id ? 'Update' : 'Add';
    const method = id ? 'PATCH' : 'POST';
    const action = id ? `/hr/department/${id}` : '/hr/department';
    const successMessage = id ? 'Department updated successfully' : 'Department added successfully';

    const setValues = handlers.setValues;
    const updateDeartment = useCallback(
        async function () {
            try {
                const response = await axios.get(`/hr/department/${id}`);

                const data = response?.data?.departments[0]?.name;
                const name = data;
                setValues({ name });
            } catch (e) {
                console.log(e);
            }
        },
        [setValues, id]
    );

    useEffect(() => {
        if(id ==null ){
            console.log("name" , id)
            setValues({ name : ''})
      }else {
        updateDeartment();
      }     
    }, [updateDeartment]);

    const { showSuccess, showError } = useMessage();
    const submit = res => {
        const { success, message } = res.data;
        if (!success) return showError(message);
        showSuccess(successMessage);
        setValues({ name : ''})
        fetchDepartment();
        handleClose();
    };
    return (
        <>
            <Form
                handlers={handlers}
                onSubmit={submit}
                action={action}
                method={method}
                onError={console.log}>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h5' component='h2'>
                        {title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography id='modal-modal-description' sx={{ my: 2 }}>
                        {title}
                    </Typography>
                    <Input name='name' placeholder='Department' fullWidth />
                    <Box mt={5} textAlign='right'>
                        <Button
                            onClick={handleClose}
                            variant='outlined'
                            sx={{
                                px: 3,
                                py: 1,
                                mx: 2,
                                fontSize: '18px',
                            }}>
                            Close
                        </Button>
                        <Submit>
                            {loader => (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={loader}
                                    endIcon={loader}
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        fontSize: '18px',
                                    }}>
                                    {buttonText}
                                </Button>
                            )}
                        </Submit>
                    </Box>
                </Box>
            </Form>
        </>
    );
};

export default DeparmentModal;

import { useMemo } from "react";
import { Form, Submit, useForm } from "../../hooks/useForm";
import { useMessage } from "../../components/Header";
import { Box, Button, DialogActions, TextField, Typography } from "@mui/material";
import { Input } from "../../hooks/useForm/inputs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateLabel = ({ handleClose ,fetchLabel }) => {
    const handlers = useForm(
        useMemo(
            () => ({
                item: '',
            }),
            []
        ),
        { Input: TextField }
    );
    const { showSuccess, showError } = useMessage();
    const submit = res => {
        const { success, message } = res.data;
  
        if (!success) return showError(message);
        fetchLabel();
        showSuccess('Add label successfully');
        handleClose();
    };
  
    return (
        <Box sx={style}>
            <Form
                handlers={handlers}
                onSubmit={submit}
                action='/hr/lists'
                method={'post'}
                final={values => ({
                    ...values,
                    name: 'application_status',
                })}
                onError={console.log}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                    Create a new Label
                </Typography>
                <Box>
                    <Input
                        name='item'
                        variant='standard'
                        label='Add Label'
                        autocomplete='off'
                        fullWidth
                    />
                </Box>
                <DialogActions sx={{ mt: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Submit>
                        {loader => (
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loader}
                                endIcon={loader}>
                                Create
                            </Button>
                        )}
                    </Submit>
                </DialogActions>
            </Form>
        </Box>
    );
  };

  export default CreateLabel;
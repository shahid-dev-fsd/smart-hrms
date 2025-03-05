import { Box, Button, Card, Grid, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Pending from '@mui/icons-material/Pending';
import { useMessage } from './Header';
import Details from './Details';


const QuestionCard = props => {
    const { title, questions, id, refresh, editQuestion } = props;
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [deleting, setDeleting] = useState(false);
    const { showError, showSuccess } = useMessage();

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };

    const handleExpand = () => {
        setAccordionOpen(show => !show);
    };

    async function deleteCategory(id) {
        setDeleting(true);
        try {
            const res = await axios.delete(`/hr/question/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Question deleted successfully');
            } else {
                showError(message);
            }
        } catch (e) {}
        setDeleting(false);
        refresh();
    }

    const handleClose = () => setOpen(false);

    return (
        <Box my={2}>
            <Card
                elevation={0}
                sx={{
                    borderRadius: '20px',
                    p: 2,
                    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                }}>
                <Typography variant='h6' fontWeight='bold'>
                    {title}
                </Typography>
                <Grid container mt={2} display='flex' justifyContent='center' alignItems='center'>
                    <Grid item xs={12} md>
                        <Typography>{questions?.length} Questions</Typography>
                    </Grid>
                    <Grid item xs={12} md='auto' mt={{ xs: 1, md: 0 }}>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                fontSize: '16px',

                                mr: 2,
                            }}
                            onClick={handleExpand}
                            variant='text'
                            endIcon={<ExpandMoreIcon />}>
                            show details
                        </Button>

                        <IconButton onClick={() => editQuestion(id)}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton onClick={() => deleteCategory(id)}>
                            {deleting ? (
                                <Pending fontSize='small' />
                            ) : (
                                <DeleteIcon fontSize='small' />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
                {accordionOpen && <Details questions={questions} />}
            </Card>
            <Modal
                sx={{ overflowY: 'scroll' }}
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='primary'
                            onClick={handleClose}
                            aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </Box>
            </Modal>
        </Box>
    );
};

export default QuestionCard;

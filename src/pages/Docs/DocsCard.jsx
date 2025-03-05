import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pending from '@mui/icons-material/Pending';
import Details from './Details';
// import { useMessage } from '../../components/Header';
import useLoader from '../../hooks/useLoader';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import { useMessage } from '../../components/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// import CreateMemo from './CreateMemo';

const DocsCard = props => {
    const { title, content, joblistings, id, refresh, editDoc , copyDoc } = props;
    const [accordionOpen, setAccordionOpen] = useState(false);
    const { loaderState, start, end } = useLoader();
    const errorHandler = useErrorHandler();
    const { showError, showSuccess } = useMessage();

    const handleExpand = () => {
        setAccordionOpen(show => !show);
    };

    async function deleteDoc(id) {
        start();
        try {
            const res = await axios.delete(`/hr/docs/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Docs deleted');
            } else {
                showError(message);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            end();
            refresh();
        }
    }

    return (
        <Box my={2}>
            <Card
                elevation={0}
                sx={{
                    borderRadius: '20px',
                    p: 3,
                    // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                }}>
                <Typography variant='h5' fontWeight='bold'>
                    {title}
                </Typography>
                <Grid container mt={2} display='flex' justifyContent='center' alignItems='center'>
                    <Grid item xs={12} md>
                        {joblistings.map(job => (
                            <Typography
                                variant='subtitle1'
                                color='primary.main'
                                display='inline-flex'
                                mr={1}
                                key={job._id}>
                                {job.title}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid item xs={12} md='auto' mt={{ xs: 1, md: 0 }}>
                        <Button
                            sx={{
                                color: 'inherit',
                                textTransform: 'capitalize',
                                fontSize: '16px',
                                mr: 2,
                            }}
                            onClick={handleExpand}
                            variant='text'
                            endIcon={<ExpandMoreIcon />}>
                            show details
                        </Button>
                        <IconButton onClick={() => copyDoc(id)}>
                            <ContentCopyIcon fontSize='small' 
                            
                            />
                        </IconButton> 
                         <IconButton onClick={() => editDoc(id)}>
                            <EditIcon fontSize='small' />
                        </IconButton> 
                        <IconButton onClick={() => deleteDoc(id)}>
                            {loaderState ? (
                                <Pending fontSize='small' />
                            ) : (
                                <DeleteIcon fontSize='small' />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
                {accordionOpen && <Details content={content} title={title} />}
            </Card>
            {/* <Modal sx={{ overflowY: 'scroll' }} open={memoState} onClose={closeMemo}>
                <CreateMemo closeModal={closeMemo} />
            </Modal> */}
        </Box>
    );
};

export default DocsCard;

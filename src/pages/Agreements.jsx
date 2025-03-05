import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Modal,
    Skeleton,
    Toolbar,
    Typography,
} from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback, useEffect, useState } from 'react';
// import useErrorHandler from '../../../hooks/useErrorHandler';
// import useModal from '../../../hooks/useModal';
import axios from 'axios';
import useModal from '../hooks/useModal';
import { useMessage } from '../components/Header';
import EditAgreement from '../components/EditAgreement';

const Agreements = props => {
    const { closeModal, jobId, jobApplicationId, refetch } = props;
    const [docs, setDocs] = useState(null);
    const { modalState: editState, openModal: openEdit, closeModal: editClose } = useModal();
    // const errorHandler = useErrorHandler();
    const { showSuccess } = useMessage();
    const [agreement, setAgreement] = useState(null);
    const [selectedAgreements, setSelectedAgreements] = useState([]);

    const fetchDocs = useCallback(async () => {
        try {
            const response = await axios.get('/hr/docs', { params: { jobId } });

            setDocs(response.data.docs);
        } catch (e) {
            console.log(e)
        }
    }, [ jobId]);

    const sendAgreement = async () => {
        try {

            await axios.patch(`/hr/agreement/${jobApplicationId}`, { agreements : selectedAgreements });
            showSuccess('Agreement sent!');
            refetch();
            closeModal();
        } catch (e) {
            console.log(e)
        }
    };
    // const handleSubmit = async ()  =>{

    //     const promises =  selectedAgreements?.map(doc =>  sendAgreement(doc._id , doc.content , doc.title ));
    //     await Promise.all(promises);

     
    // }

    const selectAgreement = (doc) => {
        let  id = String(doc._id)
        if (isCardSelected(id)) {
            setSelectedAgreements(selectedAgreements.filter(item => item.agreementId != id));
          } else {
            setSelectedAgreements([...selectedAgreements, {  agreementId : doc._id , content : doc.content , title : doc.title}]);
          }
    }

    const isCardSelected = (id)=>{
        const index  =  selectedAgreements.findIndex(item => item.agreementId == id)
        return index !== -1
    }

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);

    return (
        <Box  className="relative "
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                minHeight: '100%',
               
            }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h4'>Agreements</Typography>
                <IconButton
                    edge='end'
                    color='inherit'
                    onClick={() => {
                        closeModal();
                    }}>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <div className="flex flex-col justify-between">

          

            <Box p={2}>
                <Grid container spacing={2}>
                    {docs ? (
                        docs.length ? (
                            docs.map(doc => (
                                <Grid item xs={12} md={6} xm={4} lg={3} xl={2.5} key={doc._id}>
                                    <Card
                                        variant='outlined'
                                        className={`cursor-pointer `}
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderColor : ( isCardSelected(doc._id) ? 'primary.main' :"")
                                        }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant='h5' gutterBottom>
                                                {doc.title}
                                            </Typography>
                                            {doc.joblistings
                                                .filter(job => job._id === jobId)
                                                .map(job => (
                                                    <Typography
                                                        variant='subtitle1'
                                                        color='primary.main'
                                                        key={job._id}>
                                                        {job.title}
                                                    </Typography>
                                                ))}
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <Button
                                                size='small'
                                                onClick={() => {
                                                    setAgreement(doc);
                                                    openEdit();
                                                }}>
                                                Edit
                                            </Button>
                                            <Button
                                                size='small'
                                                onClick={() => {
                                                    selectAgreement(doc)
                                                }}>
                                                    {isCardSelected(doc._id) ? "Unselect": "Select" }
                                                
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid
                                item
                                xs={12}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                minHeight='calc(100dvh - 90px)'>
                                <Box ml={2}>
                                    <Typography
                                        variant='h4'
                                        color='text.secondary'
                                        fontWeight={400}>
                                        There are currently no agreements associated with this job
                                        category.
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    ) : (
                        Array(5)
                            .fill(0)
                            .map((el, i) => (
                                <Grid item xs={12} md={6} xm={4} lg={3} xl={2.5} key={i}>
                                    <Skeleton variant='rectangular' height={149} />
                                </Grid>
                            ))
                    )}
                </Grid>
            </Box>
            <Grid p={2}  item className="flex justify-end" >
                    <Button
                      onClick={sendAgreement}
                      className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                      variant="contained"
                      disabled={selectedAgreements.length ==0}>
                      Send Agreements
                    </Button>
            </Grid>
            </div>
            <Modal
                open={editState}
                onClose={editClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , 
                    overflowY: 'scroll'  }}>
                <EditAgreement
                    agreement={agreement}
                    closeModal={editClose}
                    closeAgreement={closeModal}
                    refetch={refetch}
                    jobApplicationId={jobApplicationId}
                />
            </Modal>
        </Box>
    );
};

export default Agreements;

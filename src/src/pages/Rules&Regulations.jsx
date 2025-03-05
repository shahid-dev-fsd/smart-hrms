import { Box, Button, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import useModal from '../hooks/useModal';
import useErrorHandler from '../hooks/useErrorHandler';
import RulesCard from '../components/RulesCard';
import CreateRules from '../components/CreateRules';


const RuleAndRegulations = () => {
    const [rules, setRules] = useState(null);
    const { modalState, openModal, closeModal } = useModal();
    const errorHandler = useErrorHandler();
    const [rule, setRule] = useState(null);

    const fetchRules = useCallback(async () => {
        try {
            const response = await axios.get('/hr/rules');

            setRules(response.data.rules);
        } catch (e) {
            errorHandler(e);
        }
    }, [errorHandler]);

    const editRule = id => {
        setRule(id);
        openModal();
    };

    useEffect(() => {
        fetchRules();
    }, [fetchRules]);

    return (
        <Box>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h5'>Rules & Regulations</Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setRule(null);
                                    openModal();
                                }}>
                                New rules & regulations
                            </Button>
                        </Box>

                        <Box>
                            <Tooltip title='info' placement='top'>
                                <IconButton disableRipple variant='navIcon' sx={{ mr: 0, ml: 2 }}>
                                    <InfoOutlinedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {rules?.map(rule => (
                <RulesCard
                    id={rule._id}
                    name={rule.name}
                    description={rule.description}
                    departments={rule.departments}
                    refresh={fetchRules}
                    editRule={editRule}
                />
            ))}
            <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={modalState}
                onClose={closeModal}>
                <>
                    <CreateRules closeModal={closeModal} refresh={fetchRules} rule={rule} />
                </>
            </Modal>
        </Box>
    );
};

export default RuleAndRegulations;

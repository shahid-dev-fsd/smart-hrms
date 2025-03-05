import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import view from '../../../ReceivedApp/viewicon.png';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';
import useModal from '../../../../hooks/useModal';
import { useMessage } from '../../../../components/Header';
import LeaveModel from './LeaveModel';


const LeaveSettingPage = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { showSuccess } = useMessage();
    const { modalState: deleteState, openModal: openDelete, closeModal: closeDelete } = useModal()

    const [leavesTypes, setLeaveType] = useState(null);
    const [selectLeaveType, setSelectLeaveType] = useState({});

    const fetchLeaveType = useCallback(
        async function () {
            try {
                const response = await axios.get('/hr/attendance/leaves-types');
                setLeaveType(response.data.leaveTypes);
            } catch (e) {
                console.log(e);
            }
        },
        [setLeaveType]
    );

    useEffect(() => {
        fetchLeaveType();
    }, [fetchLeaveType]);

    async function deleteLeaveTypes(id) {
        try {
            const res = await axios.delete(`/hr/attendance/leaves-types/${id}`);

            if (res.data.success) {
                showSuccess
                ('Leave type deleted');
            }
        } catch (e) {
            console.log(e)
        } finally {
            closeDelete();
            fetchLeaveType();
        }
    }
    
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col md:mb-1'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-xs md:text-2xl text-neutral-500">Leave Settings</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button className='flex  items-center text-white font-bold text-[8px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'
                            onClick={handleOpen}
                            >
                                Add Leave Type
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
            </div>
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4 pb-5" sx={{ backgroundColor: 'background.view', }}>
                        <p className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl" gutterBottom>
                            Leaves Types
                        </p>  
                        <Box
                        className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10'
                        sx={{
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            '-ms-overflow-style': 'none',
                            'scrollbar-width': 'none'
                        }}
                    >
                    <Grid
                        className='flex flex-row border-b border-zinc-500'
                        
                    >
                        <div className='w-1/3 md:w-[33%] p-4 flex items-center border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
                           Leaves Type
                        </div>
                        <div className='w-1/3 md:w-[33%] p-4 flex items-center border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
                            Number of Leaves
                        </div>
                        <div className='w-1/3 md:w-[33%] flex items-center p-4  text-sm md:text-[16px] font-bold'>
                            Actions
                        </div>
                        
                    </Grid>
                    {leavesTypes?.map((item,index) => (
                    <Grid
                    key={index}
                        className='flex flex-row border-b border-zinc-500'
                        
                    >
                     <div className='w-1/3 md:w-[33%] p-4 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px]'>
                           {item.name}
                        </div>
                        <div className='w-1/3 md:w-[33%] p-4 flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                           {item.noOfLeaves}
                        </div>
                        <div className='w-1/3 md:w-[33%] flex items-center flex flex-row gap-3 p-4  text-sm md:text-[12px]'>
                        <IconButton onClick={() => {
                                                    setSelectLeaveType(item);
                                                    handleOpen();
                                                }}><img src={view} alt="view" className="w-4 h-4"/></IconButton>
                        <IconButton onClick={() => {
                                                    setSelectLeaveType(item);
                                                    openDelete();
                                                }}><DeleteOutlineOutlinedIcon fontSize='medium' className='text-blue-500'/></IconButton>
                        </div>

                    </Grid>
                    ))}
                </Box>
                <Modal
                open={deleteState}
                onClose={closeDelete}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: '548px', width: '100%' }}>
                    <CardContent>
                        <Typography variant='h5' fontWeight={500}>
                            Delete {selectLeaveType.name}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant='subtitle01'>
                            Do you really want to delete the {selectLeaveType.name} ?
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: 3, justifyContent: 'flex-end', p: 2 }}>
                        <Button variant='outlined' onClick={closeDelete}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='warning'
                            onClick={() => deleteLeaveTypes(selectLeaveType._id)}
                            >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <LeaveModel
                    handleClose={handleClose}
                    leavesTypes={leavesTypes}
                    leaveTypeId={selectLeaveType._id}
                    fetchLeaveType={fetchLeaveType}
                />
            </Modal> 
                
            </Box>
    </Box>
    );
};

export default LeaveSettingPage;

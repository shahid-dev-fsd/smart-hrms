import React, { useCallback, useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, IconButton, Modal, Typography } from '@mui/material';
import axios from 'axios';
import DeparmentModal from '../../components/DeparmentModal';
import useModal from '../../hooks/useModal';
import { useMessage } from '../../components/Header';

const DeptPage = () => {
    const [id, setId] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [departments, setDepartments] = useState();
    const [selectDepartment, setSelectDepartment] = useState({});

    const EditDepartment = id => {
        handleOpen();
        setId(id);
    };

    const fetchDepartment = useCallback(
        async (search = '') => {
            try {
                const response = await axios.get(
                    `/hr/department?searchBy=name&search=${search}&sortBy=order`
                );
                setDepartments(response.data.departments);
            } catch (e) {
                console.log(e);
            }
        },
        [setDepartments]
    );
    const { showSuccess, showError } = useMessage();
    const { modalState: deleteState, openModal: openDelete, closeModal: closeDelete } = useModal();

    async function deleteDepartment(id) {
        try {
            const res = await axios.delete(`/hr/department/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Department deleted');
            } else {
                showError(message);
            }
        } catch (e) {
            console.log(e)
        } finally {
            closeDelete();
            fetchDepartment();
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [fetchDepartment]);
    console.log(departments)
    return (
        <div className="container mx-auto overscroll-auto overflow-hidden">
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-2xl md:text-3xl text-zinc-400 mb-4">Department</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleOpen} className='flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                        Add Department
                    </button>
                    <InfoOutlinedIcon />
                </div>
            </div>
            <Box className="w-[95%] ml-2 md:ml-5 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <p className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl" gutterBottom>
                    Department Summary
                </p>
                <div className='w-full pl-4'>
                    <p className='text-sm md:text-base text-zinc-400 pl-2 md:pl-5'>Rows per page: 10 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-lg md:text-2xl text-center ml-2'/></p>
                </div>
                <div className='w-[95%] ml-2 md:ml-9 border border-zinc-500 rounded-sm mt-4 '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[5%] p-2 border-r border-zinc-500 text-left text-sm md:text-lg font-bold'>
                            #ID
                        </div>
                        <div className='w-[50%] md:w-[85%] p-2 border-r border-zinc-500 text-sm md:text-lg font-bold'>
                            Department Name
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 text-sm md:text-lg font-bold'>
                            Actions
                        </div>
                    </div>
                    {departments?.map((dept,index) => (
                        <div key={index} className='flex flex-row border-b border-zinc-500'>
                            <div className='w-[25%] md:w-[5%] p-2 md:p-4 border-r border-zinc-500 text-left text-sm md:text-[16px]'>
                                #{index+1}
                            </div>
                            <div className='w-[50%] md:w-[85%] p-2 md:p-4 border-r border-zinc-500 text-sm md:text-[18px]'>
                                {dept.name}
                            </div>
                            <div className='w-[25%] md:w-[10%] p-2 flex flex-row gap-2 items-center'>
                                <IconButton onClick={() => EditDepartment(dept._id)}><EditOutlinedIcon fontSize='medium' className='p-1 rounded-sm'/></IconButton>
                                <IconButton onClick={() => {
                                                    setSelectDepartment(dept);
                                                    openDelete();
                                                }}><DeleteOutlineOutlinedIcon fontSize='medium' className='p-1  rounded-sm'/></IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-[95%] ml-2  md:ml-9 mt-2 flex justify-between items-center pb-2 mb-20 md:mb-0'>
                    <p className='text-sm md:text-base text-zinc-400 '>Showing Rows: 1-10 of 20</p>
                    <div className='flex flex-row gap-4'>
                    <KeyboardArrowLeftOutlinedIcon className='text-zinc-400'/>
                    <p className='text-zinc-400'>1</p>
                    <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                </div>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <DeparmentModal fetchDepartment={fetchDepartment} handleClose={handleClose} />
            </Modal>
            <Modal
                open={deleteState}
                onClose={closeDelete}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: '548px', width: '100%' }}>
                    <CardContent>
                        <Typography variant='h5' fontWeight={500}>
                            Delete {selectDepartment.name}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant='subtitle01'>
                            Do you really want to delete the {selectDepartment.name} ?
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: 3, justifyContent: 'flex-end', p: 2 }}>
                        <Button variant='outlined' onClick={closeDelete}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='warning'
                            onClick={() => deleteDepartment(selectDepartment._id)}
                            >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
};

export default DeptPage;

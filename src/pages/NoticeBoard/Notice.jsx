import React, { useCallback, useEffect, useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import view from '../ReceivedApp/viewicon.png';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useModal from '../../hooks/useModal';
import { useMessage } from '../../components/Header';
import axios from 'axios';
import { handleAxiosError } from '../../utilities/function';
import CreateNotice from '../../components/CreateNotice';
import useLoader from '../../hooks/useLoader';
import useErrorHandler from '../../hooks/useErrorHandler';

const NoticePage = () => {
    const [notices, setNotices] = useState(null);
    const { modalState: noticeState, openModal: openNotice, closeModal: closeNotice } = useModal();
    const { showError, showSuccess } = useMessage();
    const [notice, setNotice] = useState(null);
    const { loaderState, start, end } = useLoader();
    const errorHandler = useErrorHandler();

    const fetchNotice = useCallback(async () => {
        try {
            const response = await axios.get('/hr/notice');
            setNotices(response.data.notices);
        } catch (e) {
            handleAxiosError(e, showError);
        }
    }, [showError]);

    const editNotice = id => {
        setNotice(id);
        openNotice();
    };

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    async function deleteNotice(id) {
        start();
        try {
            const res = await axios.delete(`/hr/notice/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Notice deleted');
            } else {
                showError(message);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            end();
            fetchNotice();
        }
    }

    return (
        <Box sx={{ backgroundColor: 'background.main' }}>
            <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full md:px-4 py-4">
                    <div className="p-2">
                        <h1 className="text-2xl text-neutral-500">Notice Board</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <button onClick={() => {
                            setNotice(null);
                            openNotice();
                        }} className='flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                            Add New Notice
                        </button>
                        <InfoOutlinedIcon />
                    </div>
                </div>
                <Box className="w-full md:ml-0 pt-4 rounded-lg mb-4 overflow-x-auto" sx={{ width: { xs: 'calc(100vw - 30px)', sm: '100%' }, backgroundColor: 'background.view' }}>
                    <div className='flex min-w-[48rem] flex justify-between items-center w-full pt-3'>
                        <p className="mb-4 border-l-4 border-blue-500 pl-4 text-xl" gutterBottom>
                            Notice Summary
                        </p>
                        <p className='text-sm md:text-[12px] text-zinc-400 pr-2 md:pr-5'>Rows per page: 10 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-lg md:text-[12px] text-center ml-2' /></p>
                    </div>
                    <div className='w-[97%] min-w-[48rem] ml-2 md:ml-4 border border-zinc-500 rounded-sm'>
                        <div className='flex flex-row border-b border-zinc-500'>
                            <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                                No
                            </div>
                            <div className='w-[50%] md:w-[18%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                                Title
                            </div>
                            <div className='w-[25%] md:w-[34%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                                Description
                            </div>
                            <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                                Created On
                            </div>
                            <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                                Status
                            </div>
                            <div className='w-[25%] md:w-[10%] p-3 text-left text-sm md:text-xs font-bold'>
                                Action
                            </div>
                        </div>
                        {notices?.map((notice, index) => (
                            <div key={notice._id} className='flex flex-row border-b border-zinc-500'>
                                <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                                    #{index + 1}
                                </div>
                                <div className='w-[25%] md:w-[18%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                                    {notice.title}
                                </div>
                                <div className='w-[25%] md:w-[34%] p-3 border-r border-zinc-500 text-sm md:text-[10px]' dangerouslySetInnerHTML={{ __html: notice.content }}>
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                                    {new Date(notice.createdAt).toDateString()}
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px] flex justify-center items-center'>
                                    <button className='flex items-center text-white text-[8px] md:text-[10px] py-1 md:py-0 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-900'>
                                        {notice.status}
                                    </button>
                                </div>
                                <div className='w-[25%] md:w-[10%] flex flex-row gap-2 justify-center items-center'>
                                    <IconButton onClick={() => editNotice(notice._id)}><img src={view} alt="View" className="w-4 h-4" /></IconButton>
                                    <IconButton onClick={() => deleteNotice(notice._id)}><DeleteOutlineOutlinedIcon style={{ fontSize: '14px' }} className='text-blue-500 rounded-sm' /></IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='w-[95%] min-w-[48rem] ml-2 md:ml-5 mt-5 flex justify-between items-center pb-2'>
                        <p className='text-sm md:text-[12px] text-zinc-400'>Showing Rows: 1-8 of 10</p>
                        <div className='flex flex-row gap-4'>
                            <KeyboardArrowLeftOutlinedIcon className='text-zinc-400' />
                            <p className='text-zinc-400'>1</p>
                            <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                        </div>
                    </div>
                </Box>
                <Modal
                    sx={{
                        overflowY: 'scroll',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    open={noticeState}
                    onClose={closeNotice}>
                    <>
                        <CreateNotice closeModal={closeNotice} refresh={fetchNotice} notice={notice}  />
                    </>
                </Modal>
            </div>
        </Box>
    );
};

export default NoticePage;

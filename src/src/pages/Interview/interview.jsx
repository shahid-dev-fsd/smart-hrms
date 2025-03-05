import React, { useCallback, useState,useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { useMessage } from '../../components/Header';
import useModal from '../../hooks/useModal';
import { Box, Button, CircularProgress, Grid, IconButton, Modal, Pagination, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddQuestion from '../../components/AddQuestuion';
import QuestionCard from '../../components/QuestionCard';
import { Search } from '@mui/icons-material';

const getOrders = jobs =>
    jobs.map((job, i) => ({
        id: job._id,
        index: i,
    }));

const Interview = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const { modalState, closeModal, openModal } = useModal();
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [questions, setQuestions] = useState(null);
    const [originalOrder, setOriginalOrders] = useState(null);
    const [isOrderChanged, setIsOrderChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useMessage();
    const [offset, setOffset] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [pageLimit, setPageLimit] = useState(0);
    const handlePrevScreen = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleNextScreen = () => {
        
        if (currentScreen < 2) {
            setCurrentScreen(currentScreen + 1);
        }
    };
    const fetchInterviewQuestions = useCallback(
        async (search = '') => {
            setQuestions(null);
            try {
                const response = await axios.get(
                    `/hr/question?searchBy=title&search=${search}&sortBy=order&direction=-1&page=${pageNo}`
                );
                const body = response.data;
                const { questions, pageData } = body;
                const { currentPage, pageSize } = pageData;
                setQuestions(questions);
                setOffset((currentPage - 1) * pageSize);
                setPageLimit(response.data.pageData.totalPages);
                setOriginalOrders(getOrders(questions));
            } catch (e) {
                console.warn(e);
            }
        },
        [setQuestions, pageNo]
    );

    useEffect(() => {
        fetchInterviewQuestions();
    }, [fetchInterviewQuestions]);

    const editQuestion = id => {
        openModal();
        setSelectedQuestion({ id, action: 'edit' });
    };

    const saveOrder = async () => {
        setLoading(true);
        const newOrder = getOrders(questions);
        const effOrder = newOrder
            .filter((order, i) => order.id !== originalOrder[i].id)
            .map(order => ({
                ...order,
                index: order.index + offset,
            }));

        const res = await axios.patch('/hr/job-listing/order', {
            newOrders: effOrder,
        });

        const { success } = res.data;

        if (success) {
            showSuccess('Order saved successfully');
        } else {
            showError('Cannot save order');
        }

        setIsOrderChanged(false);
        setLoading(false);
    };

    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;

        setIsOrderChanged(true);

        const draggingJob = questions[source.index];
        questions.splice(source.index, 1);

        questions.splice(destination.index, 0, draggingJob);

        setQuestions([...questions]);
    };
    console.log(questions)

    return (
        <>
            <Box mt={3}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h5'>Interview Question</Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Box>
                            <Button onClick={openModal} variant='contained'>
                                Add Question
                            </Button>
                        </Box>

                        <Box sx={{ ml: 2 }}>
                            <Tooltip title='info' placement='top'>
                                <IconButton disableRipple variant='navIcon' sx={{ mr: 0 }}>
                                    <InfoOutlinedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Modal sx={{ overflowY: 'scroll' }} open={modalState} onClose={closeModal}>
                    <AddQuestion
                        selectedQuestion={selectedQuestion}
                        setSelectedQuestion={setSelectedQuestion}
                        refresh={fetchInterviewQuestions}
                        handleClose={closeModal}
                        questions={questions}
                    />
                </Modal>
                <Stack direction='row' justifyContent='space-between' my={4}>
                    <Search
                        placeholder='Search Your Job Category questions'
                        onChange={e => {
                            const { value } = e.target;
                            !(value.trim() === ' ') && fetchInterviewQuestions(value);
                        }}
                    />
                    <Pagination
                        page={pageNo}
                        onChange={(_, newPage) => setPageNo(newPage)}
                        color='primary'
                        count={pageLimit}
                        sx={{ float: 'right' }}
                    />
                    {isOrderChanged && (
                        <Button
                            variant='contained'
                            onClick={saveOrder}
                            endIcon={
                                loading && (
                                    <CircularProgress size={20} color='secondary' thickness={7} />
                                )
                            }>
                            Save Order
                        </Button>
                    )}
                </Stack>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {questions
                                    ? questions?.map((question, i) => (
                                          <Draggable
                                              key={question._id}
                                              draggableId={question._id}
                                              index={i}>
                                              {provided => (
                                                  <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}>
                                                    <QuestionCard
                                                          ref={provided.innerRef}
                                                          draggableProps={provided.draggableProps}
                                                          dragHandleProps={provided.dragHandleProps}
                                                          title={question.title}
                                                          questions={question.questions}
                                                          refresh={fetchInterviewQuestions}
                                                          id={question.jobId}
                                                          editQuestion={editQuestion}
                                                      />
                                                  </div>
                                              )}
                                          </Draggable>
                                      ))
                                    : Array(5)
                                          ?.fill(0)
                                          .map((el, i) => (
                                              <Skeleton
                                                  variant='rounded'
                                                  key={i}
                                                  width='100%'
                                                  height='136px'
                                                  animation='wave'
                                                  sx={{
                                                      borderRadius: '20px',
                                                      my: 2,
                                                  }}
                                              />
                                          ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </>
    );
};

export default Interview;

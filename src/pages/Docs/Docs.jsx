// import { Box, Button, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import React, { useCallback, useState, useEffect } from 'react';
// import axios from 'axios';
// import DocsCard from './DocsCard';
// import CreateDocs from './CreateDocs';
// import useModal from '../../hooks/useModal';
// import useErrorHandler from '../../hooks/useErrorHandler';

// const Docs = () => {
//     const [docs, setDocs] = useState(null);
//     const { modalState, openModal, closeModal } = useModal();
//     const errorHandler = useErrorHandler();
//     const [doc, setDoc] = useState(null);
//     const [isCopying, setIsCopying] = useState(false); 

//     const fetchDocs = useCallback(async () => {
//         try {
//             const response = await axios.get('/hr/docs');
//             setDocs(response.data.docs);
//         } catch (e) {
//             errorHandler(e);
//         }
//     }, [errorHandler]);

//     const editDoc = id => {
//         setDoc(id);
//         setIsCopying(false); // Set to false for editing
//         openModal();
//     };

//     const copyDoc = id => {
//         setDoc(id);
//         setIsCopying(true); // Set to true for copying
//         openModal();
//     };

//     useEffect(() => {
//         fetchDocs();
//     }, [fetchDocs]);

//     return (
//         <Box  sx={{ backgroundColor: 'background.main' , px:2 , py :3 }}>
//             <Box >
//                 <Grid container spacing={4} display='flex' alignItems='center' className="pb-1">
//                     <Grid item xs>
//                         <div >
//                             <h1 className="text-2xl text-neutral-500">Docs</h1>
//                         </div>
//                     </Grid>

//                     <Grid item display='flex' alignItems='center' gap={2}>
//                         <Box>
//                             <Button
//                                 variant='contained'
//                                 onClick={() => {
//                                     setDoc(null);
//                                     setIsCopying(false); // Ensure creating a new doc
//                                     openModal();
//                                 }}>
//                                 Create Docs
//                             </Button>
//                         </Box>

//                         <Box>
//                             <Tooltip title='info' placement='top'>
//                                 {/* <IconButton disableRipple variant='navIcon' sx={{ mr: 0, ml: 2 }}> */}
//                                     {/* <InfoOutlinedIcon fontSize='small' /> */}
//                                     <InfoOutlinedIcon />
//                                 {/* </IconButton> */}
//                             </Tooltip>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Box>
//             {docs?.map(doc => (
//                 <DocsCard
//                     key={doc._id}
//                     id={doc._id}
//                     title={doc.title}
//                     content={doc.content}
//                     joblistings={doc.joblistings}
//                     refresh={fetchDocs}
//                     editDoc={editDoc}
//                     copyDoc={copyDoc}
//                 />
//             ))}
//             <Modal
//                 sx={{
//                     overflowY: 'scroll',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//                 open={modalState}
//                 onClose={closeModal}>
//                 <CreateDocs
//                     closeModal={closeModal}
//                     refresh={fetchDocs}
//                     doc={doc}
//                     isCopying={isCopying} 
//                 />
//             </Modal>
//         </Box>
//     );
// };

// export default Docs;
import { Box, Button, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import DocsCard from './DocsCard';
import CreateDocs from './CreateDocs';
import useModal from '../../hooks/useModal';
import useErrorHandler from '../../hooks/useErrorHandler';

const Docs = () => {
    const [docs, setDocs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
    const [totalPages, setTotalPages] = useState(1);   // Pagination: total pages
    const { modalState, openModal, closeModal } = useModal();
    const errorHandler = useErrorHandler();
    const [doc, setDoc] = useState(null);
    const [isCopying, setIsCopying] = useState(false); 

    const fetchDocs = useCallback(async (page = 1) => {
        try {
            const response = await axios.get(`/hr/docs?page=${currentPage}&limit=10`); // Pagination: passing page & limit
            setDocs(response.data.docs);
            setTotalPages(response.data.pageData.totalPages); // Set total pages from response
            setCurrentPage(response.data.pageData.currentPage); // Update current page
        } catch (e) {
            errorHandler(e);
        }
    }, [currentPage]);


    const editDoc = id => {
        setDoc(id);
        setIsCopying(false); // Set to false for editing
        openModal();
    };

    const copyDoc = id => {
        setDoc(id);
        setIsCopying(true); // Set to true for copying
        openModal();
    };

    useEffect(() => {
        fetchDocs(currentPage); // Fetch docs for current page on mount
    }, [fetchDocs, currentPage]);

    return (

        <Box  sx={{ backgroundColor: 'background.main' , px:2 , py :3, height
            :'88vh',}}>
            <Box >

                <Grid container spacing={4} display='flex' alignItems='center' className="pb-1">
                    <Grid item xs>
                        <div>
                            <h1 className="text-2xl text-neutral-500">Docs</h1>
                        </div>
                    </Grid>

                    <Grid item display='flex' alignItems='center' gap={2}>
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setDoc(null);
                                    setIsCopying(false); // Ensure creating a new doc
                                    openModal();
                                }}>
                                Create Docs
                            </Button>
                        </Box>

                        <Box>
                            <Tooltip title='info' placement='top'>
                                <InfoOutlinedIcon />
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {docs?.map(doc => (
                <DocsCard
                    key={doc._id}
                    id={doc._id}
                    title={doc.title}
                    content={doc.content}
                    joblistings={doc.joblistings}
                    refresh={fetchDocs}
                    editDoc={editDoc}
                    copyDoc={copyDoc}
                />
            ))}

            {/* Pagination Controls */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </Button>

                <Typography variant="body2" sx={{ mx: 2 }}>
                    Page {currentPage} of {totalPages}
                </Typography>

                <Button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </Button>
            </Box>

            <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={modalState}
                onClose={closeModal}>
                <CreateDocs
                    closeModal={closeModal}
                    refresh={fetchDocs}
                    doc={doc}
                    isCopying={isCopying} 
                />
            </Modal>
        </Box>
    );
};

export default Docs;

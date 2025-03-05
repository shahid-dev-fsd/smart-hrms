import { Box, Button, Card, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './quill.css';
import axios from 'axios';
import { useMessage } from './Header';

const EditAgreement = props => {
    const { closeModal, refetch, agreement, closeAgreement, jobApplicationId } = props;
    const { title, content, _id } = agreement;
    const [text, setText] = useState(content);
    const { showSuccess } = useMessage();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const handleChange = value => {
        setText(value);
    };

    const sendAgreement = async (agreementId, content, title) => {
        try {
            await axios.patch(`/hr/agreement/${jobApplicationId}`, { agreementId, content, title });
            showSuccess('Agreement sent!');
            closeModal();
            closeAgreement();
            refetch();
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Card
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                borderRadius: '8px',
                maxWidth: '1300px',
                width: '100%',
                p: 4,
                mx: 2,
                overflowX: 'hidden',
                maxHeight: '85vh',
                overflowY: 'auto',
            }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h6' fontWeight={500}>
                    Edit {title}
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <Box pb={8}>
                <ReactQuill
                    value={text}
                    modules={modules}
                    formats={formats}
                    onChange={handleChange}
                    className='.richtextWrap'
                />

                <Button
                    type='submit'
                    variant='contained'
                    disabled={!text}
                    onClick={() => sendAgreement(_id, text, title)}
                    sx={{ float: 'right', my: 4 }}>
                    Send
                </Button>
            </Box>
        </Card>
    );
};

export default EditAgreement;

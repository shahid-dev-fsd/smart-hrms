import * as React from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
// import { Form, Submit, useForm } from '../../hooks/useForm';

import axios from 'axios';
import { useMessage } from './Header';

// import axios from 'axios';

const AddLabels = ({ labels, id, fetchJobsApplication }) => {
    const ListOfLabel = labels;

    const { showSuccess, showError } = useMessage();
    const [value, setValue] = React.useState('');

    const handleChange = (e, v) => {
        setValue(v);
    };

    React.useEffect(() => {
        value && updateApplication(value?.map(v => v._id));
    });

    const updateApplication = React.useCallback(
        async function (statusId) {
            try {
                const res = await axios.patch(
                    `/hr/job-application/status/${id}?status=${statusId}`
                );
                const { success, message } = res.data;

                if (!success) return showError(message);

                fetchJobsApplication();
                showSuccess('Update label successfully');
            } catch (e) {
                console.log(e);
            }
        },
        [id, showSuccess, showError, fetchJobsApplication]
    );
    return (
        <>
            <Autocomplete
                multiple
                id='tags-standard'
                options={ListOfLabel || []}
                onChange={handleChange}
                getOptionLabel={option => option.value}
                onClick={e => e.stopPropagation()}
                renderTags={(value, getTagProps) =>
                    value?.map((option, index) => (
                        <Chip
                            variant='outlined'
                            label={option.value}
                            size='small'
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            width: '150px',
                            mb: 0,
                            my: 1,
                        }}
                        size='small'
                        placeholder='Labels'
                    />
                )}
            />
        </>
    );
};

export default AddLabels;

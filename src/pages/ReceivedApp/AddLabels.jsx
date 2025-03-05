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
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';
import { useMessage } from '../../components/Header';
import { styled } from '@mui/material/styles';

// import axios from 'axios';

const StyledAutocomplete = styled(Autocomplete)({
    '& .MuiAutocomplete-option': {
      fontSize: '8px',
    },
  });
  

const AddLabels = ({ labels, id, fetchJobsApplication }) => {
    const ListOfLabel = labels;

    const { showSuccess, showError } = useMessage();
    const [value, setValue] = React.useState([]);

    const handleChange = (e, v) => {
        setValue(v)
    };

    const handleSubmit = async ()  =>{

        const promises =  value?.map(v =>  updateApplication(v._id));

        await Promise.all(promises);

        fetchJobsApplication();
        setValue([])
    }

    // React.useEffect(() => {
    //     value && updateApplication(value?.map(v => v._id));
    // },[value]);

    const updateApplication = React.useCallback(
        async function (statusId) {
            try {
                const res = await axios.patch(
                    `/hr/job-application/status/${id}?status=${statusId}`
                );
                const { success, message } = res.data;

                if (!success) return showError(message);

                // 
                showSuccess('Update label successfully');
            } catch (e) {
                console.log(e);
            }
        },
        [id, showSuccess, showError]
    );


    return (
        <div className="flex flex-row gap-2 w-full items-center mt-1">
        <div  className='w-[92%]'>
            <StyledAutocomplete
                multiple
                id='tags-standard'
                options={ListOfLabel || []}
                onChange={handleChange}
                value={value}
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
                            mb: 0,
                            my: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                    borderBottom: '1px solid',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                    borderBottom: '1px solid',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                    borderBottom: '1px solid',
                                },
                                '& input': {
                                    fontSize: '10px',
                                },
                                '& input::placeholder': {
                                    fontSize: '10px',
                                },
                            },
                        }}
                        size='small'
                        placeholder='Add Labels'
                    />
                )}
            />
        </div>
        
        <AddIcon  onClick={handleSubmit} />
          {/* <p className="text-[14px] text-zinc-500 flex items-bottom justify-bottom">
          +
        </p> */}
        </div>
    );
};

export default AddLabels;

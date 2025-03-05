import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import EmpDetailsPage from './EmpDetails';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmpDetailsHome = ({id}) => {
     //const id = useParams().id;

    const [value, setValue] = useState(0);
    const [employeeDetail, setEmployeeDetail] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchEmployeeDetails = useCallback(
        async function () {
            try {
                const response = await axios.get(`employee/profile/${id}`);
                console.log(response);
                setEmployeeDetail(response.data.employee);
            } catch (e) {
                console.log(e);
            }
        },
        [setEmployeeDetail, id]
    );
    useEffect(() => {
        fetchEmployeeDetails();
    }, [fetchEmployeeDetails]);

    console.log(employeeDetail);
    return (
        <Box className="h-full overflow-hidden" sx={{ backgroundColor: 'background.main', }}>
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container alignItems='center' justifyContent='center' height='100%'>
                    <Grid item xs={12}>
                        <EmpDetailsPage/>
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                
                .h-full::-webkit-scrollbar {
                    display: none;
                }

               
                .h-full {
                    scrollbar-width: none;
                }
            `}</style>
        </Box>
    );
};

export default EmpDetailsHome;

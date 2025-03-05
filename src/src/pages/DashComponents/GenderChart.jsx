import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const GenderChart = ({items}) => {
    
  

    const data = [
        { name: 'Male', value: items?.male?items.male:40 },
        { name: 'Female', value: items?.female?items.female:60 },
    ];

    const colors = [ '#3b82f6','#dc2626'];

    const totalCount = data.reduce((acc, cur) => acc + cur.value, 0);

    return (
        <Box className="">
            <Grid className="rounded-lg pt-4 pr-4 pb-4" sx={{
            backgroundColor: 'background.view', 
           
           }}>
                <div className="flex flex-col gap-4 items-start">
                    <Typography variant='h5' className="border-l-4 border-blue-500 pl-2 whitespace-nowrap" gutterBottom>
                        Gender Chart
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}> 
                        <PieChart width={400} height={202}>
                            <Pie
                                data={data}
                                dataKey="value"
                                cx="40%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            
                        </PieChart>
                    </div>
                    <div className="flex flex-row gap-2 pl-4 items-center">
                        <div style={{ width: '16px', height: '16px', backgroundColor: colors[0] }}></div>
                        <Typography variant="body1" className='text-[10px]'>Male</Typography>
                        <div style={{ width: '16px',height: '16px', backgroundColor: colors[1] }} className='ml-5'></div>
                        <Typography variant="body1" className='text-[10px]'>Female</Typography>
                    </div>
                        <Typography variant="body1" className='pl-4 text-[10px]'>Total: {totalCount}</Typography>
                </div>
            </Grid>
        </Box>
    );
};

export default GenderChart;

import * as React from 'react';
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default function Progressbar({value}) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <div className='text-end mb-[-25px] text-[8px]' >{`${value}%`}</div>
      <BorderLinearProgress sx={{marginTop:"0px",height:"3px"}} variant="determinate" value={value} />
     
    </Stack>
  );
}
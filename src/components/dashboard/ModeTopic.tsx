import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useRef } from 'react';
import RouteHandler from '../../api/RouteHandler';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import { apiUrl, stage } from '../../settings';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { topicCodeMapper } from '../../utils/topicCodeMapper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


const ModeTopic:React.FC<modeTopicProps> = ({topicCode, topicCount,  startDate, endDate}) => {
  return (
    <>
    <Typography gutterBottom variant="h6" component="div">
                가장 많이 나온 토픽
    </Typography>
    <Item>
        {/* <Stack spacing={2}> */}
            {/* <Typography gutterBottom variant="h6" component="div">
                가장 많이 나온 토픽
            </Typography> */}
            <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                {`${topicCodeMapper[topicCode]}: ${topicCount} 건`}
            </Typography>                          
            <Typography gutterBottom paragraph component="div" textAlign='center'>
                {/* {`${startDate} ~  ${endDate}`} */}
            </Typography>                          
        {/* </Stack> */}
    </Item>    
    </>
  );
}

export default ModeTopic
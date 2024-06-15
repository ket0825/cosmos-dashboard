import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMemo } from 'react';
import { topicCodeMapper } from '../../utils/topicCodeMapper';


function createData(
    topic_name: string,
    topic_std: number,
    topic_mean: number,
    topic_count: number,    
  ) {
    topic_std = Math.round(topic_std * 100) / 100;
    topic_mean = Math.round(topic_mean * 100) / 100;
    topic_count = Math.round(topic_count * 100) / 100;    
    return { topic_name, topic_std, topic_mean, topic_count };
  }
    
const PolarizedTable:React.FC<PolarizedTableProps> = ({polarizedData}) => {
    const rows = useMemo(() => {
        return polarizedData!.map((v) => {
            return createData(topicCodeMapper[v.id], v.std, v.mean, v.count);
        });
    }
    , [polarizedData]);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>토픽 종류</TableCell>
            <TableCell align="right">편차</TableCell>
            <TableCell align="right">평균 감성</TableCell>                        
            <TableCell align="right">토픽 수</TableCell>                        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.topic_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.topic_name}
              </TableCell>
              <TableCell align="right">{row.topic_std}</TableCell>
              <TableCell align="right">{row.topic_mean}</TableCell>
              <TableCell align="right">{row.topic_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PolarizedTable
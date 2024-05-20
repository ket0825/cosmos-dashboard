import React from 'react';
import Chart from './Chart';
import Table from './Table';
import { Button } from '@mui/material';

type DataType = {
  name: string;
  value: number;
};

const data: DataType[] = [
  { name: 'A', value: 100 },
  { name: 'B', value: 200 },
  { name: 'C', value: 150 },
  // ...
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant='contained' color="primary">Hello!</Button>
      <Chart data={data} />
      <Table data={data} />
    </div>
  );
};

export default Dashboard;
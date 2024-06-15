import React, { useCallback, useEffect, useRef} from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, PieLabel, TooltipProps } from 'recharts';
import { topicCodeMapper } from '../../utils/topicCodeMapper';

const convertToDataItems = (frequencyMap: { [key: string]: number }): PieChartDataItem[] => {
  return Object.entries(frequencyMap).map(([name, value]) => ({ name:topicCodeMapper[name], value }));
}

const getTopNDataItems = (dataItems: PieChartDataItem[], n: number): PieChartDataItem[] => {

  const sortedItems = dataItems.sort((a, b) => b.value - a.value);
  const topNDataItems = sortedItems.slice(0, n);
  const otherDataItems = sortedItems.slice(n);
  if (otherDataItems.length > 0) {
    const othersTotalValue = otherDataItems.reduce((acc, cur) => acc + cur.value, 0);
    topNDataItems.push({ name: '기타', value: othersTotalValue });
  }
  return topNDataItems;

}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#00E6D6', '#FFA500', '#A020F0', '#32CD32'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload as PieChartDataItem;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${name} : ${value}`}</p>
      </div>
    );
  }
  return null;
};

const TopNPieChart: React.FC<TopNPieChartProps> = ({data, n}) => { 

  const topNDataItems = useRef<PieChartDataItem[]>([]);

  useEffect(() => {
    topNDataItems.current = getTopNDataItems(convertToDataItems(data), n);
  }
  , [data, n]);

  const renderCell = useCallback(
    (entry: PieChartDataItem, index: number) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ),
    []
  );

  return (
    <ResponsiveContainer width={600} height={400}>
      <PieChart>
        <Pie
          data={topNDataItems.current}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {topNDataItems.current.map(renderCell)}
        </Pie>
        <Legend />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TopNPieChart;
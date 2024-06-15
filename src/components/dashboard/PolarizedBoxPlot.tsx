import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  RectangleProps,
  
} from "recharts";

import { topicCodeMapper } from "../../utils/topicCodeMapper";

const DotBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={"#000"}
      strokeWidth={1}
    />
  );
};

const HorizonBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line x1={x} y1={y} x2={x + width} y2={y} stroke={"#000"} strokeWidth={2} />
  );
};

type BoxPlotData = {
    min: number;
    bottomWhisker: number;
    bottomBox: number;
    topBox: number;
    topWhisker: number;
    id: string;
};

const useBoxPlot = (boxPlots: PolarizedData[]): BoxPlotData[] => {
  const data = useMemo(
    () =>
      boxPlots.map((v) => {
        return {
          min: v.mean - v.std * 2,
          bottomWhisker: Math.abs(v.std),
          bottomBox: Math.abs(v.std),
          topBox: Math.abs(v.std),
          topWhisker: Math.abs(v.std),
          id: topicCodeMapper[v.id],
        };
      }),
    [boxPlots]
  );

  return data.slice(0,7);
};

const PolarizedBoxPlot:React.FC<PolarizedBoxPlotProps> = ({polarizedData}) => {
  const data = useBoxPlot(polarizedData!);
  console.log(data);
  return (
    <ResponsiveContainer width={800} maxHeight={400}>
      <ComposedChart data={data} >
        <CartesianGrid strokeDasharray="3 3" />
        <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />}/>
        <Bar stackId={"a"} dataKey={"bottomBox"} fill={"#8884d8"}/>
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />}/>
        <Bar stackId={"a"} dataKey={"topBox"} fill={"#8884d8"}/>
        <Bar stackId={"a"} dataKey={"topWhisker"} shape={<DotBar />}/>
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />}/>        
        <ZAxis />        
        <XAxis dataKey="id"/>
        <YAxis />
      </ComposedChart>
    </ResponsiveContainer>
  );
}



export default PolarizedBoxPlot;
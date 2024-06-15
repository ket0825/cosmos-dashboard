import React from 'react'
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, TooltipProps, ReferenceLine, ZAxis, Label, LabelList, ResponsiveContainer, Legend
} from 'recharts';
import { topicCodeMapper } from '../../utils/topicCodeMapper';
import { useMemo } from 'react';


const KanoChart: React.FC<KanoChartProps> = ({ kanoData }) => {

    const transformedData = useMemo(() => {
        if (!kanoData) return [];
    
        return kanoData.map((item) => ({
            id: topicCodeMapper[item.id],
            data: item.data.map((dataPoint) => ({
                id: item.id,
                ...dataPoint,
            })).sort((a, b) => a.x - b.x)
        }));
    }, [kanoData]);

    // 선형 회귀선의 계수 계산 함수
    const calculateLinearRegression = (data: { x: number; y: number; size: number; }[]) => {
        const x = data.map((d) => d.x);
        const y = data.map((d) => d.y);
        const n = x.length;

        const minValue = Math.min(...x);
        const maxValue = Math.max(...x);

        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
        const sumX2 = x.reduce((a, b) => a + b * b, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        return { minValue, maxValue, slope, intercept };
    };

    // 선형 회귀선의 시작점과 끝점 계산
    const calculateRegressionLine = () => {
        const { minValue, maxValue, slope, intercept } = calculateLinearRegression(transformedData.flatMap((d) => d.data));
        const minX = minValue;
        const maxX = maxValue;
        const startY = slope * minX + intercept;
        const endY = slope * maxX + intercept;
        return [
            { x: minX, y: startY },
            { x: maxX, y: endY },
        ];
    };

    const CustomizedTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{ fontSize: '12px' }}>
                    <p className="label">{`토픽: ${topicCodeMapper[data.id]}`}</p>
                    <p className="label">{`상대적 중요도: ${data.x.toFixed(2)}`}</p>
                    <p className="label">{`만족도: ${data.y.toFixed(2)}`}</p>
                    <p className="label">{`토픽 개수: ${data.size.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width={600} height={500}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="필요도" />
                <YAxis type="number" dataKey="y" name="만족도" />
                <ZAxis type="category" dataKey="size" name="중요도" />

                <Tooltip content={<CustomizedTooltip />} cursor={{ strokeDasharray: '3 3' }} />                
                <Legend formatter={(value, entry, index) => (
                            <span style={{ color: entry.color, fontSize: '12px' }}>{value}</span>
                        )}
                        iconSize={8}
                        verticalAlign='bottom'

                        />                                           
                {transformedData.map((d, idx) => (
                    <Scatter key={idx} name={d.id} data={d.data} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}

                <ReferenceLine
                    segment={calculateRegressionLine()}
                    stroke="red"
                    strokeDasharray="3 3"
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
}


export default KanoChart
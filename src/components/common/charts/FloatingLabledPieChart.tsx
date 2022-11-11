import { useCallback, useState } from 'react';
import { Pie, PieChart, Sector } from 'recharts';

interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: any;
  percent: number;
  value: number;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={'#ccc'}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontSize={'.85rem'}
        fill='#ccc'
      >{`${value.toFixed(1)} ${payload.currencyCode}`}</text>
    </g>
  );
};

interface FloatingLabledPieChartProps {
  data: { value: number; name: string; [key: string]: any }[];
}

const FloatingLabledPieChart = ({ data }: FloatingLabledPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePieEnter = useCallback(
    (_: any, index: number) => setActiveIndex(index),
    []
  );

  return (
    <PieChart width={250} height={250} className='overflown-pie'>
      <Pie
        activeIndex={activeIndex}
        activeShape={props => renderActiveShape(props)}
        data={data}
        cx='50%'
        cy='50%'
        innerRadius={60}
        outerRadius={80}
        dataKey='value'
        onMouseEnter={handlePieEnter}
      />
    </PieChart>
  );
};

export default FloatingLabledPieChart;

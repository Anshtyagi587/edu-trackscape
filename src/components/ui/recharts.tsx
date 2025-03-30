
import * as React from "react"
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "./chart"

type ChartProps = {
  data: any;
  options?: any;
  className?: string;
}

export function BarChart({ data, options, className }: ChartProps) {
  const config = React.useMemo(() => {
    const colorMap: Record<string, { color: string }> = {};
    if (data.datasets) {
      data.datasets.forEach((dataset: any, index: number) => {
        const key = dataset.label || `dataset-${index}`;
        colorMap[key] = { color: dataset.backgroundColor || `hsl(${index * 25}, 70%, 55%)` };
      });
    }
    return colorMap;
  }, [data]);

  const chartData = React.useMemo(() => {
    return data.labels?.map((label: string, index: number) => {
      const dataPoint: Record<string, any> = { name: label };
      
      data.datasets?.forEach((dataset: any) => {
        const key = dataset.label || `dataset-${index}`;
        dataPoint[key] = dataset.data[index];
      });
      
      return dataPoint;
    }) || [];
  }, [data]);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsBarChart data={chartData} {...options}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
        <Legend />
        {data.datasets?.map((dataset: any, index: number) => (
          <Bar 
            key={dataset.label || `dataset-${index}`}
            dataKey={dataset.label || `dataset-${index}`} 
            fill={dataset.backgroundColor || `hsl(${index * 25}, 70%, 55%)`}
            stroke={dataset.borderColor}
            strokeWidth={dataset.borderWidth}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function LineChart({ data, options, className }: ChartProps) {
  const config = React.useMemo(() => {
    const colorMap: Record<string, { color: string }> = {};
    if (data.datasets) {
      data.datasets.forEach((dataset: any, index: number) => {
        const key = dataset.label || `dataset-${index}`;
        colorMap[key] = { color: dataset.borderColor || `hsl(${index * 25}, 70%, 55%)` };
      });
    }
    return colorMap;
  }, [data]);

  const chartData = React.useMemo(() => {
    return data.labels?.map((label: string, index: number) => {
      const dataPoint: Record<string, any> = { name: label };
      
      data.datasets?.forEach((dataset: any) => {
        const key = dataset.label || `dataset-${index}`;
        dataPoint[key] = dataset.data[index];
      });
      
      return dataPoint;
    }) || [];
  }, [data]);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsLineChart data={chartData} {...options}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
        <Legend />
        {data.datasets?.map((dataset: any, index: number) => (
          <Line 
            key={dataset.label || `dataset-${index}`}
            type="monotone"
            dataKey={dataset.label || `dataset-${index}`} 
            stroke={dataset.borderColor || `hsl(${index * 25}, 70%, 55%)`}
            fill={dataset.backgroundColor}
            strokeWidth={2}
            dot={{ strokeWidth: 1 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export function AreaChart({ data, options, className }: ChartProps) {
  const config = React.useMemo(() => {
    const colorMap: Record<string, { color: string }> = {};
    if (data.datasets) {
      data.datasets.forEach((dataset: any, index: number) => {
        const key = dataset.label || `dataset-${index}`;
        colorMap[key] = { color: dataset.borderColor || `hsl(${index * 25}, 70%, 55%)` };
      });
    }
    return colorMap;
  }, [data]);

  const chartData = React.useMemo(() => {
    return data.labels?.map((label: string, index: number) => {
      const dataPoint: Record<string, any> = { name: label };
      
      data.datasets?.forEach((dataset: any) => {
        const key = dataset.label || `dataset-${index}`;
        dataPoint[key] = dataset.data[index];
      });
      
      return dataPoint;
    }) || [];
  }, [data]);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsAreaChart data={chartData} {...options}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
        <Legend />
        {data.datasets?.map((dataset: any, index: number) => (
          <Area 
            key={dataset.label || `dataset-${index}`}
            type="monotone"
            dataKey={dataset.label || `dataset-${index}`} 
            stroke={dataset.borderColor || `hsl(${index * 25}, 70%, 55%)`}
            fill={dataset.backgroundColor || `hsla(${index * 25}, 70%, 55%, 0.2)`}
            strokeWidth={2}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

export function PieChart({ data, options, className }: ChartProps) {
  const config = React.useMemo(() => {
    const colorMap: Record<string, { color: string }> = {};
    if (data.datasets?.[0]?.data) {
      data.labels?.forEach((label: string, index: number) => {
        colorMap[label] = { 
          color: data.datasets[0].backgroundColor?.[index] || 
                 data.datasets[0].borderColor?.[index] || 
                 `hsl(${index * 25}, 70%, 55%)` 
        };
      });
    }
    return colorMap;
  }, [data]);

  const chartData = React.useMemo(() => {
    return data.labels?.map((label: string, index: number) => ({
      name: label,
      value: data.datasets?.[0]?.data?.[index] || 0,
      color: data.datasets?.[0]?.backgroundColor?.[index] || `hsl(${index * 25}, 70%, 55%)`
    })) || [];
  }, [data]);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPieChart {...options}>
        <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
        <Legend />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={options?.innerRadius || 0}
          outerRadius={options?.outerRadius || "80%"}
          fill="#8884d8"
          paddingAngle={options?.paddingAngle || 0}
          dataKey="value"
          nameKey="name"
          label={options?.label !== false}
        >
          {chartData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}

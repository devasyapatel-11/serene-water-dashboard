
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ChartLine } from "lucide-react";

interface WaterLevelChartProps {
  title: string;
  description?: string;
  data: {
    name: string;
    value: number;
  }[];
  height?: number;
}

export default function WaterLevelChart({ 
  title, 
  description, 
  data,
  height = 300
}: WaterLevelChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="p-2 rounded-full bg-water-50">
          <ChartLine className="h-4 w-4 text-water-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tickCount={5} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #f1f1f1',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#33C3F0" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#33C3F0" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

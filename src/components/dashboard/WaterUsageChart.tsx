
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WaterUsageChartProps {
  title: string;
  data: {
    name: string;
    usage: number;
  }[];
}

export default function WaterUsageChart({ title, data }: WaterUsageChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value} kL`}
              />
              <Tooltip
                formatter={(value) => [`${value} kL`, 'Usage']}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #f1f1f1',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="usage" fill="#33C3F0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

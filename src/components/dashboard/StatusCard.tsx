
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  description?: string;
  value: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export default function StatusCard({ 
  title, 
  description, 
  value, 
  max = 100, 
  label,
  size = 'md',
  type = 'info'
}: StatusCardProps) {
  const percentage = (value / max) * 100;
  
  const getProgressColor = () => {
    if (type === 'success') return 'bg-green-500';
    if (type === 'warning') return 'bg-amber-500';
    if (type === 'danger') return 'bg-red-500';
    return 'bg-water-400';
  };
  
  const getTextColor = () => {
    if (type === 'success') return 'text-green-500';
    if (type === 'warning') return 'text-amber-500';
    if (type === 'danger') return 'text-red-500';
    return 'text-water-400';
  };

  return (
    <Card className={cn(
      "overflow-hidden",
      size === 'sm' ? 'max-h-32' : '',
      size === 'lg' ? 'h-full' : ''
    )}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        size === 'sm' ? 'pb-1 pt-3' : '',
      )}>
        <div>
          <CardTitle className={size === 'sm' ? 'text-sm' : ''}>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className={cn(
          "text-2xl font-bold",
          getTextColor()
        )}>
          {value}{label && <span className="text-sm font-normal text-muted-foreground ml-1">{label}</span>}
        </div>
      </CardHeader>
      <CardContent className={size === 'sm' ? 'pt-0 pb-3' : ''}>
        <Progress 
          value={percentage} 
          className={cn(
            "h-2 mt-2",
            getProgressColor()
          )} 
        />
        {size !== 'sm' && (
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <div>0</div>
            <div>{max}{label}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

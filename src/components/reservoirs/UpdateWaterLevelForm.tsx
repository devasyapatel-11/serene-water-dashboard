
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Droplet, ArrowUp, ArrowDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface UpdateWaterLevelFormProps {
  reservoirId: string;
  reservoirName: string;
  currentLevel: number;
  capacity: number;
  onClose: () => void;
  onUpdateLevel: (id: string, newLevel: number) => void;
}

const formSchema = z.object({
  newLevel: z.number().min(0, "Level cannot be negative").max(100, "Level cannot exceed 100%"),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateWaterLevelForm({
  reservoirId,
  reservoirName,
  currentLevel,
  capacity,
  onClose,
  onUpdateLevel
}: UpdateWaterLevelFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPercentage = Math.round((currentLevel / capacity) * 100);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newLevel: currentPercentage,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Calculate the new level in kL based on percentage
    const newLevelInKL = Math.round((data.newLevel / 100) * capacity);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateLevel(reservoirId, newLevelInKL);
      toast({
        title: "Water Level Updated",
        description: `${reservoirName} water level updated to ${data.newLevel}% (${newLevelInKL} kL)`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const direction = form.watch("newLevel") > currentPercentage ? "increase" : "decrease";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">{reservoirName}</h3>
          <p className="text-sm text-muted-foreground">
            Current Level: {currentLevel} kL ({currentPercentage}%)
          </p>
        </div>

        <FormField
          control={form.control}
          name="newLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Level</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[field.value]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                  <div className="flex items-center gap-3 justify-center">
                    {direction === "increase" ? (
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    ) : direction === "decrease" ? (
                      <ArrowDown className="h-5 w-5 text-amber-500" />
                    ) : null}
                    <Input
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                      min={0}
                      max={100}
                      className="w-24 text-center"
                    />
                    <span>%</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription className="text-center">
                New level in kL: {Math.round((field.value / 100) * capacity)} kL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="gap-2"
          >
            <Droplet className="h-4 w-4" />
            Update Level
          </Button>
        </div>
      </form>
    </Form>
  );
}

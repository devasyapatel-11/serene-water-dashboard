
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  sector: z.string().min(1, "Sector is required"),
  billingMonth: z.date({
    required_error: "Billing month is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  ratePerKl: z.string().min(1, "Rate is required").regex(/^\d+(\.\d{1,2})?$/, "Rate must be a valid amount"),
});

type FormValues = z.infer<typeof formSchema>;

export default function GenerateBillsForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: "",
      ratePerKl: "5.50",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bills Generated Successfully",
        description: `Generated bills for ${data.sector} for ${format(data.billingMonth, "MMMM yyyy")} with due date ${format(data.dueDate, "PP")}`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Sector</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sector A">Sector A</SelectItem>
                  <SelectItem value="Sector B">Sector B</SelectItem>
                  <SelectItem value="Sector C">Sector C</SelectItem>
                  <SelectItem value="Sector D">Sector D</SelectItem>
                  <SelectItem value="All Sectors">All Sectors</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="billingMonth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Billing Month</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MMMM yyyy")
                      ) : (
                        <span>Select month</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={2020}
                    toYear={2025}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The month for which the bills will be generated
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date by which customers must pay their bills
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="ratePerKl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate per Kiloliter (kL)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input {...field} className="pl-7" />
                </div>
              </FormControl>
              <FormDescription>
                The rate that will be applied per kiloliter of water usage
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Bills
          </Button>
        </div>
      </form>
    </Form>
  );
}

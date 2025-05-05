
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SystemPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SystemPreferencesDialog({ open, onOpenChange }: SystemPreferencesDialogProps) {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notificationsEnabled: true,
    dataRefreshRate: 5,
    language: "english",
    alertThreshold: 25,
  });

  const handleSwitchChange = (id: string) => {
    setPreferences(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const handleSelectChange = (value: string) => {
    setPreferences(prev => ({ ...prev, language: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setPreferences(prev => ({ ...prev, alertThreshold: value[0] }));
  };

  const handleRefreshRateChange = (value: number[]) => {
    setPreferences(prev => ({ ...prev, dataRefreshRate: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferences Saved",
      description: "Your system preferences have been updated successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>System Preferences</DialogTitle>
          <DialogDescription>
            Customize your system preferences. Changes will be applied immediately.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="flex flex-col gap-1">
                <span>Dark Mode</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Enable dark mode for the interface
                </span>
              </Label>
              <Switch
                id="darkMode"
                checked={preferences.darkMode}
                onCheckedChange={() => handleSwitchChange("darkMode")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex flex-col gap-1">
                <span>Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Enable push notifications
                </span>
              </Label>
              <Switch
                id="notifications"
                checked={preferences.notificationsEnabled}
                onCheckedChange={() => handleSwitchChange("notificationsEnabled")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Interface Language</Label>
              <Select
                value={preferences.language}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <Label>
                Data Refresh Rate: {preferences.dataRefreshRate} {preferences.dataRefreshRate === 1 ? 'minute' : 'minutes'}
              </Label>
              <Slider
                defaultValue={[preferences.dataRefreshRate]}
                max={30}
                min={1}
                step={1}
                onValueChange={handleRefreshRateChange}
              />
            </div>
            
            <div className="space-y-4">
              <Label>
                Water Level Alert Threshold: {preferences.alertThreshold}%
              </Label>
              <Slider
                defaultValue={[preferences.alertThreshold]}
                max={50}
                min={10}
                step={5}
                onValueChange={handleSliderChange}
              />
              <p className="text-xs text-muted-foreground">
                Get alerts when reservoir levels fall below this threshold
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Save preferences</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

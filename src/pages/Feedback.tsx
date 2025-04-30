
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MoreHorizontal, Search, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  message: string;
  date: string;
  rating: number;
  status: "new" | "read" | "responded";
  category: "service" | "billing" | "quality" | "general";
}

const feedbackData: Feedback[] = [
  {
    id: "FB-001",
    customerId: "CUST-123",
    customerName: "John Wilson",
    subject: "Great Service",
    message: "I wanted to thank the team for their prompt response to my water connection issue. The officer was very helpful and professional.",
    date: "2025-04-25",
    rating: 5,
    status: "new",
    category: "service"
  },
  {
    id: "FB-002",
    customerId: "CUST-456",
    customerName: "Sarah Johnson",
    subject: "Billing Error",
    message: "I noticed a discrepancy in my latest bill. It shows much higher usage than my actual consumption. Please look into this.",
    date: "2025-04-24",
    rating: 2,
    status: "read",
    category: "billing"
  },
  {
    id: "FB-003",
    customerId: "CUST-789",
    customerName: "Michael Brown",
    subject: "Water Quality Issue",
    message: "We've been experiencing discolored water for the past week. This is concerning as we use this for drinking and cooking.",
    date: "2025-04-23",
    rating: 1,
    status: "responded",
    category: "quality"
  },
  {
    id: "FB-004",
    customerId: "CUST-101",
    customerName: "Emma Davis",
    subject: "Officer Appreciation",
    message: "I want to commend Officer Davis who helped resolve our water pressure issue. He was knowledgeable and fixed it immediately.",
    date: "2025-04-22",
    rating: 5,
    status: "read",
    category: "service"
  },
  {
    id: "FB-005",
    customerId: "CUST-112",
    customerName: "Robert Garcia",
    subject: "Online Portal Suggestion",
    message: "It would be helpful to have the ability to track maintenance requests through the online portal. Currently, there's no way to see status updates.",
    date: "2025-04-21",
    rating: 3,
    status: "new",
    category: "general"
  },
  {
    id: "FB-006",
    customerId: "CUST-134",
    customerName: "Jennifer Lopez",
    subject: "Consistent Billing Issues",
    message: "For the third month in a row, my bill doesn't match my meter reading. I've been taking photos of my meter and there's a significant difference.",
    date: "2025-04-20",
    rating: 1,
    status: "responded",
    category: "billing"
  },
  {
    id: "FB-007",
    customerId: "CUST-178",
    customerName: "William Taylor",
    subject: "Service Hours Feedback",
    message: "I appreciate the recent extension of customer service hours. It makes it much easier for working people to address issues.",
    date: "2025-04-19",
    rating: 4,
    status: "read",
    category: "general"
  }
];

export default function Feedback() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();
  
  const filteredFeedback = feedbackData.filter(feedback => 
    feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const statusColors = {
    new: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    read: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    responded: "bg-green-100 text-green-800 hover:bg-green-200"
  };
  
  const categoryColors = {
    service: "bg-purple-100 text-purple-800",
    billing: "bg-amber-100 text-amber-800",
    quality: "bg-red-100 text-red-800",
    general: "bg-blue-100 text-blue-800"
  };

  const handleAction = (action: string, feedback: Feedback) => {
    setSelectedFeedback(feedback);
    
    if (action === "Marked as Read" && feedback.status === "new") {
      toast({
        title: "Feedback Marked as Read",
        description: `Feedback from ${feedback.customerName} has been marked as read.`,
      });
    }
  };

  const handleReply = () => {
    if (!selectedFeedback || !replyText.trim()) return;
    
    toast({
      title: "Response Sent",
      description: `Your response to ${selectedFeedback.customerName}'s feedback has been sent.`,
    });
    
    setReplyText("");
  };

  // Count feedback by status
  const newFeedbacks = feedbackData.filter(fb => fb.status === "new").length;
  const readFeedbacks = feedbackData.filter(fb => fb.status === "read").length;
  const respondedFeedbacks = feedbackData.filter(fb => fb.status === "responded").length;
  
  // Calculate average rating
  const avgRating = (feedbackData.reduce((sum, fb) => sum + fb.rating, 0) / feedbackData.length).toFixed(1);

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <h1 className="text-3xl font-bold">Feedback Portal</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-2xl">{feedbackData.length}</CardTitle>
              <CardDescription>Total Feedback</CardDescription>
            </div>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-2xl text-blue-600">{newFeedbacks}</CardTitle>
              <CardDescription>New</CardDescription>
            </div>
            <Badge className={statusColors.new}>New</Badge>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-2xl text-green-600">{respondedFeedbacks}</CardTitle>
              <CardDescription>Responded</CardDescription>
            </div>
            <Badge className={statusColors.responded}>Responded</Badge>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle className="text-2xl">{avgRating}</CardTitle>
              <CardDescription>Average Rating</CardDescription>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>Review and respond to customer feedback</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedback.map((feedback) => (
                  <TableRow key={feedback.id} className={feedback.status === "new" ? "bg-blue-50" : undefined}>
                    <TableCell>{feedback.customerName}</TableCell>
                    <TableCell>
                      <div className="font-medium line-clamp-1">{feedback.subject}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={categoryColors[feedback.category]}>
                        {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`h-4 w-4 ${idx < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[feedback.status]}>
                        {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction("Viewed", feedback)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Marked as Read", feedback)}>
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Reply", feedback)}>
                            Reply
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feedback Details</CardTitle>
            <CardDescription>
              {selectedFeedback ? 
                `From ${selectedFeedback.customerName}` : 
                "Select feedback to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedFeedback ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">{selectedFeedback.subject}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={categoryColors[selectedFeedback.category]}>
                      {selectedFeedback.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedFeedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm bg-gray-50 p-4 rounded-md border">
                    {selectedFeedback.message}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">Reply</h4>
                    <div className="flex gap-1">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Type your response here..." 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-3"
                  />
                  <Button onClick={handleReply} disabled={!replyText.trim()}>
                    Send Response
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Select feedback to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

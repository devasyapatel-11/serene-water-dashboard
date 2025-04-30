
import { DataTable } from "./DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Request {
  id: string;
  customerId: string;
  customerName: string;
  requestType: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  date: string;
  locality: string;
}

interface RequestsTableProps {
  data: Request[];
}

export default function RequestsTable({ data }: RequestsTableProps) {
  const { toast } = useToast();
  
  const statusColors = {
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    resolved: "bg-green-100 text-green-800 hover:bg-green-200",
    closed: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `Request ${action}`,
      description: `Request #${id} has been ${action.toLowerCase()}.`,
    });
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "requestType",
      header: "Request Type",
    },
    {
      accessorKey: "locality",
      header: "Locality",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusColors;
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("Approved", request.id)}>
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("Assigned", request.id)}>
                  Assign Officer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("Closed", request.id)}>
                  Close Request
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} searchKey="customerName" searchPlaceholder="Search by customer name..." />;
}

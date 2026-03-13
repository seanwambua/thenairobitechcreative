'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Mail, Building2, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { updateQuotationStatus, deleteQuotation } from '@/lib/actions/quotations';
import { Quotation, QuotationStatus } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export function QuotationsClient({ initialQuotations }: { initialQuotations: Quotation[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAction = async (id: number, action: 'status' | 'delete', value?: QuotationStatus) => {
    try {
      if (action === 'status' && value) {
        await updateQuotationStatus(id, value);
        toast({ title: 'Status Updated' });
      } else if (action === 'delete') {
        await deleteQuotation(id);
        toast({ title: 'Quotation Deleted' });
      }
      router.refresh();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Operation failed.' });
    }
  };

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case 'PENDING': return <Badge variant="secondary">Pending</Badge>;
      case 'CONTACTED': return <Badge variant="outline" className="text-blue-500 border-blue-500">Contacted</Badge>;
      case 'CLOSED': return <Badge variant="default" className="bg-green-500">Closed</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialQuotations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No inquiries yet.
              </TableCell>
            </TableRow>
          ) : (
            initialQuotations.map((q) => (
              <TableRow key={q.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{q.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> {q.company || 'Private'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{q.service || 'General Inquiry'}</span>
                </TableCell>
                <TableCell>{getStatusBadge(q.status)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(q.createdAt), 'MMM d, p')}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <a href={`mailto:${q.email}`}>
                          <Mail className="mr-2 h-4 w-4" /> Reply via Email
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleAction(q.id, 'status', 'PENDING')}>
                        <Clock className="mr-2 h-4 w-4" /> Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(q.id, 'status', 'CONTACTED')}>
                        <Mail className="mr-2 h-4 w-4" /> Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(q.id, 'status', 'CLOSED')}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Closed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleAction(q.id, 'delete')}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

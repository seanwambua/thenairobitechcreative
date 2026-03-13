import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';
import { getQuotations } from '@/lib/actions/quotations';
import { QuotationsClient } from './quotations-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function QuotationsPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  const quotations = await getQuotations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Inquiries</CardTitle>
          <CardDescription>
            Manage and track project quotations submitted via the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuotationsClient initialQuotations={quotations} />
        </CardContent>
      </Card>
    </div>
  );
}

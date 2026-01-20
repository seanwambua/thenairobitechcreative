import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DatabaseZap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { seedDatabase } from '@/lib/db/seed';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

async function reinitializeDatabase() {
  'use server';
  try {
    console.log('Re-initializing database from troubleshooting page...');
    await seedDatabase();
    console.log('Database re-initialized successfully.');
    revalidatePath('/dashboard/troubleshooting');
  } catch (error) {
    console.error('Failed to re-initialize database:', error);
    throw new Error('Database re-initialization failed.');
  }
}

type CheckResult = {
  name: string;
  status: 'ok' | 'error';
  message: string;
};

async function runDatabaseChecks(): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];

  // 1. Database Connection
  try {
    await db.$queryRaw`SELECT 1`;
    checks.push({
      name: 'Database Connection',
      status: 'ok',
      message: 'Successfully connected to the database.',
    });
  } catch (e: any) {
    checks.push({
      name: 'Database Connection',
      status: 'error',
      message: e.message || 'Failed to connect to the database.',
    });
    // If connection fails, no point in checking tables
    return checks;
  }

  // 2. Table Existence & Counts
  const tables = ['post', 'project', 'testimonial', 'settings'] as const;
  for (const table of tables) {
    try {
      const count = await db[table].count();
      checks.push({
        name: `Table: ${table}`,
        status: 'ok',
        message: `${count} records found.`,
      });
    } catch (e: any) {
      checks.push({
        name: `Table: ${table}`,
        status: 'error',
        message: `Table not found or could not be queried. Run re-initialization.`,
      });
    }
  }

  return checks;
}

export default async function TroubleshootingPage() {
  const dbChecks = await runDatabaseChecks();
  const isDbHealthy = dbChecks.every((check) => check.status === 'ok');

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting & System Health</CardTitle>
          <CardDescription>
            Comprehensive checks for database integrity, data consistency, and
            session status.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              <CardTitle>Database Status</CardTitle>
            </div>
            <CardDescription>
              Live checks on database connectivity and table integrity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dbChecks.map((check, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  {check.status === 'ok' ? (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {check.message}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    check.status === 'ok' ? 'secondary' : 'destructive'
                  }
                  className="capitalize"
                >
                  {check.status}
                </Badge>
              </div>
            ))}
            <Separator />
             <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-lg">Overall Status</p>
                <Badge variant={isDbHealthy ? 'default' : 'destructive'} className="text-base">
                  {isDbHealthy ? 'Healthy' : 'Needs Attention'}
                </Badge>
             </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <DatabaseZap className="h-5 w-5" />
                Database Actions
              </CardTitle>
              <CardDescription className="text-destructive/80">
                Manage the state of your application's database. These are
                powerful actions intended for development and testing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-destructive/20 bg-background p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <div className="flex-1">
                    <h3 className="font-semibold">Re-initialize Database</h3>
                    <p className="text-sm text-muted-foreground">
                      This will completely wipe all data from the database and
                      re-populate it with the initial seed content. All changes
                      made in the dashboard will be lost.
                    </p>
                  </div>
                  <form action={reinitializeDatabase}>
                    <Button variant="destructive">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Reset and Re-seed
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>Session & Authentication</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
                    Authentication is not yet implemented. Session and user data checks will be available here once Firebase Authentication is integrated.
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

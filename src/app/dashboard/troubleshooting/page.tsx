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
  FileText,
  Palette,
  Users,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { seedDatabase } from '@/lib/db/seed';
import { Badge } from '@/components/ui/badge';
import { iconNames } from '@/lib/schemas';

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
  status: 'ok' | 'error' | 'warning';
  message: string;
  category: 'Database' | 'Data Integrity';
};

async function runSystemChecks(): Promise<CheckResult[]> {
  const checks: CheckResult[] = [];

  // 1. Database Connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.push({
      name: 'Database Connection',
      status: 'ok',
      message: 'Successfully connected to the database.',
      category: 'Database',
    });
  } catch (e: any) {
    checks.push({
      name: 'Database Connection',
      status: 'error',
      message: e.message || 'Failed to connect to the database.',
      category: 'Database',
    });
    // If connection fails, no point in checking tables
    return checks;
  }

  // 2. Table Existence & Counts
  const tables = ['post', 'project', 'testimonial', 'settings'] as const;
  for (const table of tables) {
    try {
      const count = await prisma[table].count();
      checks.push({
        name: `Table: ${table}`,
        status: 'ok',
        message: `${count} records found.`,
        category: 'Database',
      });
    } catch (e: any) {
      checks.push({
        name: `Table: ${table}`,
        status: 'error',
        message: `Table not found. Run re-initialization.`,
        category: 'Database',
      });
      return checks; // Stop if a table is missing
    }
  }

  // 3. Data Integrity Checks
  // Posts
  const invalidPosts = await prisma.post.count({
    where: { OR: [{ title: '' }, { slug: '' }, { content: '' }] },
  });
  checks.push({
    name: 'Post Data',
    status: invalidPosts > 0 ? 'warning' : 'ok',
    message: invalidPosts > 0 ? `${invalidPosts} posts have missing titles, slugs, or content.` : 'All posts have required fields.',
    category: 'Data Integrity',
  });

  // Projects
  const allProjects = await prisma.project.findMany();
  const invalidProjects = allProjects.filter(p => !p.title || !p.description || !iconNames.includes(p.icon as any));
  checks.push({
    name: 'Project Data',
    status: invalidProjects.length > 0 ? 'warning' : 'ok',
    message: invalidProjects.length > 0 ? `${invalidProjects.length} projects have missing fields or invalid icons.` : 'All projects have required fields.',
    category: 'Data Integrity',
  });
  
  // Testimonials
  const invalidTestimonials = await prisma.testimonial.count({
      where: { OR: [{ author: '' }, { quote: '' }] }
  });
  checks.push({
      name: 'Testimonial Data',
      status: invalidTestimonials > 0 ? 'warning' : 'ok',
      message: invalidTestimonials > 0 ? `${invalidTestimonials} testimonials have missing authors or quotes.` : 'All testimonials have required fields.',
      category: 'Data Integrity',
  })

  // Settings
  const requiredSettings = ['heroImage', 'founderImage'];
  const settings = await prisma.settings.findMany({ where: { key: { in: requiredSettings } } });
  const missingSettings = requiredSettings.filter(key => !settings.some(s => s.key === key && s.value));
   checks.push({
      name: 'Core Settings',
      status: missingSettings.length > 0 ? 'warning' : 'ok',
      message: missingSettings.length > 0 ? `Missing values for: ${missingSettings.join(', ')}.` : 'All core settings are present.',
      category: 'Data Integrity',
  })


  return checks;
}

function CheckIcon({ status }: { status: CheckResult['status'] }) {
    if (status === 'ok') return <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />;
    if (status === 'warning') return <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />;
    return <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />;
}

const checkIconMap: Record<string, React.ElementType> = {
    'Database Connection': Server,
    'Table: post': FileText,
    'Table: project': Palette,
    'Table: testimonial': Users,
    'Table: settings': SettingsIcon,
    'Post Data': FileText,
    'Project Data': Palette,
    'Testimonial Data': Users,
    'Core Settings': SettingsIcon,
}

export default async function TroubleshootingPage() {
  const systemChecks = await runSystemChecks();
  const isSystemHealthy = systemChecks.every((check) => check.status === 'ok');
  const hasWarnings = systemChecks.some((check) => check.status === 'warning');
  const hasErrors = systemChecks.some((check) => check.status === 'error');
  
  const dbChecks = systemChecks.filter(c => c.category === 'Database');
  const dataChecks = systemChecks.filter(c => c.category === 'Data Integrity');
  
  let overallStatus: 'Healthy' | 'Warnings' | 'Errors' = 'Healthy';
  let overallStatusVariant: "default" | "destructive" | "secondary" = 'default';

  if (hasErrors) {
      overallStatus = 'Errors';
      overallStatusVariant = 'destructive';
  } else if (hasWarnings) {
      overallStatus = 'Warnings';
      overallStatusVariant = 'secondary';
  }

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
         <CardContent>
            <div className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4">
                <p className="font-medium text-lg">Overall System Status</p>
                <Badge variant={overallStatusVariant} className="text-base">
                  {overallStatus}
                </Badge>
             </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
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
                {dbChecks.map((check, index) => {
                  const Icon = checkIconMap[check.name] || DatabaseZap;
                  return (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <p className="text-sm text-muted-foreground">{check.message}</p>
                        </div>
                      </div>
                      <CheckIcon status={check.status} />
                    </div>
                  );
                })}
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>Data Integrity</CardTitle>
                </div>
                <CardDescription>
                Checks for data consistency and required fields across models.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {dataChecks.map((check, index) => {
                    const Icon = checkIconMap[check.name] || ShieldCheck;
                    return (
                        <div key={index} className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                            <div>
                            <p className="font-medium">{check.name}</p>
                            <p className="text-sm text-muted-foreground">{check.message}</p>
                            </div>
                        </div>
                        <CheckIcon status={check.status} />
                        </div>
                    );
                })}
            </CardContent>
            </Card>
        </div>

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Briefcase,
  NotebookText,
  Star,
  DatabaseZap,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { seedDatabase } from '@/lib/db/seed';

async function reinitializeDatabase() {
  'use server';
  try {
    console.log('Re-initializing database from dashboard...');
    await seedDatabase();
    console.log('Database re-initialized successfully.');
    revalidatePath('/dashboard/analytics');
  } catch (error) {
    console.error('Failed to re-initialize database:', error);
    // This error will be caught by Next.js and shown in the terminal
    // where the dev server is running.
    throw new Error('Database re-initialization failed.');
  }
}

export default async function AnalyticsPage() {
  const postCount = await db.post.count();
  const projectCount = await db.project.count();
  const testimonialCount = await db.testimonial.count();

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <NotebookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postCount}</div>
            <p className="text-xs text-muted-foreground">
              Published blog articles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground">
              Portfolio projects managed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Testimonials
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonialCount}</div>
            <p className="text-xs text-muted-foreground">
              Customer testimonials featured
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <DatabaseZap className="h-5 w-5" />
            Database Actions
          </CardTitle>
          <CardDescription className="text-destructive/80">
            Manage the state of your application's database. These are powerful
            actions intended for development and testing.
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
    </div>
  );
}

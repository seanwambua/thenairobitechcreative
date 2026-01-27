'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from './ui/button';

export function DbUninitializedError() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Database Not Initialized</CardTitle>
          <CardDescription>
            To use the app, the database must be initialized first.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Run Initialization Command</AlertTitle>
            <AlertDescription>
              <p className="mb-2 text-muted-foreground">
                In your project&apos;s terminal, run the following command to set up
                the database:
              </p>
              <pre className="mt-2 rounded-md bg-muted p-3 font-mono text-sm">
                <code>npm run reinitialize</code>
              </pre>
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            After the command completes, click the button below to reload the
            application.
          </p>
          <Button onClick={handleReload} className="w-full">
            Reload Application
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

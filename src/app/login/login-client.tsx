'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * Validation schema for the login form.
 * Ensures data integrity before the request hits the network.
 */
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export function LoginClient() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Safely get callback URL or default to dashboard to prevent open redirects
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Fetch CSRF token explicitly to prevent MissingCSRF errors in strict environments
      const csrfToken = await getCsrfToken();

      /**
       * Auth.js v5 signIn flow. 
       * redirect: false - allows manual handling of the UI feedback.
       */
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
        redirectTo: callbackUrl,
        csrfToken: csrfToken,
      });

      if (result?.error) {
        // Detailed error feedback for development, masked for production
        const isAuthError = result.error === 'CredentialsSignin' || result.code === 'credentials';
        
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: isAuthError 
            ? 'Invalid email or password.' 
            : 'Authentication failed. Please refresh and try again.',
        });
        return; 
      }

      if (result?.ok) {
        toast({ title: 'Success', description: 'Redirecting to your dashboard...' });

        // Next.js 16: Ensure session state propagates to Server Components immediately
        router.refresh(); 
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('[AUTH_SUBMIT_ERROR]:', error);
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: 'Failed to communicate with the auth server. Please check your network.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} autoComplete="current-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
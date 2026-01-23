'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateSettings } from '@/app/actions/settings';
import { Loader2 } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const settingsSchema = z.object({
  founderName: z.string().min(2, 'Name must be at least 2 characters.'),
  founderMessage: z
    .string()
    .min(10, 'Message must be at least 10 characters.'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsClientProps {
  initialSettings: Record<string, string | null>;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      founderName: initialSettings.founderName ?? '',
      founderMessage: initialSettings.founderMessage ?? '',
    },
  });

  async function onSubmit(values: SettingsFormValues) {
    setIsSaving(true);
    try {
      await updateSettings(values);
      toast({
        title: 'Settings Updated',
        description: 'Your changes have been saved successfully.',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings.',
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="founderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founder's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter founder's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founderMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founder's Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the founder's message"
                    className="resize-y"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

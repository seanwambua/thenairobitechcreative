import prisma from '@/lib/prisma';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContentClient } from './content-client';

export default async function ContentPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your articles and blog content.</CardDescription>
        </div>
        {/* The button to open the sheet will be in the client component */}
      </CardHeader>
      <ContentClient initialPosts={posts} />
    </Card>
  );
}

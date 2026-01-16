import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContentClient } from './content-client';
import { getPosts } from '@/app/actions/posts';

export default async function ContentPage() {
  const posts = await getPosts();

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

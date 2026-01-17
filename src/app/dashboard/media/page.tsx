import { getPosts } from '@/app/actions/posts';
import { MediaClient } from './media-client';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MediaPage() {
    try {
        const posts = await getPosts();
        return (
            <MediaClient 
                initialPosts={posts}
            />
        );
    } catch (error: any) {
        if (error.message.includes('no such table')) {
        return (
            <Card>
            <CardHeader>
                <CardTitle>Media Unavailable</CardTitle>
                <CardDescription>
                Database must be initialized to manage media.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DbUninitializedError />
            </CardContent>
            </Card>
        )
        }
        throw error;
    }
}

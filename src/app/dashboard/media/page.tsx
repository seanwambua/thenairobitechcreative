import { getPosts } from '@/app/actions/posts';
import { getSetting } from '@/app/actions/settings';
import { MediaClient } from './media-client';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';

export default async function MediaPage() {
    try {
        const posts = await getPosts();
        const [heroImage, logoUrl, founderImage] = await Promise.all([
            getSetting('heroImage'),
            getSetting('logo'),
            getSetting('founderImage'),
        ]);

        return (
            <MediaClient 
                initialPosts={posts}
                initialHeroImage={heroImage ?? placeholderImages.hero.imageUrl}
                initialLogoUrl={logoUrl}
                initialFounderImage={founderImage ?? placeholderImages.founder.imageUrl}
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

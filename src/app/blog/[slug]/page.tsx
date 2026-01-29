import { getPostBySlug } from '@/app/actions/posts';
import { getComments } from '@/app/actions/comments';
import { getLikes, hasLiked } from '@/app/actions/likes';
import { DbUninitializedError } from '@/lib/errors';
import { BlogPostClient } from './blog-post-client';
import type { Post, Comment, User } from '@/app/generated/prisma';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

/**
 * Data fetching helper with explicit error catching.
 * This prevents the server from crashing and allows us to show
 * specific UI for database configuration issues.
 */
async function getPageData(slug: string): Promise<{
  post: Post | null;
  comments: (Comment & { user: User })[];
  likes: number;
  userHasLiked: boolean;
  error: Error | null;
}> {
  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        post: null,
        comments: [],
        likes: 0,
        userHasLiked: false,
        error: null,
      };
    }

    const [comments, likes, userHasLiked] = await Promise.all([
      getComments(post.id),
      getLikes(post.id),
      hasLiked(post.id),
    ]);

    // QA Debug: If this logs 'null', your database doesn't have a post with this slug
    console.log(`[QA Blog Search] Slug: "${slug}" | Found: ${!!post}`);

    return { post, comments, likes, userHasLiked, error: null };
  } catch (error: any) {
    console.error('[QA Database Error]:', error);

    // Specifically catch missing table errors (common in SQLite/Prisma setups)
    if (error.message?.includes('no such table') || error.code === 'P2021') {
      return {
        post: null,
        comments: [],
        likes: 0,
        userHasLiked: false,
        error: new DbUninitializedError(),
      };
    }

    return {
      post: null,
      comments: [],
      likes: 0,
      userHasLiked: false,
      error: error as Error,
    };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  // 1. In Next.js 15, params MUST be awaited.
  // If not awaited, slug will be undefined, causing a 404.
  const { slug } = await params;

  // 2. Fetch data using our wrapper
  const { post, comments, likes, userHasLiked, error } = await getPageData(slug);

  // 3. Handle Database Initialization errors (DX/UX)
  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  // 4. Handle generic errors (Passes the error to the client component)
  if (error) {
    return (
      <BlogPostClient
        postData={null}
        comments={[]}
        likes={0}
        userHasLiked={false}
        error={error}
      />
    );
  }

  // 5. Handle "Not Found" (If post is null after a successful query)
  // This triggers your not-found.tsx file
  if (!post) {
    notFound();
  }

  // 6. Success State
  return (
    <BlogPostClient
      postData={post}
      comments={comments}
      likes={likes}
      userHasLiked={userHasLiked}
      error={null}
    />
  );
}

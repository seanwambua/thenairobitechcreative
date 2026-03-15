import { getLikes, hasLiked } from '@/lib/actions/likes';
import { DbUninitializedError } from '@/lib/errors';
import { BlogPostClient } from './blog-post-client';
import type { Post, User } from '@prisma/client';
import { CommentWithUser } from '@/lib/definitions'; // Import the new type
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function getPageData(slug: string): Promise<{
  post: Post | null;
  comments: CommentWithUser[];
  likes: number;
  userHasLiked: boolean;
  currentUser: User | null;
  error: Error | null;
}> {
  try {
    const session = await auth();
    
    // 1. Fetch Post first to get ID for subsequent parallel calls
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post) {
      return {
        post: null,
        comments: [],
        likes: 0,
        userHasLiked: false,
        currentUser: null,
        error: null,
      };
    }

    // 2. Parallel fetch for related data
    const [comments, likes, userHasLiked, currentUser] = await Promise.all([
      prisma.comment.findMany({
        where: { postId: post.id },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }) as Promise<CommentWithUser[]>,
      getLikes(post.id),
      hasLiked(post.id),
      session?.user?.id 
        ? prisma.user.findUnique({ where: { id: session.user.id } })
        : Promise.resolve(null)
    ]);

    return { 
      post, 
      comments, 
      likes, 
      userHasLiked, 
      currentUser,
      error: null 
    };

  } catch (error) {
    console.error('[QA Database Error]:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as any)?.code;

    // Handle uninitialized database (Infrastructure check)
    if (errorMessage.includes('no such table') || errorCode === 'P2021') {
      return {
        post: null,
        comments: [],
        likes: 0,
        userHasLiked: false,
        currentUser: null,
        error: new DbUninitializedError(),
      };
    }

    return {
      post: null,
      comments: [],
      likes: 0,
      userHasLiked: false,
      currentUser: null,
      error: error instanceof Error ? error : new Error('An unexpected error occurred.'),
    };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { post, comments, likes, userHasLiked, currentUser, error } = await getPageData(slug);

  // QA Check: Priority error handling for Infrastructure state
  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  if (error) {
    return (
      <BlogPostClient
        postData={null}
        comments={[]}
        likes={0}
        userHasLiked={false}
        currentUser={null}
        error={error}
      />
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient
      postData={post}
      comments={comments}
      likes={likes}
      userHasLiked={userHasLiked}
      currentUser={currentUser}
      error={null}
    />
  );
}

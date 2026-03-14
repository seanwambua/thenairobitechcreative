import { getPostBySlug } from '@/lib/actions/posts';
import { getComments } from '@/lib/actions/comments';
import { getLikes, hasLiked } from '@/lib/actions/likes';
import { DbUninitializedError } from '@/lib/errors';
import { BlogPostClient } from './blog-post-client';
import type { Post, Comment, User, Reaction } from '@prisma/client';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function getPageData(slug: string): Promise<{
  post: (Post & { reactions: Reaction[] }) | null;
  comments: (Comment & { user: User })[];
  likes: number;
  userHasLiked: boolean;
  currentUser: User | null;
  error: Error | null;
}> {
  try {
    const session = await auth();
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        reactions: true,
      }
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

    const [comments, likes, userHasLiked] = await Promise.all([
      getComments(post.id),
      getLikes(post.id),
      hasLiked(post.id),
    ]);

    const currentUser = session?.user?.id 
      ? await prisma.user.findUnique({ where: { id: session.user.id } })
      : null;

    return { 
      post, 
      comments, 
      likes, 
      userHasLiked, 
      currentUser,
      error: null 
    };
  } catch (error: any) {
    console.error('[QA Database Error]:', error);

    if (error.message?.includes('no such table') || error.code === 'P2021') {
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
      error: error as Error,
    };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { post, comments, likes, userHasLiked, currentUser, error } = await getPageData(slug);

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

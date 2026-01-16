'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogPostCardProps {
  post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
          <div className="relative h-56 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={post.imageHint}
            />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-xl font-semibold text-foreground">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">{post.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarImage src={post.authorAvatarUrl} alt={post.author} data-ai-hint={post.authorAvatarHint}/>
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="text-sm font-semibold">{post.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                      </p>
                  </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                  <div>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
              </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

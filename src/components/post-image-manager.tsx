'use client';

import React, { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { usePostStore, type Post } from '@/store/posts';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface PostImageManagerProps {
  post: Post;
}

export function PostImageManager({ post }: PostImageManagerProps) {
  const { updatePost } = usePostStore();
  const { toast } = useToast();
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const avatarImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File, imageType: 'cover' | 'avatar') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImageUrl = reader.result as string;
      const updatedPost = { ...post };

      if (imageType === 'cover') {
        updatedPost.imageUrl = newImageUrl;
      } else {
        updatedPost.authorAvatarUrl = newImageUrl;
      }

      updatePost(updatedPost);
      toast({
        title: 'Image Updated!',
        description: `The ${imageType === 'cover' ? 'cover image' : 'author avatar'} for "${post.title}" has been updated.`,
      });
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>, imageType: 'cover' | 'avatar') => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file, imageType);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="truncate text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {/* Cover Image Section */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Cover Image</p>
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={post.imageUrl}
              alt={`Cover image for ${post.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
          </div>
          <Input
            type="file"
            ref={coverImageInputRef}
            className="hidden"
            onChange={(e) => onFileChange(e, 'cover')}
            accept="image/png, image/jpeg, image/webp"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => coverImageInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload New Cover
          </Button>
        </div>

        {/* Avatar Image Section */}
        <div className="space-y-4">
           <p className="text-sm font-medium text-muted-foreground">Author Avatar</p>
           <div className="flex justify-center">
            <Avatar className="h-32 w-32 border-4 border-muted">
                <AvatarImage src={post.authorAvatarUrl} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
           </div>
          <Input
            type="file"
            ref={avatarImageInputRef}
            className="hidden"
            onChange={(e) => onFileChange(e, 'avatar')}
            accept="image/png, image/jpeg, image/webp"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => avatarImageInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload New Avatar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

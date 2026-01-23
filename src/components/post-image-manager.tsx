'use client';

import React, { useRef, ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X, Loader2 } from 'lucide-react';
import type { Post } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { placeholderImages } from '@/lib/placeholder-images';
import { updatePost } from '@/app/actions/posts';

interface PostImageManagerProps {
  post: Post;
  onPostUpdate: (updatedPost: Post) => void;
}

export function PostImageManager({
  post,
  onPostUpdate,
}: PostImageManagerProps) {
  const { toast } = useToast();
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const avatarImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleImageUpload = async (
    file: File,
    imageType: 'cover' | 'avatar'
  ) => {
    const uploadId = `${post.id}-${imageType}`;
    setIsUploading(uploadId);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ file: base64data }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('Upload failed');
        }

        const { secure_url } = await res.json();
        const updatedPostData = { ...post };

        if (imageType === 'cover') {
          updatedPostData.imageUrl = secure_url;
        } else {
          updatedPostData.authorAvatarUrl = secure_url;
        }

        const updatedPost = await updatePost(updatedPostData);
        onPostUpdate(updatedPost);

        toast({
          title: 'Image Updated!',
          description: `The ${imageType} image for "${post.title}" has been updated.`,
        });
      };
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was a problem uploading your image.',
      });
    } finally {
      setIsUploading(null);
    }
  };

  const onFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    imageType: 'cover' | 'avatar'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file, imageType);
    }
  };

  const handleImageReset = async (imageType: 'cover' | 'avatar') => {
    const updatedPostData = { ...post };
    let message = '';

    if (imageType === 'cover') {
      updatedPostData.imageUrl = placeholderImages.blog1.imageUrl;
      updatedPostData.imageHint = placeholderImages.blog1.imageHint;
      message = 'Cover image';
    } else {
      updatedPostData.authorAvatarUrl = placeholderImages.testimonial1.imageUrl;
      updatedPostData.authorAvatarHint =
        placeholderImages.testimonial1.imageHint;
      message = 'Author avatar';
    }

    const updatedPost = await updatePost(updatedPostData);
    onPostUpdate(updatedPost);

    toast({
      title: 'Image Reset',
      description: `${message} for "${post.title}" has been reset to default.`,
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="truncate text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {/* Cover Image Section */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Cover Image
          </p>
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => coverImageInputRef.current?.click()}
              disabled={isUploading === `${post.id}-cover`}
            >
              {isUploading === `${post.id}-cover` ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleImageReset('cover')}
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Avatar Image Section */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Author Avatar
          </p>
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => avatarImageInputRef.current?.click()}
              disabled={isUploading === `${post.id}-avatar`}
            >
              {isUploading === `${post.id}-avatar` ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleImageReset('avatar')}
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

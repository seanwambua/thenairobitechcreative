'use client';
import { useRef, ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { placeholderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { CheckCircle, Upload, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { PostImageManager } from '@/components/post-image-manager';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stamp } from '@/components/stamp';
import type { Post } from '@prisma/client';
import { useMediaStore } from '@/store/media';
import { updatePost } from '@/app/actions/posts';
import { useRouter } from 'next/navigation';

const defaultHeroImages = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

type MediaClientProps = {
    initialPosts: Post[];
}

export function MediaClient({ initialPosts }: MediaClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const { 
    heroImage, logoUrl, founderImage, 
    fetchHeroImage, fetchLogoUrl, fetchFounderImage,
    setHeroImage, setLogoUrl, setFounderImage 
  } = useMediaStore();

  const [heroImageOptions, setHeroImageOptions] = useState<ImagePlaceholder[]>(defaultHeroImages);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroImageFileInputRef = useRef<HTMLInputElement>(null);
  const founderImageFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroImage();
    fetchLogoUrl();
    fetchFounderImage();
  }, [fetchHeroImage, fetchLogoUrl, fetchFounderImage]);

  useEffect(() => {
    if (heroImage) {
        const isCustomImage = heroImage && !defaultHeroImages.some(opt => opt.imageUrl === heroImage);
        if (isCustomImage) {
            const customImagePlaceholder: ImagePlaceholder = {
                id: 'custom',
                description: 'Custom uploaded image',
                imageUrl: heroImage,
                imageHint: 'custom upload'
            };
            if (!heroImageOptions.some(opt => opt.imageUrl === heroImage)) {
                setHeroImageOptions(prev => [customImagePlaceholder, ...prev]);
            }
        }
    }
  }, [heroImage, heroImageOptions]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(currentPosts => currentPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
    router.refresh();
  };
  
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    settingKey: 'heroImage' | 'logo' | 'founderImage',
    successTitle: string,
    successDescription: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(settingKey);
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
          if (settingKey === 'heroImage') await setHeroImage(secure_url);
          if (settingKey === 'logo') await setLogoUrl(secure_url);
          if (settingKey === 'founderImage') await setFounderImage(secure_url);
          
          toast({
            title: successTitle,
            description: successDescription,
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
    }
  };

  const handleSelectImage = async (imageUrl: string) => {
    await setHeroImage(imageUrl);
    toast({
      title: 'Hero Image Updated',
      description: 'The homepage hero image has been changed.',
    });
  };
  
  const handleRemoveLogo = async () => {
    await setLogoUrl(null);
    toast({
        title: 'Logo Removed',
        description: 'The custom logo has been removed.'
    });
  };

  const handleRemoveFounderImage = async () => {
    await setFounderImage(placeholderImages.founder.imageUrl);
     toast({
        title: 'Founder Image Reset',
        description: 'The founder image has been reset to the default.',
    });
  };
  
  const handleResetHeroImage = async () => {
    const defaultHero = placeholderImages.hero.imageUrl;
    await setHeroImage(defaultHero);
    setHeroImageOptions(defaultHeroImages);
    toast({
      title: 'Hero Image Reset',
      description: 'The hero image has been reset to the default.',
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Hero Image</CardTitle>
            <CardDescription>
              Select an image for the homepage hero section or upload your own.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 pr-2 max-h-[40vh] overflow-y-auto">
              {heroImageOptions.map((image) => (
                <div
                  key={image.id}
                  className="relative cursor-pointer group"
                  onClick={() => handleSelectImage(image.imageUrl)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={400}
                    height={300}
                    className={cn(
                      'rounded-lg object-cover aspect-[4/3] transition-all',
                      heroImage === image.imageUrl
                        ? 'ring-4 ring-primary ring-offset-2'
                        : 'group-hover:opacity-80'
                    )}
                    data-ai-hint={image.imageHint}
                  />
                  {heroImage === image.imageUrl && (
                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
             <Input
                type="file"
                ref={heroImageFileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, 'heroImage', 'Hero Image Uploaded', 'The homepage hero image has been updated.')}
                accept="image/png, image/jpeg, image/webp"
              />
              <div className="flex gap-2">
                <Button onClick={() => heroImageFileInputRef.current?.click()} variant="outline" className="w-full" disabled={isUploading === 'heroImage'}>
                    {isUploading === 'heroImage' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Image
                </Button>
                <Button onClick={handleResetHeroImage} variant="destructive" className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Reset to Default
                </Button>
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logo Management</CardTitle>
            <CardDescription>
              Upload and manage your brand logo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="flex h-48 w-48 items-center justify-center rounded-full overflow-hidden border-2 border-dashed bg-muted/50 p-4">
              <Stamp logoUrl={logoUrl} />
            </div>
             <Input
                type="file"
                ref={logoFileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, 'logo', 'Logo Updated', 'Your new logo has been applied.')}
                accept="image/png, image/jpeg, image/svg+xml"
              />
              <div className="flex w-full gap-2">
                <Button onClick={() => logoFileInputRef.current?.click()} className="w-full" disabled={isUploading === 'logo'}>
                    {isUploading === 'logo' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Logo
                </Button>
                {logoUrl && (
                    <Button onClick={handleRemoveLogo} variant="destructive" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Remove Logo
                    </Button>
                )}
              </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Founder Image</CardTitle>
            <CardDescription>
              Manage the founder's photo for the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Avatar className="h-48 w-48 border-4 border-dashed bg-muted/50">
              <AvatarImage src={founderImage ?? undefined} alt="Founder" />
              <AvatarFallback>
                {placeholderImages.founder.imageHint.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
             <Input
                type="file"
                ref={founderImageFileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, 'founderImage', 'Founder Image Updated', 'Your new founder image has been set.')}
                accept="image/png, image/jpeg"
              />
              <div className="flex w-full gap-2">
                <Button onClick={() => founderImageFileInputRef.current?.click()} className="w-full" disabled={isUploading === 'founderImage'}>
                    {isUploading === 'founderImage' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Photo
                </Button>
                {founderImage && founderImage !== placeholderImages.founder.imageUrl && (
                    <Button onClick={handleRemoveFounderImage} variant="destructive" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                )}
              </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6 lg:col-span-2">
        <Card>
           <CardHeader>
            <CardTitle>Blog & Author Images</CardTitle>
            <CardDescription>
              Manage cover images and author avatars for your blog posts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostImageManager 
                      key={post.id} 
                      post={post}
                      onPostUpdate={handlePostUpdate}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Loading posts...</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

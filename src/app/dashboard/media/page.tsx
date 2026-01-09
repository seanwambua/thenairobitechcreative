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
import { CheckCircle, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { useMediaStore } from '@/store/media';
import { usePostStore } from '@/store/posts';
import { PostImageManager } from '@/components/post-image-manager';

const defaultHeroImages = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

export default function MediaPage() {
  const { heroImage, setHeroImage, logo, setLogo } = useMediaStore();
  const { posts } = usePostStore();
  const [heroImageOptions, setHeroImageOptions] = useState<ImagePlaceholder[]>(defaultHeroImages);

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroImageFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const isCustomImage = !defaultHeroImages.some(opt => opt.imageUrl === heroImage);
    if (isCustomImage && heroImage) {
        const customImagePlaceholder: ImagePlaceholder = {
            id: 'custom',
            description: 'Custom uploaded image',
            imageUrl: heroImage,
            imageHint: 'custom upload'
        };
        if (!heroImageOptions.some(opt => opt.imageUrl === heroImage)) {
            setHeroImageOptions([customImagePlaceholder, ...heroImageOptions]);
        }
    }
  }, [heroImage, heroImageOptions]);


  const handleSelectImage = (imageUrl: string) => {
    setHeroImage(imageUrl);
    toast({
      title: 'Hero Image Updated',
      description: 'The homepage hero image has been changed.',
    });
  };

  const handleLogoUploadClick = () => {
    logoFileInputRef.current?.click();
  };
  
  const handleRemoveLogo = () => {
    setLogo(null);
    toast({
        title: 'Logo Removed',
        description: 'The custom logo has been removed.'
    });
  };

  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogoUrl = reader.result as string;
        setLogo(newLogoUrl);
        toast({
          title: 'Logo Updated',
          description: 'Your new logo has been applied across the site.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUploadClick = () => {
    heroImageFileInputRef.current?.click();
  };
  
  const handleResetHeroImage = () => {
    const defaultHero = placeholderImages.hero.imageUrl;
    setHeroImage(defaultHero);
    // Remove custom image from options if it exists
    setHeroImageOptions(defaultHeroImages);
    toast({
      title: 'Hero Image Reset',
      description: 'The hero image has been reset to the default.',
    });
  };

  const handleHeroImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newHeroImageUrl = reader.result as string;
        setHeroImage(newHeroImageUrl);
        toast({
          title: 'Hero Image Uploaded',
          description: 'The homepage hero image has been updated with your uploaded image.',
        });
      };
      reader.readAsDataURL(file);
    }
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
                onChange={handleHeroImageFileChange}
                accept="image/png, image/jpeg, image/webp"
              />
              <div className="flex gap-2">
                <Button onClick={handleHeroImageUploadClick} variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
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
              <Logo />
            </div>
             <Input
                type="file"
                ref={logoFileInputRef}
                className="hidden"
                onChange={handleLogoFileChange}
                accept="image/png, image/jpeg, image/svg+xml"
              />
              <div className="flex w-full gap-2">
                <Button onClick={handleLogoUploadClick} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                </Button>
                {logo && (
                    <Button onClick={handleRemoveLogo} variant="destructive" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Remove Logo
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
            {posts.map((post) => (
              <PostImageManager key={post.id} post={post} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

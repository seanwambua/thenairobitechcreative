
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
import { useMediaStore } from '@/store/media';
import { usePostStore } from '@/store/posts';
import { PostImageManager } from '@/components/post-image-manager';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stamp } from '@/components/stamp';

const defaultHeroImages = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

export default function MediaPage() {
  const { 
    heroImage, setHeroImage, 
    logo, setLogo,
    founderImage, setFounderImage
  } = useMediaStore();
  const { posts } = usePostStore();
  const [heroImageOptions, setHeroImageOptions] = useState<ImagePlaceholder[]>(defaultHeroImages);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroImageFileInputRef = useRef<HTMLInputElement>(null);
  const founderImageFileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    uploadType: string,
    successTitle: string,
    successDescription: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(uploadType);
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
          setter(secure_url);
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

  const handleFounderImageUploadClick = () => {
    founderImageFileInputRef.current?.click();
  };

  const handleRemoveFounderImage = () => {
    setFounderImage(placeholderImages.founder.imageUrl);
     toast({
        title: 'Founder Image Reset',
        description: 'The founder image has been reset to the default.',
    });
  };
  
  const handleHeroImageUploadClick = () => {
    heroImageFileInputRef.current?.click();
  };
  
  const handleResetHeroImage = () => {
    const defaultHero = placeholderImages.hero.imageUrl;
    setHeroImage(defaultHero);
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
                onChange={(e) => handleFileChange(e, setHeroImage, 'hero', 'Hero Image Uploaded', 'The homepage hero image has been updated.')}
                accept="image/png, image/jpeg, image/webp"
              />
              <div className="flex gap-2">
                <Button onClick={handleHeroImageUploadClick} variant="outline" className="w-full" disabled={isUploading === 'hero'}>
                    {isUploading === 'hero' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
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
              <Stamp />
            </div>
             <Input
                type="file"
                ref={logoFileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, setLogo as (url: string) => void, 'logo', 'Logo Updated', 'Your new logo has been applied.')}
                accept="image/png, image/jpeg, image/svg+xml"
              />
              <div className="flex w-full gap-2">
                <Button onClick={handleLogoUploadClick} className="w-full" disabled={isUploading === 'logo'}>
                    {isUploading === 'logo' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
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
         <Card>
          <CardHeader>
            <CardTitle>Founder Image</CardTitle>
            <CardDescription>
              Manage the founder's photo for the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Avatar className="h-48 w-48 border-4 border-dashed bg-muted/50">
              <AvatarImage src={founderImage} alt="Founder" />
              <AvatarFallback>
                {placeholderImages.founder.imageHint.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
             <Input
                type="file"
                ref={founderImageFileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, setFounderImage, 'founder', 'Founder Image Updated', 'Your new founder image has been set.')}
                accept="image/png, image/jpeg"
              />
              <div className="flex w-full gap-2">
                <Button onClick={handleFounderImageUploadClick} className="w-full" disabled={isUploading === 'founder'}>
                    {isUploading === 'founder' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Photo
                </Button>
                <Button onClick={handleRemoveFounderImage} variant="destructive" className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Reset
                </Button>
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

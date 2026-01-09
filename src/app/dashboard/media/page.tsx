
'use client';
import { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import { CheckCircle, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { useMediaStore } from '@/store/media';

const heroImageOptions = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

export default function MediaPage() {
  const { heroImage, setHeroImage, logo, setLogo } = useMediaStore();
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroImageFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Image</CardTitle>
            <CardDescription>
              Select an image for the homepage hero section or upload your own. Changes are reflected live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
              <Button onClick={handleHeroImageUploadClick} variant="outline" className="mt-4 w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Logo Management</CardTitle>
            <CardDescription>
              Upload and manage your brand logo. The change will be reflected live.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-4">
              <Logo />
            </div>
             <Input
                type="file"
                ref={logoFileInputRef}
                className="hidden"
                onChange={handleLogoFileChange}
                accept="image/png, image/jpeg, image/svg+xml"
              />
              <Button onClick={handleLogoUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload New Logo
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

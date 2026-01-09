
'use client';
import { useState, useRef, ChangeEvent } from 'react';
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

const heroImageOptions = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

export default function MediaPage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(placeholderImages.hero.imageUrl);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSelectImage = (imageUrl: string) => {
    setCurrentHeroImage(imageUrl);
    toast({
      title: 'Hero Image Updated',
      description: 'The homepage hero image has been changed.',
    });
  };

  const handleLogoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        toast({
          title: 'Logo Preview Updated',
          description: 'Your new logo is ready to be saved.',
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
              Select the main image for the homepage hero section.
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
                      currentHeroImage === image.imageUrl
                        ? 'ring-4 ring-primary ring-offset-2'
                        : 'group-hover:opacity-80'
                    )}
                    data-ai-hint={image.imageHint}
                  />
                  {currentHeroImage === image.imageUrl && (
                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: This is a demonstration. Image selection here does not currently update the live homepage.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Logo Management</CardTitle>
            <CardDescription>
              Upload and manage your brand logo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-4">
              {logoPreview ? (
                <Image src={logoPreview} alt="New Logo Preview" width={180} height={180} className="object-contain" />
              ) : (
                <Logo />
              )}
            </div>
             <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/svg+xml"
              />
              <Button onClick={handleLogoUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload New Logo
              </Button>
            <p className="text-center text-sm text-muted-foreground">
              Note: This is a demonstration. Uploading a logo here does not currently update the live site.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


'use client';
import { useState } from 'react';
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
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const heroImageOptions = [
  placeholderImages.hero,
  placeholderImages.design,
  placeholderImages.finance,
  placeholderImages.enterpriseB,
];

export default function MediaPage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(placeholderImages.hero.imageUrl);
  const { toast } = useToast();

  const handleSelectImage = (imageUrl: string) => {
    setCurrentHeroImage(imageUrl);
    toast({
      title: 'Hero Image Updated',
      description: 'The homepage hero image has been changed.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Image</CardTitle>
          <CardDescription>
            Select the main image for the homepage hero section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
  );
}

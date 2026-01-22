'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';
import { updateSetting } from '@/app/actions/settings';
import { ImageIcon, UserCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type InitialSettings = {
    heroImage: string | null;
    logo: string | null;
    founderImage: string | null;
}

export function MediaClient({ initialSettings }: { initialSettings: InitialSettings }) {
  const { toast } = useToast();
  const router = useRouter();
  const [heroImage, setHeroImage] = useState<string | null>(initialSettings.heroImage);
  const [logo, setLogo] = useState<string | null>(initialSettings.logo);
  const [founderImage, setFounderImage] = useState<string | null>(initialSettings.founderImage);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  useEffect(() => {
    setHeroImage(initialSettings.heroImage);
    setLogo(initialSettings.logo);
    setFounderImage(initialSettings.founderImage);
  }, [initialSettings]);

  const handleUpload = async (result: any, type: 'heroImage' | 'logo' | 'founderImage') => {
    const uploadId = `${type}`;
    setIsUploading(uploadId);
    const secureUrl = result.info.secure_url;
    try {
        await updateSetting(type, secureUrl);
        const typeToLabel = {
            heroImage: 'Hero Image',
            logo: 'Logo',
            founderImage: 'Founder Image'
        };
        toast({
            title: 'Upload Successful',
            description: `The ${typeToLabel[type]} has been updated.`
        });
        router.refresh();
    } catch (error) {
        console.error('Failed to update setting:', error);
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: 'There was a problem saving the image URL to the database.'
        });
    } finally {
        setIsUploading(null);
    }
  };

  const handleReset = async (type: 'heroImage' | 'logo' | 'founderImage') => {
    try {
        await updateSetting(type, null);
        const typeToLabel = {
            heroImage: 'Hero Image',
            logo: 'Logo',
            founderImage: 'Founder Image'
        };
        toast({
            title: 'Image Reset',
            description: `The ${typeToLabel[type]} has been reset.`
        });
        router.refresh();
    } catch (error) {
        console.error('Failed to reset setting:', error);
        toast({
            variant: 'destructive',
            title: 'Reset Failed',
            description: 'There was a problem resetting the image.'
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Media Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hero Image</h2>
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center relative">
            {isUploading === 'heroImage' ? <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" /> : heroImage ? (
              <Image src={heroImage} alt="Hero Image" fill className="object-cover rounded-lg" />
            ) : (
              <ImageIcon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'heroImage')}
              onUpload={() => setIsUploading('heroImage')}
              onError={() => setIsUploading(null)}
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
              disabled={isUploading !== null}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('heroImage')} variant="destructive" disabled={isUploading !== null}>Reset</Button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Logo</h2>
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center relative">
            {isUploading === 'logo' ? <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" /> : logo ? (
              <Image src={logo} alt="Logo" fill className="object-contain p-4 rounded-lg" />
            ) : (
              <ImageIcon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'logo')}
              onUpload={() => setIsUploading('logo')}
              onError={() => setIsUploading(null)}
               className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
               disabled={isUploading !== null}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('logo')} variant="destructive" disabled={isUploading !== null}>Reset</Button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Founder Image</h2>
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center relative">
            {isUploading === 'founderImage' ? <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" /> : founderImage ? (
              <Image src={founderImage} alt="Founder Image" fill className="object-cover rounded-lg" />
            ) : (
              <UserCircle className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'founderImage')}
              onUpload={() => setIsUploading('founderImage')}
              onError={() => setIsUploading(null)}
               className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
               disabled={isUploading !== null}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('founderImage')} variant="destructive" disabled={isUploading !== null}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

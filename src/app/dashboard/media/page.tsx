'use client';
import { useState, useEffect } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { getSettings, updateSetting } from '@/app/actions/settings';
import { ImageIcon, Image, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MediaPage() {
  const { toast } = useToast();
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [founderImage, setFounderImage] = useState<string | null>(null);

  useEffect(() => {
    getSettings(['heroImage', 'logo', 'founderImage']).then(settings => {
      setHeroImage(settings.heroImage);
      setLogo(settings.logo);
      setFounderImage(settings.founderImage);
    });
  }, []);

  const handleUpload = async (result: any, type: 'heroImage' | 'logo' | 'founderImage') => {
    const secureUrl = result.info.secure_url;
    try {
        await updateSetting(type, secureUrl);
        if (type === 'heroImage') setHeroImage(secureUrl);
        if (type === 'logo') setLogo(secureUrl);
        if (type === 'founderImage') setFounderImage(secureUrl);
        toast({
            title: 'Upload Successful',
            description: `The ${type} has been updated.`
        });
    } catch (error) {
        console.error('Failed to update setting:', error);
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: 'There was a problem saving the image URL to the database.'
        });
    }
  };

  const handleReset = async (type: 'heroImage' | 'logo' | 'founderImage') => {
    try {
        await updateSetting(type, null);
        if (type === 'heroImage') setHeroImage(null);
        if (type === 'logo') setLogo(null);
        if (type === 'founderImage') setFounderImage(null);
        toast({
            title: 'Image Reset',
            description: `The ${type} has been reset.`
        });
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
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center">
            {heroImage ? (
              <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <ImageIcon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'heroImage')}
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('heroImage')} variant="destructive">Reset</Button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Logo</h2>
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-contain p-4 rounded-lg" />
            ) : (
              <ImageIcon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'logo')}
               className={cn(buttonVariants({ variant: 'default' }))}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('logo')} variant="destructive">Reset</Button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Founder Image</h2>
          <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center">
            {founderImage ? (
              <img src={founderImage} alt="Founder Image" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <UserCircle className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <div className="flex space-x-4">
            <CldUploadButton
              uploadPreset="nairobi_techcreative"
              onSuccess={(result) => handleUpload(result, 'founderImage')}
               className={cn(buttonVariants({ variant: 'default' }))}
            >
              Update
            </CldUploadButton>
            <Button onClick={() => handleReset('founderImage')} variant="destructive">Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

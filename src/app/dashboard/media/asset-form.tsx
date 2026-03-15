'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CldUploadButton } from 'next-cloudinary';
import { Loader2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Asset } from '@prisma/client';

const assetFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  alt: z.string().optional(),
});

type AssetFormData = z.infer<typeof assetFormSchema>;

interface AssetFormProps {
  asset: Asset | null;
  onAssetCreated: (newAsset: Asset) => void;
  onAssetUpdated: (updatedAsset: Asset) => void;
}

export function AssetForm({ asset, onAssetCreated, onAssetUpdated }: AssetFormProps) {
  const [imageUrl, setImageUrl] = useState(asset?.url || null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: asset?.name || '',
      alt: asset?.alt || '',
    },
  });

  const handleUpload = (result: any) => {
    const secureUrl = result.info.secure_url;
    setImageUrl(secureUrl);
    setIsUploading(false);
    toast({ title: 'Image uploaded', description: 'The image has been successfully uploaded.' });
  };

  const onSubmit: SubmitHandler<AssetFormData> = async (data) => {
    if (!imageUrl) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please upload an image.' });
      return;
    }

    const method = asset ? 'PUT' : 'POST';
    const url = asset ? `/api/assets/${asset.id}` : '/api/assets';
    const body = JSON.stringify({ ...data, url: imageUrl });

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!response.ok) throw new Error(asset ? 'Failed to update asset' : 'Failed to create asset');

      const result = await response.json();

      if (asset) {
        onAssetUpdated(result);
      } else {
        onAssetCreated(result);
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="alt" className="block text-sm font-medium text-gray-700">Alt Text</label>
        <Input id="alt" {...register('alt')} />
        {errors.alt && <p className="text-xs text-red-500">{errors.alt.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {isUploading ? (
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-gray-400" />
            ) : imageUrl ? (
              <Image src={imageUrl} alt="Uploaded image" width={200} height={200} className="mx-auto" />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <CldUploadButton
                options={{ sources: ['local', 'url', 'unsplash'], styles: { zIndex: 99999 } }}
                uploadPreset="nairobi_techcreative"
                onSuccess={handleUpload}
                onUpload={() => setIsUploading(true)}
                onError={() => setIsUploading(false)}
                className={cn(buttonVariants({ variant: 'ghost' }), 'relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500')}
              >
                <span>{isUploading ? 'Uploading...' : 'Upload a file'}</span>
              </CldUploadButton>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting || isUploading} className="w-full">
        {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {asset ? 'Update Asset' : 'Create Asset'}
      </Button>
    </form>
  );
}

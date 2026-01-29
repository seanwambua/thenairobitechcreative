'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface ImageUploadProps {
  preview: string | null;
  onUploadSuccess: (result: any) => void;
  uploadPreset: string;
  uploadType: string;
  className?: string;
  aspectRatio?: string;
  imageClassName?: string;
}

export function ImageUpload({
  preview,
  onUploadSuccess,
  uploadPreset,
  uploadType,
  className = '',
  aspectRatio = 'aspect-video',
  imageClassName = 'object-cover',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploading(true);
  };

  const handleError = (error: any) => {
    setIsUploading(false);
    toast({
      variant: 'destructive',
      title: 'Upload Failed',
      description: error.message || 'Could not upload image.',
    });
  };

  const handleSuccess = (result: any) => {
    onUploadSuccess(result);
    setIsUploading(false);
    toast({
      title: 'Image Uploaded',
      description: `The ${uploadType} image has been updated.`,
    });
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-md',
          aspectRatio
        )}
      >
        {preview && (
          <Image
            src={preview}
            alt={`${uploadType} preview`}
            fill
            className={imageClassName}
          />
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>
      <CldUploadButton
        onSuccess={(result) => {
          setIsUploading(false); // Reset state on success
          handleSuccess(result);
        }}
        onUploadAdded={() => setIsUploading(true)}
        onError={(error) => {
          setIsUploading(false);
          handleError(error);
        }}
        uploadPreset={uploadPreset}
        options={{
          sources: ['local', 'url', 'unsplash'],
          multiple: false,
        }}
        // We use 'pointer-events-none' to simulate 'disabled' behavior
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'flex w-full items-center justify-center gap-2',
          (isUploading || !uploadPreset) &&
            'pointer-events-none cursor-not-allowed opacity-50'
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            <span>Upload Image</span>
          </>
        )}
      </CldUploadButton>
    </div>
  );
}

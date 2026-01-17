'use client';
import Image from 'next/image';

export function Logo({ logoUrl }: { logoUrl: string | null }) {
  if (logoUrl) {
    return <Image src={logoUrl} alt="Brand Logo" width={180} height={180} className="object-contain" />;
  }

  return null;
}

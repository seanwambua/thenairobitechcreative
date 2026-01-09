'use client';
import { useMediaStore } from '@/store/media';
import Image from 'next/image';

export function Logo() {
  const { logo } = useMediaStore();

  if (logo) {
    return <Image src={logo} alt="Brand Logo" width={180} height={180} className="object-contain" />;
  }

  return null;
}

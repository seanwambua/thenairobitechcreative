import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { file, signature, timestamp } = await request.json();

  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const { secure_url } = await cloudinary.uploader.upload(file, {
    timestamp: timestamp,
    signature: signature,
    api_key: process.env.CLOUDINARY_API_KEY as string,
  });

  return NextResponse.json({ secure_url });
}

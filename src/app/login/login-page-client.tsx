'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LoginClient = dynamic(() => import('@/app/login/login-client').then(mod => mod.LoginClient), { ssr: false });

export default function LoginPageClient() {
  return <LoginClient />;
}

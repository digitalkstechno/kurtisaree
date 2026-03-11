'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/saree');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Entering Catalog...</p>
      </div>
    </div>
  );
}

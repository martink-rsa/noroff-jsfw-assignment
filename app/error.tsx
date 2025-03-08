'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-playfair mb-6">Something went wrong</h1>
      <p className="text-gray-600 mb-8 font-montserrat">We encountered an error while loading this page.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

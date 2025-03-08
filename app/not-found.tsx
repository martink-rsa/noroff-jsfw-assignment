import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-playfair mb-6">Page Not Found</h1>
      <p className="text-gray-600 mb-8 font-montserrat">
        The page you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}

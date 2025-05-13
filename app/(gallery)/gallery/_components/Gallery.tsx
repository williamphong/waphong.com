import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
export default function Gallery() {
  return (
    <div className="flex">
      <Card>
        <CardHeader>
          <Image
            src="/placeholder.svg"
            alt="Image 1"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            width="300"
            height="300"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold">Image 1</h2>
          <p className="text-gray-600">Image 1 description</p>
          <div className="mt-2 flex items-center space-x-2">
            <Link
              href="#"
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              View more
            </Link>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Image
            src="/placeholder.svg"
            alt="Image 2"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            width="300"
            height="300"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold">Image 2</h2>
          <p className="text-gray-600">Image 2 description</p>
          <div className="mt-2 flex items-center space-x-2">
            <Link
              href="#"
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              View more
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

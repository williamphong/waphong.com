'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

import EditorClient from '../_components/Editor/EditorClient';

const WritePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isPending && !session) {
      router.push('/ether');
    }
  }, [session, isPending, router]);

  if (!isClient || isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main>
      <button onClick={() => setDisable(!disable)}>
        {disable ? 'Editable' : 'Readonly'}
      </button>
      <div className="m-10">
        <EditorClient />
      </div>
    </main>
  );
};

export default WritePage;

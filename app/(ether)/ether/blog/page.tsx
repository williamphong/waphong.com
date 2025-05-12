'use client';
import React, { useEffect, useState } from 'react';
import CardList from '@/app/(ether)/ether/_components/cardList/CardList';
import Menu from '@/app/(ether)/ether/_components/menu/Menu';

interface BlogPageProps {
  searchParams: Promise<{
    page: string | null;
    cat: string | null;
  }>;
}

const BlogPage: React.FC<BlogPageProps> = ({ searchParams }) => {
  const [params, setParams] = useState<{
    page: string | null;
    cat: string | null;
  } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await searchParams;
      setParams(resolvedParams);
    };

    resolveParams();
  }, [searchParams]);

  if (!params) {
    return <div>Loading...</div>; // Show a loading state while resolving the promise
  }

  const page = parseInt(params.page || '1'); // Default to 1 if no page is provided
  const cat = params.cat ?? undefined; // Replace null with undefined

  return (
    <div className="">
      <h1 className="">{cat} Blog</h1>
      <div className="">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;

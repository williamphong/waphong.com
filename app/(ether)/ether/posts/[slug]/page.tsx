import React from 'react';
import Image from 'next/image';
import Menu from '../../_components/menu/Menu';

const getData = async (slug: any) => {
  const res = await fetch(`http://localhost:3000/api/ether/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

type Params = Promise<{ slug: string }>;

export default async function SinglePage(props: { params: Params }) {
  const params = await props.params;
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-12">
        <div className="flex-1">
          <h1 className="mb-12 text-6xl sm:text-2xl md:text-5xl lg:text-4xl">
            {data?.title}
          </h1>
          <div className="flex items-center gap-5">
            {data?.user?.image && (
              <div className="relative h-12 w-12">
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="text-softTextColor flex flex-col gap-1">
              <span className="text-lg font-medium">{data?.user.name}</span>
              <span className="text-gray-500">01.01.2024</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className="relative h-80 flex-1">
            <Image src={data.img} alt="" fill className="object-cover" />
          </div>
        )}
      </div>
      <div className="flex gap-12">
        <div className="mt-16 flex-5">
          <div
            className="mb-5 text-lg font-light"
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          {/* 
          <div className="comment">
            <Comments postSlug={slug} />
          </div>
          */}
        </div>
        <Menu />
      </div>
    </div>
  );
}

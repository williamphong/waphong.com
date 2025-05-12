import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ item }: any) => {
  return (
    <div className="mb-12 flex items-center gap-12">
      {item.img && (
        <div className="relative h-64 flex-1">
          <Image src={item.img} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            {item.createdAt.substring(0, 10)} -{' '}
          </span>
          <span className="text-crimson font-medium">{item.catSlug}</span>
        </div>
        <Link href={`/ether/posts/${item.slug}`}>
          <h1 className="text-2xl font-bold">{item.title}</h1>
        </Link>
        <div
          className="text-softTextColor text-base font-light"
          dangerouslySetInnerHTML={{
            __html: item?.desc.substring(0, 60),
          }}
        />
        <Link
          href={`/ether/posts/${item.slug}`}
          className="border-crimson border-b pb-1"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

// PropTypes validation
Card.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    catSlug: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;

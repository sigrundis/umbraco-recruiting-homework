import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generateDateString } from '../../lib/helpers';
import styles from './BlogPost.module.scss';

const {
  container,
  info,
  imageWrapper,
  image,
  heading,
  date,
  textWrapper,
} = styles;

const BlogPost = ({ blogPost }) => {
  const {
    url,
    name,
    updatedAt,
    author,
    rte,
    thumbnail: { _url: src },
  } = blogPost;

  const updatedAtString = generateDateString(new Date(updatedAt));

  const maxLength = 100;
  const preview = rte.substring(0, maxLength).replace('<p>', '') + '...';

  return (
    <div className={container}>
      <div className={imageWrapper}>
        <Image className={image} src={src} layout="fill" />
      </div>
      <div className={info}>
        <div className={date}>
          {updatedAtString} | {`By ${author}`}
        </div>
        <h3 className={heading}>{name}</h3>
        <div className={textWrapper}>{preview}</div>
        <Link href={url}>Read more</Link>
      </div>
    </div>
  );
};

export default BlogPost;

import React, { useEffect, useRef } from 'react';
import useIsInViewport from 'use-is-in-viewport';
import gsap from 'gsap';
import { isBrowser } from '../../lib/helpers';
import BlogPost from '../BlogPost';
import styles from './BlogPosts.module.scss';

const { container, blogContainer } = styles;

const BlogPosts = ({ blogContent }) => {
  const targetRef = useRef();
  const [isInViewport, wrappedTargetRef] = useIsInViewport({
    target: targetRef,
    threshold: 30,
  });
  const blogPosts = targetRef?.current?.childNodes;

  useEffect(() => {
    if (blogPosts) {
      gsap.set(blogPosts, { opacity: 0, y: 200 });
    }
  }, [blogPosts]);

  useEffect(() => {
    console.log('isInViewport', isInViewport);
    console.log('isBrowser,', isBrowser);
    if (isInViewport && isBrowser) {
      const timeline = gsap.timeline();
      timeline.to(blogPosts, { stagger: 0.4, duration: 0.6, opacity: 1, y: 0 });
    }
  }, [isInViewport]);

  return (
    <div ref={wrappedTargetRef} className={container}>
      {blogContent &&
        blogContent.map((blogPost, idx) => (
          <BlogPost key={`blogPostKey-${idx}`} blogPost={blogPost} />
        ))}
    </div>
  );
};

export default BlogPosts;

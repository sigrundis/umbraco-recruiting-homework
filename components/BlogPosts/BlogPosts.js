import React from 'react';
import BlogPost from '../BlogPost';
import styles from './BlogPosts.module.scss';

const { container, heading, blogContainer } = styles;

const BlogPosts = ({ blogContent }) => {
  return (
    <div className={container}>
      <div className={blogContainer}>
        {blogContent &&
          blogContent.map((blogPost, idx) => (
            <BlogPost key={`blogPostKey-${idx}`} blogPost={blogPost} />
          ))}
      </div>
    </div>
  );
};

export default BlogPosts;

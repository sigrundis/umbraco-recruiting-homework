import React from 'react';
import styles from './BlogLayout.module.scss';

const { container, inner } = styles;

const BlogLayout = ({ children }) => (
  <div className={container}>
    <div className={inner}>{children}</div>
  </div>
);

export default BlogLayout;

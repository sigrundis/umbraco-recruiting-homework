import React from 'react';
import styles from './Section.module.scss';

const { container, heading, inner } = styles;

const Section = ({ title, children }) => (
  <div className={container}>
    <h2 className={heading}>{title}</h2>
    <div className={inner}>{children}</div>
  </div>
);

export default Section;

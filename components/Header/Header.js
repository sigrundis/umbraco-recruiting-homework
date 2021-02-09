import React from 'react';
import classNames from 'classnames';
import Globe from '../../assets/svg/globe.svg';
import styles from './Header.module.scss';

const { container, blogContainer, inner, heading, globe } = styles;

const Header = ({ title, blogPost }) => (
  <div className={classNames(container, { [blogContainer]: blogPost })}>
    {!blogPost && <Globe className={globe} />}
    <div className={inner}>
      <h1 className={heading}>{title}</h1>
    </div>
  </div>
);

export default Header;

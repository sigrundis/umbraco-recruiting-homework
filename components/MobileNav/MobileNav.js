import React, { useState } from 'react';
import classNames from 'classnames';
import ExpandWithAnimation from '../ExpandWithAnimation';
import styles from './MobileNav.module.scss';
const { whiteHamburger, wrapper, open, top, middle, bottom } = styles;

const MobileNav = ({ isOpen, onClick, children, white }) => {
  const onToggle = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div
        role="button"
        onClick={onToggle}
        className={classNames(wrapper, {
          [open]: isOpen,
          [whiteHamburger]: white,
        })}
      >
        <span className={top}></span>
        <span className={middle}></span>
        <span className={bottom}></span>
      </div>
      <ExpandWithAnimation isCollapsed={!isOpen}>
        <div>{children}</div>
      </ExpandWithAnimation>
    </>
  );
};

export default MobileNav;

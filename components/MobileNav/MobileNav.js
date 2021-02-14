import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './MobileNav.module.scss';
const { whiteHamburger, wrapper, content, open, top, middle, bottom } = styles;

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
        aria-label="Open Mobile Navigation"
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

      {isOpen && <>{children}</>}
    </>
  );
};

export default MobileNav;

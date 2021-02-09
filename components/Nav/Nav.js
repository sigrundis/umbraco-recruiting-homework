import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { isBrowser } from '../../lib/helpers';
import WhiteLogo from '../../assets/svg/umbraco_logo_white.svg';
import MobileNav from '../MobileNav';
import styles from './Nav.module.scss';
const {
  nav: navStyle,
  scrolledNav,
  logo: logoStyle,
  logoWrapper,
  hideLogoWrapper,
  navMobileOpen,
  ul,
  mobileUl,
  li,
  selectedLi,
} = styles;

const Nav = ({ nav, logo, selected }) => {
  const { _url: src } = logo;
  const [hasScrolled, setHasScrolled] = useState(false);
  const [noneSelected, setNoneSelected] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (isBrowser) {
      const currentScrollPos = window.pageYOffset;

      setHasScrolled(currentScrollPos > 60);
    }
  };

  return (
    <nav
      className={classNames(navStyle, {
        [scrolledNav]: hasScrolled,
        [navMobileOpen]: isMobileNavOpen,
      })}
    >
      <a
        className={classNames(logoWrapper, {
          [hideLogoWrapper]: isMobileNavOpen,
        })}
        href="/"
      >
        {hasScrolled ? (
          <Image src={src} height={16} width={90} />
        ) : (
          <WhiteLogo className={logoStyle} />
        )}
      </a>
      <MobileNav
        white={!hasScrolled}
        isOpen={isMobileNavOpen}
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      >
        <ul id="mobile-nav-list" className={mobileUl}>
          {nav.map((item, idx) => {
            const { link, title } = item;
            const url = Array.isArray(link) ? link[0]?.url : '#';
            return (
              <Link key={`mobile-item-${idx}`} href={url}>
                <li
                  role="button"
                  className={classNames(li, {
                    [selectedLi]: !noneSelected && title === selected,
                  })}
                >
                  {title}
                </li>
              </Link>
            );
          })}
        </ul>
      </MobileNav>

      <ul id="desktop-nav-list" className={ul}>
        {nav.map((item, idx) => {
          const { link, title } = item;
          const url = Array.isArray(link) ? link[0]?.url : '#';

          return (
            <Link key={`desktop-item-${idx}`} href={url}>
              <li
                role="button"
                className={classNames(li, {
                  [selectedLi]: !noneSelected && title === selected,
                })}
                onMouseEnter={() => setNoneSelected(true)}
                onMouseLeave={() => setNoneSelected(false)}
              >
                {title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;

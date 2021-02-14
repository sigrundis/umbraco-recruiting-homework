import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
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

  useEffect(() => {
    const timeline = gsap.timeline();

    if (isMobileNavOpen && isBrowser) {
      const liElements = document.querySelectorAll('ul#mobile-nav-list li');
      gsap.set(liElements, {
        opacity: 0,
        y: 100,
      });
      timeline.to(liElements, {
        y: 0,
        opacity: 1,
        delay: 0.2,
        stagger: 0.4,
        duration: 0.6,
      });
    }
  }, [isMobileNavOpen]);

  /**
   * When start scrolling down the page we update the hasScrolled state.
   * Used for changing the styling of the navigation bar.
   */
  const handleScroll = () => {
    if (isBrowser) {
      const currentScrollPos = window.pageYOffset;

      setHasScrolled(currentScrollPos > 60);
    }
  };

  const renderNavList = (isMobile = true) => {
    return nav.map((item, idx) => {
      const { link, title } = item;
      const url = Array.isArray(link) ? link[0]?.url : '#';
      const extraLiProps = {
        onMouseEnter: () => setNoneSelected(true),
        onMouseLeave: () => setNoneSelected(false),
      };

      return (
        <Link key={`${isMobile ? 'mobile' : 'desktop'}-item-${idx}`} href={url}>
          <li
            role="button"
            className={classNames(li, {
              [selectedLi]: !noneSelected && title === selected,
            })}
            {...extraLiProps}
          >
            {title}
          </li>
        </Link>
      );
    });
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
          {renderNavList()}
        </ul>
      </MobileNav>

      <ul id="desktop-nav-list" className={ul}>
        {renderNavList(false)}
      </ul>
    </nav>
  );
};

export default Nav;

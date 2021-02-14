import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { isBrowser } from '../../lib/helpers';
import Globe from '../../assets/svg/globe.svg';
import styles from './Header.module.scss';

const { container, blogContainer, inner, heading, globe } = styles;

const Header = ({ title, blogPost }) => {
  const [svgLoaded, setSvgLoaded] = useState();
  const svgRef = useRef();

  useEffect(() => {
    if (!blogPost) {
      svgRef?.current?.addEventListener('load', () => setSvgLoaded(true));

      return () =>
        svgRef?.current?.removeEventListener('scroll', () => () =>
          setSvgLoaded(false)
        );
    }
  }, []);

  useEffect(() => {
    if ((svgLoaded || blogPost) && isBrowser) {
      const START = 'beginAnimate';
      const timeline = gsap.timeline();
      timeline
        .to(
          svgRef?.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'Power3.inOut',
          },
          START
        )
        .to(
          '#heading',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            rotationX: 0,
            ease: 'Power3.inOut',
          },
          START
        );
    } else {
      gsap.set(svgRef?.current, { x: 1000 });
      gsap.set('#heading', { y: 500, rotationX: -60 });
    }
  }, [svgLoaded]);

  return (
    <div className={classNames(container, { [blogContainer]: blogPost })}>
      {!blogPost && <Globe ref={svgRef} className={globe} />}
      <div className={inner}>
        <h1 id="heading" className={heading}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;

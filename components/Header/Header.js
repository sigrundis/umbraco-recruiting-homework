import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { isBrowser } from '../../lib/helpers';
import Globe from '../../assets/svg/globe.svg';
import styles from './Header.module.scss';
const LOAD = 'load';

const { container, blogContainer, inner, heading, globe } = styles;

const Header = ({ title, blogPost }) => {
  const [svgLoaded, setSvgLoaded] = useState();
  const svgRef = useRef();

  useEffect(() => {
    gsap.set('#heading', { y: 500, rotationX: -60 });

    if (!blogPost) {
      gsap.set(svgRef?.current, { x: 1000 });
      svgRef?.current?.addEventListener(LOAD, onLoadSvg);

      //In case the load event listener doesn't trigger.
      setTimeout(() => {
        onLoadSvg();
      }, 2500);

      return () => svgRef?.current?.removeEventListener(LOAD, onLoadSvg);
    }
  }, []);

  const onLoadSvg = () => setSvgLoaded(true);

  /**
   * Trigger animation
   */
  useEffect(() => {
    // We don't have background image in the header of blogPosts.
    if ((svgLoaded || blogPost) && isBrowser) {
      const timeline = gsap.timeline();
      const START = 'beginAnimate';
      const defaultOptions = {
        opacity: 1,
        duration: 0.8,
        ease: 'Power3.inOut',
      };

      timeline.to(
        '#heading',
        {
          ...defaultOptions,
          y: 0,
          rotationX: 0,
        },
        START
      );

      if (svgRef?.current) {
        timeline.to(
          svgRef?.current,
          {
            ...defaultOptions,
            x: 0,
          },
          START
        );
      }
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

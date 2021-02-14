import React, { useEffect } from 'react';
import '../styles/globals.scss';
import loadFont from '../lib/loadFont';
import { isBrowser } from '../lib/helpers';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    loadFont();

    if (isBrowser) {
      // For screen readers, to increase accessability.
      document.documentElement.lang = 'en';
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

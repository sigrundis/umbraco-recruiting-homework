import React, { useEffect } from 'react';
import '../styles/globals.scss';
import loadFont from '../lib/loadFont';
import { isBrowser } from '../lib/helpers';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    loadFont();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

import FontFaceObserver from 'fontfaceobserver';
import { isBrowser } from '../lib/helpers';

const Fonts = () => {
  const link = document.createElement('link');
  link.href =
    'https://fonts.googleapis.com/css?family=Lato:200,300,400,500,600,700&display=swap';
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const lato = new FontFaceObserver('Lato');

  lato.load().then(() => {
    if (isBrowser) {
      document.getElementById('__next')?.classList?.add('lato');
    }
  });
};

export default Fonts;

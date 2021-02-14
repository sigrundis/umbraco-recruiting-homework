import Page from '../components/Page';
import { getAboutPage, getDefaultContent } from '../lib/api';

const About = ({ defaultContent, content }) => (
  <Page defaultContent={defaultContent} content={content} />
);

export async function getServerSideProps() {
  const defaultData = await getDefaultContent();
  const data = await getAboutPage();

  if (data.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...defaultData, ...data },
  };
}

export default About;

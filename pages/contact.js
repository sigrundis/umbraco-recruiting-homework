import Page from '../components/Page';
import { getContactPage, getDefaultContent } from '../lib/api';

const About = ({ defaultContent, content }) => (
  <Page defaultContent={defaultContent} content={content} />
);

export async function getServerSideProps() {
  const defaultData = await getDefaultContent();
  const data = await getContactPage();

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

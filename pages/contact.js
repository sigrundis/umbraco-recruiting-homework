import Head from '../components/Head';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogLayout from '../components/BlogLayout';
import styles from '../styles/Contact.module.scss';
import { getContactPage, getDefaultContent } from '../lib/api';

export default function Contact({ error, defaultContent, content }) {
  const { logo, navigation } = defaultContent;
  const { name, metaTitle, metaDescription, ogImage, rte } = content;

  if (error) {
    return <div>Sorry, something went wrong</div>;
  }

  return (
    <>
      <Head title={metaTitle} description={metaDescription} ogImage={ogImage} />
      <Nav logo={logo} nav={navigation} selected={name} />
      <Header blogPost title={name} />
      <BlogLayout>
        <div dangerouslySetInnerHTML={{ __html: rte }} />
      </BlogLayout>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const defaultData = await getDefaultContent();
  const data = await getContactPage();

  return {
    props: { ...defaultData, ...data },
  };
}

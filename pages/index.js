import Link from 'next/link';
import Head from '../components/Head';
import Nav from '../components/Nav';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Section from '../components/Section';
import styles from '../styles/Home.module.scss';
import { getDefaultContent, getBlog } from '../lib/api';

export default function Home({ error, defaultContent, blogContent }) {
  const {
    metaTitle,
    metaDescription,
    ogImage,
    navigation,
    logo,
  } = defaultContent;

  if (error) {
    return <div>Sorry, something went wrong</div>;
  }

  return (
    <>
      <Head title={metaTitle} description={metaDescription} ogImage={ogImage} />
      <Nav logo={logo} nav={navigation} />
      <Header
        title={
          <>
            Welcome to <br />
            Umbraco's blog page
          </>
        }
      />
      <Section title="Latest News">
        <BlogPosts blogContent={blogContent} />
      </Section>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const data = await getDefaultContent();
  const blog = await getBlog();
  return {
    props: { ...data, ...blog },
  };
}

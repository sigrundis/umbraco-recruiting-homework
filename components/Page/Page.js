import Head from '../../components/Head';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogLayout from '../../components/BlogLayout';

const Page = ({ defaultContent, content }) => {
  const { logo, navigation } = defaultContent;
  const { name, metaTitle, metaDescription, ogImage, rte } = content;

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
};

export default Page;

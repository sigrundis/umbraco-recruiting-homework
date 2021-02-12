import Image from 'next/image';
import { generateDateString } from '../../lib/helpers';
import Head from '../../components/Head';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Post.module.scss';
import { getDefaultContent, getBlog, getBlogPostByUrl } from '../../lib/api';
import BlogLayout from '../../components/BlogLayout';

const {
  info,
  label: labelStyle,
  value: valueStyle,
  labelValuePair,
  content,
  imageWrapper,
  image,
  text,
} = styles;

export default function Post({ error, defaultContent, blogPost }) {
  const { navigation, logo } = defaultContent;
  const {
    name,
    metaTitle,
    metaDescription,
    ogImage,
    author,
    createdAt,
    updatedAt,
    thumbnail: { _url: src },
    rte,
  } = blogPost;

  if (error) {
    return <div>Sorry, something went wrong</div>;
  }

  const renderLabelValuePair = (label, value) => (
    <div className={labelValuePair}>
      <div className={labelStyle}>{label}</div>
      <div className={valueStyle}>{value}</div>
    </div>
  );

  return (
    <>
      <Head title={metaTitle} description={metaDescription} ogImage={ogImage} />
      <Header blogPost title={name} />
      <Nav logo={logo} nav={navigation} />
      <BlogLayout>
        <div className={info}>
          {renderLabelValuePair('Written By: ', author)}
          {renderLabelValuePair(
            'Published At: ',
            generateDateString(new Date(createdAt))
          )}
          {renderLabelValuePair(
            'Last Update: ',
            generateDateString(new Date(updatedAt))
          )}
        </div>
        <div className={content}>
          <div className={imageWrapper}>
            <Image className={image} src={src} layout="fill" />
          </div>
          <div className={text} dangerouslySetInnerHTML={{ __html: rte }} />
        </div>
      </BlogLayout>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const data = await getDefaultContent();
  const blogPost = await getBlogPostByUrl(`/home/blog/${context.params.post}/`);
  return {
    props: { ...data, blogPost },
  };
}

export async function getStaticPaths() {
  const data = await getBlog();
  let paths = data?.blogContent;
  if (paths) {
    const { blogContent } = data;

    paths = blogContent
      ? blogContent.map((blogPost) => {
          let post = blogPost.url.replace('/home/blog/', '');
          if (post.charAt(post.length - 1) === '/') {
            post = post.slice(0, -1);
          }

          return {
            params: { post },
          };
        })
      : [];

    return {
      paths,
      fallback: false,
    };
  }
}

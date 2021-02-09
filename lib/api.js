import { UMB_URL, UMB_PROJECT_ALIAS } from '../lib/constants';

const UMB_HOME_ID = process.env.UMB_HOME_ID;
const UMB_ABOUT_ID = process.env.UMB_ABOUT_ID;
const UMB_CONTACT_ID = process.env.UMB_CONTACT_ID;
const UMB_BLOG_ID = process.env.UMB_BLOG_ID;

const fetcher = async (endpoint) => {
  const url = `${UMB_URL}${endpoint}`;
  const result = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'umb-project-alias': UMB_PROJECT_ALIAS,
      'Accept-Language': 'en-US',
    },
  });

  return await result.json();
};

export async function getDefaultContent() {
  const result = await fetcher(`content/${UMB_HOME_ID}`);
  const {
    metaTitle,
    metaDescription,
    ogImage,
    logo,
    navigation,
    error,
  } = result;

  if (error) {
    const { code } = error;
    return { error: { code }, defaultContent: {} };
  }

  return {
    defaultContent: {
      metaTitle,
      metaDescription,
      ogImage,
      navigation,
      logo,
    },
  };
}

export async function getAboutPage() {
  const url = `content/${UMB_ABOUT_ID}`;
  const data = getPage(url);
  return data;
}

export async function getContactPage() {
  const url = `content/${UMB_CONTACT_ID}`;
  const data = getPage(url);
  return data;
}

export async function getPage(url) {
  const result = await fetcher(url);
  console.log('result', result);
  const { name, metaTitle, metaDescription, ogImage, rte, error } = result;

  if (error) {
    const { code } = error;
    return { error: { code }, content: {} };
  }

  return {
    content: {
      name,
      metaTitle,
      metaDescription,
      ogImage,
      rte,
    },
  };
}

export async function getBlog() {
  const result = await fetcher(`content/${UMB_BLOG_ID}/children`);
  const { _embedded: embedded, error } = result;

  if (error) {
    const { code } = error;
    return { error: { code }, blogContent: {} };
  }

  const { content } = embedded;

  return {
    blogContent: content.map((blogPost) => {
      const {
        _url: url,
        _createDate: createdAt,
        _updateDate: updatedAt,
        _writerName: author,
        name,
        metaTitle,
        metaDescription,
        ogImage,
        rte,
        thumbnail,
      } = blogPost;
      return {
        url,
        createdAt,
        updatedAt,
        author,
        name,
        metaTitle,
        metaDescription,
        ogImage,
        rte,
        thumbnail,
      };
    }),
  };
}

export async function getBlogPostByUrl(url) {
  console.log('uuuurrrlll', url);
  const content = await fetcher(`content/url?url=${url}`);
  const { error } = content;

  if (error) {
    const { code } = error;
    return { error: { code }, content: {} };
  }

  const {
    _createDate: createdAt,
    _updateDate: updatedAt,
    _writerName: author,
    metaTitle,
    metaDescription,
    ogImage,
    name,
    rte,
    thumbnail,
  } = content;

  return {
    createdAt,
    updatedAt,
    author,
    metaTitle,
    metaDescription,
    ogImage,
    name,
    rte,
    thumbnail,
  };
}

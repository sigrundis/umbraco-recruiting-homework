import { UMB_URL, UMB_PROJECT_ALIAS } from '../lib/constants';

const UMB_HOME_ID = process.env.UMB_HOME_ID;
const UMB_ABOUT_ID = process.env.UMB_ABOUT_ID;
const UMB_CONTACT_ID = process.env.UMB_CONTACT_ID;
const UMB_BLOG_ID = process.env.UMB_BLOG_ID;

/**
 * Fetches data from the Umbraco Heartcore project
 * @param {string} endpoint - The path- and query parameters to add to the base url of the project.
 */
const umbracoFetcher = async (endpoint) => {
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

/**
 * Generates the default content used in all pages.
 * @returns default meta data for the head, navigation information and the logo.
 */
export async function getDefaultContent() {
  const result = await umbracoFetcher(`content/${UMB_HOME_ID}`);
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

/**
 * Generates data for the About page.
 */
export async function getAboutPage() {
  const params = `content/${UMB_ABOUT_ID}`;
  const data = getPage(params);
  return data;
}

/**
 * Generates data for the Contact page.
 */
export async function getContactPage() {
  const params = `content/${UMB_CONTACT_ID}`;
  const data = getPage(params);
  return data;
}

/**
 * Generates data of the document type - page.
 * @param {string} params - the params for the page content to generate.
 */
export async function getPage(params) {
  const result = await umbracoFetcher(params);
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

/**
 * Generates all blog posts.
 */
export async function getBlog() {
  const result = await umbracoFetcher(`content/${UMB_BLOG_ID}/children`);
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

/**
 * Generates single blog post by url.
 * @param {*} url - the url of the blogpost.
 */
export async function getBlogPostByUrl(url) {
  const content = await umbracoFetcher(`content/url?url=${url}`);
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

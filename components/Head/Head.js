import React from 'react';
import Head from 'next/head';

const HtmlHead = ({ title, description, ogImage }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta name="description" content={description}></meta>
    <meta property="og:image" content={ogImage?._url} key="ogimage" />
    <meta property="og:site_name" content={title} key="ogsitename" />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} key="ogdesc" />
    <title>{title}</title>
  </Head>
);

export default HtmlHead;

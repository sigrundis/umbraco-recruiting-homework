module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['media.umbraco.io'],
  },
  async redirects() {
    return [
      {
        source: '/home/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/home/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

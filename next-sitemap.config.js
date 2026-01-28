/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://klzguide.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  alternateRefs: [
    {
      href: 'https://klzguide.vercel.app/ko',
      hreflang: 'ko',
    },
    {
      href: 'https://klzguide.vercel.app/vi',
      hreflang: 'vi',
    },
  ],
};

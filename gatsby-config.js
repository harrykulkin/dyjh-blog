module.exports = {
  siteMetadata: {
    title: `... 그러한 연 然 ...`,
    siteUrl: `https://dyjh-blog.netlify.app/`,
    description: `세상에 남길 무언가`,
    topics: [],
    menu: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'Posts',
        path: '/archive'
      },
    ],
    footerMenu: [
      {
        name: 'Posts',
        path: '/archive'
      },
    ],
    search: true,
    author: {
      name: `컬킨`,
      description: `<strong>컬킨</strong>, 미디어 회사 근무, 얇고 좁은 풀스택 개발자 지향`,
      social: {
        facebook: ``,
        twitter: ``,
        linkedin: ``,
        instagram: ``,
        youtube: ``,
        github: `https://github.com/harrykulkin`,
        twitch: ``
      }
    }
  },
  plugins: [
    {
      resolve: `@nehalist/gatsby-theme-nehalem`,
      options: {
        manifest: {
          name: `nehalem - A Gatsby theme`,
          short_name: `nehalem`,
          start_url: `/`,
          background_color: `#a4cbb8`,
          theme_color: `#a4cbb8`,
          display: `minimal-ui`,
          icon: `${__dirname}/content/assets/images/logo.png`
        }
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ]
};

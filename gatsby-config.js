module.exports = {
  siteMetadata: {
    title: `... 그러한 연 然 ...`,
    siteUrl: `https://dyjh-blog.netlify.app/`,
    description: `세상에 남길 무언가`,
    disqusShortname: 'dyjh-blog',
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
      description: `<strong>컬킨</strong>, 미디어 회사 근무, 얇고 넓은 풀스택 워너비`,
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
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `dyjh-blog`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-175065337-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://dyjh-blog.netlify.app',
        sitemap: 'https://dyjh-blog.netlify.app/sitemap.xml',
        policy: [{
          userAgent: '*',
          allow: '/',
          disallow: ["/tag/2019-","/tag/2018","/tag/2015","/2019-singapore-universial","/2018-ruiruna","/2020-gatsby-blog"],
        }]
      }
    },
  ]
};

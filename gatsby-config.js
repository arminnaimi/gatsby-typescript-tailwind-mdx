module.exports = {
  siteMetadata: {
    title: `<site title>`,
    description: `<site description>`,
    author: `@armi2n`,
    titleTemplate: "%s · Site Name",
    // siteUrl: "<site-url>",
    // defaultImage: ""
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-relative-images`,
    `gatsby-remark-images`,
    `gatsby-remark-unwrap-images`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#20617b`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     typekit: {
    //       id: "<id>",
    //       families: ["solitaire-mvb-pro", "adobe-garamond-pro"],
    //     },
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `homepage`,
        path: `${__dirname}/src/content/index.md`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              showCaptions: ["title"],
              markdownCaptions: true,
            },
          },
          `gatsby-remark-unwrap-images`,
        ],
        extensions: [`.md`],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        tailwind: true,
        purgeOnly: ["src/css/index.css"],
      },
    },
    `gatsby-plugin-typescript`,
    // {
    //   resolve: `gatsby-plugin-favicon`,
    //   options: {
    //     logo: "./src/images/favicon.png",
    //     appName: "<site title>",
    //     appDescription: "<site title>",
    //     lang: "en-US",
    //     icons: {
    //       android: true,
    //       appleIcon: true,
    //       appleStartup: true,
    //       favicons: true,
    //       firefox: true,
    //     },
    //   },
    // },
    // `gatsby-plugin-sitemap`,
    // {
    //   resolve: "gatsby-plugin-robots-txt",
    //   options: {
    //     policy: [{ userAgent: "*", allow: "/" }],
    //   },
    // },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ["develop", "build-javascript"],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
}

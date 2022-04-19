module.exports = {
  siteMetadata: {
    title: `football timer`,
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Football Timer`,
        short_name: `FT`,
        start_url: `/`,
        background_color: `#ffc905`,
        theme_color: `#ffc905`,
        display: `standalone`,
        icon: `src/images/logo-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};

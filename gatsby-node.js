const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Hämta alla slugs från Contentful
    const result = await graphql(`
    query {
      allContentfulProtfolioItem {
        nodes {
          slug
        }
      }
    }
  `);

    if (result.errors) {
        console.error(result.errors);
        throw result.errors;
    }

    const items = result.data.allContentfulProtfolioItem.nodes;

    // Skapa en sida per portfolio-post
    items.forEach((item) => {
        createPage({
            path: `/portfolio/${item.slug}`, // Måste matcha dina länkar
            component: path.resolve("./src/templates/portfolio-item.js"), // vår template
            context: {
                slug: item.slug, // skickas in till page queryn som $slug
            },
        });
    });
};
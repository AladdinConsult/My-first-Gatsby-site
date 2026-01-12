import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulProtfolioItem;

  return (
    <Layout>
      <h1>{item.title}</h1>
      <p>Slug: {item.slug}</p>

      {item.description && (
        <div>{renderRichText(item.description)}</div>
      )}


      {item.images?.map((img, index) => {
        const image = getImage(img);
        if (!image) return null;

        return (
          <GatsbyImage
            key={index}
            image={image}
            alt={img?.description || `${item.title} bild ${index + 1}`}
            imgClassName="portfolio-image-img"
          />
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulProtfolioItem(slug: { eq: $slug }) {
      title
      slug
      description {
        raw
      }
      images {
        description
        gatsbyImageData(
          layout: CONSTRAINED
          width: 800
          placeholder: BLURRED
        )
      }
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.contentfulProtfolioItem.title}</title>
);

export default PortfolioItemPage;

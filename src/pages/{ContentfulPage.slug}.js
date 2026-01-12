import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import PortfolioPage from "./portfolio";

const Page = ({ data }) => {
  const page = data.contentfulPage;

  if (page.slug === "portfolio") {
    return <PortfolioPage />;
  }

  return (
    <Layout>
      <h1>{page.title}</h1>

      {page.body && (
        <div>{renderRichText(page.body)}</div>
      )}
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      body {
        raw
      }
    }
  }
`;

export const Head = ({ data }) => {
  if (data.contentfulPage.slug === "portfolio") {
    return <title>Portfolio</title>;
  }

  return <title>{data.contentfulPage.title}</title>;
};

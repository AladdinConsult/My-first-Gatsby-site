import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const PortfolioPage = () => {
  
  const data = useStaticQuery(graphql`
    query {
      allContentfulProtfolioItem {
        nodes {
          slug
          title
          description {
            raw
          }
        }
      }
    }
  `);

  const items = data.allContentfulProtfolioItem.nodes;

  return (
    <Layout>
      <h1>Min Portfolioooooooooooooooooooo!</h1>
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link to={`/portfolio/${item.slug}`}>{item.title}</Link>

            {item.description?.raw && (
              <div>{renderRichText(item.description)}</div>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const Head = () => <title>Portfolio</title>;

export default PortfolioPage;

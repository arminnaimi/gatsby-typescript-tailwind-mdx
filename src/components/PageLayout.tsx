import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import LayoutWrapper from "./LayoutWrapper"
import SEO from "./SEO"

interface Props {
  data: {
    mdx: {
      body: any
      frontmatter: {
        title: string
        description: any
      }
    }
  }
}

function PageLayout({ data: { mdx } }: Props) {
  const {
    body,
    frontmatter: { title, description },
  } = mdx

  return (
    <LayoutWrapper>
      <SEO title={title} description={description} />
      <MDXRenderer>{body}</MDXRenderer>
    </LayoutWrapper>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        description
      }
    }
  }
`

export default PageLayout

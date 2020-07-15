import React from "react"
import { graphql } from "gatsby"
import LayoutWrapper from "./LayoutWrapper"
import SEO from "./SEO"
import { MDXRenderer } from "gatsby-plugin-mdx"

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

function HomepageLayout({ data: { mdx } }: Props) {
  const { frontmatter, body } = mdx
  const { title, description } = frontmatter
  return (
    <LayoutWrapper>
      <SEO title={title} description={description} />
      <MDXRenderer>{body}</MDXRenderer>
    </LayoutWrapper>
  )
}

export const pageQuery = graphql`
  query HomepageQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        description
      }
    }
  }
`

export default HomepageLayout

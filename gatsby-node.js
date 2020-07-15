const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createSchemaCustomization = ({
  actions: { createTypes, createFieldExtension },
  createContentDigest,
}) => {
  createFieldExtension({
    name: "mdx",
    extend() {
      return {
        type: "String",
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName]
          // Isolate MDX
          const mdxType = info.schema.getType("Mdx")
          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body
          if (!value) {
            return
          }
          return resolve(
            {
              rawBody: value,
              internal: {
                contentDigest: createContentDigest(value), // Used for caching
              },
            },
            args,
            context,
            info
          )
        },
      }
    },
  })
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      description: String @mdx
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (
    node.internal.type === "Mdx" &&
    node.fileAbsolutePath.match("/content/")
  ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    fragment getAllMdx on MdxConnection {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
    query {
      pages: allMdx(
        filter: { fileAbsolutePath: { regex: "/(?!content/index.md)content/" } }
      ) {
        ...getAllMdx
      }
      homepage: allMdx(
        filter: { fileAbsolutePath: { regex: "/content/index.md/" } }
      ) {
        ...getAllMdx
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create pages.
  const pages = result.data.pages.edges
  pages.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/PageLayout.tsx`),
      context: { id: node.id },
    })
  })
  // Create homepage.
  const homepage = result.data.homepage.edges
  homepage.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/HomepageLayout.tsx`),
      context: { id: node.id },
    })
  })
}

import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {visit} from 'unist-util-visit'
import {h} from 'hastscript'
import graphviz from 'remark-graphviz'

const file = readSync('example.md')

unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(customPlugin)
  .use(remarkMath)
  .use(graphviz)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
    console.log(String(file))
  })

// This plugin is just an example! You can handle directives however you please!
function customPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
  }
}

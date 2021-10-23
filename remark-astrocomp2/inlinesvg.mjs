
import { unified } from "unified";
import parse from "rehype-parse";
import inlineSVG from "@jsdevtools/rehype-inline-svg";
import stringify from "rehype-stringify";
import { readSync } from "to-vfile";

async function example() {
  // Create a Rehype processor with the Inline SVG plugin
  const processor = unified()
    .use(parse, {fragment: true})
    .use(inlineSVG, {
      maxImageSize: 5000,          // Don't inline SVGs larger than 5 kb
      maxTotalSize: 25000,    // 25 kb limit for all occurrences of each SVG
      optimize: false,            // Don't optimize SVGs
    })
    .use(stringify);

  // Read an HTML file that contains SVG images
  let originalFile = readSync("Someout.astro");

  // Process the file, inlining and optimizing SVG images
  let modifiedFile = await processor.process(originalFile);

  // The result is HTML with inlined <svg> elements
  console.log(modifiedFile.value);

  // <html>
  //   <body>
  //     <svg alt="some icon" viewBox="0 0 48 48"><path d="M5 24c0...
  //   </body>
  // </html>
}
example()

import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";
export class Markdown {
  static getMarkdown(html: string) {
    return NodeHtmlMarkdown.translate(html);
  }

  static writeMDFile(md: string, path: string) {
    const fs = require("fs");
    fs.writeFile(path, md, function (err) {
      if (err) return console.log(err);
      console.log("file written!");
    });
  }
}

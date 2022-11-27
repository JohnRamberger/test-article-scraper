import { Markdown } from "../Markdown";
import { Source } from "./classes/source.class";

export class Medium extends Source {
  constructor(url: string) {
    super(url);
  }

  getArticleContent() {
    let doc = this.htmlDoc;
    let article = doc.querySelector(
      "#root > div > div.y.c > div > div > main > div > div.we.wf.wg.wh.wi.y > div:nth-child(1) > div > article"
    );
    // console.log(article);
    // let content = article.querySelector("section");
    // let md = Markdown.getMarkdown(article.innerHTML);
    // Markdown.writeMDFile(md, "temp/test.md");
    // return md;
  }
}

import { Metadata } from "./classes/Metadata.class";
import { Source } from "./classes/source.class";

export class Medium extends Source {
  constructor(url: string) {
    super(url);
  }

  initArticleContent() {
    let doc = this.htmlDoc;
    let article = doc.querySelector("article section");
    this.content = article.innerHTML;
  }

  initMetadata() {
    super.initMetadata();
    this.metadata.title = this.htmlDoc
      .querySelector("meta[property='og:title']")
      .getAttribute("content");
    this.metadata.date = this.htmlDoc
      .querySelector(`meta[property='article:published_time']`)
      .getAttribute("content");
    this.metadata.image = this.htmlDoc
      .querySelector("meta[property='og:image']")
      .getAttribute("content");
  }
}

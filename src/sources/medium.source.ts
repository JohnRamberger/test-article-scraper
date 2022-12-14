import { Source } from "./";

/**
 * The source medium.com
 */
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
    this.metadata.title = this.htmlDoc
      .querySelector("meta[property='og:title']")
      .getAttribute("content");
    this.metadata.date = this.htmlDoc
      .querySelector(`meta[property='article:published_time']`)
      .getAttribute("content");
    this.metadata.image = this.htmlDoc
      .querySelector("meta[property='og:image']")
      .getAttribute("content");
    super.initMetadata();
  }
}

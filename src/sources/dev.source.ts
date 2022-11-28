import { Source } from "./";

/**
 * The source dev.to
 */
export class Dev extends Source {
  constructor(url: string) {
    super(url);
  }
  initArticleContent() {
    let doc = this.htmlDoc;
    let article = doc.querySelector(
      "#article-show-container > div.crayons-article__main"
    );
    article.innerHTML = `<h1>${this.metadata.title}</h1>` + article.innerHTML;
    this.content = article.innerHTML;
  }
  protected initMetadata() {
    this.metadata.title = this.htmlDoc
      .querySelector("meta[property='og:title']")
      ?.getAttribute("content");

    this.metadata.description = this.htmlDoc
      .querySelector("meta[property='og:description']")
      ?.getAttribute("content");
    this.metadata.tags = this.htmlDoc
      .querySelector("meta[name='keywords']")
      ?.getAttribute("content")
      ?.split(", ");

    this.metadata.image = this.htmlDoc
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content");
    super.initMetadata();
  }
}

import { Source } from "./";

/**
 * The source for www.forbes.com
 */
export class Forbes extends Source {
  constructor(url: string) {
    super(url, false);
  }
  initArticleContent() {
    let doc = this.htmlDoc;
    let article = doc.querySelector(
      "#article-stream-0 > div:nth-child(2) > div.middleRightRail > div.body-container > div.article-body-container.show-iframes > div.article-body.fs-article.fs-responsive-text.current-article"
    );
    article.querySelector("div.article-sharing")?.remove();
    article.querySelector("#recirc-unit")?.remove();

    article.querySelectorAll(".vestpocket").forEach((element) => {
      element.remove();
    });

    article.querySelectorAll("cnx").forEach((element) => {
      element.remove();
    });

    article.querySelectorAll("img").forEach((element) => {
      let src = element.getAttribute("src");
      if (src.includes("width="))
        element.setAttribute("src", src.replace(/width=\d+/g, ""));
    });

    article.innerHTML = `<h1>${this.metadata.title}</h1>` + article.innerHTML;

    this.content = article.innerHTML;
  }
  initMetadata() {
    super.initMetadata();
  }
}

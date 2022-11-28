import { NodeHtmlMarkdown } from "node-html-markdown";
import { Puppet } from "../../puppet";
import { Medium } from "../medium.source";
import { Metadata } from "./Metadata.class";

export class Source {
  /**
   * The url of the source
   */
  protected url: string;
  /**
   * The html document of the source
   */
  protected htmlDoc: Document;
  /**
   * The string of the html document
   */
  protected stringBody: string;

  /**
   * The content of an article
   */
  protected content: string;

  /**
   * whether to wait for network idle before grabbing the html
   */
  waitForNetworkIdle: boolean;

  /**
   * The metadata of the source
   */
  metadata: Metadata;

  constructor(url: string, waitForNetworkIdle: boolean = true) {
    this.url = url;
    this.waitForNetworkIdle = waitForNetworkIdle;
  }

  /**
   * Gets the content of the article
   */
  initArticleContent() {}
  /**
   * Initializes the metadata of the source
   */
  protected initMetadata() {
    this.metadata = new Metadata();

    this.metadata.url = this.url;
    this.metadata.baseurl = Source.getBaseUrl(this.url);
    let doc = this.htmlDoc;
    this.metadata.title = doc
      .querySelector("meta[name=title]")
      .getAttribute("content");
    this.metadata.author = doc
      .querySelector("meta[name=author]")
      .getAttribute("content");
    this.metadata.description = doc
      .querySelector("meta[name='description']")
      .getAttribute("content");
  }

  /**
   * Initializes the source
   */
  async init() {
    // init the source
    console.log("grabbing...");
    let body = await Puppet.getHtml(this);
    this.stringBody = body[0];
    this.htmlDoc = body[1];
    console.log("done grabbing!");
    this.initMetadata();
    this.initArticleContent();
  }

  /**
   *  Gets the base url of the source
   * @param url the url to get the base url from
   * @returns the base url of the url
   */
  static getBaseUrl(url: string): string {
    // get the base url from the url
    // https://medium.com/illumination/how-to-create-a-telegram-bot-using-python-making-300-per-month-cf80d0693bb5
    let baseurl;
    if (url.includes("//")) {
      baseurl = url.split("/")[2];
    } else {
      baseurl = url.split("/")[0];
    }

    if (baseurl) {
      baseurl = baseurl.toLowerCase().trim();
    }

    return baseurl;
  }

  /**
   * Gets the source from a url
   * @param url the url to get the source from
   * @returns the source of the url or false (if not supported)
   */
  static async getSource(url: string): Promise<false | Source> {
    return new Promise(async (resolve, reject) => {
      // get the source class from the url
      let baseurl = this.getBaseUrl(url);
      switch (baseurl) {
        case "medium.com":
          console.log("source found!");
          let s = new Medium(url);
          await s.init();
          resolve(s);
        default:
          resolve(false);
      }
    });
  }

  /**
   * Gets the url of the source
   * @returns the url of the source
   */
  getUrl(): string {
    return this.url;
  }

  /**
   * Gets the html document of the source
   * @returns the html document of the source
   */
  getHtmlDoc(): Document {
    return this.htmlDoc;
  }

  /**
   * Gets the string of the html document
   * @returns the string html of the source
   */
  getStringBody(): string {
    return this.stringBody;
  }

  /**
   * Gets the markdown of the source
   * @returns the markdown of the source
   */
  getMarkdown() {
    return NodeHtmlMarkdown.translate(this.content);
  }

  /**
   * Writes the markdown of the source to a file
   * @param path the path to write the markdown file to
   */
  writeMDFile(path: string) {
    let md = this.getMarkdown();
    const fs = require("fs");
    fs.writeFile(path, md, function (err) {
      if (err) return console.log(err);
      console.log("md file written!");
    });
  }

  /**
   * Writes the html of the source to a file
   * @param path the path to write the html file to
   */
  writeHtmlFile(path: string) {
    const fs = require("fs");
    fs.writeFile(path, this.stringBody, function (err) {
      if (err) return console.log(err);
      console.log("html file written!");
    });
  }
}

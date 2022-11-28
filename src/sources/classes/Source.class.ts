import { NodeHtmlMarkdown } from "node-html-markdown";
import { Puppet } from "../../puppet";
import { Dev } from "../";
import { Medium } from "../";
import { Metadata } from "../classes/metadata.class";

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
    this.metadata = new Metadata();
  }

  /**
   * Gets the content of the article
   */
  initArticleContent() {}
  /**
   * Initializes the metadata of the source
   */
  protected initMetadata() {
    if (!this.metadata.url) this.metadata.url = this.url;
    if (!this.metadata.baseurl)
      this.metadata.baseurl = Source.getBaseUrl(this.url);

    // get stuff from meta tags in head
    let doc = this.htmlDoc;
    if (!this.metadata.title)
      this.metadata.title = doc
        .querySelector("meta[name=title]")
        ?.getAttribute("content");

    if (!this.metadata.author)
      this.metadata.author = doc
        .querySelector("meta[name=author]")
        ?.getAttribute("content");

    if (!this.metadata.description)
      this.metadata.description = doc
        .querySelector("meta[name='description']")
        ?.getAttribute("content");

    if (this.metadata.title) {
      // set titleSafe to the title with only lowercase letters and spaces replaced with dashes
      this.metadata.titleSafe = this.metadata.title;
      this.metadata.titleSafe = this.metadata.titleSafe.toLowerCase();
      this.metadata.titleSafe = this.metadata.titleSafe.replace(/ /g, "-");
      // remove all non alphanumeric characters
      this.metadata.titleSafe = this.metadata.titleSafe.replace(
        /[^a-z0-9-]/g,
        ""
      );
    }
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
    let baseurl: string;
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
        case "dev.to":
          console.log("source found!");
          let s2 = new Dev(url);
          await s2.init();
          resolve(s2);
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

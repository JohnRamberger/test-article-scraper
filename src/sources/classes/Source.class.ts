import { Markdown } from "../../Markdown";
import { Puppet } from "../../puppet";
import { Medium } from "../medium.source";

export class Source {
  protected url: string;
  protected htmlDoc: Document;
  protected stringBody: string;
  waitForNetworkIdle: boolean;

  constructor(url: string, waitForNetworkIdle: boolean = true) {
    this.url = url;
    this.waitForNetworkIdle = waitForNetworkIdle;
  }

  getArticleContent() {}

  async init() {
    // init the source
    console.log("grabbing...");
    let body = await Puppet.getHtml(this);
    this.stringBody = body[0];
    this.htmlDoc = body[1];
    console.log("done grabbing!");
  }

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

  //getters and setters
  getUrl(): string {
    return this.url;
  }
  getHtmlDoc(): Document {
    return this.htmlDoc;
  }
  getStringBody(): string {
    return this.stringBody;
  }

  async getMarkdown() {
    return Markdown.getMarkdown(this.stringBody);
  }

  writeHtmlFile(path: string) {
    const fs = require("fs");
    fs.writeFile(path, this.stringBody, function (err) {
      if (err) return console.log(err);
      console.log("file written!");
    });
  }
}

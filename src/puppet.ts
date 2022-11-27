import * as puppeteer from "puppeteer";

import { JSDOM } from "jsdom";

import { Source } from "./sources";

//manage all puppeteer instances
export class Puppet {
  start() {}
  static async getHtml(source: Source): Promise<[string, Document]> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
      );
      await page.goto(source.getUrl());
      if (source.waitForNetworkIdle) {
        await page.waitForNetworkIdle();
      }

      let str = await page.evaluate(() => document.body.innerHTML);
      await browser.close();

      let dom = new JSDOM(str);
      let doc = dom.window.document;

      return [str, doc];
    } catch (err) {
      console.error(err);
    }
  }
}

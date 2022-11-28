import { marked } from "marked";
import { Source } from "./sources";

async function start() {
  // let url =
  //   "https://medium.com/illumination/how-to-create-a-telegram-bot-using-python-making-300-per-month-cf80d0693bb5";
  let url =
    "https://medium.com/illumination/the-world-is-not-getting-enough-sleep-4c629813c6d6";
  let s = await Source.getSource(url);
  if (!s) {
    console.error({ ok: 0, error: "source not found" });
    return;
  }
  console.log(s.metadata);
  s.writeMDFile(`temp/${s.metadata.titleNoSpace}.md`);
}
start();

async function mdToHtml() {
  let fs = require("fs");
  let md = fs.readFileSync("temp/test.md", "utf8");
  let html = marked.parse(md);
  fs.writeFileSync("temp/test.html", html);
}

// mdToHtml();

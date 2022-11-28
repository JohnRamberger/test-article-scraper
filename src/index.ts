import { marked } from "marked";
import { Source } from "./sources";

async function start() {
  let url =
    "https://dev.to/maximecheramy/diy-ive-built-a-music-box-for-the-2nd-x-mas-of-my-son-j03";
  let s = await Source.getSource(url);
  if (!s) {
    console.error({ ok: 0, error: "source not found" });
    return;
  }
  console.log(s.metadata);
  s.writeMDFile(`temp/${s.metadata.titleSafe}.md`);
}
start();

async function mdToHtml() {
  let fs = require("fs");
  let md = fs.readFileSync("temp/test.md", "utf8");
  let html = marked.parse(md);
  fs.writeFileSync("temp/test.html", html);
}

// mdToHtml();

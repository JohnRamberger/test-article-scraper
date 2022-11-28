import { marked } from "marked";
import { Source } from "./sources";

async function start() {
  let url =
    "https://www.forbes.com/sites/tracybrower/2022/11/27/is-work-damaging-your-brain-health-5-strategies-to-improve-it/?sh=3df3bed014ed";
  let s = await Source.getSource(url);
  if (!s) {
    console.error({ ok: 0, error: "source not found" });
    return;
  }
  console.log(s.metadata);
  s.writeMDFile(`temp/${s.metadata.titleSafe}.md`);
  s.writeHtmlFile(`temp/${s.metadata.titleSafe}.html`);
}
start();

async function mdToHtml() {
  let fs = require("fs");
  let md = fs.readFileSync("temp/test.md", "utf8");
  let html = marked.parse(md);
  fs.writeFileSync("temp/test.html", html);
}

// mdToHtml();

import { Source } from "./sources";

async function start() {
  let url =
    "https://medium.com/illumination/how-to-create-a-telegram-bot-using-python-making-300-per-month-cf80d0693bb5";
  let s = await Source.getSource(url);
  if (!s) {
    console.error({ ok: 0, error: "source not found" });
    return;
  }
  // console.log(s.getArticleContent());
  s.writeHtmlFile("temp/test.html");
}
start();
// import * as puppeteer from "puppeteer";

// (async () => {
//   try {
//     console.log("Starting browser");
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     console.log("Going to url");
//     await page.goto(
//       "https://medium.com/illumination/how-to-create-a-telegram-bot-using-python-making-300-per-month-cf80d0693bb5"
//     );
//     console.log("saving page");
//     await page.pdf({ path: "temp/google.pdf" });

//     await browser.close();
//     console.log("Done!");
//   } catch (err) {
//     console.error(err);
//   }
// })();

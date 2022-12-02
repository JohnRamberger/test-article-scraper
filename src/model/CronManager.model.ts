import { SourceJob } from "./SourceJob.model";
import { SourceManager } from "./SourceManager.model";

var cron = require("node-cron");

export class CronManager {
  static EVERY_5_SECONDS = "*/5 * * * * *";
  static EVERY_MINUTE = "* * * * *";
  static EVERY_5_MINUTES = "*/5 * * * *";
  static EVERY_10_MINUTES = "*/10 * * * *";

  /**
   * Schedules all of the cron jobs.
   */
  static start() {
    // initialize the SourceManager
    SourceManager.init();

    // schedule the cron jobs
    cron.schedule(this.EVERY_MINUTE, () => {
      try {
        // do stuff
        console.log("running a task every minute");
      } catch (error) {
        //do something with error (ideally log)
      }
    });

    //test SourceJob
    let job = new SourceJob("https://www.google.com");
    console.log(job);
  }
}

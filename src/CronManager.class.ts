import { SourceManager } from "./SourceManager.class";

var cron = require("node-cron");

export class CronManager {
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
      console.log("running a task every minute");
    });
  }
}

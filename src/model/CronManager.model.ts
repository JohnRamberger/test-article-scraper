import { SourceJob } from "./SourceJob.model";
import { SourceManager } from "./SourceManager.model";

import * as Log from "log";
var cron = require("node-cron");

/**
 * Manages the cron jobs.
 */
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
    cron.schedule(this.EVERY_5_SECONDS, () => {
      try {
        // do stuff
        console.log("running a task every minute");
        // create a new test job
        let job = new SourceJob(
          "https://medium.com/dev-genius/how-to-implement-infinite-scroll-with-apollo-clients-fetch-more-and-react-376d6ad8bba6"
        );
        console.log(job);
      } catch (error) {
        //do something with error (ideally log)
        Log.error(error);
      }
    });
  }
}

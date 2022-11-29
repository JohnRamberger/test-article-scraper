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
    SourceManager.init();
    SourceManager.queue.enqueue(1);
    SourceManager.queue.enqueue(2);
    SourceManager.queue.enqueue(3);
    SourceManager.queue.enqueue(4);
    // let i = 0;
    cron.schedule(this.EVERY_MINUTE, () => {
      console.log(SourceManager.queue.dequeue());
      // i++;
    });
  }
}

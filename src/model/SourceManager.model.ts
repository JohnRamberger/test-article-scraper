import { Queue } from "./Queue.model";

export class SourceManager {
  /**
   * The queue of sources to be processed.
   */
  static queue: Queue<string>;
  /**
   * Initializes the queue.
   */
  static init() {
    this.queue = new Queue();
  }
}

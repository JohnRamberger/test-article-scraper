import { Queue } from "./Queue.class";

export class SourceManager {
  static queue: Queue;
  static init() {
    this.queue = new Queue();
  }
}

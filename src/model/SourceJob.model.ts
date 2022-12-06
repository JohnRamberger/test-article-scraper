import { v4 as uuid } from "uuid";

export enum JobStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  QUEUED = "QUEUED",
  CANCELLED = "CANCELLED",
  UNKNOWN = "UNKNOWN",
}

export enum JobType {
  CATALOG = "CATALOG",
  ARTICLE = "ARTICLE",
  UNKNOWN = "UNKNOWN",
}

/**
 * A job to be processed by the SourceManager.
 */
export class SourceJob {
  /**
   * The id of the job.
   */
  protected _id: string;
  /**
   * The id of the job.
   */
  get id(): string {
    return this._id;
  }
  /**
   * The status of the job.
   * @see JobStatus
   * @see JobStatus.PENDING
   * @see JobStatus.IN_PROGRESS
   * @see JobStatus.COMPLETED
   * @see JobStatus.FAILED
   * @see JobStatus.QUEUED
   * @see JobStatus.CANCELLED
   * @see JobStatus.UNKNOWN
   */
  protected _status: JobStatus;

  /**
   * The status of the job.
   */
  get status(): JobStatus {
    return this._status;
  }

  /**
   * The type of the job.
   * @see JobType
   * @see JobType.CATALOG
   * @see JobType.ARTICLE
   * @see JobType.UNKNOWN
   */
  protected _type: JobType;

  get type() {
    return this._type;
  }

  /**
   * The url of the source.
   */
  protected _url: string;
  /**
   * The url of the source.
   */
  get url(): string {
    return this._url;
  }

  /**
   * Creates a new SourceJob.
   * @param url The url of the source.
   */
  constructor(url: string) {
    this._id = uuid();
    this._status = JobStatus.PENDING;
    this._url = url;
  }

  toString() {
    return JSON.stringify(this);
  }
}

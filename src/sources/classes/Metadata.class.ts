export class Metadata {
  /**
   * The original url of the source
   */
  url: string;
  /**
   * The base url of the source
   */
  baseurl: string;
  /**
   * Title of the article
   */
  title: string;
  /**
   * A title with no spaces and only alphanumeric characters
   */
  titleSafe: string;
  /**
   * The author of the article
   */
  author: string;
  /**
   * The posting date of the article
   */
  date: string;
  /**
   * Relevant tags for the article
   */
  tags?: string[];
  /**
   * Description of the article
   */
  description: string;
  /**
   * Image (url) for the article
   */
  image?: string;
  /**
   * Caption of the image
   */
  imageCaption?: string;

  constructor() {}
}

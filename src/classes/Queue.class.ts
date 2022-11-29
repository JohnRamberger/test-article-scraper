/**
 * A queue of items.
 */
export class Queue<T> {
  protected elements: T[];
  protected head: number;
  protected tail: number;

  constructor() {
    this.elements = [];
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element: T) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get size() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.size === 0;
  }
  get list() {
    return this.elements;
  }
}

// let q = new Queue();
// for (let i = 1; i <= 7; i++) {
//   q.enqueue(i);
// }
// // get the current item at the front of the queue
// // console.log(q.peek()); // 1

// // get the current length of queue
// // console.log(q.length); // 7

// // dequeue all elements
// while (!q.isEmpty) {
// //   console.log(q.dequeue());
// }

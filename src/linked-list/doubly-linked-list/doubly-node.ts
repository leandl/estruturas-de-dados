export class DoublyNode<T> {
  public next?: DoublyNode<T>;
  public prev?: DoublyNode<T>;
  constructor(public element: T) {}
}
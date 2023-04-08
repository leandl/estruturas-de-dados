export class Node<T> {
  public next?: Node<T>; 
  constructor(public element: T) {}
}
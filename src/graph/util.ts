import { Graph, GraphType } from "./graph";

export enum Color {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

export interface IToString {
  toString(): string;
}

export function initializeColors<T extends IToString>(
  graph: Graph<T>
): Record<string, Color> {
  return graph.getVertices().reduce((colors, vertex) => {
    const keyV = vertex.toString();
    colors[keyV] = Color.WHITE;
    return colors;
  }, {} as Record<string, Color>);
}

export function getGraphDefault(graphType: GraphType = GraphType.UNDIRECTED) {
  const graph = new Graph<string>(graphType);

  const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  myVertices.forEach((v) => graph.addVertex(v));

  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("A", "D");

  graph.addEdge("C", "D");
  graph.addEdge("C", "G");

  graph.addEdge("D", "G");
  graph.addEdge("D", "H");

  graph.addEdge("B", "E");
  graph.addEdge("B", "F");

  graph.addEdge("E", "I");

  return graph;
}

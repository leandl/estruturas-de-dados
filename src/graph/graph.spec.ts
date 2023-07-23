import { Graph, GraphType } from "./graph";

describe("testing the Graph structure", () => {
  test("create the Undirected Graph structure", () => {
    const graph = new Graph<string>(GraphType.UNDIRECTED);

    const myVertices = ["A", "B", "C", "D"];
    myVertices.forEach((v) => graph.addVertex(v));

    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("A", "D");

    expect(graph.get("A")?.includes("B")).toBe(true);
    expect(graph.get("B")?.includes("A")).toBe(true);

    expect(graph.get("B")?.includes("C")).toBe(true);
    expect(graph.get("C")?.includes("B")).toBe(true);

    expect(graph.get("A")?.includes("D")).toBe(true);
    expect(graph.get("D")?.includes("A")).toBe(true);

    expect(graph.get("A")?.includes("C")).toBe(false);
    expect(graph.get("C")?.includes("A")).toBe(false);
  });

  test("create the Directed Graph structure", () => {
    const graph = new Graph<string>(GraphType.DIRECTED);

    const myVertices = ["A", "B"];
    myVertices.forEach((v) => graph.addVertex(v));

    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("A", "D");
    graph.addEdge("D", "A");

    expect(graph.get("A")?.includes("B")).toBe(true);
    expect(graph.get("B")?.includes("A")).toBe(false);

    expect(graph.get("B")?.includes("C")).toBe(true);
    expect(graph.get("C")?.includes("B")).toBe(false);

    expect(graph.get("A")?.includes("D")).toBe(true);
    expect(graph.get("D")?.includes("A")).toBe(true);

    expect(graph.get("A")?.includes("C")).toBe(false);
    expect(graph.get("C")?.includes("A")).toBe(false);
  });
});

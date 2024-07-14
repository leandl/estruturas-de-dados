import { StackArray } from "../../stack/stack-array/stack-array";
import { Graph, GraphType } from "../graph";
import { getGraphDefault, initializeColors } from "../util";
import { depthFirstSearch, depthFirstSearchVisit } from "./depth-first-search";

describe("testing the Algorithm Depth First Search", () => {
  test("use the Algorithm Depth First Search Visit", () => {
    const graph = getGraphDefault();
    const testVertices = ["A", "B", "E", "I", "F", "C", "D", "G", "H"];
    const colors = initializeColors(graph);

    const verticesInDepthFirstSearchVisit = [] as string[];
    const callbackDepthFirstSearchVisit = (v: string) =>
      verticesInDepthFirstSearchVisit.push(v);

    depthFirstSearchVisit("A", graph, colors, callbackDepthFirstSearchVisit);

    expect(verticesInDepthFirstSearchVisit.toString()).toBe(
      testVertices.toLocaleString()
    );
  });

  test("use the Algorithm Depth First Search", () => {
    const graph = new Graph(GraphType.DIRECTED);
    const myVertices = ["A", "B", "C", "D", "E", "F"];

    for (const vertice of myVertices) {
      graph.addVertex(vertice);
    }

    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("B", "C");
    graph.addEdge("B", "E");
    graph.addEdge("C", "F");
    graph.addEdge("F", "E");

    const result = depthFirstSearch(graph);

    const expectedExecutionOrder = "B - A - D - C - F - E";
    const executionOrderInArray: string[] = [];

    const finishedTimes = result.finished;

    for (let count = 0; count < myVertices.length; count++) {
      let max = 0;
      let maxName: string = "";

      for (const vertice of myVertices) {
        if (finishedTimes[vertice] > max) {
          max = finishedTimes[vertice];
          maxName = vertice;
        }
      }

      executionOrderInArray.push(maxName);
      delete finishedTimes[maxName];
    }

    const executionOrder = executionOrderInArray.join(" - ");
    expect(executionOrder).toBe(expectedExecutionOrder);
  });
});

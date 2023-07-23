import { StackArray } from "../../stack/stack-array/stack-array";
import { getGraphDefault } from "../util";
import {
  breadthFirstSearch,
  breadthFirstSearchVisit,
} from "./breadth-first-search";

describe("testing the Algorithm Breadth First Search", () => {
  test("use the Algorithm Breadth First Search Visit", () => {
    const graph = getGraphDefault();
    const testVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const verticesInBreadthFirstSearchVisit = [] as string[];

    const callbackBreadthFirstSearchVisit = (v: string) =>
      verticesInBreadthFirstSearchVisit.push(v);
    breadthFirstSearchVisit(graph, "A", callbackBreadthFirstSearchVisit);

    expect(verticesInBreadthFirstSearchVisit.toString()).toBe(
      testVertices.toLocaleString()
    );
  });

  test("use the Algorithm Breadth First Search", () => {
    const graph = getGraphDefault();

    const testPathVertices = [
      ["B", ["A", "B"]],
      ["C", ["A", "C"]],
      ["D", ["A", "D"]],
      ["E", ["A", "B", "E"]],
      ["F", ["A", "B", "F"]],
      ["G", ["A", "C", "G"]],
      ["H", ["A", "D", "H"]],
      ["I", ["A", "B", "E", "I"]],
    ] as [string, string[]][];

    const shortesPathA = breadthFirstSearch(graph, "A");

    const fromVertex = "A";
    for (let testPathVertice of testPathVertices) {
      const [vertex, testPath] = testPathVertice;
      const path = new StackArray<string>();
      for (
        let v: string = vertex;
        v !== fromVertex;
        v = shortesPathA.predecessors[v]!
      ) {
        path.push(v);
      }

      path.push(fromVertex);
      while (!path.isEmpty()) {
        const p = path.pop()!;
        const tp = testPath.shift()!;

        expect(p.toString()).toBe(tp.toString());
      }
    }
  });
});

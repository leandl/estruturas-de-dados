import { Queue } from "../../queue/queue";
import { Graph } from "../graph";
import { Color, IToString, initializeColors } from "../util";

type CallbackBreadthFirstSearchVisit<T extends IToString> = (v: T) => void;
export function breadthFirstSearchVisit<T extends IToString>(
  graph: Graph<T>,
  startVertex: T,
  callback?: CallbackBreadthFirstSearchVisit<T>
) {
  const colors = initializeColors(graph);
  const queue = new Queue<T>();
  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue()!;
    const vertexString = vertex.toString();
    colors[vertexString] = Color.GREY;

    const neighbors = graph.get(vertex) || [];
    neighbors?.forEach((neighbor) => {
      const neighborString = neighbor.toString();
      if (colors[neighborString] === Color.WHITE) {
        colors[neighborString] = Color.GREY;
        queue.enqueue(neighbor);
      }
    });

    colors[vertexString] = Color.BLACK;
    if (callback) {
      callback(vertex);
    }
  }
}

export function breadthFirstSearch<T extends IToString>(
  graph: Graph<T>,
  startVertex: T
) {
  const colors = initializeColors(graph);
  const queue = new Queue<T>();
  queue.enqueue(startVertex);

  const distances = {} as Record<string, number>;
  const predecessors = {} as Record<string, T | null>;

  for (let vertex of graph.getVertices()) {
    const vertexString = vertex.toString();

    distances[vertexString] = 0;
    predecessors[vertexString] = null;
  }

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue()!;
    const vertexString = vertex.toString();
    colors[vertexString] = Color.GREY;

    const neighbors = graph.get(vertex) || [];
    neighbors?.forEach((neighbor) => {
      const neighborString = neighbor.toString();
      if (colors[neighborString] === Color.WHITE) {
        colors[neighborString] = Color.GREY;
        distances[neighborString] = distances[vertexString] + 1;
        predecessors[neighborString] = vertex;
        queue.enqueue(neighbor);
      }
    });
  }

  return {
    distances,
    predecessors,
  };
}

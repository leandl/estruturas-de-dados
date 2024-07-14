import { Graph } from "../graph";
import { Color, initializeColors, IToString } from "../util";

type DepthFirstSearchData<T extends IToString = IToString> = {
  discovery: Record<string, number>;
  finished: Record<string, number>;
  predecessors: Record<string, T | null>;
};

type DepthFirstSearchTime = {
  count: number;
};

type DepthFirstSearchVisitController<T extends IToString = IToString> = {
  data: DepthFirstSearchData<T>;
  time: DepthFirstSearchTime;
};

export function depthFirstSearch<T extends IToString = IToString>(
  graph: Graph<T>,
  callback?: (vertice: T) => void
) {
  const vertices = graph.getVertices();
  const colors = initializeColors(graph);

  const controller: DepthFirstSearchVisitController<T> = {
    time: { count: 0 },
    data: {
      discovery: {},
      finished: {},
      predecessors: {},
    },
  };

  for (const vertice of vertices) {
    const currentKey = vertice.toString();
    controller.data.discovery[currentKey] = 0;
    controller.data.finished[currentKey] = 0;
    controller.data.predecessors[currentKey] = null;
  }

  for (const vertice of vertices) {
    const currentKey = vertice.toString();

    if (colors[currentKey] === Color.WHITE) {
      depthFirstSearchVisit(vertice, graph, colors, callback, controller);
    }
  }

  return controller.data;
}

export function depthFirstSearchVisit<T extends IToString = IToString>(
  currentVertice: T,
  graph: Graph<T>,
  colors: Record<string, Color>,
  callback?: (vertice: T) => void,
  controller?: DepthFirstSearchVisitController<T>
) {
  const currentKey = currentVertice.toString();
  colors[currentKey] = Color.GREY;

  if (controller) {
    controller.time.count += 1;
    controller.data.discovery[currentKey] = controller.time.count;
  }

  if (callback) {
    callback(currentVertice);
  }

  const neighbors = graph.get(currentVertice) || [];
  for (const neighbor of neighbors) {
    const neighborKey = neighbor.toString();

    if (colors[neighborKey] === Color.WHITE) {
      if (controller) {
        controller.data.predecessors[neighborKey] = currentVertice;
      }

      depthFirstSearchVisit(neighbor, graph, colors, callback, controller);
    }
  }

  colors[currentKey] = Color.BLACK;
  if (controller) {
    controller.time.count += 1;
    controller.data.finished[currentKey] = controller.time.count;
  }
}

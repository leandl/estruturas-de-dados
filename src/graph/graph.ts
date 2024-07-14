import { Dictionary } from "../dictionary/dictionary";
import { IToString } from "./util";

export enum GraphType {
  DIRECTED = "DIRECTED",
  UNDIRECTED = "UNDIRECTED",
}

export class Graph<T extends IToString = IToString> {
  private vertices: T[] = [];
  private adjList = new Dictionary<string, T[]>();

  constructor(private graphType: GraphType = GraphType.UNDIRECTED) {}

  addVertex(v: T) {
    const key = v.toString();
    if (!this.adjList.get(key)) {
      this.vertices.push(v);
      this.adjList.set(key, []);
    }
  }

  addEdge(v: T, w: T) {
    const keyV = v.toString();
    const keyW = w.toString();

    if (!this.adjList.get(keyV)) {
      this.addVertex(v);
    }

    if (!this.adjList.get(keyW)) {
      this.addVertex(w);
    }

    this.adjList.get(keyV)?.push(w);
    if (this.graphType === GraphType.UNDIRECTED) {
      this.adjList.get(keyW)?.push(v);
    }
  }

  get(v: T) {
    const key = v.toString();
    return this.adjList.get(key) || null;
  }

  getVertices() {
    return this.vertices;
  }

  toString(): string {
    return this.vertices.reduce((acc, v) => {
      const keyV = v.toString();
      const neighbors = this.adjList.get(keyV) || [];
      const neighborsString = neighbors.join(" ");

      return acc + `${v} -> ${neighborsString}\n`;
    }, "");
  }
}

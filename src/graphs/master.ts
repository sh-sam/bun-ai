import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";

import { masterNode } from "@nodes/master";

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("master", masterNode)
  .addEdge("__start__", "master")
  // .addEdge("master", "master");

export const graph = workflow.compile();

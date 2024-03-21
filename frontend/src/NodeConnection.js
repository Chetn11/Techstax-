export function isNodeConnected(nodes, edges) {
    const allEdges = edges.map((edge) => edge.source);
    const NodesId = nodes.map((node) => node.id);
    let count = 0;
    for (let i = 0; i < NodesId.length; i++) {
      if (!allEdges.includes(NodesId[i])) count++;
    }
    if (count >= 2) {
      return false;
    }
    return true;
  }
  
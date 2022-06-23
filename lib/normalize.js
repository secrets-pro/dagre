import _ from "./lodash";
import util from "./util";

export function run(g) {
  g.graph().dummyChains = [];
  _.forEach(g.edges(),function (edge) { normalizeEdge(g,edge); });
}

function normalizeEdge(g,e) {
  var v = e.v;
  var vRank = g.node(v).rank;
  var w = e.w;
  var wRank = g.node(w).rank;
  var name = e.name;
  var edgeLabel = g.edge(e);
  var labelRank = edgeLabel.labelRank;

  if (wRank === vRank + 1) return;

  g.removeEdge(e);

  var dummy,attrs,i;
  for (i = 0,++vRank; vRank < wRank; ++i,++vRank) {
    edgeLabel.points = [];
    attrs = {
      width: 0,height: 0,
      edgeLabel: edgeLabel,edgeObj: e,
      rank: vRank
    };
    dummy = util.addDummyNode(g,"edge",attrs,"_d");
    if (vRank === labelRank) {
      attrs.width = edgeLabel.width;
      attrs.height = edgeLabel.height;
      attrs.dummy = "edge-label";
      attrs.labelpos = edgeLabel.labelpos;
    }
    g.setEdge(v,dummy,{ weight: edgeLabel.weight },name);
    if (i === 0) {
      g.graph().dummyChains.push(dummy);
    }
    v = dummy;
  }

  g.setEdge(v,w,{ weight: edgeLabel.weight },name);
}

export function undo(g) {
  _.forEach(g.graph().dummyChains,function (v) {
    var node = g.node(v);
    var origLabel = node.edgeLabel;
    var w;
    g.setEdge(node.edgeObj,origLabel);
    while (node.dummy) {
      w = g.successors(v)[0];
      g.removeNode(v);
      origLabel.points.push({ x: node.x,y: node.y });
      if (node.dummy === "edge-label") {
        origLabel.x = node.x;
        origLabel.y = node.y;
        origLabel.width = node.width;
        origLabel.height = node.height;
      }
      v = w;
      node = g.node(v);
    }
  });
}

export default {
  run: run,
  undo: undo
}
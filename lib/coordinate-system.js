
import _ from "./lodash";



export function adjust(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "lr" || rankDir === "rl") {
    swapWidthHeight(g);
  }
}

export function undo(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "bt" || rankDir === "rl") {
    reverseY(g);
  }

  if (rankDir === "lr" || rankDir === "rl") {
    swapXY(g);
    swapWidthHeight(g);
  }
}

function swapWidthHeight(g) {
  _.forEach(g.nodes(),function (v) { swapWidthHeightOne(g.node(v)); });
  _.forEach(g.edges(),function (e) { swapWidthHeightOne(g.edge(e)); });
}

function swapWidthHeightOne(attrs) {
  var w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}

function reverseY(g) {
  _.forEach(g.nodes(),function (v) { reverseYOne(g.node(v)); });

  _.forEach(g.edges(),function (e) {
    var edge = g.edge(e);
    _.forEach(edge.points,reverseYOne);
    if (_.has(edge,"y")) {
      reverseYOne(edge);
    }
  });
}

function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}

function swapXY(g) {
  _.forEach(g.nodes(),function (v) { swapXYOne(g.node(v)); });

  _.forEach(g.edges(),function (e) {
    var edge = g.edge(e);
    _.forEach(edge.points,swapXYOne);
    if (_.has(edge,"x")) {
      swapXYOne(edge);
    }
  });
}

function swapXYOne(attrs) {
  var x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}


export default {
  adjust: adjust,
  undo: undo
}
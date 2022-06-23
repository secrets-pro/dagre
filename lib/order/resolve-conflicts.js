
import _ from "../lodash";


export default function resolveConflicts(entries,cg) {
  var mappedEntries = {};
  _.forEach(entries,function (entry,i) {
    var tmp = mappedEntries[entry.v] = {
      indegree: 0,
      "in": [],
      out: [],
      vs: [entry.v],
      i: i
    };
    if (!_.isUndefined(entry.barycenter)) {
      tmp.barycenter = entry.barycenter;
      tmp.weight = entry.weight;
    }
  });

  _.forEach(cg.edges(),function (e) {
    var entryV = mappedEntries[e.v];
    var entryW = mappedEntries[e.w];
    if (!_.isUndefined(entryV) && !_.isUndefined(entryW)) {
      entryW.indegree++;
      entryV.out.push(mappedEntries[e.w]);
    }
  });

  var sourceSet = _.filter(mappedEntries,function (entry) {
    return !entry.indegree;
  });

  return doResolveConflicts(sourceSet);
}

function doResolveConflicts(sourceSet) {
  var entries = [];

  function handleIn(vEntry) {
    return function (uEntry) {
      if (uEntry.merged) {
        return;
      }
      if (_.isUndefined(uEntry.barycenter) ||
        _.isUndefined(vEntry.barycenter) ||
        uEntry.barycenter >= vEntry.barycenter) {
        mergeEntries(vEntry,uEntry);
      }
    };
  }

  function handleOut(vEntry) {
    return function (wEntry) {
      wEntry["in"].push(vEntry);
      if (--wEntry.indegree === 0) {
        sourceSet.push(wEntry);
      }
    };
  }

  while (sourceSet.length) {
    var entry = sourceSet.pop();
    entries.push(entry);
    _.forEach(entry["in"].reverse(),handleIn(entry));
    _.forEach(entry.out,handleOut(entry));
  }

  return _.map(_.filter(entries,function (entry) { return !entry.merged; }),
    function (entry) {
      return _.pick(entry,["vs","i","barycenter","weight"]);
    });

}

function mergeEntries(target,source) {
  var sum = 0;
  var weight = 0;

  if (target.weight) {
    sum += target.barycenter * target.weight;
    weight += target.weight;
  }

  if (source.weight) {
    sum += source.barycenter * source.weight;
    weight += source.weight;
  }

  target.vs = source.vs.concat(target.vs);
  target.barycenter = sum / weight;
  target.weight = weight;
  target.i = Math.min(source.i,target.i);
  source.merged = true;
}

import e from"graphlib";import n from"lodash";function r(){var e={};e._next=e._prev=e,this._sentinel=e}function t(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function o(e,n){if("_next"!==e&&"_prev"!==e)return n}r.prototype.dequeue=function(){var e=this._sentinel,n=e._prev;if(n!==e)return t(n),n},r.prototype.enqueue=function(e){var n=this._sentinel;e._prev&&e._next&&t(e),e._next=n._next,n._next._prev=e,n._next=e,e._prev=n},r.prototype.toString=function(){for(var e=[],n=this._sentinel,r=n._prev;r!==n;)e.push(JSON.stringify(r,o)),r=r._prev;return"["+e.join(", ")+"]"};var a=e.Graph;function i(e,t){if(e.nodeCount()<=1)return[];var o=function(e,t){var o=new a,i=0,u=0;n.forEach(e.nodes(),(function(e){o.setNode(e,{v:e,in:0,out:0})})),n.forEach(e.edges(),(function(e){var n=o.edge(e.v,e.w)||0,r=t(e),a=n+r;o.setEdge(e.v,e.w,a),u=Math.max(u,o.node(e.v).out+=r),i=Math.max(i,o.node(e.w).in+=r)}));var c=n.range(u+i+3).map((function(){return new r})),f=i+1;return n.forEach(o.nodes(),(function(e){d(c,f,o.node(e))})),{graph:o,buckets:c,zeroIdx:f}}(e,t||1),i=function(e,n,r){var t,o=[],a=n[n.length-1],i=n[0];for(;e.nodeCount();){for(;t=i.dequeue();)u(e,n,r,t);for(;t=a.dequeue();)u(e,n,r,t);if(e.nodeCount())for(var d=n.length-2;d>0;--d)if(t=n[d].dequeue()){o=o.concat(u(e,n,r,t,!0));break}}return o}(o.graph,o.buckets,o.zeroIdx);return n.flatten(n.map(i,(function(n){return e.outEdges(n.v,n.w)})),!0)}function u(e,r,t,o,a){var i=a?[]:void 0;return n.forEach(e.inEdges(o.v),(function(n){var o=e.edge(n),u=e.node(n.v);a&&i.push({v:n.v,w:n.w}),u.out-=o,d(r,t,u)})),n.forEach(e.outEdges(o.v),(function(n){var o=e.edge(n),a=n.w,i=e.node(a);i.in-=o,d(r,t,i)})),e.removeNode(o.v),i}function d(e,n,r){r.out?r.in?e[r.out-r.in+n].enqueue(r):e[e.length-1].enqueue(r):e[0].enqueue(r)}var c={run:function(e){var r="greedy"===e.graph().acyclicer?i(e,function(e){return function(n){return e.edge(n).weight}}(e)):function(e){var r=[],t={},o={};function a(i){n.has(o,i)||(o[i]=!0,t[i]=!0,n.forEach(e.outEdges(i),(function(e){n.has(t,e.w)?r.push(e):a(e.w)})),delete t[i])}return n.forEach(e.nodes(),a),r}(e);n.forEach(r,(function(r){var t=e.edge(r);e.removeEdge(r),t.forwardName=r.name,t.reversed=!0,e.setEdge(r.w,r.v,t,n.uniqueId("rev"))}))},undo:function(e){n.forEach(e.edges(),(function(n){var r=e.edge(n);if(r.reversed){e.removeEdge(n);var t=r.forwardName;delete r.reversed,delete r.forwardName,e.setEdge(n.w,n.v,r,t)}}))}},f=e.Graph,h={addDummyNode:s,simplify:g,asNonCompoundGraph:function(e){var r=new f({multigraph:e.isMultigraph()}).setGraph(e.graph());return n.forEach(e.nodes(),(function(n){e.children(n).length||r.setNode(n,e.node(n))})),n.forEach(e.edges(),(function(n){r.setEdge(n,e.edge(n))})),r},successorWeights:function(e){var r=n.map(e.nodes(),(function(r){var t={};return n.forEach(e.outEdges(r),(function(n){t[n.w]=(t[n.w]||0)+e.edge(n).weight})),t}));return n.zipObject(e.nodes(),r)},predecessorWeights:function(e){var r=n.map(e.nodes(),(function(r){var t={};return n.forEach(e.inEdges(r),(function(n){t[n.v]=(t[n.v]||0)+e.edge(n).weight})),t}));return n.zipObject(e.nodes(),r)},intersectRect:function(e,n){var r,t,o=e.x,a=e.y,i=n.x-o,u=n.y-a,d=e.width/2,c=e.height/2;if(!i&&!u)throw new Error("Not possible to find intersection inside of the rectangle");Math.abs(u)*d>Math.abs(i)*c?(u<0&&(c=-c),r=c*i/u,t=c):(i<0&&(d=-d),r=d,t=d*u/i);return{x:o+r,y:a+t}},buildLayerMatrix:function(e){var r=n.map(n.range(p(e)+1),(function(){return[]}));return n.forEach(e.nodes(),(function(t){var o=e.node(t),a=o.rank;n.isUndefined(a)||(r[a][o.order]=t)})),r},normalizeRanks:v,removeEmptyRanks:l,addBorderNode:function(e,n,r,t){var o={width:0,height:0};arguments.length>=4&&(o.rank=r,o.order=t);return s(e,"border",o,n)},maxRank:p,partition:function(e,r){var t={lhs:[],rhs:[]};return n.forEach(e,(function(e){r(e)?t.lhs.push(e):t.rhs.push(e)})),t},time:m,notime:E};function s(e,r,t,o){var a;do{a=n.uniqueId(o)}while(e.hasNode(a));return t.dummy=r,e.setNode(a,t),a}function g(e){var r=(new f).setGraph(e.graph());return n.forEach(e.nodes(),(function(n){r.setNode(n,e.node(n))})),n.forEach(e.edges(),(function(n){var t=r.edge(n.v,n.w)||{weight:0,minlen:1},o=e.edge(n);r.setEdge(n.v,n.w,{weight:t.weight+o.weight,minlen:Math.max(t.minlen,o.minlen)})})),r}function v(e){var r=n.min(n.map(e.nodes(),(function(n){return e.node(n).rank})));n.forEach(e.nodes(),(function(t){var o=e.node(t);n.has(o,"rank")&&(o.rank-=r)}))}function l(e){var r=n.min(n.map(e.nodes(),(function(n){return e.node(n).rank}))),t=[];n.forEach(e.nodes(),(function(n){var o=e.node(n).rank-r;t[o]||(t[o]=[]),t[o].push(n)}));var o=0,a=e.graph().nodeRankFactor;n.forEach(t,(function(r,t){n.isUndefined(r)&&t%a!=0?--o:o&&n.forEach(r,(function(n){e.node(n).rank+=o}))}))}function p(e){return n.max(n.map(e.nodes(),(function(r){var t=e.node(r).rank;if(!n.isUndefined(t))return t})))}function m(e,r){var t=n.now();try{return r()}finally{console.log(e+" time: "+(n.now()-t)+"ms")}}function E(e,n){return n()}var w={run:function(e){e.graph().dummyChains=[],n.forEach(e.edges(),(function(n){!function(e,n){var r,t,o,a=n.v,i=e.node(a).rank,u=n.w,d=e.node(u).rank,c=n.name,f=e.edge(n),s=f.labelRank;if(d===i+1)return;for(e.removeEdge(n),o=0,++i;i<d;++o,++i)f.points=[],t={width:0,height:0,edgeLabel:f,edgeObj:n,rank:i},r=h.addDummyNode(e,"edge",t,"_d"),i===s&&(t.width=f.width,t.height=f.height,t.dummy="edge-label",t.labelpos=f.labelpos),e.setEdge(a,r,{weight:f.weight},c),0===o&&e.graph().dummyChains.push(r),a=r;e.setEdge(a,u,{weight:f.weight},c)}(e,n)}))},undo:function(e){n.forEach(e.graph().dummyChains,(function(n){var r,t=e.node(n),o=t.edgeLabel;for(e.setEdge(t.edgeObj,o);t.dummy;)r=e.successors(n)[0],e.removeNode(n),o.points.push({x:t.x,y:t.y}),"edge-label"===t.dummy&&(o.x=t.x,o.y=t.y,o.width=t.width,o.height=t.height),n=r,t=e.node(n)}))}};function b(e){var r={};n.forEach(e.sources(),(function t(o){var a=e.node(o);if(n.has(r,o))return a.rank;r[o]=!0;var i=n.min(n.map(e.outEdges(o),(function(n){return t(n.w)-e.edge(n).minlen})));return i!==Number.POSITIVE_INFINITY&&null!=i||(i=0),a.rank=i}))}function y(e,n){return e.node(n.w).rank-e.node(n.v).rank-e.edge(n).minlen}var x=b,k=e.Graph;function N(e){var n,r,t=new k({directed:!1}),o=e.nodes()[0],a=e.nodeCount();for(t.setNode(o,{});I(t,e)<a;)n=_(t,e),r=t.hasNode(n.v)?y(e,n):-y(e,n),R(t,e,r);return t}function I(e,r){return n.forEach(e.nodes(),(function t(o){n.forEach(r.nodeEdges(o),(function(n){var a=n.v,i=o===a?n.w:a;e.hasNode(i)||y(r,n)||(e.setNode(i,{}),e.setEdge(o,i,{}),t(i))}))})),e.nodeCount()}function _(e,r){return n.minBy(r.edges(),(function(n){if(e.hasNode(n.v)!==e.hasNode(n.w))return y(r,n)}))}function R(e,r,t){n.forEach(e.nodes(),(function(e){r.node(e).rank+=t}))}var L=e.alg.preorder,M=e.alg.postorder;function T(e){b(e=g(e));var n,r=N(e);for(B(r),C(r,e);n=S(r);)V(r,e,n,O(r,e,n))}function C(e,r){var t=M(e,e.nodes());t=t.slice(0,t.length-1),n.forEach(t,(function(n){!function(e,n,r){var t=e.node(r).parent;e.edge(r,t).cutvalue=G(e,n,r)}(e,r,n)}))}function G(e,r,t){var o=e.node(t).parent,a=!0,i=r.edge(t,o),u=0;return i||(a=!1,i=r.edge(o,t)),u=i.weight,n.forEach(r.nodeEdges(t),(function(n){var i,d,c=n.v===t,f=c?n.w:n.v;if(f!==o){var h=c===a,s=r.edge(n).weight;if(u+=h?s:-s,i=t,d=f,e.hasEdge(i,d)){var g=e.edge(t,f).cutvalue;u+=h?-g:g}}})),u}function B(e,n){arguments.length<2&&(n=e.nodes()[0]),P(e,{},1,n)}function P(e,r,t,o,a){var i=t,u=e.node(o);return r[o]=!0,n.forEach(e.neighbors(o),(function(a){n.has(r,a)||(t=P(e,r,t,a,o))})),u.low=i,u.lim=t++,a?u.parent=a:delete u.parent,t}function S(e){return n.find(e.edges(),(function(n){return e.edge(n).cutvalue<0}))}function O(e,r,t){var o=t.v,a=t.w;r.hasEdge(o,a)||(o=t.w,a=t.v);var i=e.node(o),u=e.node(a),d=i,c=!1;i.lim>u.lim&&(d=u,c=!0);var f=n.filter(r.edges(),(function(n){return c===j(e,e.node(n.v),d)&&c!==j(e,e.node(n.w),d)}));return n.minBy(f,(function(e){return y(r,e)}))}function V(e,r,t,o){var a=t.v,i=t.w;e.removeEdge(a,i),e.setEdge(o.v,o.w,{}),B(e),C(e,r),function(e,r){var t=n.find(e.nodes(),(function(e){return!r.node(e).parent})),o=L(e,t);o=o.slice(1),n.forEach(o,(function(n){var t=e.node(n).parent,o=r.edge(n,t),a=!1;o||(o=r.edge(t,n),a=!0),r.node(n).rank=r.node(t).rank+(a?o.minlen:-o.minlen)}))}(e,r)}function j(e,n,r){return r.low<=n.lim&&n.lim<=r.lim}T.initLowLimValues=B,T.initCutValues=C,T.calcCutValue=G,T.leaveEdge=S,T.enterEdge=O,T.exchangeEdges=V;var q=x;function F(e){switch(e.graph().ranker){case"network-simplex":default:z(e);break;case"tight-tree":!function(e){q(e),N(e)}(e);break;case"longest-path":U(e)}}var U=q;function z(e){T(e)}function D(e){var r=function(e){var r={},t=0;function o(a){var i=t;n.forEach(e.children(a),o),r[a]={low:i,lim:t++}}return n.forEach(e.children(),o),r}(e);n.forEach(e.graph().dummyChains,(function(n){for(var t=e.node(n),o=t.edgeObj,a=function(e,n,r,t){var o,a,i=[],u=[],d=Math.min(n[r].low,n[t].low),c=Math.max(n[r].lim,n[t].lim);o=r;do{o=e.parent(o),i.push(o)}while(o&&(n[o].low>d||c>n[o].lim));a=o,o=t;for(;(o=e.parent(o))!==a;)u.push(o);return{path:i.concat(u.reverse()),lca:a}}(e,r,o.v,o.w),i=a.path,u=a.lca,d=0,c=i[d],f=!0;n!==o.w;){if(t=e.node(n),f){for(;(c=i[d])!==u&&e.node(c).maxRank<t.rank;)d++;c===u&&(f=!1)}if(!f){for(;d<i.length-1&&e.node(c=i[d+1]).minRank<=t.rank;)d++;c=i[d]}e.setParent(n,c),n=e.successors(n)[0]}}))}function Y(e,r,t,o,a,i,u){var d=e.children(u);if(d.length){var c=h.addBorderNode(e,"_bt"),f=h.addBorderNode(e,"_bb"),s=e.node(u);e.setParent(c,u),s.borderTop=c,e.setParent(f,u),s.borderBottom=f,n.forEach(d,(function(n){Y(e,r,t,o,a,i,n);var d=e.node(n),h=d.borderTop?d.borderTop:n,s=d.borderBottom?d.borderBottom:n,g=d.borderTop?o:2*o,v=h!==s?1:a-i[u]+1;e.setEdge(c,h,{weight:g,minlen:v,nestingEdge:!0}),e.setEdge(s,f,{weight:g,minlen:v,nestingEdge:!0})})),e.parent(u)||e.setEdge(r,c,{weight:0,minlen:a+i[u]})}else u!==r&&e.setEdge(r,u,{weight:0,minlen:t})}var A={run:function(e){var r=h.addDummyNode(e,"root",{},"_root"),t=function(e){var r={};function t(o,a){var i=e.children(o);i&&i.length&&n.forEach(i,(function(e){t(e,a+1)})),r[o]=a}return n.forEach(e.children(),(function(e){t(e,1)})),r}(e),o=n.max(n.values(t))-1,a=2*o+1;e.graph().nestingRoot=r,n.forEach(e.edges(),(function(n){e.edge(n).minlen*=a}));var i=function(e){return n.reduce(e.edges(),(function(n,r){return n+e.edge(r).weight}),0)}(e)+1;n.forEach(e.children(),(function(n){Y(e,r,a,i,o,t,n)})),e.graph().nodeRankFactor=a},cleanup:function(e){var r=e.graph();e.removeNode(r.nestingRoot),delete r.nestingRoot,n.forEach(e.edges(),(function(n){e.edge(n).nestingEdge&&e.removeEdge(n)}))}};function W(e,n,r,t,o,a){var i={width:0,height:0,rank:a,borderType:n},u=o[n][a-1],d=h.addDummyNode(e,"border",i,r);o[n][a]=d,e.setParent(d,t),u&&e.setEdge(u,d,{weight:1})}function J(e){n.forEach(e.nodes(),(function(n){H(e.node(n))})),n.forEach(e.edges(),(function(n){H(e.edge(n))}))}function H(e){var n=e.width;e.width=e.height,e.height=n}function K(e){e.y=-e.y}function Q(e){var n=e.x;e.x=e.y,e.y=n}var X={adjust:function(e){var n=e.graph().rankdir.toLowerCase();"lr"!==n&&"rl"!==n||J(e)},undo:function(e){var r=e.graph().rankdir.toLowerCase();"bt"!==r&&"rl"!==r||function(e){n.forEach(e.nodes(),(function(n){K(e.node(n))})),n.forEach(e.edges(),(function(r){var t=e.edge(r);n.forEach(t.points,K),n.has(t,"y")&&K(t)}))}(e),"lr"!==r&&"rl"!==r||(!function(e){n.forEach(e.nodes(),(function(n){Q(e.node(n))})),n.forEach(e.edges(),(function(r){var t=e.edge(r);n.forEach(t.points,Q),n.has(t,"x")&&Q(t)}))}(e),J(e))}};function Z(e,n){for(var r=0,t=1;t<n.length;++t)r+=$(e,n[t-1],n[t]);return r}function $(e,r,t){for(var o=n.zipObject(t,n.map(t,(function(e,n){return n}))),a=n.flatten(n.map(r,(function(r){return n.sortBy(n.map(e.outEdges(r),(function(n){return{pos:o[n.w],weight:e.edge(n).weight}})),"pos")})),!0),i=1;i<t.length;)i<<=1;var u=2*i-1;i-=1;var d=n.map(new Array(u),(function(){return 0})),c=0;return n.forEach(a.forEach((function(e){var n=e.pos+i;d[n]+=e.weight;for(var r=0;n>0;)n%2&&(r+=d[n+1]),d[n=n-1>>1]+=e.weight;c+=e.weight*r}))),c}function ee(e,r){var t={};return n.forEach(e,(function(e,r){var o=t[e.v]={indegree:0,in:[],out:[],vs:[e.v],i:r};n.isUndefined(e.barycenter)||(o.barycenter=e.barycenter,o.weight=e.weight)})),n.forEach(r.edges(),(function(e){var r=t[e.v],o=t[e.w];n.isUndefined(r)||n.isUndefined(o)||(o.indegree++,r.out.push(t[e.w]))})),function(e){var r=[];function t(e){return function(r){r.merged||(n.isUndefined(r.barycenter)||n.isUndefined(e.barycenter)||r.barycenter>=e.barycenter)&&function(e,n){var r=0,t=0;e.weight&&(r+=e.barycenter*e.weight,t+=e.weight);n.weight&&(r+=n.barycenter*n.weight,t+=n.weight);e.vs=n.vs.concat(e.vs),e.barycenter=r/t,e.weight=t,e.i=Math.min(n.i,e.i),n.merged=!0}(e,r)}}function o(n){return function(r){r.in.push(n),0==--r.indegree&&e.push(r)}}for(;e.length;){var a=e.pop();r.push(a),n.forEach(a.in.reverse(),t(a)),n.forEach(a.out,o(a))}return n.map(n.filter(r,(function(e){return!e.merged})),(function(e){return n.pick(e,["vs","i","barycenter","weight"])}))}(n.filter(t,(function(e){return!e.indegree})))}function ne(e,r,t){for(var o;r.length&&(o=n.last(r)).i<=t;)r.pop(),e.push(o.vs),t++;return t}function re(e,r,t,o){var a=e.children(r),i=e.node(r),u=i?i.borderLeft:void 0,d=i?i.borderRight:void 0,c={};u&&(a=n.filter(a,(function(e){return e!==u&&e!==d})));var f=function(e,r){return n.map(r,(function(r){var t=e.inEdges(r);if(t.length){var o=n.reduce(t,(function(n,r){var t=e.edge(r),o=e.node(r.v);return{sum:n.sum+t.weight*o.order,weight:n.weight+t.weight}}),{sum:0,weight:0});return{v:r,barycenter:o.sum/o.weight,weight:o.weight}}return{v:r}}))}(e,a);n.forEach(f,(function(r){if(e.children(r.v).length){var a=re(e,r.v,t,o);c[r.v]=a,n.has(a,"barycenter")&&(i=r,u=a,n.isUndefined(i.barycenter)?(i.barycenter=u.barycenter,i.weight=u.weight):(i.barycenter=(i.barycenter*i.weight+u.barycenter*u.weight)/(i.weight+u.weight),i.weight+=u.weight))}var i,u}));var s=ee(f,t);!function(e,r){n.forEach(e,(function(e){e.vs=n.flatten(e.vs.map((function(e){return r[e]?r[e].vs:e})),!0)}))}(s,c);var g=function(e,r){var t,o=h.partition(e,(function(e){return n.has(e,"barycenter")})),a=o.lhs,i=n.sortBy(o.rhs,(function(e){return-e.i})),u=[],d=0,c=0,f=0;a.sort((t=!!r,function(e,n){return e.barycenter<n.barycenter?-1:e.barycenter>n.barycenter?1:t?n.i-e.i:e.i-n.i})),f=ne(u,i,f),n.forEach(a,(function(e){f+=e.vs.length,u.push(e.vs),d+=e.barycenter*e.weight,c+=e.weight,f=ne(u,i,f)}));var s={vs:n.flatten(u,!0)};return c&&(s.barycenter=d/c,s.weight=c),s}(s,o);if(u&&(g.vs=n.flatten([u,g.vs,d],!0),e.predecessors(u).length)){var v=e.node(e.predecessors(u)[0]),l=e.node(e.predecessors(d)[0]);n.has(g,"barycenter")||(g.barycenter=0,g.weight=0),g.barycenter=(g.barycenter*g.weight+v.order+l.order)/(g.weight+2),g.weight+=2}return g}var te=e.Graph;function oe(e,r,t){var o=function(e){var r;for(;e.hasNode(r=n.uniqueId("_root")););return r}(e),a=new te({compound:!0}).setGraph({root:o}).setDefaultNodeLabel((function(n){return e.node(n)}));return n.forEach(e.nodes(),(function(i){var u=e.node(i),d=e.parent(i);(u.rank===r||u.minRank<=r&&r<=u.maxRank)&&(a.setNode(i),a.setParent(i,d||o),n.forEach(e[t](i),(function(r){var t=r.v===i?r.w:r.v,o=a.edge(t,i),u=n.isUndefined(o)?0:o.weight;a.setEdge(t,i,{weight:e.edge(r).weight+u})})),n.has(u,"minRank")&&a.setNode(i,{borderLeft:u.borderLeft[r],borderRight:u.borderRight[r]}))})),a}var ae=e.Graph;function ie(e){var r=h.maxRank(e),t=ue(e,n.range(1,r+1),"inEdges"),o=ue(e,n.range(r-1,-1,-1),"outEdges"),a=function(e){var r={},t=n.filter(e.nodes(),(function(n){return!e.children(n).length})),o=n.max(n.map(t,(function(n){return e.node(n).rank}))),a=n.map(n.range(o+1),(function(){return[]})),i=n.sortBy(t,(function(n){return e.node(n).rank}));return n.forEach(i,(function t(o){if(!n.has(r,o)){r[o]=!0;var i=e.node(o);a[i.rank].push(o),n.forEach(e.successors(o),t)}})),a}(e);ce(e,a);for(var i,u=Number.POSITIVE_INFINITY,d=0,c=0;c<4;++d,++c){de(d%2?t:o,d%4>=2);var f=Z(e,a=h.buildLayerMatrix(e));f<u&&(c=0,i=n.cloneDeep(a),u=f)}ce(e,i)}function ue(e,r,t){return n.map(r,(function(n){return oe(e,n,t)}))}function de(e,r){var t=new ae;n.forEach(e,(function(e){var o=e.graph().root,a=re(e,o,t,r);n.forEach(a.vs,(function(n,r){e.node(n).order=r})),function(e,r,t){var o,a={};n.forEach(t,(function(n){for(var t,i,u=e.parent(n);u;){if((t=e.parent(u))?(i=a[t],a[t]=u):(i=o,o=u),i&&i!==u)return void r.setEdge(i,u);u=t}}))}(e,t,a.vs)}))}function ce(e,r){n.forEach(r,(function(r){n.forEach(r,(function(n,r){e.node(n).order=r}))}))}var fe=e.Graph,he=function(e){var r,t=h.buildLayerMatrix(e),o=n.merge(se(e,t),ge(e,t)),a={};n.forEach(["u","d"],(function(i){r="u"===i?t:n.values(t).reverse(),n.forEach(["l","r"],(function(t){"r"===t&&(r=n.map(r,(function(e){return n.values(e).reverse()})));var u=("u"===i?e.predecessors:e.successors).bind(e),d=pe(e,r,o,u),c=me(e,r,d.root,d.align,"r"===t);"r"===t&&(c=n.mapValues(c,(function(e){return-e}))),a[i+t]=c}))}));var i=Ee(e,a);return we(a,i),be(a,e.graph().align)};function se(e,r){var t={};return n.reduce(r,(function(r,o){var a=0,i=0,u=r.length,d=n.last(o);return n.forEach(o,(function(r,c){var f=function(e,r){if(e.node(r).dummy)return n.find(e.predecessors(r),(function(n){return e.node(n).dummy}))}(e,r),h=f?e.node(f).order:u;(f||r===d)&&(n.forEach(o.slice(i,c+1),(function(r){n.forEach(e.predecessors(r),(function(n){var o=e.node(n),i=o.order;!(i<a||h<i)||o.dummy&&e.node(r).dummy||ve(t,n,r)}))})),i=c+1,a=h)})),o})),t}function ge(e,r){var t={};function o(r,o,a,i,u){var d;n.forEach(n.range(o,a),(function(o){d=r[o],e.node(d).dummy&&n.forEach(e.predecessors(d),(function(n){var r=e.node(n);r.dummy&&(r.order<i||r.order>u)&&ve(t,n,d)}))}))}return n.reduce(r,(function(r,t){var a,i=-1,u=0;return n.forEach(t,(function(n,d){if("border"===e.node(n).dummy){var c=e.predecessors(n);c.length&&(a=e.node(c[0]).order,o(t,u,d,i,a),u=d,i=a)}o(t,u,t.length,a,r.length)})),t})),t}function ve(e,n,r){if(n>r){var t=n;n=r,r=t}var o=e[n];o||(e[n]=o={}),o[r]=!0}function le(e,r,t){if(r>t){var o=r;r=t,t=o}return n.has(e[r],t)}function pe(e,r,t,o){var a={},i={},u={};return n.forEach(r,(function(e){n.forEach(e,(function(e,n){a[e]=e,i[e]=e,u[e]=n}))})),n.forEach(r,(function(e){var r=-1;n.forEach(e,(function(e){var d=o(e);if(d.length){d=n.sortBy(d,(function(e){return u[e]}));for(var c=(d.length-1)/2,f=Math.floor(c),h=Math.ceil(c);f<=h;++f){var s=d[f];i[e]===e&&r<u[s]&&!le(t,e,s)&&(i[s]=e,i[e]=a[e]=a[s],r=u[s])}}}))})),{root:a,align:i}}function me(e,r,t,o,a){var i={},u=function(e,r,t,o){var a=new fe,i=e.graph(),u=function(e,r,t){return function(o,a,i){var u,d=o.node(a),c=o.node(i),f=0;if(f+=d.width/2,n.has(d,"labelpos"))switch(d.labelpos.toLowerCase()){case"l":u=-d.width/2;break;case"r":u=d.width/2}if(u&&(f+=t?u:-u),u=0,f+=(d.dummy?r:e)/2,f+=(c.dummy?r:e)/2,f+=c.width/2,n.has(c,"labelpos"))switch(c.labelpos.toLowerCase()){case"l":u=c.width/2;break;case"r":u=-c.width/2}return u&&(f+=t?u:-u),u=0,f}}(i.nodesep,i.edgesep,o);return n.forEach(r,(function(r){var o;n.forEach(r,(function(n){var r=t[n];if(a.setNode(r),o){var i=t[o],d=a.edge(i,r);a.setEdge(i,r,Math.max(u(e,n,o),d||0))}o=n}))})),a}(e,r,t,a),d=a?"borderLeft":"borderRight";function c(e,n){for(var r=u.nodes(),t=r.pop(),o={};t;)o[t]?e(t):(o[t]=!0,r.push(t),r=r.concat(n(t))),t=r.pop()}return c((function(e){i[e]=u.inEdges(e).reduce((function(e,n){return Math.max(e,i[n.v]+u.edge(n))}),0)}),u.predecessors.bind(u)),c((function(n){var r=u.outEdges(n).reduce((function(e,n){return Math.min(e,i[n.w]-u.edge(n))}),Number.POSITIVE_INFINITY),t=e.node(n);r!==Number.POSITIVE_INFINITY&&t.borderType!==d&&(i[n]=Math.max(i[n],r))}),u.successors.bind(u)),n.forEach(o,(function(e){i[e]=i[t[e]]})),i}function Ee(e,r){return n.minBy(n.values(r),(function(r){var t=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY;return n.forIn(r,(function(n,r){var a=function(e,n){return e.node(n).width}(e,r)/2;t=Math.max(n+a,t),o=Math.min(n-a,o)})),t-o}))}function we(e,r){var t=n.values(r),o=n.min(t),a=n.max(t);n.forEach(["u","d"],(function(t){n.forEach(["l","r"],(function(i){var u,d=t+i,c=e[d];if(c!==r){var f=n.values(c);(u="l"===i?o-n.min(f):a-n.max(f))&&(e[d]=n.mapValues(c,(function(e){return e+u})))}}))}))}function be(e,r){return n.mapValues(e.ul,(function(t,o){if(r)return e[r.toLowerCase()][o];var a=n.sortBy(n.map(e,o));return(a[1]+a[2])/2}))}var ye=he;function xe(e){(function(e){var r=h.buildLayerMatrix(e),t=e.graph().ranksep,o=0;n.forEach(r,(function(r){var a=n.max(n.map(r,(function(n){return e.node(n).height})));n.forEach(r,(function(n){e.node(n).y=o+a/2})),o+=a+t}))})(e=h.asNonCompoundGraph(e)),n.forEach(ye(e),(function(n,r){e.node(r).x=n}))}var ke=e.Graph;var Ne=["nodesep","edgesep","ranksep","marginx","marginy"],Ie={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},_e=["acyclicer","ranker","rankdir","align"],Re=["width","height"],Le={width:0,height:0},Me=["minlen","weight","width","height","labeloffset"],Te={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},Ce=["labelpos"];function Ge(e,r){return n.mapValues(n.pick(e,r),Number)}function Be(e){var r={};return n.forEach(e,(function(e,n){r[n.toLowerCase()]=e})),r}var Pe=e.Graph;var Se={graphlib:e,layout:function(e,r){var t=r&&r.debugTiming?h.time:h.notime;t("layout",(function(){var r=t("  buildLayoutGraph",(function(){return function(e){var r=new ke({multigraph:!0,compound:!0}),t=Be(e.graph());return r.setGraph(n.merge({},Ie,Ge(t,Ne),n.pick(t,_e))),n.forEach(e.nodes(),(function(t){var o=Be(e.node(t));r.setNode(t,n.defaults(Ge(o,Re),Le)),r.setParent(t,e.parent(t))})),n.forEach(e.edges(),(function(t){var o=Be(e.edge(t));r.setEdge(t,n.merge({},Te,Ge(o,Me),n.pick(o,Ce)))})),r}(e)}));t("  runLayout",(function(){!function(e,r){r("    makeSpaceForEdgeLabels",(function(){!function(e){var r=e.graph();r.ranksep/=2,n.forEach(e.edges(),(function(n){var t=e.edge(n);t.minlen*=2,"c"!==t.labelpos.toLowerCase()&&("TB"===r.rankdir||"BT"===r.rankdir?t.width+=t.labeloffset:t.height+=t.labeloffset)}))}(e)})),r("    removeSelfEdges",(function(){!function(e){n.forEach(e.edges(),(function(n){if(n.v===n.w){var r=e.node(n.v);r.selfEdges||(r.selfEdges=[]),r.selfEdges.push({e:n,label:e.edge(n)}),e.removeEdge(n)}}))}(e)})),r("    acyclic",(function(){c.run(e)})),r("    nestingGraph.run",(function(){A.run(e)})),r("    rank",(function(){F(h.asNonCompoundGraph(e))})),r("    injectEdgeLabelProxies",(function(){!function(e){n.forEach(e.edges(),(function(n){var r=e.edge(n);if(r.width&&r.height){var t=e.node(n.v),o={rank:(e.node(n.w).rank-t.rank)/2+t.rank,e:n};h.addDummyNode(e,"edge-proxy",o,"_ep")}}))}(e)})),r("    removeEmptyRanks",(function(){l(e)})),r("    nestingGraph.cleanup",(function(){A.cleanup(e)})),r("    normalizeRanks",(function(){v(e)})),r("    assignRankMinMax",(function(){!function(e){var r=0;n.forEach(e.nodes(),(function(t){var o=e.node(t);o.borderTop&&(o.minRank=e.node(o.borderTop).rank,o.maxRank=e.node(o.borderBottom).rank,r=n.max(r,o.maxRank))})),e.graph().maxRank=r}(e)})),r("    removeEdgeLabelProxies",(function(){!function(e){n.forEach(e.nodes(),(function(n){var r=e.node(n);"edge-proxy"===r.dummy&&(e.edge(r.e).labelRank=r.rank,e.removeNode(n))}))}(e)})),r("    normalize.run",(function(){w.run(e)})),r("    parentDummyChains",(function(){D(e)})),r("    addBorderSegments",(function(){!function(e){n.forEach(e.children(),(function r(t){var o=e.children(t),a=e.node(t);if(o.length&&n.forEach(o,r),n.has(a,"minRank")){a.borderLeft=[],a.borderRight=[];for(var i=a.minRank,u=a.maxRank+1;i<u;++i)W(e,"borderLeft","_bl",t,a,i),W(e,"borderRight","_br",t,a,i)}}))}(e)})),r("    order",(function(){ie(e)})),r("    insertSelfEdges",(function(){!function(e){var r=h.buildLayerMatrix(e);n.forEach(r,(function(r){var t=0;n.forEach(r,(function(r,o){var a=e.node(r);a.order=o+t,n.forEach(a.selfEdges,(function(n){h.addDummyNode(e,"selfedge",{width:n.label.width,height:n.label.height,rank:a.rank,order:o+ ++t,e:n.e,label:n.label},"_se")})),delete a.selfEdges}))}))}(e)})),r("    adjustCoordinateSystem",(function(){X.adjust(e)})),r("    position",(function(){xe(e)})),r("    positionSelfEdges",(function(){!function(e){n.forEach(e.nodes(),(function(n){var r=e.node(n);if("selfedge"===r.dummy){var t=e.node(r.e.v),o=t.x+t.width/2,a=t.y,i=r.x-o,u=t.height/2;e.setEdge(r.e,r.label),e.removeNode(n),r.label.points=[{x:o+2*i/3,y:a-u},{x:o+5*i/6,y:a-u},{x:o+i,y:a},{x:o+5*i/6,y:a+u},{x:o+2*i/3,y:a+u}],r.label.x=r.x,r.label.y=r.y}}))}(e)})),r("    removeBorderNodes",(function(){!function(e){n.forEach(e.nodes(),(function(r){if(e.children(r).length){var t=e.node(r),o=e.node(t.borderTop),a=e.node(t.borderBottom),i=e.node(n.last(t.borderLeft)),u=e.node(n.last(t.borderRight));t.width=Math.abs(u.x-i.x),t.height=Math.abs(a.y-o.y),t.x=i.x+t.width/2,t.y=o.y+t.height/2}})),n.forEach(e.nodes(),(function(n){"border"===e.node(n).dummy&&e.removeNode(n)}))}(e)})),r("    normalize.undo",(function(){w.undo(e)})),r("    fixupEdgeLabelCoords",(function(){!function(e){n.forEach(e.edges(),(function(r){var t=e.edge(r);if(n.has(t,"x"))switch("l"!==t.labelpos&&"r"!==t.labelpos||(t.width-=t.labeloffset),t.labelpos){case"l":t.x-=t.width/2+t.labeloffset;break;case"r":t.x+=t.width/2+t.labeloffset}}))}(e)})),r("    undoCoordinateSystem",(function(){X.undo(e)})),r("    translateGraph",(function(){!function(e){var r=Number.POSITIVE_INFINITY,t=0,o=Number.POSITIVE_INFINITY,a=0,i=e.graph(),u=i.marginx||0,d=i.marginy||0;function c(e){var n=e.x,i=e.y,u=e.width,d=e.height;r=Math.min(r,n-u/2),t=Math.max(t,n+u/2),o=Math.min(o,i-d/2),a=Math.max(a,i+d/2)}n.forEach(e.nodes(),(function(n){c(e.node(n))})),n.forEach(e.edges(),(function(r){var t=e.edge(r);n.has(t,"x")&&c(t)})),r-=u,o-=d,n.forEach(e.nodes(),(function(n){var t=e.node(n);t.x-=r,t.y-=o})),n.forEach(e.edges(),(function(t){var a=e.edge(t);n.forEach(a.points,(function(e){e.x-=r,e.y-=o})),n.has(a,"x")&&(a.x-=r),n.has(a,"y")&&(a.y-=o)})),i.width=t-r+u,i.height=a-o+d}(e)})),r("    assignNodeIntersects",(function(){!function(e){n.forEach(e.edges(),(function(n){var r,t,o=e.edge(n),a=e.node(n.v),i=e.node(n.w);o.points?(r=o.points[0],t=o.points[o.points.length-1]):(o.points=[],r=i,t=a),o.points.unshift(h.intersectRect(a,r)),o.points.push(h.intersectRect(i,t))}))}(e)})),r("    reversePoints",(function(){!function(e){n.forEach(e.edges(),(function(n){var r=e.edge(n);r.reversed&&r.points.reverse()}))}(e)})),r("    acyclic.undo",(function(){c.undo(e)}))}(r,t)})),t("  updateInputGraph",(function(){!function(e,r){n.forEach(e.nodes(),(function(n){var t=e.node(n),o=r.node(n);t&&(t.x=o.x,t.y=o.y,r.children(n).length&&(t.width=o.width,t.height=o.height))})),n.forEach(e.edges(),(function(t){var o=e.edge(t),a=r.edge(t);o.points=a.points,n.has(a,"x")&&(o.x=a.x,o.y=a.y)})),e.graph().width=r.graph().width,e.graph().height=r.graph().height}(e,r)}))}))},debug:{debugOrdering:function(e){var r=h.buildLayerMatrix(e),t=new Pe({compound:!0,multigraph:!0}).setGraph({});return n.forEach(e.nodes(),(function(n){t.setNode(n,{label:n}),t.setParent(n,"layer"+e.node(n).rank)})),n.forEach(e.edges(),(function(e){t.setEdge(e.v,e.w,{},e.name)})),n.forEach(r,(function(e,r){var o="layer"+r;t.setNode(o,{rank:"same"}),n.reduce(e,(function(e,n){return t.setEdge(e,n,{style:"invis"}),n}))})),t}},util:{time:m,notime:E}};export default Se;

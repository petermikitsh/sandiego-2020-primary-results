(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{103:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(8),s=r.n(o),i=r(67);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;s.a.render(a.a.createElement(i.a),document.getElementById("app"))},67:function(e,t,r){"use strict";(function(e){var n,a=r(14),o=r.n(a),s=r(23),i=r.n(s),c=r(34),l=r.n(c),u=r(0),d=r.n(u),f=r(125),p=r(124),m=r(128),h=r(121),v=r(47),b=r(86),g=r(87),y=r(61),w=r(120),E=r(83),O=r(126),x=r(52),k=r(68),C=r.n(k),j=r(69);(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e);var N="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},H=Object(y.a)({palette:{type:"dark"}}),G=x.a.div.withConfig({displayName:"App__StyledPage",componentId:"v6rpuh-0"})(["max-width:800px;margin:20px;@media (min-width:840px){margin:20px auto;}"]),L=function(){var e=Object(u.useState)(),t=l()(e,2),n=t[0],a=t[1],s=Object(u.useState)([]),c=l()(s,2),y=c[0],E=c[1];return Object(u.useEffect)((function(){i()(o.a.mark((function e(){var t,n,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(4).then(r.t.bind(null,129,3));case 2:t=e.sent,n=t.default,s=n.filter((function(e){return!e.Precinct})),E(s),a(s[1]["Contest Name"]);case 7:case"end":return e.stop()}}),e)})))()}),[]),d.a.createElement(w.a,{theme:H},d.a.createElement(G,null,d.a.createElement(C.a,{href:"https://github.com/petermikitsh/sandiego-2020-primary-results"}),d.a.createElement(v.a,{variant:"h3",component:"h1"},"San Diego County"),d.a.createElement(v.a,{variant:"h4",component:"h2"},"March 3, 2020 Primary"),d.a.createElement(h.a,{style:{margin:"20px 0"}},d.a.createElement(m.a,{id:"demo-simple-select-label"},"Contest"),n&&d.a.createElement(p.a,{value:n,labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:function(e){a(e.target.value)}},y.map((function(e){return d.a.createElement(f.a,{key:e["Contest Name"],value:e["Contest Name"]},Object(O.a)(e["Contest Name"]))})))),d.a.createElement(b.a,{variant:"outlined",style:{backgroundColor:"#333"}},d.a.createElement(g.a,null,d.a.createElement(j.a,{contest:n})))))};N(L,"useState{[currContest, setCurrContest]}\nuseState{[contests, setContests]([])}\nuseEffect{}");var S,M,P=Object(E.hot)(L);t.a=P,(S="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(S.register(H,"DarkMode","/Users/pmikitsh/git/sd-results-viewer/src/client/App.tsx"),S.register(G,"StyledPage","/Users/pmikitsh/git/sd-results-viewer/src/client/App.tsx"),S.register(L,"App","/Users/pmikitsh/git/sd-results-viewer/src/client/App.tsx"),S.register(P,"default","/Users/pmikitsh/git/sd-results-viewer/src/client/App.tsx")),(M="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&M(e)}).call(this,r(59)(e))},69:function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return L}));var n,a=r(14),o=r.n(a),s=r(23),i=r.n(s),c=r(34),l=r.n(c),u=r(0),d=r.n(u),f=r(122),p=r(88),m=r(46),h=r(43),v=r(60),b=r(123),g=r(127),y=r(52),w=r(117),E=r(86),O=r(87),x=r(47),k=r(74);(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e);var C,j,N="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},H=b.a(g.a).domain([-1,1]),G=y.a.div.withConfig({displayName:"PrecinctMap__StyledMap",componentId:"sc-1xfdc45-0"})(["display:flex;justify-content:center;align-items:center;path{vector-effect:non-scaling-stroke;stroke-width:0.2;stroke:#ddd;fill:#7d7d7d;stroke:#ddd;}path:not(.highway){fill-opacity:0.5;}path:not(.highway):hover{stroke-width:3;stroke:#000;z-index:1;}.highway{stroke:#fff;stroke-width:1;fill:transparent;}"]),L=function(e){var t,n,a,s,c,b,g,y=e.contest,C=Object(u.useRef)(),j=Object(u.useRef)(),N=Object(u.useRef)(),L=Object(u.useRef)(),S=Object(u.useRef)(),M=Object(u.useState)(),P=l()(M,2),R=P[0],A=P[1],D=Object(u.useState)(),U=l()(D,2),I=U[0],B=U[1];return Object(u.useEffect)((function(){i()(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(k.a)(y);case 2:t=e.sent,B(t),[L.current,S.current].forEach((function(e){for(;e.firstChild;)e.removeChild(e.firstChild)})),i()(o.a.mark((function e(){var n,a,s,i,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(5).then(r.t.bind(null,130,3));case 2:return n=e.sent,a=n.default,e.next=6,r.e(0).then(r.t.bind(null,89,3));case 6:s=e.sent,i=s.default,(c=f.a()).fitSize([600,500],i),m.a(S.current).selectAll("path").data(i.features).enter().append("path").attr("d",p.a().projection(c)).on("mouseover",(function(e){A({anchor:this,geo:e}),m.a(this).raise()})).on("mouseleave",(function(){A(null)})).style("fill",(function(e){if(null==t?void 0:t.isBinaryRace){var r=e.properties.CONSNAME,n=t.results[r].net;return H(n)}})),l=v.a().extent([[0,0],[600,500]]).scaleExtent([1,25]).on("zoom",(function(){m.a(N.current).attr("transform",h.c.transform)})),m.a(j.current).call(l).call(l.transform,v.b.translate(-500,-1400).scale(4)),c.fitSize([600,500],i),m.a(L.current).selectAll("path").data(a.features).enter().append("path").attr("d",p.a().projection(c)).classed("highway",!0);case 15:case"end":return e.stop()}}),e)})))();case 7:case"end":return e.stop()}}),e)})))()}),[y]),d.a.createElement(G,{ref:C},d.a.createElement("svg",{ref:j,width:600,height:500,preserveAspectRatio:"xMinYMin meet",viewBox:"0 0 ".concat(600," ").concat(500)},d.a.createElement("g",{ref:N},d.a.createElement("g",{ref:L}),d.a.createElement("g",{ref:S}))),d.a.createElement(w.a,{open:!!R,anchorEl:null==R?void 0:R.anchor,placement:"left",transition:!0},d.a.createElement(E.a,null,d.a.createElement(O.a,{style:{maxWidth:"300px"}},d.a.createElement(x.a,{variant:"overline"},"PRECINCT / NEIGHBORHOOD"),d.a.createElement("div",null,null==R||null===(t=R.geo)||void 0===t||null===(n=t.properties)||void 0===n?void 0:n.CONSNAME," ",null==R||null===(a=R.geo)||void 0===a||null===(s=a.properties)||void 0===s?void 0:s.PRECINCT),d.a.createElement(x.a,{variant:"overline"},"CONTEST"),d.a.createElement("div",null,y),d.a.createElement(x.a,{variant:"overline"},"RESULTS"),d.a.createElement("pre",{style:{whiteSpace:"pre-wrap",display:"block"}},JSON.stringify(null==I||null===(c=I.results)||void 0===c?void 0:c[null==R||null===(b=R.geo)||void 0===b||null===(g=b.properties)||void 0===g?void 0:g.CONSNAME],null,2))))))};N(L,"useRef{mount}\nuseRef{svgRef}\nuseRef{zoomRef}\nuseRef{highwayRef}\nuseRef{precinctsRef}\nuseState{[popperData, setPopperData]}\nuseState{[contestData, setContestData]}\nuseEffect{}"),(C="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(C.register(H,"color","/Users/pmikitsh/git/sd-results-viewer/src/client/components/PrecinctMap.tsx"),C.register(G,"StyledMap","/Users/pmikitsh/git/sd-results-viewer/src/client/components/PrecinctMap.tsx"),C.register(600,"width","/Users/pmikitsh/git/sd-results-viewer/src/client/components/PrecinctMap.tsx"),C.register(500,"height","/Users/pmikitsh/git/sd-results-viewer/src/client/components/PrecinctMap.tsx"),C.register(L,"PrecinctMap","/Users/pmikitsh/git/sd-results-viewer/src/client/components/PrecinctMap.tsx")),(j="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&j(e)}).call(this,r(59)(e))},74:function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return h}));var n,a=r(75),o=r.n(a),s=r(14),i=r.n(s),c=r(23),l=r.n(c);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var f,p,m=function(){var e=l()(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(0).then(r.t.bind(null,89,3));case 2:return t=e.sent,n=t.default.features,e.abrupt("return",n.map((function(e){return e.properties.CONSNAME})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=l()(i.a.mark((function e(t){var n,a,o,s,c,l,u,f,p;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r.e(7).then(r.t.bind(null,131,3));case 4:return n=e.sent,a=n.default,e.next=8,r.e(6).then(r.t.bind(null,132,3));case 8:return o=e.sent,s=o.default,c=a.filter((function(e){return e["Contest Name"]===t})),l=c.map((function(e){return e["Candidate Name"]})),u=2===l.length,e.next=15,m();case 15:return f=e.sent,p=f.reduce((function(e,t){return e[t]={},l.forEach((function(r){e[t][r]=0})),e}),{}),s.forEach((function(e){var r;if(e["Contest Name"]===t){var n=e.Precinct.replace(/\d+-\d+-/,"").replace(/-VBM/g,""),a=e["Candidate Name"];"number"==typeof(null==p||null===(r=p[n])||void 0===r?void 0:r[a])&&(p[n][a]+=Number(e.Votes))}})),u&&Object.keys(p).forEach((function(e){var t=p[e],r=t.YES,n=t.NO,a={sum:r+n,get perYes(){return r/this.sum||0},get perNo(){return n/this.sum||0},get net(){return this.perYes-this.perNo}};p[e]=d({},p[e],{},a)})),e.abrupt("return",{contestName:t,isBinaryRace:u,candidates:l,results:p});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(f="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(f.register(m,"getNeighborhoods","/Users/pmikitsh/git/sd-results-viewer/src/client/utils.ts"),f.register(h,"getContestData","/Users/pmikitsh/git/sd-results-viewer/src/client/utils.ts")),(p="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&p(e)}).call(this,r(59)(e))},99:function(e,t,r){r(100),e.exports=r(103)}},[[99,2,3]]]);
//# sourceMappingURL=client.dba7ef.js.map
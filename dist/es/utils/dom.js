function o(o,t){t=t||document.body;var e=0,f=0;for(console.log(o,t);o&&o!==t;)f+=o.offsetLeft,e+=o.offsetTop,o=o.offsetParent;return{left:f,top:e}}export{o as getOffset};

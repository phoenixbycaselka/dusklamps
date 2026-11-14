// Dusk Lamps logic. Goal: all lamps ON. Puzzles are built by pressing random
// lamps from the solved state, so they are always solvable; par = presses used.
(function(root){
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function press(st,n,i){const x=i%n,y=(i/n)|0;
 for(const [dx,dy] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const a=x+dx,b=y+dy;if(a>=0&&a<n&&b>=0&&b<n)st[b*n+a]^=1}}
function won(st){return st.every(v=>v===1)}
function make(n,seed){const r=rng(hash(seed)+n),st=new Array(n*n).fill(1),used=new Set();
 const k=Math.max(3,Math.floor(n*n/3));
 while(used.size<k)used.add(Math.floor(r()*n*n));
 used.forEach(i=>press(st,n,i));
 if(won(st)){press(st,n,0);used.add(0)} // ensure not already solved (rare)
 return {state:st,par:used.size,solution:[...used]}}
const api={hash,press,won,make};
if(typeof module!=='undefined')module.exports=api;else root.Lamps=api;
})(this);

// Dusk Lamps logic. Goal: all lamps ON. Puzzles are built by pressing random
// lamps from the solved state, so they are always solvable; par = the shortest possible solution.
(function(root){
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function press(st,n,i){const x=i%n,y=(i/n)|0;
 for(const [dx,dy] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const a=x+dx,b=y+dy;if(a>=0&&a<n&&b>=0&&b<n)st[b*n+a]^=1}}
function won(st){return st.every(v=>v===1)}
// Shortest solution over GF(2): Gaussian elimination, then try every free-variable
// combination (4x4 has 4 free, 5x5 has 2, 6x6 none), so par is the true minimum.
function solve(n,st){const N=n*n,M=[];
 for(let i=0;i<N;i++){const r=new Array(N+1).fill(0);for(let j=0;j<N;j++){const e=new Array(N).fill(0);press(e,n,j);r[j]=e[i]}r[N]=1-st[i];M.push(r)}
 const piv=[];let row=0;
 for(let c=0;c<N&&row<N;c++){let p=-1;for(let i=row;i<N;i++)if(M[i][c]){p=i;break}if(p<0)continue;[M[row],M[p]]=[M[p],M[row]];
  for(let i=0;i<N;i++)if(i!==row&&M[i][c])for(let k=c;k<=N;k++)M[i][k]^=M[row][k];piv.push(c);row++}
 for(let i=row;i<N;i++)if(M[i][N])return null;
 const free=[];for(let c=0;c<N;c++)if(!piv.includes(c))free.push(c);
 let best=null;
 for(let m=0;m<(1<<free.length);m++){const x=new Array(N).fill(0);free.forEach((f,b)=>x[f]=(m>>b)&1);
  for(let r=piv.length-1;r>=0;r--){const c=piv[r];let v=M[r][N];for(let k=c+1;k<N;k++)if(M[r][k])v^=x[k];x[c]=v}
  const sol=[];x.forEach((v,i)=>{if(v)sol.push(i)});if(!best||sol.length<best.length)best=sol}
 return best}
function make(n,seed){const r=rng(hash(seed)+n),st=new Array(n*n).fill(1),used=new Set();
 const k=Math.max(3,Math.floor(n*n/3));
 while(used.size<k)used.add(Math.floor(r()*n*n));
 used.forEach(i=>press(st,n,i));
 if(won(st))press(st,n,0); // ensure not already solved (rare)
 const solution=solve(n,st);
 return {state:st,par:solution.length,solution}}
const api={hash,press,won,make,solve};
if(typeof module!=='undefined')module.exports=api;else root.Lamps=api;
})(this);

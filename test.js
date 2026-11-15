const L=require('./game.js');let bad=0;
for(const n of [4,5,6])for(let s=0;s<200;s++){const p=L.make(n,'t'+s);
 if(L.won(p.state)){bad++;console.log('solved at start',n,s)}
 const st=p.state.slice();p.solution.forEach(i=>L.press(st,n,i));if(!L.won(st)){bad++;console.log('unsolvable',n,s)}
 const q=L.make(n,'t'+s);if(JSON.stringify(q)!==JSON.stringify(p))bad++}
// par must equal the brute-force minimum (all 2^16 press sets) on 4x4
{const n=4,N=16,eff=[];for(let j=0;j<N;j++){const e=new Array(N).fill(0);L.press(e,n,j);eff.push(e.reduce((a,v,i)=>a|(v<<i),0))}
 const pc=x=>{let c=0;while(x){x&=x-1;c++}return c};
 for(let s=0;s<40;s++){const p=L.make(n,'b'+s),t=p.state.reduce((a,v,i)=>a|((1-v)<<i),0);let best=99;
  for(let m=0;m<65536;m++){let e=0;for(let j=0;j<N;j++)if(m>>j&1)e^=eff[j];if(e===t&&pc(m)<best)best=pc(m)}
  if(best!==p.par){bad++;console.log('par not minimal',s,p.par,best)}}}
console.log(bad?'FAIL':'ok');process.exit(bad?1:0)

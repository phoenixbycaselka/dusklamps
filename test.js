const L=require('./game.js');let bad=0;
for(const n of [4,5,6])for(let s=0;s<200;s++){const p=L.make(n,'t'+s);
 if(L.won(p.state)){bad++;console.log('solved at start',n,s)}
 const st=p.state.slice();p.solution.forEach(i=>L.press(st,n,i));if(!L.won(st)){bad++;console.log('unsolvable',n,s)}
 const q=L.make(n,'t'+s);if(JSON.stringify(q)!==JSON.stringify(p))bad++}
console.log(bad?'FAIL':'ok');process.exit(bad?1:0)

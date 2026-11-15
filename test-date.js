// Daily puzzle key must be the player's LOCAL date. Run with TZ=Australia/Sydney.
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const m=html.match(/\$\('daily'\)\.onclick=\(\)=>load\((.*)\);/);
if(!m){console.log('FAIL: daily key expression not found');process.exit(1)}
const RealDate=Date;let bad=0;
for(const [iso,want] of [['2026-11-16T09:21:00','2026-11-16'],['2026-11-16T23:59:00','2026-11-16'],['2026-01-05T00:30:00','2026-01-05']]){
 const fixed=new RealDate(iso); // parsed as local time
 class FakeDate extends RealDate{constructor(...a){super(...(a.length?a:[fixed.getTime()]))}}
 const ctx={Date:FakeDate,Lamps:require('./game.js')};vm.createContext(ctx);
 const pre=(html.match(/function dayKey[^\n]*/)||[''])[0];
 const got=vm.runInContext(pre+';('+m[1]+')',ctx);
 console.log(iso,'local ->',got,got===want?'ok':'WRONG, want '+want);if(got!==want)bad++}
console.log(bad?'FAIL':'ok');process.exit(bad?1:0)

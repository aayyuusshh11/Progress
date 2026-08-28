import {MUSCLE_MAP} from '../src/vendor/body-muscles/index.js';
import exercises from '../src/data/exercises.js';
import mappings from '../src/data/exercise_muscles.js';
import {sessionMetrics,muscleLoads,intensity,muscleSummary} from '../src/analytics/engine.js';
const assert=(x,m)=>{if(!x)throw Error(m)};

// polyfill localStorage + window for node test runner
const _mem=new Map();
globalThis.localStorage={getItem:k=>_mem.has(k)?_mem.get(k):null,setItem:(k,v)=>_mem.set(k,String(v)),removeItem:k=>_mem.delete(k),clear:()=>_mem.clear()};
globalThis.window=globalThis.window||{};

// existing analytics assertions
assert(MUSCLE_MAP.length===89,'Expected 89 anatomy regions');
assert(exercises.length===38,'Expected 38 exercises');
assert(Object.keys(mappings).length===38,'Expected 38 exercise mappings');
const ids=new Set(MUSCLE_MAP.map(x=>x.id));
for(const entries of Object.values(mappings))for(const x of entries)assert(ids.has(x.muscleId),`Invalid muscle ID: ${x.muscleId}`);
const d=new Date().toISOString().slice(0,10);
const state={workouts:[{id:'w',date:d,exercises:[{id:'e',exerciseId:'incline_bench',sets:[{weight:65,reps:10},{weight:70,reps:7},{weight:72.5,reps:6}]}]}]};
const m=sessionMetrics(state,'incline_bench')[0];
assert(m.volume===1575,'Volume formula failed');
assert(m.maxWeight===72.5,'Max weight formula failed');
assert(Math.round(m.bestE1rm)===87,'e1RM formula failed');
const l=muscleLoads(state,'week');
assert(l['chest-upper-left']===3,'Chest effective sets failed');
assert(Math.abs(l['triceps-long-left']-.75)<1e-9,'Triceps effective sets failed');
assert(intensity(0)===0&&intensity(3)===4&&intensity(12)===8,'Intensity bands failed');
assert(muscleSummary(state,'week').find(x=>x.name==='Chest').load===3,'Bilateral group aggregation failed');

// store-level assertions
const {store} = await import('../src/storage/store.js');
assert(store.get().version===1,'Store version should default to 1');
assert(Array.isArray(store.get().workouts),'Store workouts must be an array');
assert(store.get().onboarded===false,'Fresh store should not be onboarded');

// safe-save under simulated quota error
const originalSetItem=globalThis.localStorage.setItem;
let quotaCalls=0;
globalThis.localStorage.setItem=()=>{quotaCalls++;const e=new Error('quota');e.name='QuotaExceededError';throw e};
let errorCaught=null;
window.__storeError=m=>{errorCaught=m};
store.updateProfile({name:'Tester'});
globalThis.localStorage.setItem=originalSetItem;
assert(quotaCalls>0,'save() should have attempted a write');
assert(errorCaught&&/Storage full/.test(errorCaught),'Quota errors should surface a toast');

// markBackup records timestamp
store.markBackup();
assert(store.get().settings.lastBackup,'markBackup should set lastBackup');
const stamped=new Date(store.get().settings.lastBackup).getTime();
assert(Math.abs(Date.now()-stamped)<5000,'lastBackup should be ~now');

// export/import roundtrip preserves user data
const before=JSON.parse(store.export());
before.profile.name='RoundtripUser';
before.workouts.push({id:'x',date:d,bodyWeight:80,exercises:[{id:'y',exerciseId:'squat',sets:[{weight:100,reps:5}]}]});
const re=JSON.stringify(before);
store.import(re);
assert(store.get().profile.name==='RoundtripUser','import should restore profile name');
assert(store.get().workouts.length===before.workouts.length,'import should restore workout count');
assert(store.get().workouts[0].exercises[0].sets[0].weight===100,'import should restore set weight');

// import rejects malformed payloads
let threw=false;
try{store.import('{"not":"a backup"}')}catch{threw=true}
assert(threw,'import must reject payloads without a workouts array');

// reset returns to blank state
store.reset();
assert(store.get().workouts.length===0,'reset should clear workouts');
assert(store.get().profile.name==='','reset should clear profile name');
assert(store.get().settings.lastBackup===null,'reset should clear lastBackup');

console.log('PASS: analytics, store version, safe-save quota, markBackup, export/import roundtrip, import validation, reset');

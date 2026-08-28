import {MUSCLE_MAP} from '../src/vendor/body-muscles/index.js';
import exercises from '../src/data/exercises.js';
import mappings from '../src/data/exercise_muscles.js';
import {sessionMetrics,muscleLoads,intensity,muscleSummary} from '../src/analytics/engine.js';
const assert=(x,m)=>{if(!x)throw Error(m)};
assert(MUSCLE_MAP.length===89,'Expected 89 anatomy regions');assert(exercises.length===38,'Expected 38 exercises');assert(Object.keys(mappings).length===38,'Expected 38 exercise mappings');
const ids=new Set(MUSCLE_MAP.map(x=>x.id));for(const entries of Object.values(mappings))for(const x of entries)assert(ids.has(x.muscleId),`Invalid muscle ID: ${x.muscleId}`);
const d=new Date().toISOString().slice(0,10);const state={workouts:[{id:'w',date:d,exercises:[{id:'e',exerciseId:'incline_bench',sets:[{weight:65,reps:10},{weight:70,reps:7},{weight:72.5,reps:6}]}]}]};const m=sessionMetrics(state,'incline_bench')[0];assert(m.volume===1575,'Volume formula failed');assert(m.maxWeight===72.5,'Max weight formula failed');assert(Math.round(m.bestE1rm)===87,'e1RM formula failed');const l=muscleLoads(state,'week');assert(l['chest-upper-left']===3,'Chest effective sets failed');assert(Math.abs(l['triceps-long-left']-.75)<1e-9,'Triceps effective sets failed');assert(intensity(0)===0&&intensity(3)===4&&intensity(12)===8,'Intensity bands failed');assert(muscleSummary(state,'week').find(x=>x.name==='Chest').load===3,'Bilateral group aggregation failed');console.log('PASS: anatomy, exercise count, mapping IDs, volume, max weight, e1RM, effective sets, intensity, and group aggregation');

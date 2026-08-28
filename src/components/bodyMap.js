import {BodyChart,ViewSide,INTENSITY_COLORS} from '../vendor/body-muscles/index.js';
Object.assign(INTENSITY_COLORS,{0:'#cfd4d9',1:'#fff2dd',2:'#ffe1b7',3:'#ffc77f',4:'#ffad56',5:'#ff9638',6:'#ff7d1d',7:'#ff6710',8:'#f35a08',9:'#df4b00',10:'#c53f00'});
export function bodyMap(el,state){let c=new BodyChart(el,{view:ViewSide.FRONT,bodyState:state,ariaLabel:'Interactive muscle map',enableTransitions:true});return{state:x=>c.update({bodyState:x}),view:x=>c.update({view:x==='FRONT'?ViewSide.FRONT:ViewSide.BACK}),destroy:()=>c.destroy()}}

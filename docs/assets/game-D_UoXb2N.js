import{_ as x,o as m,c as p,a as n,b as E,u as L,r as f,d as S,e as M,f as N,F as v,g as C,t as _,h as u,i as D}from"./index-CAuxw36-.js";const k=7,V=5;let s=[],z=["FF4545","B349ED","5570EE","79F743","FFF845","FF69B4"];var $;let h=5,y=0;function G(e){$=e;for(let t=0;t<k;t++){s[t]=[];for(let a=0;a<k;a++){const l=q();l.dataset.row=t,l.dataset.col=a,$.append(l),s[t][a]=l}}}function R(){return h--,console.log(h),h}function q(){const e=document.createElement("div");e.style.width="61px",e.style.height="61px",e.style.borderRadius="5px",e.style.border="1px solid #fff",e.classList.add("tile");const t=Math.floor(Math.random()*V)+1;return e.style.backgroundColor=`#${z[t]}`,e.dataset.type=t,e.innerText=t,e.addEventListener("click",a=>{A(a)}),e}let r=null;function A(e){const t=e.target;r?(console.log(`второй клик. выбранные - первый: ${r.dataset.type}
 второй - ${t.dataset.type}`,r,t),H(r,t),r.classList.remove("selected"),j(t),r=null,R()):(r=t,console.log(`первый клик. выбранный - ${e}`,r,r==e.target),r.classList.add("selected"))}function H(e,t){console.log(e,t);const a=e.dataset.type;e.dataset.type=t.dataset.type,t.dataset.type=a,console.log(e,t)}function I(e){let t=[],a=Number(e.dataset.col),l=0,o=a;for(console.log(`strike = ${o};  sizeRow = ${s[e.dataset.row].length-1}`),console.log(`${o!=s[e.dataset.row].length-1}`),y+=l;o!=s[e.dataset.row].length-1&&(console.log(a),console.log(`${s[e.dataset.row][a]}; col = ${a}`),s[e.dataset.row][o].dataset.type===s[e.dataset.row][o+1].dataset.type);)t.push(s[e.dataset.row][o]),console.log(t),l++,o++;for(o=a;o!==0&&s[e.dataset.row][o].dataset.type===s[e.dataset.row][o-1].dataset.type;)l--,o--,t.push(s[e.dataset.row][o]);o=0}function O(e){let t=[],a=Number(e.dataset.col),l=0,o=row;for(console.log(`strike = ${o};  sizeRow = ${s[e.dataset.row].length-1}`),console.log(`${o!=s[e.dataset.row].length-1}`),y+=l;o!=s[e.dataset.row].length-1&&(console.log(a),console.log(`${s[e.dataset.col][a]}; row = ${row}`),s[o][e.dataset.col].dataset.type===s[o+1][e.dataset.col].dataset.type);)t.push(s[o][e.dataset.col]),console.log(t),l++,o++;for(o=row;o!==0&&s[o][e.dataset.col].dataset.type===s[o-1][e.dataset.col].dataset.type;)l--,o--,t.push(s[o][e.dataset.col]);o=0}function j(e){I(e),O(e)}const J={},K={class:"content"};function P(e,t){return m(),p("div",K,t[0]||(t[0]=[n("h2",null,"technical problems",-1),n("p",null,[n("span",{style:{"font-weight":"bold"}},"sorry"),E(", The page is currently unavailable. internal work is underway. Better draw something in "),n("a",{href:"/draw"},"draw")],-1)]))}const Q=x(J,[["render",P]]),U={class:"main__parametrs"},W={class:"but parametr__but boosts-but parametr__boosts"},X={name:"",id:""},Y=["value"],Z={key:0,class:"boosts__full"},ee={class:"parametr__score score-text"},te={class:"parametr__time time-text"},oe={class:"field"},se={class:"field__motion-block motion-content"},ae={class:"started_tablo active"},le={__name:"game",setup(e){let t=L(),a=f(!0),l=[{id:1,image:"",title:"boomb",symbol:"B"},{id:2,image:"",title:"clearCrest",symbol:"+"}],o=f(null),b=f(h),c=S({game_id:0,score:f(y),time:0,date:new Date().toDateString()});M(()=>{});function T(d){G(o.value),d.target.parentElement.classList.remove("active"),w(b)}function w(d,g,i){if(d.value>=0)setTimeout(function(){w(d)},1e3);else{F();return}}function F(){t.addGameRecord(c),console.log(t.games),Array.from(o.value.querySelectorAll("td")).forEach((d,g)=>{d.innerHTML=""}),document.querySelector(".started_tablo").classList.add("active"),B(),c.time=0,c.score=0,c.date=new Date().toISOString()}async function B(){console.log(c)}return(d,g)=>(m(),p(v,null,[N(Q,{style:{position:"absolute",top:"0",left:"0",bottom:"0",right:"0"}}),n("div",U,[n("div",W,[n("select",X,[(m(!0),p(v,null,C(u(l),i=>(m(),p("option",{key:i.id,value:i.symbol},_(i.symbol),9,Y))),128))]),u(a)?(m(),p("div",Z)):D("",!0)]),n("div",ee,_(u(c).score),1),n("div",te,_((u(c).time/60).toFixed(0))+":"+_(u(c).time%60),1)]),n("div",oe,[n("div",se,_(u(b)),1),n("div",ae,[n("div",{class:"main__but but play",onClick:g[0]||(g[0]=i=>T(i))},"play")]),n("div",{class:"table",ref_key:"table",ref:o},null,512)])],64))}},re=x(le,[["__scopeId","data-v-bc870ac3"]]);export{re as default};

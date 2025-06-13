import{I as h,d as k,k as r,s as x,o as _,j as l,i as a,a as c,t as d,q as b,u as y,c as g,F as w,x as $,_ as P}from"./index-DLnUSDzh.js";/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,s,e)=>e?e.toUpperCase():s.toLowerCase()),B=t=>{const o=A(t);return o.charAt(0).toUpperCase()+o.slice(1)},F=(...t)=>t.filter((o,s,e)=>!!o&&o.trim()!==""&&e.indexOf(o)===s).join(" ").trim();/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=({size:t,strokeWidth:o=2,absoluteStrokeWidth:s,color:e,iconNode:i,name:n,class:f,...m},{slots:u})=>h("svg",{...p,width:t||p.width,height:t||p.height,stroke:e||p.stroke,"stroke-width":s?Number(o)*24/Number(t):o,class:F("lucide",...n?[`lucide-${v(B(n))}-icon`,`lucide-${v(n)}`]:["lucide-icon"]),...m},[...i.map(C=>h(...C)),...u.default?[u.default()]:[]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(t,o)=>(s,{slots:e})=>h(L,{...s,iconNode:o,name:t},e);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]),V={class:"product-content"},N=["src","alt"],O={class:"product-title"},Z={class:"price-wrapper"},H={class:"price-original font-weight-bold"},U={class:"price-discount"},q={class:"flex-space-between"},z={class:"price-unit"},D=k({__name:"ProductCard",props:{product:{type:Object,default:()=>({})},isRateVisible:{type:Boolean,default:!1}},setup(t){const o=(s,e)=>+(s/(1-e/100)).toFixed(2);return(s,e)=>{const i=r("el-text"),n=r("el-icon"),f=r("el-tooltip"),m=r("el-card"),u=r("router-link");return _(),x(u,{to:`/product/${t.product.id}`,class:"product-view"},{default:l(()=>[a(m,{class:"product-card"},{default:l(()=>[c("div",V,[c("div",null,[c("img",{class:"product-image",loading:"lazy",src:t.product.thumbnail,alt:`${t.product.title}`},null,8,N),e[0]||(e[0]=c("div",{class:"v-spacer-10"},null,-1)),c("h6",O,d(t.product.title),1),a(i,{class:"product-description"},{default:l(()=>[b(d(t.product.description),1)]),_:1})]),c("div",null,[c("div",Z,[c("div",H," $"+d(o(t.product.price,t.product.discountPercentage)),1),c("div",U,d(t.product.discountPercentage.toFixed(2))+"%",1)]),e[1]||(e[1]=c("div",{class:"v-spacer-5"},null,-1)),c("div",q,[c("div",z,"$"+d(t.product.price),1),a(f,{content:s.$t("message.wish"),placement:"right",effect:"light","popper-class":"wishlist-tooltip"},{default:l(()=>[a(n,{class:"wishlist-icon"},{default:l(()=>[a(y(I),{size:20,color:"#FF0000",class:"icon-align",title:"Heart"})]),_:1})]),_:1},8,["content"])])])])]),_:1})]),_:1},8,["to"])}}}),E=k({__name:"ProductList",props:{products:{type:Array,default:()=>[]}},setup(t){return(o,s)=>{const e=r("el-col"),i=r("el-row");return _(),g(w,null,[s[0]||(s[0]=c("div",{class:"v-spacer-30"},null,-1)),a(i,{gutter:10},{default:l(()=>[(_(!0),g(w,null,$(t.products,n=>(_(),x(e,{key:n.id,md:6,sm:8,xs:12},{default:l(()=>[a(D,{product:n},null,8,["product"])]),_:2},1024))),128))]),_:1})],64)}}}),M=P(E,[["__scopeId","data-v-a733692d"]]);export{M as P};

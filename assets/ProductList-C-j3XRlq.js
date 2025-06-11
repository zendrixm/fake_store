import{I as m,d as x,k as n,s as k,o as p,j as a,i as l,a as s,t as d,q as b,u as y,c as v,F as w,x as $,_ as P}from"./index-DxJcn1B2.js";/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,c,e)=>e?e.toUpperCase():c.toLowerCase()),B=t=>{const o=A(t);return o.charAt(0).toUpperCase()+o.slice(1)},F=(...t)=>t.filter((o,c,e)=>!!o&&o.trim()!==""&&e.indexOf(o)===c).join(" ").trim();/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=({size:t,strokeWidth:o=2,absoluteStrokeWidth:c,color:e,iconNode:i,name:r,class:h,..._},{slots:f})=>m("svg",{...u,width:t||u.width,height:t||u.height,stroke:e||u.stroke,"stroke-width":c?Number(o)*24/Number(t):o,class:F("lucide",...r?[`lucide-${g(B(r))}-icon`,`lucide-${g(r)}`]:["lucide-icon"]),..._},[...i.map(C=>m(...C)),...f.default?[f.default()]:[]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(t,o)=>(c,{slots:e})=>m(L,{...c,iconNode:o,name:t},e);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]),V={class:"product-content"},N=["src","alt"],O={class:"product-title"},Z={class:"price-wrapper"},H={class:"price-original font-weight-bold"},U={class:"price-discount"},q={class:"flex-space-between"},D={class:"price-unit"},E=x({__name:"ProductCard",props:{product:{type:Object,default:()=>({})},isRateVisible:{type:Boolean,default:!1}},setup(t){const o=(c,e)=>+(c/(1-e/100)).toFixed(2);return(c,e)=>{const i=n("el-text"),r=n("el-icon"),h=n("el-card"),_=n("router-link");return p(),k(_,{to:`/product/${t.product.id}`,class:"product-view"},{default:a(()=>[l(h,{class:"product-card"},{default:a(()=>[s("div",V,[s("div",null,[s("img",{class:"product-image",src:t.product.thumbnail,alt:`${t.product.title}`},null,8,N),e[0]||(e[0]=s("div",{class:"v-spacer-10"},null,-1)),s("h6",O,d(t.product.title),1),l(i,{class:"product-description"},{default:a(()=>[b(d(t.product.description),1)]),_:1})]),s("div",null,[s("div",Z,[s("div",H," $"+d(o(t.product.price,t.product.discountPercentage)),1),s("div",U,d(t.product.discountPercentage.toFixed(2))+"%",1)]),e[1]||(e[1]=s("div",{class:"v-spacer-5"},null,-1)),s("div",q,[s("div",D,"$"+d(t.product.price),1),l(r,{class:"wishlist-icon"},{default:a(()=>[l(y(I),{size:20,color:"#FF0000",class:"icon-align",title:"Heart"})]),_:1})])])])]),_:1})]),_:1},8,["to"])}}}),K=x({__name:"ProductList",props:{products:{type:Array,default:()=>[]}},setup(t){return(o,c)=>{const e=n("el-col"),i=n("el-row");return p(),v(w,null,[c[0]||(c[0]=s("div",{class:"v-spacer-30"},null,-1)),l(i,{gutter:10},{default:a(()=>[(p(!0),v(w,null,$(t.products,r=>(p(),k(e,{key:r.id,md:6,sm:8,xs:12},{default:a(()=>[l(E,{product:r},null,8,["product"])]),_:2},1024))),128))]),_:1})],64)}}}),R=P(K,[["__scopeId","data-v-a733692d"]]);export{R as P};

import{r as u,o as m,c as v,w as g,a as _,M as f,b as p,d as w,e as x,f as I,g as $,h as k,i as b,A}from"./.pnpm.ec9f7c47.js";const L=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}};L();var h=(e,r)=>{const n=e.__vccOpts||e;for(const[s,t]of r)n[s]=t;return n};const P={name:"App"};window.debug_xu=!1;window.debug0_xu=!1;function O(e,r,n,s,t,o){const c=u("router-view"),a=u("v-app");return m(),v(a,null,{default:g(()=>[_(c)]),_:1})}var E=h(P,[["render",O]]);const l=f.Random;f.mock("http://localhost:8081/test/city","get",()=>{let e=[];for(let r=0;r<10;r++){let n={id:r+1,city:l.city(),color:l.color()};e.push(n)}return{cityList:e}});f.mock("http://localhost:8081/test/cityInfo","post",e=>{const r=JSON.parse(e.body);return{img:l.image("200x100","#4A7BF7",r.name)}});p.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";p.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)});p.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)});const N="modulepreload",d={},B="./",C=function(r,n){return!n||n.length===0?r():Promise.all(n.map(s=>{if(s=`${B}${s}`,s in d)return;d[s]=!0;const t=s.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${o}`))return;const c=document.createElement("link");if(c.rel=t?"stylesheet":N,t||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),t)return new Promise((a,y)=>{c.addEventListener("load",a),c.addEventListener("error",y)})})).then(()=>r())},R={},S=x("div",null,"test",-1);function j(e,r){const n=u("router-view");return m(),w("div",null,[S,_(n)])}var q=h(R,[["render",j]]);const F=I(),T=$({history:F,routes:[{path:"",component:q,children:[{path:"",name:"FullProject",component:()=>C(()=>import("./Axios.f7f42534.js"),["assets/Axios.f7f42534.js","assets/.pnpm.ec9f7c47.js","assets/.pnpm.cb9790de.css"])}]}]}),U=k({state:{userInfo:{name:"myName"}},mutations:{getUserInfo(e,r){e.userInfo.name=r}},actions:{asyncGetUserInfo({commit:e}){setTimeout(()=>{e("getUserInfo",+new Date+"action")},2e3)}},getters:{userInfoGetter(e){return e.userInfo.name}}}),i=b(E);i.use(T);i.use(U);i.use(A);i.mount("#app");export{h as _};

"use strict";(self.webpackChunkPuntos_de_CyL=self.webpackChunkPuntos_de_CyL||[]).push([[592],{6518:(I,P,o)=>{o.d(P,{e:()=>M});var D=o(2340),E=o(8505),l=o(4004),_=o(262),u=o(9646),c=o(529),O=o(8256);let M=(()=>{class a{get getUsuario(){return this.usuario}constructor(n){this.http=n,this.baseUrl=D.N.mongoUrl}login(n,s){return this.http.post(`${this.baseUrl}/auth/`,{name:n,password:s}).pipe((0,E.b)(t=>{t.ok&&(localStorage.setItem("token",t.token),this.usuario=t)}),(0,l.U)(t=>t.ok),(0,_.K)(t=>(0,u.of)(t.error.msg)))}registro(n,s){return this.http.post(`${this.baseUrl}/auth/new`,{name:n,password:s}).pipe((0,E.b)(({ok:t,token:i})=>{t&&localStorage.setItem("token",i)}),(0,l.U)(t=>t.ok),(0,_.K)(t=>(0,u.of)(t.error.msg)))}logOut(){localStorage.removeItem("token")}validarToken(){const n=`${this.baseUrl}/auth/renew`,s=(new c.WM).set("token",localStorage.getItem("token")||"");return this.http.get(n,{headers:s}).pipe((0,E.b)(e=>{console.log(e),this.usuario=e}),(0,l.U)(e=>e),(0,_.K)(e=>(0,u.of)(!1)))}changeFavPoint(n,s){let e=`${this.baseUrl}/auth/`;return e+=s?"deletePunto":"newPunto",this.http.post(e,{name:this.usuario.name,recordid:n}).pipe((0,l.U)(t=>t.ok),(0,_.K)(t=>(console.error(t),(0,u.of)(!1))))}camposIguales(n,s){return e=>{const r=e.get(n)?.value,t=e.get(s)?.value;return r!==t?(e.get("campo")?.setErrors({noIgulaes:!0}),{noIguales:!0}):(e.get("campo")?.setErrors({noIgulaes:null}),null)}}}return a.\u0275fac=function(n){return new(n||a)(O.LFG(c.eN))},a.\u0275prov=O.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()},4128:(I,P,o)=>{o.d(P,{D:()=>M});var D=o(9751),E=o(4742),l=o(8421),_=o(7669),u=o(5403),c=o(3268),O=o(1810);function M(...a){const h=(0,_.jO)(a),{args:n,keys:s}=(0,E.D)(a),e=new D.y(r=>{const{length:t}=n;if(!t)return void r.complete();const i=new Array(t);let U=t,m=t;for(let g=0;g<t;g++){let v=!1;(0,l.Xf)(n[g]).subscribe((0,u.x)(r,f=>{v||(v=!0,m--),i[g]=f},()=>U--,void 0,()=>{(!U||!v)&&(m||r.next(s?(0,O.n)(s,i):i),r.complete())}))}});return h?e.pipe((0,c.Z)(h)):e}}}]);
"use strict";(self.webpackChunkPuntos_de_CyL=self.webpackChunkPuntos_de_CyL||[]).push([[592],{6518:(g,D,e)=>{e.d(D,{e:()=>v});var M=e(2340),E=e(8505),a=e(4004),l=e(262),u=e(9646),O=e(529),P=e(1571);let v=(()=>{class _{get usuario(){return this.user}constructor(r){this.http=r,this._baseUrl=M.N.mongoUrl}login(r,n){return this.http.post(`${this._baseUrl}/auth/`,{name:r,password:n}).pipe((0,E.b)(t=>{t.ok&&(localStorage.setItem("token",t.token),this.user=t)}),(0,a.U)(t=>t.ok),(0,l.K)(t=>(0,u.of)(t.error.msg)))}registro(r,n){return this.http.post(`${this._baseUrl}/auth/new`,{name:r,password:n}).pipe((0,E.b)(({ok:t,token:i})=>{t&&localStorage.setItem("token",i)}),(0,a.U)(t=>t.ok),(0,l.K)(t=>(0,u.of)(t.error.msg)))}logOut(){localStorage.removeItem("token")}validarToken(){const r=`${this._baseUrl}/auth/newPunto`,n=(new O.WM).set("x-token",localStorage.getItem("token")||"");return this.http.get(r,{headers:n}).pipe((0,E.b)(o=>o),(0,a.U)(o=>o.ok),(0,l.K)(o=>(0,u.of)(!1)))}changeFavPoint(r,n){let o=`${this._baseUrl}/auth/`;return o+=n?"deletePunto":"newPunto",this.http.post(o,{name:this.user.name,recordid:r}).pipe((0,a.U)(t=>t.ok),(0,l.K)(t=>(console.error(t),(0,u.of)(!1))))}}return _.\u0275fac=function(r){return new(r||_)(P.LFG(O.eN))},_.\u0275prov=P.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},4128:(g,D,e)=>{e.d(D,{D:()=>v});var M=e(9751),E=e(4742),a=e(8421),l=e(3269),u=e(5403),O=e(3268),P=e(1810);function v(..._){const h=(0,l.jO)(_),{args:r,keys:n}=(0,E.D)(_),o=new M.y(s=>{const{length:t}=r;if(!t)return void s.complete();const i=new Array(t);let m=t,U=t;for(let c=0;c<t;c++){let f=!1;(0,a.Xf)(r[c]).subscribe((0,u.x)(s,A=>{f||(f=!0,U--),i[c]=A},()=>m--,void 0,()=>{(!m||!f)&&(U||s.next(n?(0,P.n)(n,i):i),s.complete())}))}});return h?o.pipe((0,O.Z)(h)):o}}}]);
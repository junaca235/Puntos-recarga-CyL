"use strict";(self.webpackChunkPuntos_de_CyL=self.webpackChunkPuntos_de_CyL||[]).push([[152],{7152:(kn,ge,l)=>{l.r(ge),l.d(ge,{AuthModule:()=>In});var Y=l(6895),o=l(1571),At=l(2076),bt=l(9751),Dt=l(4742),Mt=l(8421),Ft=l(3269),Et=l(5403),wt=l(3268),St=l(1810),Ot=l(4004);let _e=(()=>{class n{constructor(e,r){this._renderer=e,this._elementRef=r,this.onChange=i=>{},this.onTouched=()=>{}}setProperty(e,r){this._renderer.setProperty(this._elementRef.nativeElement,e,r)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq))},n.\u0275dir=o.lG2({type:n}),n})(),g=(()=>{class n extends _e{}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,features:[o.qOj]}),n})();const h=new o.OlP("NgValueAccessor"),Bt={provide:h,useExisting:(0,o.Gpc)(()=>D),multi:!0},Tt=new o.OlP("CompositionEventMode");let D=(()=>{class n extends _e{constructor(e,r,i){super(e,r),this._compositionMode=i,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function xt(){const n=(0,Y.q)()?(0,Y.q)().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}())}writeValue(e){this.setProperty("value",e??"")}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq),o.Y36(Tt,8))},n.\u0275dir=o.lG2({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(e,r){1&e&&o.NdJ("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},features:[o._Bn([Bt]),o.qOj]}),n})();const It=!1;function f(n){return null==n||("string"==typeof n||Array.isArray(n))&&0===n.length}function ve(n){return null!=n&&"number"==typeof n.length}const u=new o.OlP("NgValidators"),p=new o.OlP("NgAsyncValidators"),Pt=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;class v{static min(t){return function Ce(n){return t=>{if(f(t.value)||f(n))return null;const e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}(t)}static max(t){return function Ve(n){return t=>{if(f(t.value)||f(n))return null;const e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}(t)}static required(t){return function Ae(n){return f(n.value)?{required:!0}:null}(t)}static requiredTrue(t){return function be(n){return!0===n.value?null:{required:!0}}(t)}static email(t){return function De(n){return f(n.value)||Pt.test(n.value)?null:{email:!0}}(t)}static minLength(t){return function Me(n){return t=>f(t.value)||!ve(t.value)?null:t.value.length<n?{minlength:{requiredLength:n,actualLength:t.value.length}}:null}(t)}static maxLength(t){return function Fe(n){return t=>ve(t.value)&&t.value.length>n?{maxlength:{requiredLength:n,actualLength:t.value.length}}:null}(t)}static pattern(t){return function Ee(n){if(!n)return G;let t,e;return"string"==typeof n?(e="","^"!==n.charAt(0)&&(e+="^"),e+=n,"$"!==n.charAt(n.length-1)&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),r=>{if(f(r.value))return null;const i=r.value;return t.test(i)?null:{pattern:{requiredPattern:e,actualValue:i}}}}(t)}static nullValidator(t){return null}static compose(t){return Be(t)}static composeAsync(t){return xe(t)}}function G(n){return null}function we(n){return null!=n}function Se(n){const t=(0,o.QGY)(n)?(0,At.D)(n):n;if(It&&!(0,o.CqO)(t)){let e="Expected async validator to return Promise or Observable.";throw"object"==typeof n&&(e+=" Are you using a synchronous validator where an async validator is expected?"),new o.vHH(-1101,e)}return t}function Ne(n){let t={};return n.forEach(e=>{t=null!=e?{...t,...e}:t}),0===Object.keys(t).length?null:t}function Oe(n,t){return t.map(e=>e(n))}function Ge(n){return n.map(t=>function kt(n){return!n.validate}(t)?t:e=>t.validate(e))}function Be(n){if(!n)return null;const t=n.filter(we);return 0==t.length?null:function(e){return Ne(Oe(e,t))}}function Z(n){return null!=n?Be(Ge(n)):null}function xe(n){if(!n)return null;const t=n.filter(we);return 0==t.length?null:function(e){return function Nt(...n){const t=(0,Ft.jO)(n),{args:e,keys:r}=(0,Dt.D)(n),i=new bt.y(s=>{const{length:a}=e;if(!a)return void s.complete();const c=new Array(a);let y=a,b=a;for(let q=0;q<a;q++){let me=!1;(0,Mt.Xf)(e[q]).subscribe((0,Et.x)(s,Pn=>{me||(me=!0,b--),c[q]=Pn},()=>y--,void 0,()=>{(!y||!me)&&(b||s.next(r?(0,St.n)(r,c):c),s.complete())}))}});return t?i.pipe((0,wt.Z)(t)):i}(Oe(e,t).map(Se)).pipe((0,Ot.U)(Ne))}}function $(n){return null!=n?xe(Ge(n)):null}function Te(n,t){return null===n?[t]:Array.isArray(n)?[...n,t]:[n,t]}function Ie(n){return n._rawValidators}function Pe(n){return n._rawAsyncValidators}function W(n){return n?Array.isArray(n)?n:[n]:[]}function B(n,t){return Array.isArray(n)?n.includes(t):n===t}function ke(n,t){const e=W(t);return W(n).forEach(i=>{B(e,i)||e.push(i)}),e}function Ue(n,t){return W(t).filter(e=>!B(n,e))}class He{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Z(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=$(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}class d extends He{get formDirective(){return null}get path(){return null}}class m extends He{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class Re{constructor(t){this._cd=t}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}let z=(()=>{class n extends Re{constructor(e){super(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(m,2))},n.\u0275dir=o.lG2({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(e,r){2&e&&o.ekj("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},features:[o.qOj]}),n})(),J=(()=>{class n extends Re{constructor(e){super(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(d,10))},n.\u0275dir=o.lG2({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(e,r){2&e&&o.ekj("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},features:[o.qOj]}),n})();function je(n,t){return n?`with name: '${t}'`:`at index: ${t}`}const K=!1,M="VALID",T="INVALID",C="PENDING",F="DISABLED";function ee(n){return(I(n)?n.validators:n)||null}function te(n,t){return(I(t)?t.asyncValidators:n)||null}function I(n){return null!=n&&!Array.isArray(n)&&"object"==typeof n}function Le(n,t,e){const r=n.controls;if(!(t?Object.keys(r):r).length)throw new o.vHH(1e3,K?function jt(n){return`\n    There are no form controls registered with this ${n?"group":"array"} yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `}(t):"");if(!r[e])throw new o.vHH(1001,K?function Lt(n,t){return`Cannot find form control ${je(n,t)}`}(t,e):"")}function qe(n,t,e){n._forEachChild((r,i)=>{if(void 0===e[i])throw new o.vHH(1002,K?function qt(n,t){return`Must supply a value for form control ${je(n,t)}`}(t,i):"")})}class P{constructor(t,e){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===M}get invalid(){return this.status===T}get pending(){return this.status==C}get disabled(){return this.status===F}get enabled(){return this.status!==F}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(ke(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(ke(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(Ue(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(Ue(t,this._rawAsyncValidators))}hasValidator(t){return B(this._rawValidators,t)}hasAsyncValidator(t){return B(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(e=>{e.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(e=>{e.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=C,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=F,this.errors=null,this._forEachChild(r=>{r.disable({...t,onlySelf:!0})}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=M,this._forEachChild(r=>{r.enable({...t,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===M||this.status===C)&&this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?F:M}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=C,this._hasOwnPendingAsyncValidator=!0;const e=Se(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(r=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(r,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){let e=t;return null==e||(Array.isArray(e)||(e=e.split(".")),0===e.length)?null:e.reduce((r,i)=>r&&r._find(i),this)}getError(t,e){const r=e?this.get(e):this;return r&&r.errors?r.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new o.vpe,this.statusChanges=new o.vpe}_calculateStatus(){return this._allControlsDisabled()?F:this.errors?T:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(C)?C:this._anyControlsHaveStatus(T)?T:M}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){I(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=function Yt(n){return Array.isArray(n)?Z(n):n||null}(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=function Zt(n){return Array.isArray(n)?$(n):n||null}(this._rawAsyncValidators)}}class E extends P{constructor(t,e,r){super(ee(e),te(r,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,r={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,r={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){qe(this,!0,t),Object.keys(t).forEach(r=>{Le(this,!0,r),this.controls[r].setValue(t[r],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(Object.keys(t).forEach(r=>{const i=this.controls[r];i&&i.patchValue(t[r],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((r,i)=>{r.reset(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(t,e,r)=>(t[r]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,r)=>!!r._syncPendingControls()||e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{const r=this.controls[e];r&&t(r,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(const[e,r]of Object.entries(this.controls))if(this.contains(e)&&t(r))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,r,i)=>((r.enabled||this.disabled)&&(e[i]=r.value),e))}_reduceChildren(t,e){let r=t;return this._forEachChild((i,s)=>{r=e(r,i,s)}),r}_allControlsDisabled(){for(const t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}}class Ye extends E{}const V=new o.OlP("CallSetDisabledState",{providedIn:"root",factory:()=>k}),k="always";function w(n,t,e=k){ne(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||"always"===e)&&t.valueAccessor.setDisabledState?.(n.disabled),function Wt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,"change"===n.updateOn&&Ze(n,t)})}(n,t),function Jt(n,t){const e=(r,i)=>{t.valueAccessor.writeValue(r),i&&t.viewToModelUpdate(r)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}(n,t),function zt(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,"blur"===n.updateOn&&n._pendingChange&&Ze(n,t),"submit"!==n.updateOn&&n.markAsTouched()})}(n,t),function $t(n,t){if(t.valueAccessor.setDisabledState){const e=r=>{t.valueAccessor.setDisabledState(r)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}(n,t)}function H(n,t,e=!0){const r=()=>{};t.valueAccessor&&(t.valueAccessor.registerOnChange(r),t.valueAccessor.registerOnTouched(r)),j(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function R(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function ne(n,t){const e=Ie(n);null!==t.validator?n.setValidators(Te(e,t.validator)):"function"==typeof e&&n.setValidators([e]);const r=Pe(n);null!==t.asyncValidator?n.setAsyncValidators(Te(r,t.asyncValidator)):"function"==typeof r&&n.setAsyncValidators([r]);const i=()=>n.updateValueAndValidity();R(t._rawValidators,i),R(t._rawAsyncValidators,i)}function j(n,t){let e=!1;if(null!==n){if(null!==t.validator){const i=Ie(n);if(Array.isArray(i)&&i.length>0){const s=i.filter(a=>a!==t.validator);s.length!==i.length&&(e=!0,n.setValidators(s))}}if(null!==t.asyncValidator){const i=Pe(n);if(Array.isArray(i)&&i.length>0){const s=i.filter(a=>a!==t.asyncValidator);s.length!==i.length&&(e=!0,n.setAsyncValidators(s))}}}const r=()=>{};return R(t._rawValidators,r),R(t._rawAsyncValidators,r),e}function Ze(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function ze(n,t){const e=n.indexOf(t);e>-1&&n.splice(e,1)}function Je(n){return"object"==typeof n&&null!==n&&2===Object.keys(n).length&&"value"in n&&"disabled"in n}const N=class extends P{constructor(t=null,e,r){super(ee(e),te(r,e)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),I(e)&&(e.nonNullable||e.initialValueIsDefault)&&(this.defaultValue=Je(t)?t.value:t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(r=>r(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){ze(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){ze(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){Je(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};let ae=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=o.lG2({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""]}),n})(),nt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({}),n})();const le=new o.OlP("NgModelWithFormControlWarning"),cn={provide:d,useExisting:(0,o.Gpc)(()=>O)};let O=(()=>{class n extends d{constructor(e,r,i){super(),this.callSetDisabledState=i,this.submitted=!1,this._onCollectionChange=()=>this._updateDomValue(),this.directives=[],this.form=null,this.ngSubmit=new o.vpe,this._setValidators(e),this._setAsyncValidators(r)}ngOnChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}ngOnDestroy(){this.form&&(j(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get control(){return this.form}get path(){return[]}addControl(e){const r=this.form.get(e.path);return w(r,e,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),r}getControl(e){return this.form.get(e.path)}removeControl(e){H(e.control||null,e,!1),function en(n,t){const e=n.indexOf(t);e>-1&&n.splice(e,1)}(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}getFormArray(e){return this.form.get(e.path)}updateModel(e,r){this.form.get(e.path).setValue(r)}onSubmit(e){return this.submitted=!0,function We(n,t){n._syncPendingControls(),t.forEach(e=>{const r=e.control;"submit"===r.updateOn&&r._pendingChange&&(e.viewToModelUpdate(r._pendingValue),r._pendingChange=!1)})}(this.form,this.directives),this.ngSubmit.emit(e),"dialog"===e?.target?.method}onReset(){this.resetForm()}resetForm(e){this.form.reset(e),this.submitted=!1}_updateDomValue(){this.directives.forEach(e=>{const r=e.control,i=this.form.get(e.path);r!==i&&(H(r||null,e),(n=>n instanceof N)(i)&&(w(i,e,this.callSetDisabledState),e.control=i))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){const r=this.form.get(e.path);(function $e(n,t){ne(n,t)})(r,e),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){if(this.form){const r=this.form.get(e.path);r&&function Qt(n,t){return j(n,t)}(r,e)&&r.updateValueAndValidity({emitEvent:!1})}}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm&&this._oldForm._registerOnCollectionChange(()=>{})}_updateValidators(){ne(this.form,this),this._oldForm&&j(this._oldForm,this)}_checkFormPresent(){}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(u,10),o.Y36(p,10),o.Y36(V,8))},n.\u0275dir=o.lG2({type:n,selectors:[["","formGroup",""]],hostBindings:function(e,r){1&e&&o.NdJ("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:["formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],features:[o._Bn([cn]),o.qOj,o.TTD]}),n})();const pn={provide:m,useExisting:(0,o.Gpc)(()=>L)};let L=(()=>{class n extends m{set isDisabled(e){}constructor(e,r,i,s,a){super(),this._ngModelWarningConfig=a,this._added=!1,this.update=new o.vpe,this._ngModelWarningSent=!1,this._parent=e,this._setValidators(r),this._setAsyncValidators(i),this.valueAccessor=function ie(n,t){if(!t)return null;let e,r,i;return Array.isArray(t),t.forEach(s=>{s.constructor===D?e=s:function Kt(n){return Object.getPrototypeOf(n.constructor)===g}(s)?r=s:i=s}),i||r||e||null}(0,s)}ngOnChanges(e){this._added||this._setUpControl(),function oe(n,t){if(!n.hasOwnProperty("model"))return!1;const e=n.model;return!!e.isFirstChange()||!Object.is(t,e.currentValue)}(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return function U(n,t){return[...t.path,n]}(null==this.name?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}_setUpControl(){this._checkParentType(),this.control=this.formDirective.addControl(this),this._added=!0}}return n._ngModelWarningSentOnce=!1,n.\u0275fac=function(e){return new(e||n)(o.Y36(d,13),o.Y36(u,10),o.Y36(p,10),o.Y36(h,10),o.Y36(le,8))},n.\u0275dir=o.lG2({type:n,selectors:[["","formControlName",""]],inputs:{name:["formControlName","name"],isDisabled:["disabled","isDisabled"],model:["ngModel","model"]},outputs:{update:"ngModelChange"},features:[o._Bn([pn]),o.qOj,o.TTD]}),n})(),Sn=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[nt]}),n})();class yt extends P{constructor(t,e,r){super(ee(e),te(r,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}at(t){return this.controls[this._adjustIndex(t)]}push(t,e={}){this.controls.push(t),this._registerControl(t),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(t,e,r={}){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:r.emitEvent})}removeAt(t,e={}){let r=this._adjustIndex(t);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(t,e,r={}){let i=this._adjustIndex(t);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),e&&(this.controls.splice(i,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(t,e={}){qe(this,!1,t),t.forEach((r,i)=>{Le(this,!1,i),this.at(i).setValue(r,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(t.forEach((r,i)=>{this.at(i)&&this.at(i).patchValue(r,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t=[],e={}){this._forEachChild((r,i)=>{r.reset(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this.controls.map(t=>t.getRawValue())}clear(t={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:t.emitEvent}))}_adjustIndex(t){return t<0?t+this.length:t}_syncPendingControls(){let t=this.controls.reduce((e,r)=>!!r._syncPendingControls()||e,!1);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){this.controls.forEach((e,r)=>{t(e,r)})}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value)}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t))}_allControlsDisabled(){for(const t of this.controls)if(t.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)}_find(t){return this.at(t)??null}}function vt(n){return!!n&&(void 0!==n.asyncValidators||void 0!==n.validators||void 0!==n.updateOn)}let Ct=(()=>{class n{constructor(){this.useNonNullable=!1}get nonNullable(){const e=new n;return e.useNonNullable=!0,e}group(e,r=null){const i=this._reduceControls(e);let s={};return vt(r)?s=r:null!==r&&(s.validators=r.validator,s.asyncValidators=r.asyncValidator),new E(i,s)}record(e,r=null){const i=this._reduceControls(e);return new Ye(i,r)}control(e,r,i){let s={};return this.useNonNullable?(vt(r)?s=r:(s.validators=r,s.asyncValidators=i),new N(e,{...s,nonNullable:!0})):new N(e,r,i)}array(e,r,i){const s=e.map(a=>this._createControl(a));return new yt(s,r,i)}_reduceControls(e){const r={};return Object.keys(e).forEach(i=>{r[i]=this._createControl(e[i])}),r}_createControl(e){return e instanceof N||e instanceof P?e:Array.isArray(e)?this.control(e[0],e.length>1?e[1]:null,e.length>2?e[2]:null):this.control(e)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),Nn=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:le,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:V,useValue:e.callSetDisabledState??k}]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[Sn]}),n})();var A=l(8750),On=l(5226),pe=l.n(On),Vt=l(6518);let Gn=(()=>{class n{constructor(e,r,i){this.fb=e,this.router=r,this.authService=i,this.miFormulario=this.fb.group({name:["Test1",[v.required]],password:["123456",[v.required]]})}login(){const{name:e,password:r}=this.miFormulario.value;this.authService.login(e,r).subscribe(i=>{!0===i?this.router.navigateByUrl("/mapas"):(pe().fire("Error",i+"","error"),this.miFormulario.reset())})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(Ct),o.Y36(A.F0),o.Y36(Vt.e))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-login"]],decls:18,vars:2,consts:[["routerLink",""],[1,"pi","pi-arrow-left","arrow-return"],["autocomplete","off",1,"mobile",3,"formGroup","ngSubmit"],[1,"formulario"],[1,"form-content"],[1,"titulo","log-in"],[1,"input-container"],["type","text","placeholder","Nombre","formControlName","name",1,"input"],["type","password","placeholder","Password","formControlName","password",1,"input"],["type","submit",1,"boton",3,"disabled"],[1,"sign-in"],[1,"not-tienes-cuenta"],["routerLink","/auth/registro",1,"crear-una-aqui"]],template:function(e,r){1&e&&(o.TgZ(0,"a",0),o._UZ(1,"i",1),o.qZA(),o.TgZ(2,"form",2),o.NdJ("ngSubmit",function(){return r.login()}),o.TgZ(3,"div",3)(4,"div",4)(5,"h2",5),o._uU(6,"Log in"),o.qZA(),o.TgZ(7,"div",6),o._UZ(8,"input",7),o.qZA(),o.TgZ(9,"div",6),o._UZ(10,"input",8),o.qZA(),o.TgZ(11,"button",9),o._uU(12," Submit "),o.qZA(),o.TgZ(13,"div",10)(14,"span",11),o._uU(15,"\xbfNo tienes cuenta?"),o.qZA(),o.TgZ(16,"a",12),o._uU(17,"CREAR UNA AQU\xcd"),o.qZA()()()()()),2&e&&(o.xp6(2),o.Q6J("formGroup",r.miFormulario),o.xp6(9),o.Q6J("disabled",r.miFormulario.invalid))},dependencies:[A.rH,ae,D,z,J,O,L],encapsulation:2}),n})(),Bn=(()=>{class n{camposIguales(e,r){return i=>{const s=i.get(e)?.value,a=i.get(r)?.value;return s!==a?(i.get("campo")?.setErrors({noIgulaes:!0}),{noIguales:!0}):(i.get("campo")?.setErrors({noIgulaes:null}),null)}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();const xn=[{path:"",children:[{path:"login",component:Gn},{path:"registro",component:(()=>{class n{constructor(e,r,i,s){this.fb=e,this.vs=r,this.authService=i,this.router=s,this.miFormulario=this.fb.group({name:["test1",[v.required]],password:["123456",[v.required,v.minLength(6)]],confirmar:["123456",[v.required]]},{validators:[this.vs.camposIguales("password","confirmar")]})}registro(){const{name:e,password:r}=this.miFormulario.value;this.authService.registro(e,r).subscribe(i=>{!0===i?pe().fire("Guardado","Usuario registrado","success"):pe().fire("Error",i,"error")})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(Ct),o.Y36(Bn),o.Y36(Vt.e),o.Y36(A.F0))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-registro"]],decls:20,vars:2,consts:[["routerLink",""],[1,"pi","pi-arrow-left","arrow-return"],["autocomplete","off",1,"mobile",3,"formGroup","ngSubmit"],[1,"formulario"],[1,"form-content"],[1,"titulo","log-in"],[1,"input-container"],["type","text","placeholder","Nombre","formControlName","name",1,"input"],["type","password","placeholder","Password","formControlName","password",1,"input"],["type","password","placeholder","Confirmar","formControlName","confirmar",1,"input"],["type","submit",1,"boton",3,"disabled"],[1,"sign-in"],[1,"not-tienes-cuenta"],["routerLink","/auth",1,"crear-una-aqui"]],template:function(e,r){1&e&&(o.TgZ(0,"a",0),o._UZ(1,"i",1),o.qZA(),o.TgZ(2,"form",2),o.NdJ("ngSubmit",function(){return r.registro()}),o.TgZ(3,"div",3)(4,"div",4)(5,"h2",5),o._uU(6,"Registro"),o.qZA(),o.TgZ(7,"div",6),o._UZ(8,"input",7),o.qZA(),o.TgZ(9,"div",6),o._UZ(10,"input",8),o.qZA(),o.TgZ(11,"div",6),o._UZ(12,"input",9),o.qZA(),o.TgZ(13,"button",10),o._uU(14," Submit "),o.qZA(),o.TgZ(15,"div",11)(16,"span",12),o._uU(17,"\xbfYa tienes cuenta?"),o.qZA(),o.TgZ(18,"a",13),o._uU(19,"INICIAR SESI\xd3N"),o.qZA()()()()()),2&e&&(o.xp6(2),o.Q6J("formGroup",r.miFormulario),o.xp6(11),o.Q6J("disabled",r.miFormulario.invalid))},dependencies:[A.rH,ae,D,z,J,O,L],encapsulation:2}),n})()},{path:"**",redirectTo:"login"}]}];let Tn=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[A.Bz.forChild(xn),A.Bz]}),n})(),In=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[Y.ez,Tn,Nn]}),n})()}}]);
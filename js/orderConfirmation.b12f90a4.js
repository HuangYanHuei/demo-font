(self["webpackChunkfont_demo"]=self["webpackChunkfont_demo"]||[]).push([[32],{1318:function(t,r,e){var n=e(5656),o=e(1400),c=e(6244),a=function(t){return function(r,e,a){var s,i=n(r),u=c(i),p=o(a,u);if(t&&e!=e){while(u>p)if(s=i[p++],s!=s)return!0}else for(;u>p;p++)if((t||p in i)&&i[p]===e)return t||p||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},3658:function(t,r,e){"use strict";var n=e(9781),o=e(3157),c=TypeError,a=Object.getOwnPropertyDescriptor,s=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=s?function(t,r){if(o(t)&&!a(t,"length").writable)throw c("Cannot set read only .length");return t.length=r}:function(t,r){return t.length=r}},9920:function(t,r,e){var n=e(2597),o=e(3887),c=e(1236),a=e(3070);t.exports=function(t,r,e){for(var s=o(r),i=a.f,u=c.f,p=0;p<s.length;p++){var l=s[p];n(t,l)||e&&n(e,l)||i(t,l,u(r,l))}}},7207:function(t){var r=TypeError,e=9007199254740991;t.exports=function(t){if(t>e)throw r("Maximum allowed index exceeded");return t}},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,r,e){var n=e(7854),o=e(1236).f,c=e(8880),a=e(8052),s=e(3072),i=e(9920),u=e(4705);t.exports=function(t,r){var e,p,l,d,_,f,h=t.target,v=t.global,m=t.stat;if(p=v?n:m?n[h]||s(h,{}):(n[h]||{}).prototype,p)for(l in r){if(_=r[l],t.dontCallGetSet?(f=o(p,l),d=f&&f.value):d=p[l],e=u(v?l:h+(m?".":"#")+l,t.forced),!e&&void 0!==d){if(typeof _==typeof d)continue;i(_,d)}(t.sham||d&&d.sham)&&c(_,"sham",!0),a(p,l,_,t)}}},8361:function(t,r,e){var n=e(1702),o=e(7293),c=e(4326),a=Object,s=n("".split);t.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(t){return"String"==c(t)?s(t,""):a(t)}:a},3157:function(t,r,e){var n=e(4326);t.exports=Array.isArray||function(t){return"Array"==n(t)}},4705:function(t,r,e){var n=e(7293),o=e(614),c=/#|\.prototype\./,a=function(t,r){var e=i[s(t)];return e==p||e!=u&&(o(r)?n(r):!!r)},s=a.normalize=function(t){return String(t).replace(c,".").toLowerCase()},i=a.data={},u=a.NATIVE="N",p=a.POLYFILL="P";t.exports=a},6244:function(t,r,e){var n=e(7466);t.exports=function(t){return n(t.length)}},4758:function(t){var r=Math.ceil,e=Math.floor;t.exports=Math.trunc||function(t){var n=+t;return(n>0?e:r)(n)}},1236:function(t,r,e){var n=e(9781),o=e(6916),c=e(5296),a=e(9114),s=e(5656),i=e(4948),u=e(2597),p=e(4664),l=Object.getOwnPropertyDescriptor;r.f=n?l:function(t,r){if(t=s(t),r=i(r),p)try{return l(t,r)}catch(e){}if(u(t,r))return a(!o(c.f,t,r),t[r])}},8006:function(t,r,e){var n=e(6324),o=e(748),c=o.concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return n(t,c)}},5181:function(t,r){r.f=Object.getOwnPropertySymbols},6324:function(t,r,e){var n=e(1702),o=e(2597),c=e(5656),a=e(1318).indexOf,s=e(3501),i=n([].push);t.exports=function(t,r){var e,n=c(t),u=0,p=[];for(e in n)!o(s,e)&&o(n,e)&&i(p,e);while(r.length>u)o(n,e=r[u++])&&(~a(p,e)||i(p,e));return p}},5296:function(t,r){"use strict";var e={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!e.call({1:2},1);r.f=o?function(t){var r=n(this,t);return!!r&&r.enumerable}:e},3887:function(t,r,e){var n=e(5005),o=e(1702),c=e(8006),a=e(5181),s=e(9670),i=o([].concat);t.exports=n("Reflect","ownKeys")||function(t){var r=c.f(s(t)),e=a.f;return e?i(r,e(t)):r}},1400:function(t,r,e){var n=e(9303),o=Math.max,c=Math.min;t.exports=function(t,r){var e=n(t);return e<0?o(e+r,0):c(e,r)}},5656:function(t,r,e){var n=e(8361),o=e(4488);t.exports=function(t){return n(o(t))}},9303:function(t,r,e){var n=e(4758);t.exports=function(t){var r=+t;return r!==r||0===r?0:n(r)}},7466:function(t,r,e){var n=e(9303),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},7658:function(t,r,e){"use strict";var n=e(2109),o=e(7908),c=e(6244),a=e(3658),s=e(7207),i=e(7293),u=i((function(){return 4294967297!==[].push.call({length:4294967296},1)})),p=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},l=u||!p();n({target:"Array",proto:!0,arity:1,forced:l},{push:function(t){var r=o(this),e=c(r),n=arguments.length;s(e+n);for(var i=0;i<n;i++)r[e]=arguments[i],e++;return a(r,e),e}})},3229:function(t,r,e){"use strict";e.d(r,{r:function(){return c}});var n=e(3907),o=e(6252);const c=t=>{const r=(0,n.oR)(),e=r.state.cartList,c=(t,e,n,o)=>{r.commit("changeCartItemInfo",{shopId:t,productId:e,productInfo:n,num:o})},a=(0,o.Fl)((()=>{const r=e[t]?.productList||{},n={};for(const t in r){const e=r[t];e.count>0&&(n[t]=e)}return n})),s=(0,o.Fl)((()=>{const r=e[t]?.shopName||"";return r})),i=(0,o.Fl)((()=>{const r=e[t]?.productList||[],n={total:0,price:0,totalcheck:!0};if(r)for(const t in r){const e=r[t];n.total+=e.count,!0===e.check&&(n.price+=e.count*e.price),r[t].count>0&&!1===r[t].check&&(n.totalcheck=!1)}return n.price=n.price.toFixed(2),n}));return{cartList:e,productList:a,changeCartItemInfo:c,shopName:s,calculate:i}}},5907:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return at}});var n=e(6252);const o={class:"wrapper"};function c(t,r,e,c,a,s){const i=(0,n.up)("TopArea"),u=(0,n.up)("ProductList"),p=(0,n.up)("CheckPart");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(i),(0,n.Wm)(u),(0,n.Wm)(p)])}var a=e(3577);const s=t=>((0,n.dD)("data-v-87a6b6bc"),t=t(),(0,n.Cn)(),t),i={class:"top"},u=s((()=>(0,n._)("div",{class:"top__bgcor"},null,-1))),p={class:"top__header"},l=s((()=>(0,n._)("span",{class:"top__header__title"},"確認訂單",-1))),d={key:0,class:"top__receiver"},_=s((()=>(0,n._)("div",{class:"top__receiver__title"},"收貨地址",-1))),f={class:"top__receiver__address"},h={class:"top__receiver__info"},v={class:"top__receiver__info__name"},m={class:"top__receiver__info__phone"},w={class:"top__receiver__enter"};function g(t,r,e,o,c,s){const g=(0,n.up)("font-awesome-icon"),k=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",i,[u,(0,n._)("div",p,[(0,n._)("div",{class:"top__header__back",onClick:r[0]||(r[0]=(...t)=>o.handleBackClick&&o.handleBackClick(...t))},[(0,n.Wm)(g,{icon:["fas","chevron-left"]})]),l]),(0,n.Wm)(k,{to:"/address"},{default:(0,n.w5)((()=>[o.addressInfo?((0,n.wg)(),(0,n.iD)("div",d,[_,(0,n._)("div",f,(0,a.zw)(o.addressInfo.city)+(0,a.zw)(o.addressInfo.detail),1),(0,n._)("div",h,[(0,n._)("span",v,(0,a.zw)(o.addressInfo.receiver),1),(0,n._)("span",m,(0,a.zw)(o.addressInfo.phone),1)]),(0,n._)("div",w,[(0,n.Wm)(g,{icon:["fas","chevron-left"],rotation:"180"})])])):(0,n.kq)("",!0)])),_:1})])}var k=e(2262),y=e(3907),b=e(2201),C={name:"TopArea",setup(){const t=(0,b.tv)(),r=(0,y.oR)(),e=(0,k.iH)({}),n=()=>{t.back()},o=async()=>{const t=r.state.user.id;return await r.dispatch("getAddressData",t),r.state.address&&(e.value=r.state.address),{addressInfo:e}};return o(),{handleBackClick:n,addressInfo:e}}},I=e(3744);const P=(0,I.Z)(C,[["render",g],["__scopeId","data-v-87a6b6bc"]]);var O=P;const x={class:"product"},L={class:"product__shopname"},D={key:0,class:"product__item"},S=["src"],z={class:"product__item__detail"},T={class:"product__item__title"},N={class:"product__item__price"},j={class:"product__item__twd"},A={class:"product__item__count"},E={class:"product__item__total"};function M(t,r,e,o,c,s){return(0,n.wg)(),(0,n.iD)("div",x,[(0,n._)("div",L,[(0,n._)("h4",null,(0,a.zw)(o.shopName),1)]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.productList,(t=>((0,n.wg)(),(0,n.iD)(n.HY,{key:t._id},[t.check?((0,n.wg)(),(0,n.iD)("div",D,[(0,n._)("img",{src:t.image,class:"product__item__img"},null,8,S),(0,n._)("div",z,[(0,n._)("h4",T,(0,a.zw)(t.name),1),(0,n._)("div",N,[(0,n._)("span",j,"$"+(0,a.zw)(t.price),1),(0,n._)("p",A," x "+(0,a.zw)(t.count),1),(0,n._)("p",E,"$"+(0,a.zw)(o.getProductTotalPrice(t).total),1)])])])):(0,n.kq)("",!0)],64)))),128))])}var F=e(3229);const W=()=>{const t=(0,b.yj)(),r=t.params.id,{shopName:e,productList:n}=(0,F.r)(r),o=t=>{const r=(t.count*t.price).toFixed(1);return{total:r}};return{shopName:e,productList:n,getProductTotalPrice:o}};var q={name:"ProductList",setup(){const{shopName:t,productList:r,getProductTotalPrice:e}=W();return{shopName:t,productList:r,getProductTotalPrice:e}}};const H=(0,I.Z)(q,[["render",M],["__scopeId","data-v-fcda7b46"]]);var Z=H;const R=t=>((0,n.dD)("data-v-00467e8e"),t=t(),(0,n.Cn)(),t),Y={class:"check"},B={class:"check__total"},$=R((()=>(0,n._)("span",{class:"check__total__chinese"},"實付金額:",-1))),K={class:"check__total__number"},G={key:0,class:"popup"},U=R((()=>(0,n._)("div",{class:"popup__title"},[(0,n._)("b",null,"確定要送出訂單？")],-1))),V=R((()=>(0,n._)("div",{class:"popup__content"},"請盡快完成支付，否則將被取消",-1))),J={class:"popup__buttons"};function Q(t,r,e,o,c,s){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",Y,[(0,n._)("div",B,[$,(0,n._)("span",K,[(0,n.Uk)(" "),(0,n._)("b",null,"$"+(0,a.zw)(o.calculate.price),1)])]),(0,n._)("button",{class:"check__button",onClick:r[0]||(r[0]=()=>o.handleSandClick(!0))}," 提交訂單 ")]),o.isShowPopup?((0,n.wg)(),(0,n.iD)("div",G,[U,V,(0,n._)("div",J,[(0,n._)("button",{class:"popup__buttons__cancel",onClick:r[1]||(r[1]=()=>o.handleConfirmOrder(!1))},"取消訂單 "),(0,n._)("button",{class:"popup__buttons__sure",onClick:r[2]||(r[2]=()=>o.handleConfirmOrder(!0))}," 確認支付 ")])])):(0,n.kq)("",!0),o.isShowPopup?((0,n.wg)(),(0,n.iD)("div",{key:1,class:"mask",onClick:r[3]||(r[3]=()=>o.handleSandClick(!1))})):(0,n.kq)("",!0)],64)}e(7658);var X=e(1120);const tt=()=>{const t=(0,b.yj)(),r=(0,y.oR)(),e=parseInt(t.params.id,10),{calculate:n,shopName:o,productList:c}=(0,F.r)(e),a=(0,k.iH)(!1),s=t=>{a.value=t},i=async t=>{const a=[];for(const r in c.value){const t=c.value[r];a.push({productId:parseInt(t.id,10),quantity:parseInt(t.count,10)})}try{await r.dispatch("putOrderData",{userId:r.state.user.id,addressId:r.state.address.id,restaurantId:e,shopname:o.value,status:t,items:a,total:n.value.price}),X.Z.push({name:"OrderList"})}catch(s){console.log(s)}};return{calculate:n,handleConfirmOrder:i,handleSandClick:s,isShowPopup:a}};var rt={name:"CheckPart",setup(){const{calculate:t,handleSandClick:r,isShowPopup:e,handleConfirmOrder:n}=tt();return{calculate:t,handleSandClick:r,isShowPopup:e,handleConfirmOrder:n}}};const et=(0,I.Z)(rt,[["render",Q],["__scopeId","data-v-00467e8e"]]);var nt=et,ot={name:"OrderConfirmation",components:{TopArea:O,ProductList:Z,CheckPart:nt}};const ct=(0,I.Z)(ot,[["render",c],["__scopeId","data-v-7f005be4"]]);var at=ct}}]);
//# sourceMappingURL=orderConfirmation.b12f90a4.js.map
(function(e){function t(t){for(var r,o,u=t[0],i=t[1],c=t[2],l=0,m=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&m.push(s[o][0]),s[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(m.length)m.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var i=n[u];0!==s[i]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},s={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/exercise3/phonebook-server/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var p=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0c7a":function(e,t,n){},"302d":function(e,t,n){"use strict";n("0c7a")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("h1",[e._v(" Phonebook ")]),e.message?n("Notification",{attrs:{message:e.message,"error-message":e.errorMessage},on:{"dismiss-message":e.dismissMessage}}):e._e(),n("Search",{on:{"search-people":e.searchPeople}}),n("Phonebook",{attrs:{filteredPeople:e.filteredPeople},on:{"remove-person":e.removePerson}}),n("AddPerson",{on:{"submit-person":e.submitPerson}})],1)},a=[],o=n("2909"),u=n("1da1"),i=(n("96cf"),n("7db0"),n("b0c0"),n("d81d"),n("99af"),n("4de4"),n("caad"),n("2532"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("h2",[e._v(" Names and numbers ")]),n("ul",e._l(e.filteredPeople,(function(t){return n("li",{key:t.name},[e._v(" "+e._s(t.name)+" ("+e._s(t.number)+") "),n("button",{on:{click:function(n){return e.removePerson(t.id)}}},[e._v(" Remove ")])])})),0)])}),c=[],p={props:{filteredPeople:Array},data:function(){return{}},methods:{removePerson:function(e){confirm("Are you sure you want this obtrusive dialog?")&&this.$emit("remove-person",e)}},computed:{}},l=p,m=n("2877"),f=Object(m["a"])(l,i,c,!1,null,null,null),d=f.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("h2",[e._v(" Add a new name ")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[n("span",{staticClass:"input"},[n("label",{attrs:{for:"name-input"}},[e._v(" Name ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input.name,expression:"input.name"}],attrs:{type:"text",id:"name-input"},domProps:{value:e.input.name},on:{input:function(t){t.target.composing||e.$set(e.input,"name",t.target.value)}}})]),n("br"),n("span",{staticClass:"input"},[n("label",{attrs:{for:"number-input"}},[e._v(" Number ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input.number,expression:"input.number"}],attrs:{type:"text"},domProps:{value:e.input.number},on:{input:function(t){t.target.composing||e.$set(e.input,"number",t.target.value)}}})]),n("br"),n("button",{attrs:{type:"submit"}},[e._v(" Add ")])])])},v=[],b=n("5530"),g={data:function(){return{input:{name:"",number:""}}},methods:{onSubmit:function(){this.$emit("submit-person",Object(b["a"])({},this.input)),this.input={name:"",number:""}}}},y=g,w=Object(m["a"])(y,h,v,!1,null,null,null),x=w.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("label",{attrs:{for:"search"}},[e._v(" Filter by name ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],attrs:{type:"search",id:"search"},domProps:{value:e.searchQuery},on:{input:[function(t){t.target.composing||(e.searchQuery=t.target.value)},e.onSearch]}})])},P=[],O={data:function(){return{searchQuery:""}},methods:{onSearch:function(){this.$emit("search-people",this.searchQuery)}}},k=O,j=Object(m["a"])(k,_,P,!1,null,null,null),M=j.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticClass:"notification",class:{error:e.errorMessage}},[e._v(" "+e._s(e.message)+" "),n("br"),n("button",{ref:"dismiss",on:{click:e.dismissMessage}},[e._v(" OK ")])])},S=[],$={props:{message:String,errorMessage:Boolean},methods:{dismissMessage:function(){this.$emit("dismiss-message")},focusDismissButton:function(){this.$refs.dismiss.focus()}},mounted:function(){this.focusDismissButton()}},Q=$,N=(n("302d"),Object(m["a"])(Q,R,S,!1,null,"0dffcc6c",null)),E=N.exports,A=n("bc3a"),C=n.n(A),T="/api/people",D=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C.a.get(T);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C.a.post(T,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.delete("".concat(T,"/").concat(t));case 3:e.next=8;break;case 5:return e.prev=5,e.t0=e["catch"](0),e.abrupt("return","Deletion of ".concat(t," unsuccessful: ").concat(e.t0));case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.patch("".concat(T,"/").concat(t),{number:n});case 3:return r=e.sent,e.abrupt("return",r.data);case 7:throw e.prev=7,e.t0=e["catch"](0),new Error("The person ".concat(t," no longer exists: ").concat(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),F={name:"App",components:{Phonebook:d,AddPerson:x,Search:M,Notification:E},data:function(){return{people:[],searchQuery:"",message:null,errorMessage:!1}},methods:{setMessage:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.message=e,this.errorMessage=r,setTimeout((function(){n.message=null,n.errorMessage=!1}),t)},setErrorMessage:function(e,t){this.setMessage(e,t,!0)},submitPerson:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){var r,s,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.people.find((function(t){return t.name===e.name})),!r){n.next=16;break}if(!confirm("\n          ".concat(e.name," already exists.\n          Would you like to replace the old number?\n        "))){n.next=14;break}return n.prev=3,n.next=6,L(r.id,e.number);case 6:s=n.sent,t.people=t.people.map((function(e){return e.id===s.id?s:e})),t.setMessage("\n              Successfully updated ".concat(s.name,".\n              New number: ").concat(s.number,"\n            "),4e3),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](3),t.setErrorMessage(n.t0.message,6e3);case 14:n.next=21;break;case 16:return n.next=18,B(e);case 18:a=n.sent,t.people=[].concat(Object(o["a"])(t.people),[a]),t.setMessage("Successfully added ".concat(a.name,"."),3e3);case 21:case"end":return n.stop()}}),n,null,[[3,11]])})))()},searchPeople:function(e){this.searchQuery=e},removePerson:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,J(e);case 3:t.people=t.people.filter((function(t){return t.id!==e})),t.setMessage("Successfully deleted ".concat(e,"."),3e3),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),t.setMessage(n.t0,6e3);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},dismissMessage:function(){this.message=null}},computed:{filteredPeople:function(){var e=this;return this.searchQuery?this.people.filter((function(t){return t.name.toLowerCase().includes(e.searchQuery.toLowerCase())})):this.people}},created:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,D();case 2:e.people=t.sent;case 3:case"end":return t.stop()}}),t)})))()}},K=F,W=(n("034f"),Object(m["a"])(K,s,a,!1,null,null,null)),q=W.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(q)}}).$mount("#app")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.86fadc03.js.map
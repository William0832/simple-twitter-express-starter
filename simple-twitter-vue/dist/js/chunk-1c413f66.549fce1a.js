(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c413f66"],{"5c9c":function(e,a,s){"use strict";s.r(a);var t=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"container py-5"},[s("form",{staticClass:"w-100",on:{submit:function(a){return a.preventDefault(),a.stopPropagation(),e.handleSubmit(a)}}},[e._m(0),s("div",{staticClass:"form-label-group mb-2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"name",autocomplete:"username",required:"",autofocus:""},domProps:{value:e.name},on:{input:function(a){a.target.composing||(e.name=a.target.value)}}})]),s("div",{staticClass:"form-label-group mb-2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"email",autocomplete:"email",required:""},domProps:{value:e.email},on:{input:function(a){a.target.composing||(e.email=a.target.value)}}})]),s("div",{staticClass:"form-label-group mb-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"Password",autocomplete:"new-password",required:""},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}})]),s("div",{staticClass:"form-label-group mb-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordCheck,expression:"passwordCheck"}],staticClass:"form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",placeholder:"Password Check",autocomplete:"new-password",required:""},domProps:{value:e.passwordCheck},on:{input:function(a){a.target.composing||(e.passwordCheck=a.target.value)}}})]),s("button",{staticClass:"btn btn-lg btn-primary btn-block mb-3",attrs:{disabled:e.isProcessing,type:"submit"}},[e._v("Submit")]),s("div",{staticClass:"text-center mb-3"},[s("p",[s("router-link",{attrs:{to:"/signin"}},[e._v("Sign In")])],1)]),s("p",{staticClass:"mt-5 mb-3 text-muted text-center"},[e._v("© 2017-2018")])])])},r=[function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"text-center mb-4"},[s("h1",{staticClass:"h3 mb-3 font-weight-normal"},[e._v("Sign Up")])])}],n=(s("b0c0"),s("96cf"),s("1da1")),o=s("7696"),i=s("2fa3"),c={data:function(){return{name:"",email:"",password:"",passwordCheck:"",isProcessing:!1}},methods:{handleSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,t;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.email&&e.password&&e.passwordCheck){a.next=4;break}return i["a"].fire({icon:"warning",title:"請填入完整的 email、password 資訊"}),a.abrupt("return");case 4:return e.isProcessing=!0,a.next=7,o["a"].signUp({email:e.email,password:e.password,name:e.name?e.name:"user name",passwordCheck:e.passwordCheck});case 7:if(s=a.sent,t=s.data,console.log("data",t),"success"===t.status){a.next=12;break}throw new Error(t.message);case 12:e.$router.push("/signin"),a.next=20;break;case 15:a.prev=15,a.t0=a["catch"](0),e.isProcessing=!1,i["a"].fire({icon:"warning",title:"請確認您輸入了正確的帳號密碼"}),console.log(a.t0);case 20:case"end":return a.stop()}}),a,null,[[0,15]])})))()}}},l=c,m=s("2877"),p=Object(m["a"])(l,t,r,!1,null,null,null);a["default"]=p.exports},7696:function(e,a,s){"use strict";s("b0c0");var t=s("2fa3");a["a"]={signIn:function(e){var a=e.email,s=e.password;return t["b"].post("/signin",{email:a,password:s})},signUp:function(e){var a=e.name,s=e.email,r=e.password,n=e.passwordCheck;return t["b"].post("/signup",{name:a,email:s,password:r,passwordCheck:n})}}}}]);
//# sourceMappingURL=chunk-1c413f66.549fce1a.js.map
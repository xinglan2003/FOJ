(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[761],{8812:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forum/[id]",function(){return n(7790)}])},7790:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return PostDetail}});var o=n(5893),a=n(7294),r=n(7066),s=n(1163);function PostDetail(){let t=(0,s.useRouter)(),{id:e}=t.query,[n,c]=(0,a.useState)(null),[i,l]=(0,a.useState)("");(0,a.useEffect)(()=>{e&&fetchPost()},[e]);let fetchPost=async()=>{try{let t=await r.Z.get("http://8.216.81.61:5000/api/forum/posts/".concat(e));c(t.data)}catch(t){console.error("获取帖子失败",t)}},handleComment=async t=>{t.preventDefault();let n=localStorage.getItem("token");try{await r.Z.post("http://8.216.81.61:5000/api/forum/posts/".concat(e,"/comments"),{content:i},{headers:{Authorization:"Bearer ".concat(n)}}),l(""),fetchPost()}catch(t){var o,a;alert((null===(a=t.response)||void 0===a?void 0:null===(o=a.data)||void 0===o?void 0:o.message)||"评论失败")}};return n?(0,o.jsxs)("div",{className:"container",children:[(0,o.jsx)("h2",{children:n.title}),(0,o.jsx)("p",{children:n.content}),(0,o.jsxs)("p",{children:["作者: ",n.author.nickname]}),(0,o.jsx)("h3",{children:"评论"}),(0,o.jsx)("ul",{children:n.comments.map(t=>(0,o.jsxs)("li",{children:[t.content," - ",t.author.nickname]},t.id))}),(0,o.jsxs)("form",{onSubmit:handleComment,children:[(0,o.jsx)("textarea",{placeholder:"发表评论",value:i,onChange:t=>l(t.target.value),required:!0}),(0,o.jsx)("button",{type:"submit",children:"提交"})]})]}):(0,o.jsx)("div",{children:"加载中..."})}}},function(t){t.O(0,[66,774,888,179],function(){return t(t.s=8812)}),_N_E=t.O()}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[268],{9123:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/leaderboard",function(){return n(7110)}])},7110:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return Leaderboard}});var t=n(5893),d=n(7294),c=n(7066);function Leaderboard(){let[e,r]=(0,d.useState)([]);(0,d.useEffect)(()=>{fetchLeaderboard()},[]);let fetchLeaderboard=async()=>{try{let e=await c.Z.get("http://8.216.81.61:5000/api/rating/leaderboard");r(e.data)}catch(e){console.error("获取排行榜失败",e)}};return(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("h2",{children:"排行榜"}),(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"排名"}),(0,t.jsx)("th",{children:"昵称"}),(0,t.jsx)("th",{children:"Elo 分数"})]})}),(0,t.jsx)("tbody",{children:e.map((e,r)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:r+1}),(0,t.jsx)("td",{children:e.user.nickname}),(0,t.jsx)("td",{children:e.elo})]},e.id))})]})]})}}},function(e){e.O(0,[66,774,888,179],function(){return e(e.s=9123)}),_N_E=e.O()}]);
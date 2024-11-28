function m(t,o){let e=document.createElement("div");e.textContent=o,e.className="message-block "+t,document.querySelector("#app").append(e),setTimeout(()=>{e.remove()},1e3)}export{m};

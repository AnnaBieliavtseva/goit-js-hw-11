import{S as m,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const h="29882819-d1b2e59da7ad20757f8559035",f=new URLSearchParams({key:h,image_type:"photo",orientation:"horizontal",safesearch:!0});function p(){return fetch(`https://pixabay.com/api/?${f}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function g(r){return r.map(({webformatURL:o,largeImageURL:n,tags:s,likes:e,views:t,comments:i,downloads:d})=>`<li class="photo-card">
          <a href="${n}" class="link">
<img src="${o}" alt="${s}" height="250" width="350"/></a>
          <div class="info">
          <p class="info-item">Likes: <b>${e}</b></p>
          <p class="info-item">Views: <b>${t}</b></p>
          <p class="info-item">Comments: <b>${i}</b></p>
          <p class="info-item">Downloads:<b> ${d}</b></p>
          </div>

        </li>`).join("")}const l=document.querySelector(".gallery"),y=document.querySelector(".search-form"),u=document.querySelector(".loader");let b=new m(".gallery a",{captionsData:"alt",captionDelay:300}),a;y.addEventListener("submit",L);function L(r){if(r.preventDefault(),a=r.target.elements.searchQuery.value.trim(),a===""){c.warning({message:"Please enter some data",position:"topRight"});return}f.set("q",a),l.innerHTML="",u.classList.remove("hidden"),p().then(o=>{o.hits.length?(l.insertAdjacentHTML("beforeend",g(o.hits)),b.refresh()):c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}).catch(o=>console.log(o)).finally(()=>{r.target.elements.searchQuery.value="",u.classList.add("hidden")})}
//# sourceMappingURL=index.js.map

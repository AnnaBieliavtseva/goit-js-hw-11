import{S as f,i as m}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const n=document.querySelector(".gallery"),d=document.querySelector(".search-form");document.querySelector(".thumb-loader");const h="29882819-d1b2e59da7ad20757f8559035";let c;const l=new URLSearchParams({key:h,image_type:"photo",orientation:"horizontal",safesearch:!0});function p(t){t.preventDefault(),c=t.target.elements.searchQuery.value.trim(),c!==""&&(l.set("q",c),n.innerHTML="",n.textContent="loader",setTimeout(()=>{n.textContent="",y(),n.refresh()},1e3))}d.addEventListener("submit",p);function y(){fetch(`https://pixabay.com/api/?${l}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{t.hits.length?(n.insertAdjacentHTML("beforeend",g(t.hits)),new f(".gallery a",{captionsData:"alt"}),console.log(t.hits)):m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}).catch(t=>console.log(t))}function g(t){return t.map(({webformatURL:o,largeImageURL:a,tags:s,likes:e,views:r,comments:i,downloads:u})=>`<li class="photo-card">
          <a href="${a}" class="link">
<img src="${o}" alt="${s}" height="250" width="350"/></a>
          <div class="info">
          <p class="info-item">Likes: <b>${e}</b></p>
          <p class="info-item">Views: <b>${r}</b></p>
          <p class="info-item">Comments: <b>${i}</b></p>
          <p class="info-item">Downloads:<b> ${u}</b></p>
          </div>

        </li>`).join("")}
//# sourceMappingURL=index.js.map

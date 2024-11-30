import{S as u,i as p}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const c=document.querySelector(".gallery"),d=document.querySelector(".search-form"),m="29882819-d1b2e59da7ad20757f8559035";let n;const l=new URLSearchParams({key:m,image_type:"photo",orientation:"horizontal",safesearch:!0});function h(t){t.preventDefault(),n=t.target.elements.searchQuery.value.trim(),n!==""&&(l.set("q",n),c.innerHTML="",g(),console.log(l.toString()))}d.addEventListener("submit",h);function g(){fetch(`https://pixabay.com/api/?${l}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{t.hits.length?(c.insertAdjacentHTML("beforeend",y(t.hits)),new u(".gallery a",{captionsData:"alt"}),c.refresh(),console.log(t.hits)):p.error({message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(t=>console.log(t))}function y(t){return t.map(({webformatURL:s,largeImageURL:i,tags:a,likes:e,views:r,comments:o,downloads:f})=>`  <li  class="photo-card">
          <a href="${i}" class="link">
          <img src="${s}" alt="${a}" width="300" height="300">
          <div class="info">
          <p class="info-item">Likes: <span class="card-text">${e}</span></p>
          <p class="info-item">Views: <span class="card-text">${r}</span></p>
          <p class="info-item">Comments: <span class="card-text">${o}</span></p>
          <p class="info-item">Downloads: <span class="card-text">${f}</span></p>
          </div>
</a>
        </li>`).join("")}
//# sourceMappingURL=index.js.map

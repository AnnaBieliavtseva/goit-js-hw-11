import{i as u}from"./assets/vendor-I1I71QQ2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const f=document.querySelector(".gallery"),d=document.querySelector(".search-form"),m="29882819-d1b2e59da7ad20757f8559035";let c;const a=new URLSearchParams({key:m,image_type:"photo",orientation:"horizontal",safesearch:!0});function h(t){t.preventDefault(),c=t.target.elements.searchQuery.value.trim(),c!==""&&(a.set("q",c),p(),console.log(a.toString()))}d.addEventListener("submit",h);function p(){fetch(`https://pixabay.com/api/?${a}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{t.hits.length?(f.insertAdjacentHTML("beforeend",y(t.hits)),console.log(t.hits)):u.error({message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(t=>console.log(t))}function y(t){return t.map(({webformatURL:o,largeImageURL:s,tags:n,likes:e,views:r,comments:i,downloads:l})=>`  <li  class="photo-card">
          <a href="${s} class="link">
          <img src="${o}" alt="${n}" width="300">
          <div class="info">
          <p>Likes: ${e}</p>
          <p>Views: ${r}</p>
          <p>Comments: ${i} </p>
          <p>Downloads: ${l}</p>
          </div>
</a>
        </li>`).join("")}
//# sourceMappingURL=index.js.map

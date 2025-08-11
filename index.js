import{S as m,a as f,i as n}from"./assets/vendor-D_DhjhBq.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();function p(t){const o=document.querySelector(".gallery"),i=t.map(({webformatURL:a,largeImageURL:e,tags:r,likes:s,views:l,comments:u,downloads:d})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${e}">
              <img
                class="gallery-image" width="360" height="200"
                src="${a}"
                alt="${r}"
              />
            </a>
            <div class="info-card">
              <p class="info-item">
                <b>Likes</b> ${s}
              </p>
              <p class="info-item">
                <b>Views</b> ${l}
              </p>
              <p class="info-item">
                <b>Comments</b> ${u}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${d}
              </p>
          </li>`).join("");o.insertAdjacentHTML("beforeend",i),new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function y(){const t=document.querySelector(".gallery");t&&(t.innerHTML="")}function g(){const t=document.querySelector(".loader");t&&t.classList.remove("hidden")}function h(){const t=document.querySelector(".loader");t&&t.classList.add("hidden")}function b(t,o=3){const i=new URLSearchParams({key:"51734453-5d46674fc0c6d7944706aca6e",q:t,image_type:"photo",per_page:o,orientation:"horizontal",safesearch:!0});return f(`https://pixabay.com/api/?${i}`).then(e=>{const{hits:r}=e.data;return r.length===0?(n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),[]):r}).catch(e=>(n.error({title:"Error",message:`An error occurred: ${e.message}`,position:"topRight"}),[]))}const c=document.querySelector(".form");c.addEventListener("submit",t=>{t.preventDefault(),y(),g();const o=document.querySelector('[name="search-text"]').value.trim(),i=document.querySelector('[name="per-page"]').value;b(o,i).then(a=>{p(a)}).catch(a=>{n.error({title:"Error",message:`An error occurred: ${a.message}`,position:"topRight"})}).finally(()=>{h(),c.reset()})});
//# sourceMappingURL=index.js.map

import{a as d,S as f,i as l}from"./assets/vendor-dc9bdb3e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const m=async({query:s,page:r,per_page:n=40})=>{const a="https://pixabay.com/api/",e="44765952-609f887d044cbd21207a6a8e1",t=await d.get(a,{params:{key:e,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:r}});if(t.status!==200)throw new Error(t.statusText);return t.data},i={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),searchInput:document.querySelector("#search-input"),btnSearch:document.querySelector("#btn-submit"),btnLoadMore:document.querySelector("#load-more")},g=new f(".gallery .photo-link",{});let o={query:"",page:0,per_page:40};const p=async()=>{o.page+=1;try{const s=await m({query:o.query,page:o.page,per_page:o.per_page}),{hits:r,totalHits:n}=s;if((r==null?void 0:r.length)===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");o.page===1&&l.success({position:"topRight",message:`Hooray! We found ${n} images.`});const a=r.map(e=>y(e)).join("");return i.gallery.insertAdjacentHTML("beforeend",a),o.page*o.per_page<n?i.btnLoadMore.classList.remove("hidden"):(l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),i.btnLoadMore.classList.add("hidden")),g.refresh(),s}catch(s){l.error({position:"topRight",message:s.message})}};i.form.addEventListener("submit",function(s){s.preventDefault();const r=i.searchInput.value.trim();if(!r){l.warning({position:"topRight",message:"Input is empty! Please, type your query"});return}i.gallery.innerHTML="",i.btnLoadMore.classList.add("hidden"),o.page=0,o.query=r,p()});i.btnLoadMore.addEventListener("click",()=>{p()});function y({id:s,largeImageURL:r,webformatURL:n,tags:a,likes:e,views:t,comments:c,downloads:u}){return`
  <div class="photo-card" data-id="${s}">
    <a class="photo-link" href="${r}" >
      <img src="${n}" alt="${a}" title="${a}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b><span class="value"> ${e}</span>
          
        </p>
        <p class="info-item">
          <b>Views</b><span class="value"> ${t} </span>
          
        </p>
        <p class="info-item">
          <b>Comments</b><span class="value"> ${c} </span>
          
        </p>
        <p class="info-item">
          <b>Downloads</b><span class="value"> ${u} </span>
          
        </p>
      </div>
    </a>
  </div>`}
//# sourceMappingURL=commonHelpers.js.map

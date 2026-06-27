/* ============================================================
   Saving Health Ministries — site script
   - Mobile nav toggle
   - Give amount selector
   - YouTube auto-publish (fills video grids from the channel)
   ============================================================ */

/* -----------------------------------------------------------
   STEP 1 — To turn the auto-publish feature ON, fill these in.
   Leave them blank and the site shows the static layout below
   (still looks finished). Nothing else needs to change.

   channelId : David's YouTube channel ID, starts with "UC..."
               (YouTube Studio > Settings > Channel > Advanced)
   apiKey    : A YouTube Data API v3 key from Google Cloud Console.
               Restrict it to the HTTP referrer darkday.us for safety.
   ----------------------------------------------------------- */
const YT_CONFIG = {
  channelId: "",   // e.g. "UCxxxxxxxxxxxxxxxxxxxxxx"
  apiKey:    "",   // e.g. "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx"
  channelUrl:"https://youtube.com",   // fallback link when no key is set
  maxResults: 6
};

/* ---------- Mobile nav ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links  = document.querySelector(".nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", ()=>{
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- Give amount selector ---------- */
function initGive(){
  const buttons = document.querySelectorAll(".amounts button");
  buttons.forEach(b=>b.addEventListener("click",()=>{
    buttons.forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
  }));
}

/* ---------- Click-to-play (swaps placeholder for the embed) ---------- */
function mountPlayer(el, videoId){
  el.querySelectorAll(".play-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(videoId){
        el.innerHTML =
          `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0"
                   title="Teaching" allow="autoplay; encrypted-media; fullscreen"
                   allowfullscreen></iframe>`;
      } else {
        window.open(YT_CONFIG.channelUrl, "_blank", "noopener");
      }
    });
  });
}

function wireStaticPlayers(){
  document.querySelectorAll("[data-player]").forEach(el=>mountPlayer(el, el.dataset.videoId || ""));
  document.querySelectorAll(".card .thumb").forEach(el=>{
    el.querySelectorAll(".play-btn").forEach(btn=>{
      btn.addEventListener("click",()=>window.open(YT_CONFIG.channelUrl,"_blank","noopener"));
    });
  });
}

/* ---------- YouTube auto-publish ---------- */
async function loadVideos(){
  const { channelId, apiKey, maxResults } = YT_CONFIG;
  if(!channelId || !apiKey){ wireStaticPlayers(); return; }

  // The uploads playlist is the channel id with "UC" swapped for "UU".
  const uploads = "UU" + channelId.slice(2);
  const url = `https://www.googleapis.com/youtube/v3/playlistItems`
            + `?part=snippet&maxResults=${maxResults}&playlistId=${uploads}&key=${apiKey}`;
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error("YouTube request failed");
    const data = await res.json();
    const vids = (data.items||[])
      .filter(i=>i.snippet && i.snippet.resourceId && i.snippet.resourceId.videoId)
      .map(i=>({
        id: i.snippet.resourceId.videoId,
        title: i.snippet.title,
        thumb: (i.snippet.thumbnails?.high || i.snippet.thumbnails?.medium || i.snippet.thumbnails?.default || {}).url
      }));
    if(!vids.length){ wireStaticPlayers(); return; }
    renderVideos(vids);
  }catch(err){
    console.warn("Auto-publish unavailable, showing static layout:", err);
    wireStaticPlayers();
  }
}

function renderVideos(vids){
  // Featured players (home + watch) get the latest upload.
  document.querySelectorAll("[data-player='featured']").forEach(el=>{
    el.innerHTML = `<button class="play-btn" aria-label="Play latest teaching"></button>`;
    mountPlayer(el, vids[0].id);
  });

  // Card grids fill in order from newest.
  document.querySelectorAll("[data-grid]").forEach(grid=>{
    const limit = parseInt(grid.dataset.grid,10) || vids.length;
    grid.innerHTML = "";
    vids.slice(0, limit).forEach(v=>{
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="thumb">
          ${v.thumb ? `<img src="${v.thumb}" alt="">` : ""}
          <button class="play-btn" aria-label="Play teaching"></button>
        </div>
        <div class="card-body">
          <div class="tag">Teaching</div>
          <h3 class="card-title">${escapeHtml(v.title)}</h3>
        </div>`;
      mountPlayer(card.querySelector(".thumb"), v.id);
      grid.appendChild(card);
    });
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

document.addEventListener("DOMContentLoaded",()=>{
  initNav();
  initGive();
  loadVideos();
});

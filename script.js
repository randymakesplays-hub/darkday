/* ============================================================
   Saving Health Ministries — site script
   - Mobile nav toggle
   - Give amount selector
   - Video grids: shows David's videos (hardcoded list below),
     with titles + thumbnails pulled live from YouTube.
   - Optional: full auto-publish from the channel via API key.
   ============================================================ */

/* -----------------------------------------------------------
   DAVID'S VIDEOS (showing now — no API key needed)
   Paste a YouTube video ID for each one you want featured.
   The ID is the part after "youtu.be/" or "watch?v=".
   Titles and thumbnails load automatically from YouTube.
   Add or remove lines anytime.
   ----------------------------------------------------------- */
const VIDEOS = [
  { id: "lwUHusVlouM" },
  { id: "WToxnbTbuEI" },
  { id: "5xbElr2kI4I" }
];

/* -----------------------------------------------------------
   MAIN FEATURED PLAYER (the big one on Home / Watch).
   Set ONE of these:
     playlist : a YouTube playlist ID (plays through the whole list)
     video    : a single video ID
   If both are blank, it falls back to the first video above.
   ----------------------------------------------------------- */
const FEATURED = {
  playlist: "PLlo6nE3v7Hm2axuyJPZoNv-0Uc1xh_-4T",
  video:    ""
};

/* -----------------------------------------------------------
   OPTIONAL — full auto-publish (pulls EVERY new upload itself).
   Leave blank to keep using the VIDEOS list above.
   Fill both in later to switch the whole site to live mode.
   ----------------------------------------------------------- */
const YT_CONFIG = {
  channelId:  "UCCq6eh7b6jurNvRWFqfz8Hw",                 // David's channel
  apiKey:     "",                                          // add a YouTube Data API key to go fully live
  channelUrl: "https://www.youtube.com/@DavidHouse4thAngel",
  maxResults: 6
};

/* ---------- Mobile nav ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links  = document.querySelector(".nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", function(){
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- Give amount selector ---------- */
function initGive(){
  const buttons = document.querySelectorAll(".amounts button");
  buttons.forEach(function(b){
    b.addEventListener("click", function(){
      buttons.forEach(function(x){ x.classList.remove("selected"); });
      b.classList.add("selected");
    });
  });
}

/* ---------- Click-to-play (swaps placeholder for the embed) ---------- */
function mountPlayer(el, videoId){
  el.querySelectorAll(".play-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      if(videoId){
        el.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
          'title="Teaching" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      } else {
        window.open(YT_CONFIG.channelUrl, "_blank", "noopener");
      }
    });
  });
}

/* ---------- Featured player (playlist, single video, or fallback) ---------- */
function mountFeatured(el, fallbackId){
  el.querySelectorAll(".play-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      // Playlist set: open David's playlist on YouTube in a new tab.
      if(FEATURED.playlist){
        window.open("https://www.youtube.com/playlist?list=" + FEATURED.playlist, "_blank", "noopener");
        return;
      }
      // Otherwise play a single video inline.
      var src;
      if(FEATURED.video){
        src = "https://www.youtube-nocookie.com/embed/" + FEATURED.video + "?autoplay=1&rel=0";
      } else if(fallbackId){
        src = "https://www.youtube-nocookie.com/embed/" + fallbackId + "?autoplay=1&rel=0";
      } else {
        window.open(YT_CONFIG.channelUrl, "_blank", "noopener"); return;
      }
      el.innerHTML = '<iframe src="' + src + '" title="Teaching" ' +
                     'allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    });
  });
}

/* ---------- Pull a real title from YouTube (no key needed) ----------
   Tries YouTube's oEmbed first, then a CORS-friendly proxy, then a
   plain fallback. Whatever happens, the thumbnail and playback are
   already the real video. ------------------------------------------- */
function fillTitle(el, id){
  const yt = "https://www.youtube.com/oembed?url=https://youtu.be/" + id + "&format=json";
  const proxy = "https://noembed.com/embed?url=https://youtu.be/" + id;
  fetch(yt)
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(function(d){ if(d && d.title){ el.textContent = d.title; } else { throw new Error(); } })
    .catch(function(){
      return fetch(proxy)
        .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
        .then(function(d){ if(d && d.title){ el.textContent = d.title; } else { throw new Error(); } });
    })
    .catch(function(){ el.textContent = "Watch this teaching"; });
}

/* ---------- Build a card from a video ---------- */
function buildCard(v){
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML =
    '<div class="thumb">' +
      '<img src="https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg" alt="">' +
      '<button class="play-btn" aria-label="Play teaching"></button>' +
    '</div>' +
    '<div class="card-body">' +
      '<div class="tag">Teaching</div>' +
      '<h3 class="card-title">Loading\u2026</h3>' +
    '</div>';
  mountPlayer(card.querySelector(".thumb"), v.id);
  if(v.title){ card.querySelector(".card-title").textContent = v.title; }
  else { fillTitle(card.querySelector(".card-title"), v.id); }
  return card;
}

/* ---------- Render the hardcoded VIDEOS list ---------- */
function renderHardcoded(){
  const first = VIDEOS[0] ? VIDEOS[0].id : "";

  document.querySelectorAll("[data-player='featured']").forEach(function(el){
    el.innerHTML = '<button class="play-btn" aria-label="Play teaching"></button>';
    mountFeatured(el, first);
  });
  document.querySelectorAll("[data-player]:not([data-player='featured'])").forEach(function(el){
    mountFeatured(el, first);
  });

  document.querySelectorAll("[data-grid]").forEach(function(grid){
    const limit = parseInt(grid.dataset.grid, 10) || VIDEOS.length;
    grid.innerHTML = "";
    VIDEOS.slice(0, limit).forEach(function(v){ grid.appendChild(buildCard(v)); });
  });
}

/* ---------- Full auto-publish via API key (optional) ---------- */
function loadFromChannel(){
  const channelId = YT_CONFIG.channelId;
  const apiKey = YT_CONFIG.apiKey;
  const maxResults = YT_CONFIG.maxResults;
  const uploads = "UU" + channelId.slice(2);
  const url = "https://www.googleapis.com/youtube/v3/playlistItems" +
              "?part=snippet&maxResults=" + maxResults +
              "&playlistId=" + uploads + "&key=" + apiKey;
  fetch(url)
    .then(function(res){ if(!res.ok) throw new Error("YouTube request failed"); return res.json(); })
    .then(function(data){
      const items = data.items || [];
      const vids = items
        .filter(function(i){ return i.snippet && i.snippet.resourceId && i.snippet.resourceId.videoId; })
        .map(function(i){ return { id: i.snippet.resourceId.videoId, title: i.snippet.title }; });
      if(!vids.length) throw new Error("No videos returned");
      const first = vids[0].id;
      document.querySelectorAll("[data-player='featured']").forEach(function(el){
        el.innerHTML = '<button class="play-btn" aria-label="Play latest teaching"></button>';
        mountFeatured(el, first);
      });
      document.querySelectorAll("[data-player]:not([data-player='featured'])").forEach(function(el){
        mountFeatured(el, first);
      });
      document.querySelectorAll("[data-grid]").forEach(function(grid){
        const limit = parseInt(grid.dataset.grid, 10) || vids.length;
        grid.innerHTML = "";
        vids.slice(0, limit).forEach(function(v){ grid.appendChild(buildCard(v)); });
      });
    })
    .catch(function(err){
      console.warn("Channel auto-pull failed, using hardcoded list:", err);
      renderHardcoded();
    });
}

/* ---------- Decide which mode to run ---------- */
function loadVideos(){
  if(YT_CONFIG.channelId && YT_CONFIG.apiKey){ loadFromChannel(); }
  else if(VIDEOS.length){ renderHardcoded(); }
}

document.addEventListener("DOMContentLoaded", function(){
  initNav();
  initGive();
  loadVideos();
});

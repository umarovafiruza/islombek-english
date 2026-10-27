const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add search input in Speaking Section right before <ul class="topics" id="topics">
const speakingSearchHtml = `    <div style="margin: 0 0 20px; display: flex; justify-content: flex-end;">
      <div class="vocab-search-wrap" style="max-width: 100%; width: 100%;">
        <svg class="vocab-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" id="speakingSearchInput" class="vocab-search-input" placeholder="Mavzuni qidirish (150 ta mavzu)..." autocomplete="off">
        <button type="button" class="vocab-clear-btn" id="speakingClearSearch" hidden title="Tozalash">&times;</button>
      </div>
    </div>\n    <ul class="topics" id="topics">`;

html = html.replace('<ul class="topics" id="topics">', speakingSearchHtml);

// 2. Add search input in Listening Section right before <ul class="topics" id="lisTopics">
const listeningSearchHtml = `    <div style="margin: 0 0 20px; display: flex; justify-content: flex-end;">
      <div class="vocab-search-wrap" style="max-width: 100%; width: 100%;">
        <svg class="vocab-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" id="listeningSearchInput" class="vocab-search-input" placeholder="Tinglash mavzusini qidirish (150 ta audio)..." autocomplete="off">
        <button type="button" class="vocab-clear-btn" id="listeningClearSearch" hidden title="Tozalash">&times;</button>
      </div>
    </div>\n    <ul class="topics" id="lisTopics">`;

html = html.replace('<ul class="topics" id="lisTopics">', listeningSearchHtml);

// 3. Add search input in Reading Section right before <ul class="topics" id="readTopics">
const readingSearchHtml = `    <div style="margin: 0 0 20px; display: flex; justify-content: flex-end;">
      <div class="vocab-search-wrap" style="max-width: 100%; width: 100%;">
        <svg class="vocab-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" id="readingSearchInput" class="vocab-search-input" placeholder="Mutolaa mavzusini qidirish (150 ta matn)..." autocomplete="off">
        <button type="button" class="vocab-clear-btn" id="readingClearSearch" hidden title="Tozalash">&times;</button>
      </div>
    </div>\n    <ul class="topics" id="readTopics">`;

html = html.replace('<ul class="topics" id="readTopics">', readingSearchHtml);

// 4. Update renderTopics()
const oldRenderTopics = `  function renderTopics() {
    list.innerHTML = "";
    TOPICS.forEach(function (t, i) {
      var lines = t.t[LEVEL];
      var words = lines.join(" ").split(/\\s+/).length;
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button"; b.className = "topic";
      b.innerHTML = '<span class="t"><span class="name"></span><span class="uz"></span></span><span class="meta"></span>';
      b.querySelector(".name").textContent = t.title;
      b.querySelector(".uz").textContent = t.uz;
      b.querySelector(".meta").textContent = lines.length + " qator \\u00b7 " + Math.max(1, Math.round(words / 80)) + " daq";
      b.addEventListener("click", function () { openTopic(i); });
      li.appendChild(b); list.appendChild(li);
    });
  }`;

const newRenderTopics = `  var speakingSearchInput = document.getElementById("speakingSearchInput");
  var speakingClearSearch = document.getElementById("speakingClearSearch");

  function renderTopics() {
    list.innerHTML = "";
    var q = (speakingSearchInput ? speakingSearchInput.value : "").trim().toLowerCase();
    var topicsToRender = TOPICS.map(function (t, i) { return { t: t, i: i }; });
    if (q) {
      topicsToRender = topicsToRender.filter(function (item) {
        return item.t.title.toLowerCase().includes(q) || item.t.uz.toLowerCase().includes(q);
      });
    }
    if (topicsToRender.length === 0) {
      list.innerHTML = '<li style="padding: 24px 0; color: var(--muted); grid-column: 1 / -1;">Bunday mavzu topilmadi.</li>';
      return;
    }
    topicsToRender.forEach(function (pair) {
      var t = pair.t;
      var i = pair.i;
      var lines = t.t[LEVEL];
      var words = lines.join(" ").split(/\\s+/).length;
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button"; b.className = "topic";
      b.innerHTML = '<span class="t"><span class="name"></span><span class="uz"></span></span><span class="meta"></span>';
      b.querySelector(".name").textContent = t.title;
      b.querySelector(".uz").textContent = t.uz;
      b.querySelector(".meta").textContent = lines.length + " qator \\u00b7 " + Math.max(1, Math.round(words / 80)) + " daq";
      b.addEventListener("click", function () { openTopic(i); });
      li.appendChild(b); list.appendChild(li);
    });
  }

  if (speakingSearchInput) {
    speakingSearchInput.addEventListener("input", function () {
      if (speakingClearSearch) speakingClearSearch.hidden = !speakingSearchInput.value.trim();
      renderTopics();
    });
  }
  if (speakingClearSearch) {
    speakingClearSearch.addEventListener("click", function () {
      speakingSearchInput.value = "";
      speakingClearSearch.hidden = true;
      speakingSearchInput.focus();
      renderTopics();
    });
  }`;

html = html.replace(oldRenderTopics, newRenderTopics);

// 5. Update renderLisTopics()
const oldRenderLis = `  function renderLisTopics() {
    lisListEl.innerHTML = "";
    var filtered = LISTENING_DATA.filter(function (it) { return it.level === LIS_LEVEL; });
    var results = getLisResults();

    if (filtered.length === 0) {
      lisListEl.innerHTML = '<li style="padding: 24px 0; color: var(--muted);">Ushbu daraja uchun mavzular tez kunda qo\\'shiladi.</li>';
      return;
    }`;

const newRenderLis = `  var listeningSearchInput = document.getElementById("listeningSearchInput");
  var listeningClearSearch = document.getElementById("listeningClearSearch");

  function renderLisTopics() {
    lisListEl.innerHTML = "";
    var filtered = LISTENING_DATA.filter(function (it) { return it.level === LIS_LEVEL; });
    var q = (listeningSearchInput ? listeningSearchInput.value : "").trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(function (it) {
        return it.title.toLowerCase().includes(q) || it.uz.toLowerCase().includes(q);
      });
    }
    var results = getLisResults();

    if (filtered.length === 0) {
      lisListEl.innerHTML = '<li style="padding: 24px 0; color: var(--muted); grid-column: 1 / -1;">Ushbu qidiruv bo\\'yicha mavzular topilmadi.</li>';
      return;
    }`;

html = html.replace(oldRenderLis, newRenderLis);

// Add listening search listeners before end of script
const lisListenersTarget = '  function checkListeningAnswers() {';
const lisListenersInsert = `  if (listeningSearchInput) {
    listeningSearchInput.addEventListener("input", function () {
      if (listeningClearSearch) listeningClearSearch.hidden = !listeningSearchInput.value.trim();
      renderLisTopics();
    });
  }
  if (listeningClearSearch) {
    listeningClearSearch.addEventListener("click", function () {
      listeningSearchInput.value = "";
      listeningClearSearch.hidden = true;
      listeningSearchInput.focus();
      renderLisTopics();
    });
  }

  function checkListeningAnswers() {`;

html = html.replace(lisListenersTarget, lisListenersInsert);

// 6. Update renderReadingList()
const oldRenderRead = `  function renderReadingList() {
    if (!readListEl) return;
    readListEl.innerHTML = "";
    var filtered = READING_DATA.filter(function (it) { return it.level === READ_LEVEL; });
    var results = getReadResults();

    if (filtered.length === 0) {
      readListEl.innerHTML = '<li style="padding: 24px 0; color: var(--muted);">Ushbu daraja uchun matnlar tez kunda qo\\'shiladi.</li>';
      return;
    }`;

const newRenderRead = `  var readingSearchInput = document.getElementById("readingSearchInput");
  var readingClearSearch = document.getElementById("readingClearSearch");

  function renderReadingList() {
    if (!readListEl) return;
    readListEl.innerHTML = "";
    var filtered = READING_DATA.filter(function (it) { return it.level === READ_LEVEL; });
    var q = (readingSearchInput ? readingSearchInput.value : "").trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(function (it) {
        return it.title.toLowerCase().includes(q) || it.uz.toLowerCase().includes(q);
      });
    }
    var results = getReadResults();

    if (filtered.length === 0) {
      readListEl.innerHTML = '<li style="padding: 24px 0; color: var(--muted); grid-column: 1 / -1;">Ushbu qidiruv bo\\'yicha matnlar topilmadi.</li>';
      return;
    }`;

html = html.replace(oldRenderRead, newRenderRead);

// Add reading search listeners before openReadingTopic
const readListenersTarget = '  function openReadingTopic(id) {';
const readListenersInsert = `  if (readingSearchInput) {
    readingSearchInput.addEventListener("input", function () {
      if (readingClearSearch) readingClearSearch.hidden = !readingSearchInput.value.trim();
      renderReadingList();
    });
  }
  if (readingClearSearch) {
    readingClearSearch.addEventListener("click", function () {
      readingSearchInput.value = "";
      readingClearSearch.hidden = true;
      readingSearchInput.focus();
      renderReadingList();
    });
  }

  function openReadingTopic(id) {`;

html = html.replace(readListenersTarget, readListenersInsert);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Search enhancements injected successfully! Total size:', html.length);

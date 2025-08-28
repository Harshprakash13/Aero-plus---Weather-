const API_KEY = '021d9edce169428f870102721252808';

// DOM refs
const bgVideo = document.getElementById('bgVideo');
const navCityInput = document.getElementById('navCityInput');
console.log('navCityInput:', navCityInput); // Debug log
const navSearchBtn = document.getElementById('navSearchBtn');
console.log('navSearchBtn:', navSearchBtn); // Debug log
const cardSearchInput = document.getElementById('cardSearchInput');
console.log('cardSearchInput:', cardSearchInput); // Debug log
const cardSearchBtn = document.getElementById('cardSearchBtn');
const cardCityEl = document.getElementById('cardCity');
const cardCityIcon = document.getElementById('cardCityIcon');
const cardCityText = document.getElementById('cardCityText');
const cardTempEl = document.getElementById('cardTemp');
const statWindEl = document.getElementById('statWind');
const statHumEl = document.getElementById('statHum');
const cardCondIcon = document.getElementById('cardCondIcon');
const cardCondText = document.getElementById('cardCondText');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = new Date().getFullYear();

// load theme: default to dark unless user explicitly chose 'light'
const _savedTheme = localStorage.getItem('theme');
if (_savedTheme === 'light') {
  document.documentElement.classList.remove('dark');
  if (themeToggle) themeToggle.textContent = '🌙';
} else {
  document.documentElement.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️';
}

function setLoading(city) {
  if (cardCityText) {
    cardCityText.textContent = city ? city : 'Loading…';
    cardCityText.style.display = 'block'; // Show the text
  }
  if (cardCityEl) cardCityEl.classList.add('show-text');
  if (cardTempEl) cardTempEl.textContent = '--°C';
  if (statWindEl) statWindEl.textContent = '— kph';
  if (statHumEl) statHumEl.textContent = '—%';
  if (cardCondText) cardCondText.textContent = '...';
  if (cardCondIcon) { cardCondIcon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; cardCondIcon.style.display = 'none'; }
}

async function setBackgroundVideo(src) {
  if (!bgVideo) return;
  try {
    if (!src) {
      bgVideo.pause();
      bgVideo.removeAttribute('src');
      bgVideo.load();
      bgVideo.style.display = 'none';
      return;
    }
    const curr = bgVideo.getAttribute('src') || '';
    if (curr === src) { bgVideo.style.display = 'block'; try { await bgVideo.play(); } catch(e){}; return; }
    bgVideo.setAttribute('src', src);
    bgVideo.load();
    bgVideo.style.display = 'block';
    try { await bgVideo.play(); } catch (e) { /* ignore autoplay */ }
  } catch (e) { console.warn('setBackgroundVideo:', e); }
}

function mapWeatherToVideoAndClass(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('sun') || t.includes('clear')) return { cls: 'sunny', video: 'Video/Sunny.mp4' };
  if (t.includes('cloud')) return { cls: 'cloudy', video: 'Video/Cloud.mp4' };
  if (t.includes('fog') || t.includes('mist') || t.includes('haze')) return { cls: 'foggy', video: 'Video/Fogg.mp4' };
  if (t.includes('rain') || t.includes('drizzle') || t.includes('thunder')) return { cls: 'rainy', video: 'Video/Rain.mp4' };
  if (t.includes('snow') || t.includes('sleet') || t.includes('ice')) return { cls: 'snowy', video: 'Video/snow.mp4' };
  return { cls: null, video: null };
}

async function getWeather(city) {
  city = (city || '').trim();
  if (!city && navCityInput) city = navCityInput.value.trim();
  if (!city && cardSearchInput) city = cardSearchInput.value.trim();
  if (!city) { if (cardCityEl) cardCityEl.textContent = 'Please enter a city'; return; }

  console.log(`Fetching weather for city: ${city}`); // Debug log
  const base = 'https://api.weatherapi.com/v1/current.json';
  const url = `${base}?key=${encodeURIComponent(API_KEY)}&q=${encodeURIComponent(city)}&aqi=no`;

  if (navSearchBtn) navSearchBtn.disabled = true;
  if (cardSearchBtn) cardSearchBtn.disabled = true;
  setLoading(city);

  try {
    const resp = await fetch(url, { method: 'GET', mode: 'cors' });
    console.log('Response received:', resp); // Debug log
    if (!resp.ok) {
      const text = await resp.text();
      let msg = `HTTP ${resp.status}`;
      try { const j = JSON.parse(text); if (j && j.error && j.error.message) msg = j.error.message; else if (text) msg = text; } catch(e) { if (text) msg = text; }
      throw new Error(msg);
    }
    const data = await resp.json();
    console.log('Weather data:', data); // Debug log

    if (cardCityText) {
      cardCityText.textContent = `${data.location.name}, ${data.location.country}`;
      cardCityText.style.display = 'block'; // Show the city text
    }
    if (cardCityEl) cardCityEl.classList.add('show-text');
    if (cardTempEl) cardTempEl.textContent = `${data.current.temp_c}°C`;
    if (statWindEl) statWindEl.textContent = `${data.current.wind_kph} kph`;
    if (statHumEl) statHumEl.textContent = `${data.current.humidity}%`;

    const condText = data.current && data.current.condition && data.current.condition.text ? data.current.condition.text : '';
    const condIconRaw = data.current && data.current.condition && data.current.condition.icon ? data.current.condition.icon : '';
    if (cardCondText) cardCondText.textContent = condText || '—';
    if (cardCondIcon) {
      if (condIconRaw) {
        const iconSrc = condIconRaw.startsWith('//') ? 'https:' + condIconRaw : condIconRaw;
        cardCondIcon.src = iconSrc;
        cardCondIcon.alt = condText || 'condition';
        cardCondIcon.style.display = 'block';
      } else {
        cardCondIcon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        cardCondIcon.style.display = 'none';
      }
    }

    const map = mapWeatherToVideoAndClass(data.current.condition.text);
    ['sunny','cloudy','foggy','rainy','snowy'].forEach(c => document.body.classList.remove(c));
    if (map.cls) document.body.classList.add(map.cls);
    await setBackgroundVideo(map.video);
  } catch (err) {
    console.error('getWeather error', err);
    if (cardCityText) {
      cardCityText.textContent = `Error: ${err.message}`;
      cardCityText.style.display = 'block'; // Show the error message
    }
    if (cardCityEl) cardCityEl.classList.add('show-text');
    if (cardTempEl) cardTempEl.textContent = '--°C';
    if (statWindEl) statWindEl.textContent = '— kph';
    if (statHumEl) statHumEl.textContent = '—%';
    await setBackgroundVideo(null);
  } finally {
    if (navSearchBtn) navSearchBtn.disabled = false;
    if (cardSearchBtn) cardSearchBtn.disabled = false;
  }
}

// wire events
if (navSearchBtn) {
  console.log('Setting up navSearchBtn event listener'); // Debug log
  navSearchBtn.addEventListener('click', () => {
    console.log('Nav search button clicked'); // Debug log
    console.log('City input value:', navCityInput.value); // Log the input value
    getWeather(navCityInput ? navCityInput.value : '');
  });
}
if (cardSearchBtn) {
  console.log('Setting up cardSearchBtn event listener'); // Debug log
  cardSearchBtn.addEventListener('click', () => {
    console.log('Card search button clicked'); // Debug log
    getWeather(cardSearchInput ? cardSearchInput.value : '');
  });
}
if (navCityInput) navCityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') getWeather(navCityInput.value); });
if (cardSearchInput) cardSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') getWeather(cardSearchInput.value); });

// theme toggle handling
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// optional: run a default demo search (uncomment to auto-query on load)
// getWeather('London');

// Reset background and UI when no search has been made.
function resetUI() {
  ['sunny','cloudy','foggy','rainy','snowy'].forEach(c => document.body.classList.remove(c));
  document.body.style.background = '';
  setBackgroundVideo(null);
  if (cardCityText) cardCityText.textContent = '';
  if (cardCityEl) cardCityEl.classList.remove('show-text');
  if (cardTempEl) cardTempEl.textContent = '--°C';
  if (statWindEl) statWindEl.textContent = '— kph';
  if (statHumEl) statHumEl.textContent = '—%';
  if (cardCondText) cardCondText.textContent = '—';
  if (cardCondIcon) { cardCondIcon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; cardCondIcon.style.display = 'none'; }
}

// ensure UI starts in default state
resetUI();

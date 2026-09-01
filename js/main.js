/* ============================================================
   MOVIE RANKER - JavaScript (Supabase Cloud Database)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initSupabase === 'function') {
    initSupabase();
  }
  initHamburger();
  initHeroSlider();
  initCarousels();
  initMiniCarousels();
  initSearch();
  initForm();
});

/* ──────────────────────────────────────────────────────────────
   HAMBURGER MENU
   ────────────────────────────────────────────────────────────── */
function initHamburger() {
  const btn   = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

/* ──────────────────────────────────────────────────────────────
   HERO SLIDER
   ────────────────────────────────────────────────────────────── */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const track  = slider.querySelector('.hero-track');
  const slides = slider.querySelectorAll('.hero-slide');
  const dots   = slider.querySelectorAll('.s-dot');
  const prev   = slider.querySelector('.s-btn.prev');
  const next   = slider.querySelector('.s-btn.next');
  if (!track || slides.length === 0) return;

  let current = 0;
  let timer = null;

  function show(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => show(current + 1), 5000);
  }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  if (prev) prev.addEventListener('click', (e) => { e.preventDefault(); show(current - 1); startAutoplay(); });
  if (next) next.addEventListener('click', (e) => { e.preventDefault(); show(current + 1); startAutoplay(); });

  dots.forEach((d, i) => {
    d.addEventListener('click', (e) => { e.preventDefault(); show(i); startAutoplay(); });
  });

  let startX = 0, moveX = 0, isTouching = false;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; moveX = startX; isTouching = true; stopAutoplay(); }, { passive: true });
  slider.addEventListener('touchmove', (e) => { if (!isTouching) return; moveX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', () => {
    if (!isTouching) return;
    isTouching = false;
    const diff = moveX - startX;
    if (diff > 50) show(current - 1);
    else if (diff < -50) show(current + 1);
    startAutoplay();
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  show(0);
  startAutoplay();
}

/* ──────────────────────────────────────────────────────────────
   DETAIL CAROUSEL
   ────────────────────────────────────────────────────────────── */
function initCarousels() {
  document.querySelectorAll('.det-carousel').forEach(car => {
    const track  = car.querySelector('.det-track');
    const slides = car.querySelectorAll('.det-slide');
    const dotsEl = car.querySelector('.c-dots');
    const prev   = car.querySelector('.c-btn.prev');
    const next   = car.querySelector('.c-btn.next');
    if (!track || slides.length === 0) return;

    let cur = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('c-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      if (dotsEl) dotsEl.appendChild(dot);
    });

    function goTo(idx) {
      cur = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${cur * 100}%)`;
      car.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    }

    if (prev) prev.addEventListener('click', () => goTo(cur - 1));
    if (next) next.addEventListener('click', () => goTo(cur + 1));
  });
}

/* ──────────────────────────────────────────────────────────────
   MINI CAROUSELS
   ────────────────────────────────────────────────────────────── */
function initMiniCarousels() {
  document.querySelectorAll('.mini-car').forEach(car => {
    const track  = car.querySelector('.mini-track');
    const slides = car.querySelectorAll('.mini-slide');
    const prev   = car.querySelector('.mini-btn.prev');
    const next   = car.querySelector('.mini-btn.next');
    if (!track || slides.length === 0) return;

    let cur = 0;

    function goTo(idx) {
      cur = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${cur * 100}%)`;
    }

    if (prev) prev.addEventListener('click', () => goTo(cur - 1));
    if (next) next.addEventListener('click', () => goTo(cur + 1));
  });
}

/* ──────────────────────────────────────────────────────────────
   SEARCH
   ────────────────────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.mv-item').forEach(item => {
      const title = (item.dataset.title || '').toLowerCase();
      item.style.display = (!q || title.includes(q)) ? 'flex' : 'none';
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   SUPABASE CLOUD DATABASE & REGISTER FORM
   ────────────────────────────────────────────────────────────── */
const DB_STORAGE_KEY = 'movie_ranker_users_db';

function getLocalDB() {
  const data = localStorage.getItem(DB_STORAGE_KEY);
  if (!data) {
    const initial = [
      { id: 1, name: 'Admin MovieRanker', email: 'admin@movieranker.com', phone: '0812345678', gender: 'other', created_at: '2026-09-01T10:00:00.000Z' },
      { id: 2, name: 'SANRUETHAI YUNGMEE', email: '0627594644bee@gmail.com', phone: '0946054434', gender: 'female', created_at: '2026-09-01T10:02:15.000Z' }
    ];
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try { return JSON.parse(data) || []; } catch(e) { return []; }
}

function saveLocalDB(users) {
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(users));
}

function isCloudReady() {
  return typeof window._sb !== 'undefined' && window._sb !== null;
}

function initForm() {
  const form       = document.getElementById('reg-form');
  const clrBtn     = document.getElementById('btn-clr');
  const alertEl    = document.getElementById('auth-alert');
  const submitBtn  = document.getElementById('btn-reg');
  const viewDbBtn  = document.getElementById('btn-view-db');
  const dbModal    = document.getElementById('db-modal');
  const closeDbBtn = document.getElementById('btn-close-db');
  const clearDbBtn = document.getElementById('btn-db-clear');
  const tbodyEl    = document.getElementById('db-table-body');
  const countEl    = document.getElementById('db-count');
  const titleEl    = document.querySelector('.db-modal-title');

  function showAlert(msg, isSuccess = false) {
    if (!alertEl) { alert(msg); return; }
    alertEl.className = 'auth-alert ' + (isSuccess ? 'success' : 'error');
    alertEl.textContent = msg;
    alertEl.style.display = 'block';
  }

  async function fetchAllUsers() {
    if (isCloudReady()) {
      try {
        const { data, error } = await window._sb
          .from('users')
          .select('*')
          .order('id', { ascending: true });
        if (!error && Array.isArray(data)) return data;
        console.warn('Supabase fetch error:', error);
      } catch (err) {
        console.warn('Supabase fetch exception:', err);
      }
    }
    return getLocalDB();
  }

  async function renderDBTable() {
    if (!tbodyEl) return;

    if (titleEl) {
      titleEl.innerHTML = isCloudReady()
        ? `🗄️ ฐานข้อมูลสมาชิก <span style="font-size:11px;background:#15803d;color:#fff;padding:2px 8px;border-radius:10px;margin-left:6px;">🟢 Supabase Cloud</span>`
        : `🗄️ ฐานข้อมูลสมาชิก <span style="font-size:11px;background:#b45309;color:#fff;padding:2px 8px;border-radius:10px;margin-left:6px;">🟠 Local DB</span>`;
    }

    tbodyEl.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#aaa;padding:24px;">กำลังโหลดข้อมูล...</td></tr>`;

    const users = await fetchAllUsers();
    if (countEl) countEl.textContent = `จำนวนสมาชิกในฐานข้อมูล: ${users.length} คน`;

    if (users.length === 0) {
      tbodyEl.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#888;padding:24px;">ยังไม่มีข้อมูลสมาชิก</td></tr>`;
      return;
    }

    const genderMap = { male: 'ชาย', female: 'หญิง', other: 'อื่นๆ' };

    tbodyEl.innerHTML = users.map((u, idx) => `
      <tr>
        <td style="color:var(--gold);font-weight:600;">#${u.id || (idx + 1)}</td>
        <td style="font-weight:500;">${esc(u.name)}</td>
        <td style="color:#aaa;">${esc(u.email)}</td>
        <td>${esc(u.phone)}</td>
        <td><span class="badge-gender">${genderMap[u.gender] || u.gender || 'ชาย'}</span></td>
        <td style="font-size:11.5px;color:#888;">${fmtDate(u.created_at)}</td>
        <td><button type="button" class="btn-del-user" data-id="${u.id || (idx + 1)}">ลบ</button></td>
      </tr>
    `).join('');

    tbodyEl.querySelectorAll('.btn-del-user').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        if (isCloudReady()) {
          try { await window._sb.from('users').delete().eq('id', id); }
          catch (err) { console.warn('Delete error:', err); }
        }
        saveLocalDB(getLocalDB().filter((u, i) => (u.id || (i + 1)) !== id));
        await renderDBTable();
      });
    });
  }

  function fmtDate(d) {
    if (!d) return 'เมื่อสักครู่';
    try {
      const dt = new Date(d);
      return isNaN(dt.getTime()) ? d : dt.toLocaleString('th-TH');
    } catch(e) { return d; }
  }

  function esc(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
    );
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (alertEl) alertEl.style.display = 'none';

      const name   = form.querySelector('#f-name').value.trim();
      const email  = form.querySelector('#f-email').value.trim();
      const key    = form.querySelector('#f-key').value.trim();
      const phone  = form.querySelector('#f-phone').value.trim();
      const gender = form.querySelector('#f-gender') ? form.querySelector('#f-gender').value : 'male';

      if (!name || !email || !key || !phone) { showAlert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); return; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { showAlert('รูปแบบอีเมลไม่ถูกต้อง'); return; }
      if (key.length < 4) { showAlert('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'); return; }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'กำลังบันทึก...'; }

      let savedToCloud = false;

      if (isCloudReady()) {
        try {
          const { data: existing } = await window._sb.from('users').select('id').eq('email', email).maybeSingle();
          if (existing) {
            showAlert('อีเมลนี้ถูกใช้งานในฐานข้อมูลแล้ว');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'สมัครสมาชิก'; }
            return;
          }
          const { error } = await window._sb.from('users').insert([{ name, email, phone, gender, password: key }]);
          if (!error) { savedToCloud = true; }
          else { console.warn('Supabase insert error:', error); }
        } catch (err) {
          console.warn('Supabase exception:', err);
        }
      } else {
        const locals = getLocalDB();
        if (locals.some(u => (u.email || '').toLowerCase() === email.toLowerCase())) {
          showAlert('อีเมลนี้ถูกใช้งานแล้ว');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'สมัครสมาชิก'; }
          return;
        }
        const nextId = locals.length > 0 ? Math.max(...locals.map(u => u.id || 0)) + 1 : 1;
        locals.push({ id: nextId, name, email, phone, gender, created_at: new Date().toISOString() });
        saveLocalDB(locals);
      }

      const label = savedToCloud ? 'Supabase Cloud Database ☁️' : 'ฐานข้อมูล 🎬';
      showAlert(`สมัครสมาชิกสำเร็จ! บันทึกลง ${label}`, true);
      form.reset();
      renderDBTable();
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'สมัครสมาชิก'; }
    });
  }

  if (clrBtn) {
    clrBtn.addEventListener('click', () => {
      if (form) form.reset();
      if (alertEl) alertEl.style.display = 'none';
    });
  }

  if (viewDbBtn && dbModal) {
    viewDbBtn.addEventListener('click', () => { renderDBTable(); dbModal.classList.add('open'); });
  }

  if (closeDbBtn && dbModal) {
    closeDbBtn.addEventListener('click', () => dbModal.classList.remove('open'));
  }

  if (dbModal) {
    dbModal.addEventListener('click', (e) => { if (e.target === dbModal) dbModal.classList.remove('open'); });
  }

  if (clearDbBtn) {
    clearDbBtn.addEventListener('click', async () => {
      if (confirm('ต้องการล้างข้อมูลสมาชิกทั้งหมดใช่หรือไม่?')) {
        if (isCloudReady()) {
          try { await window._sb.from('users').delete().neq('id', 0); }
          catch (err) { console.warn('Clear error:', err); }
        }
        saveLocalDB([]);
        await renderDBTable();
      }
    });
  }
}

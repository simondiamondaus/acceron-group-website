// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// CUSTOM CURSOR
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
const cur = document.getElementById('cursor');
let cx = 0, cy = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCur() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cur.style.left = cx + 'px';
  cur.style.top = cy + 'px';
  requestAnimationFrame(animCur);
}

animCur();

document.querySelectorAll('a,button,.svc-item,.prac-card,.ins-feat,.ins-item,.tag,.step,.nav-item,.mega-sector,.grid-card,.btn').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('hover'));
  el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
});

document.addEventListener('mousedown', () => cur.classList.add('click'));
document.addEventListener('mouseup', () => cur.classList.remove('click'));

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// NAV SCROLL EFFECT
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('sc', scrollY > 60);
}, { passive: true });

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// MEGA MENU
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
let activeMega = null;

document.querySelectorAll('.nav-item.has-dd').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const id = 'mega-' + item.dataset.mega;
    if (activeMega && activeMega.id !== id) {
      activeMega.classList.remove('open');
    }
    activeMega = document.getElementById(id);
    if (activeMega) {
      activeMega.classList.add('open');
    }
  });
});

document.querySelectorAll('.mega').forEach(mega => {
  mega.addEventListener('mouseleave', () => {
    mega.classList.remove('open');
    activeMega = null;
  });
  mega.addEventListener('mouseenter', () => {
    mega.classList.add('open');
  });
});

document.querySelectorAll('.nav-item:not(.has-dd),.nav-cta-btn,.nav-logo').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (activeMega) {
      activeMega.classList.remove('open');
      activeMega = null;
    }
  });
});

// Close mega on scroll
window.addEventListener('scroll', () => {
  if (activeMega) {
    activeMega.classList.remove('open');
    activeMega = null;
  }
}, { passive: true });

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// MOBILE NAV
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
let navOpen = false;

function toggleNav() {
  navOpen = !navOpen;
  const ham = document.getElementById('ham');
  const mnav = document.getElementById('mnav');
  if (ham) ham.classList.toggle('open', navOpen);
  if (mnav) mnav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
}

function closeNav() {
  navOpen = false;
  const ham = document.getElementById('ham');
  const mnav = document.getElementById('mnav');
  if (ham) ham.classList.remove('open');
  if (mnav) mnav.classList.remove('open');
  document.body.style.overflow = '';
}

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// REVEAL ON SCROLL
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, {
  threshold: 0.06,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// SMOOTH SCROLL
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// PARALLAX HERO
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
window.addEventListener('scroll', () => {
  const h = document.querySelector('.hero');
  if (!h) return;
  const s = window.scrollY;
  if (s < window.innerHeight) {
    h.style.transform = 'translateY(' + s * 0.15 + 'px)';
    h.style.opacity = 1 - s / (window.innerHeight * 1.2);
  }
}, { passive: true });

// âââââââââââââââââââââââââââââââââââââââââââââââââââ
// NAV LOGO HOME LINK
// âââââââââââââââââââââââââââââââââââââââââââââââââââ
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/';
  });
}

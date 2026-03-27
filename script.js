'use strict';

/* ── PRELOADER ─────────────────────────────────────────────────── */
(function() {
  const pre   = document.getElementById('preloader');
  const bar   = pre.querySelector('.pre-bar');
  const num   = pre.querySelector('.pre-num');
  let   count = 0;

  const tick = setInterval(() => {
    const step = Math.random() * 14 + 4 | 0;
    count = Math.min(count + step, 100);
    bar.style.width = count + '%';
    num.textContent = count + '%';
    if (count >= 100) {
      clearInterval(tick);
      setTimeout(() => pre.classList.add('gone'), 320);
    }
  }, 60);
})();


/* ── CUSTOM CURSOR ─────────────────────────────────────────────── */
(function() {
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function frame() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(frame);
  })();

  document.querySelectorAll(
    'a, button, input, textarea, .pcard, .cert-card, .sk-pill, .achip'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('chover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('chover'));
  });
})();


/* ── STICKY HEADER ─────────────────────────────────────────────── */
(function() {
  const h = document.getElementById('header');
  window.addEventListener('scroll', () => {
    h.classList.toggle('stuck', window.scrollY > 30);
  }, { passive: true });
})();


/* ── HAMBURGER ─────────────────────────────────────────────────── */
(function() {
  const btn    = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('on');
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('.dl').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('on');
      drawer.classList.remove('open');
    });
  });
})();


/* ── SMOOTH ANCHOR SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ── TYPING EFFECT ─────────────────────────────────────────────── */
(function() {
  const el = document.getElementById('typed');
  if (!el) return;

  const lines = [
    'Flutter Developer',
    'Full-Stack Engineer',
    'Mobile App Builder',
    'MERN Stack Dev',
    'API Integrations Specialist',
  ];

  let li = 0, ci = 0, del = false;

  function go() {
    const line = lines[li];
    if (del) {
      el.textContent = line.slice(0, --ci);
    } else {
      el.textContent = line.slice(0, ++ci);
    }

    let wait = del ? 55 : 100;
    if (!del && ci === line.length) { wait = 1800; del = true; }
    else if (del && ci === 0)       { del = false; li = (li + 1) % lines.length; wait = 280; }

    setTimeout(go, wait);
  }

  setTimeout(go, 1400);
})();


/* ── HERO PARTICLE CANVAS ──────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;

  const N = window.innerWidth < 768 ? 36 : 68;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .28;
      this.vy = (Math.random() - .5) * .28;
      this.r  = Math.random() * 1.4 + .4;
      this.a  = Math.random() * .35 + .06;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${this.a})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    pts = Array.from({ length: N }, () => new Pt());
  }

  function lines() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${.06 * (1 - d / 120)})`;
          ctx.lineWidth   = .5;
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    lines();
    requestAnimationFrame(frame);
  }

  init(); frame();
  window.addEventListener('resize', () => { resize(); pts.forEach(p => p.reset()); });
})();


/* ── SCROLL REVEAL ─────────────────────────────────────────────── */
(function() {
  const els = document.querySelectorAll('.fade-in');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();


/* ── STAT COUNTERS ─────────────────────────────────────────────── */
(function() {
  const ios = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const to  = parseInt(el.dataset.to, 10);
      let   cur = 0;
      const t   = setInterval(() => {
        cur += 1;
        el.textContent = cur;
        if (cur >= to) clearInterval(t);
      }, 60);
      ios.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('.hstat-n').forEach(el => ios.observe(el));
})();


/* ── SKILL BARS ────────────────────────────────────────────────── */
(function() {
  const iob = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        iob.unobserve(e.target);
      }
    });
  }, { threshold: .3 });
  document.querySelectorAll('.bar-fill').forEach(b => iob.observe(b));
})();


/* ── PROJECT CARD 3D TILT ──────────────────────────────────────── */
(function() {
  document.querySelectorAll('.pcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 9;
      const y = ((e.clientY - r.top)  / r.height - .5) * 9;
      card.style.transform  = `translateY(-8px) rotateY(${x}deg) rotateX(${-y}deg)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
})();


/* ── HERO PARALLAX MOUSE ───────────────────────────────────────── */
(function() {
  const hero   = document.getElementById('hero');
  const badge  = hero ? hero.querySelector('.hero-badge') : null;
  const scroll = hero ? hero.querySelector('.hero-scroll') : null;
  if (!hero) return;

  hero.addEventListener('mousemove', e => {
    const { left, top, width, height } = hero.getBoundingClientRect();
    const cx = (e.clientX - left - width  / 2) / width;
    const cy = (e.clientY - top  - height / 2) / height;
    if (badge)  badge.style.transform  = `translateY(-50%) rotate(${cx * 12}deg) translate(${cx*10}px, ${cy*10}px)`;
    if (scroll) scroll.style.transform = `translate(${cx * 8}px, ${cy * 8}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    if (badge)  badge.style.transform  = '';
    if (scroll) scroll.style.transform = '';
  });
})();


/* ── ACTIVE NAV LINKS ──────────────────────────────────────────── */
(function() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('[data-nav]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          const active = l.getAttribute('href') === '#' + e.target.id;
          l.style.color = active ? 'var(--t1)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();


/* ── CONTACT FORM ──────────────────────────────────────────────── */
(function() {
  const form = document.getElementById('cform');
  const ok   = document.getElementById('form-ok');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('input, textarea').forEach(inp => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = 'rgba(244,114,182,.6)';
        setTimeout(() => inp.style.borderColor = '', 2200);
      }
    });
    if (!valid) return;

    const btn = form.querySelector('button span');
    btn.textContent = 'Sending…';

    setTimeout(() => {
      btn.textContent = 'Send Message';
      form.reset();
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 4000);
    }, 1100);
  });
})();


/* ── RIPPLE ON CTA BUTTON ──────────────────────────────────────── */
(function() {
  document.querySelectorAll('.cta-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,255,255,.25);
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        transform:scale(0);
        animation:ripple .55s ease-out forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  // Inject ripple keyframes
  const s = document.createElement('style');
  s.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0}}';
  document.head.appendChild(s);
})();
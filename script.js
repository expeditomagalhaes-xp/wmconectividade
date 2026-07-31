// Mobile menu toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Header CTA reveal after hero (home page only)
const heroSection = document.getElementById('inicio');
const headerCta = document.getElementById('header-cta');
if (heroSection && headerCta) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      headerCta.style.display = entry.isIntersecting ? 'none' : 'inline-flex';
    });
  }, { threshold: 0 });
  revealObserver.observe(heroSection);
}

// Build patch-panel ports (hero art, home page)
const portsGroup = document.getElementById('ports');
if (portsGroup) {
  const cols = 8, rows = 2, startX = 30, startY = 70, gapX = 38, gapY = 40;
  let n = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * gapX;
      const y = startY + r * gapY;
      const lit = (n === 5 || n === 12);
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", 22);
      rect.setAttribute("height", 16);
      rect.setAttribute("fill", "none");
      rect.setAttribute("stroke", lit ? "#FFFFFF" : "rgba(255,255,255,0.35)");
      rect.setAttribute("stroke-width", "1");
      portsGroup.appendChild(rect);
      if (lit) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", x + 11);
        dot.setAttribute("cy", y + 8);
        dot.setAttribute("r", 2);
        dot.setAttribute("fill", "#FFFFFF");
        portsGroup.appendChild(dot);
      }
      n++;
    }
  }
}

// Build rack units (diferenciais visual, home page)
const rackGroup = document.getElementById('rack-units');
if (rackGroup) {
  const total = 8, startY = 24, h = 20, gap = 4, litIndexes = [1, 4, 6];
  for (let i = 0; i < total; i++) {
    const y = startY + i * (h + gap);
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 300);
    rect.setAttribute("height", h);
    rect.setAttribute("fill", litIndexes.includes(i) ? "rgba(255,255,255,0.14)" : "none");
    rect.setAttribute("stroke", litIndexes.includes(i) ? "#FFFFFF" : "rgba(255,255,255,0.3)");
    rect.setAttribute("stroke-width", "1");
    rackGroup.appendChild(rect);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", 10);
    label.setAttribute("y", y + h / 2 + 3);
    label.setAttribute("font-family", "IBM Plex Mono");
    label.setAttribute("font-size", "8");
    label.setAttribute("fill", litIndexes.includes(i) ? "#FFFFFF" : "rgba(255,255,255,0.55)");
    label.textContent = "U" + (total - i);
    rackGroup.appendChild(label);
  }
}

// Rack rail: build ticks from sections on this page, highlight on scroll
const railTrack = document.getElementById('rail-track');
const rackSections = Array.from(document.querySelectorAll('[data-rack-section]'));
if (railTrack && rackSections.length) {
  rackSections.forEach(sec => {
    const tick = document.createElement('div');
    tick.className = 'tick';
    tick.dataset.target = sec.id;
    tick.textContent = sec.dataset.u + ' — ' + sec.dataset.label;
    railTrack.appendChild(tick);
  });

  const ticks = Array.from(railTrack.querySelectorAll('.tick'));
  const railObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const tick = ticks.find(t => t.dataset.target === entry.target.id);
      if (!tick) return;
      if (entry.isIntersecting) {
        ticks.forEach(t => t.classList.remove('active'));
        tick.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  rackSections.forEach(sec => railObserver.observe(sec));
}

// Contact form (contato page): no backend, so guide the person to WhatsApp/email
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('f-name').value.trim();
    const message = document.getElementById('f-message').value.trim();
    const text = encodeURIComponent(
      `Olá, meu nome é ${name || '—'}. ${message || 'Gostaria de solicitar um orçamento.'}`
    );
    window.open(`https://wa.me/5581999634287?text=${text}`, '_blank');
  });
}

// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn) btn.addEventListener('click', () => links.classList.toggle('open'));

  // Animate skill bars when visible
  const bars = document.querySelectorAll('.bar > i');
  if (bars.length) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0%'; io.observe(b); });
  }

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';
      const data = new URLSearchParams(new FormData(form));
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        const contactUrl = location.protocol === 'file:' ? 'http://localhost:3000/api/contact' : '/api/contact';
        const r = await fetch(contactUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: data
        });
        const text = await r.text();
        let json = {};
        try { json = text ? JSON.parse(text) : {}; } catch (err) {}
        if (json.ok) {
          status.className = 'form-status ok';
          status.textContent = json.message;
          form.reset();
        } else {
          status.className = 'form-status err';
          status.textContent = json.error || `Server error ${r.status}. Check your VS Code terminal.`;
        }
      } catch (err) {
        status.className = 'form-status err';
        status.textContent = 'Cannot reach http://localhost:3000. In VS Code, run npm run dev and keep that terminal open. Then open http://localhost:3000/contact, not Live Server or the file directly.';
      } finally {
        btn.disabled = false; btn.textContent = 'Send Message';
      }
    });
  }
});

// Highlight active nav link
(function(){
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((href === '/' && path === '/') || (href !== '/' && path.startsWith(href))) {
      a.classList.add('active');
    }
  });
})();

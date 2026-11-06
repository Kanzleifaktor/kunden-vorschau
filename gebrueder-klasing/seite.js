// Gebrüder Klasing – kleine Helfer für die Startseite (ohne Bibliotheken)
(function () {
  // Vorher/Nachher-Regler
  document.querySelectorAll('.ba').forEach(function (ba) {
    var r = document.createElement('input');
    r.type = 'range'; r.min = 0; r.max = 100; r.value = 50;
    r.setAttribute('aria-label', 'Vorher/Nachher vergleichen');
    ba.insertAdjacentHTML('beforeend',
      '<span class="strich"><span class="griff">‹›</span></span>' +
      '<span class="lab l">Vorher</span><span class="lab r">Nachher</span>');
    ba.appendChild(r);
    r.addEventListener('input', function () { ba.style.setProperty('--pos', r.value + '%'); });
  });

  // Mobilmenü
  var kopf = document.getElementById('kopf');
  var burger = kopf.querySelector('.burger');
  burger.addEventListener('click', function () {
    var offen = kopf.classList.toggle('offen');
    burger.setAttribute('aria-expanded', offen);
  });
  kopf.querySelectorAll('.hat > span').forEach(function (s) {
    function auf(e) {
      if (window.innerWidth > 1024) return;
      e.preventDefault();
      s.parentElement.classList.toggle('auf-mobil');
    }
    s.addEventListener('click', auf);
    s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') auf(e); });
  });

  // Video erst nach Klick von Vimeo laden (keine Cookies vorher)
  document.querySelectorAll('.video[data-vimeo]').forEach(function (v) {
    v.querySelector('button').addEventListener('click', function () {
      v.innerHTML = '<iframe src="https://player.vimeo.com/video/' + v.dataset.vimeo +
        '?autoplay=1&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video Gebrüder Klasing"></iframe>';
    });
  });

  // Pop-ups
  function oeffne(id) { var d = document.getElementById(id); if (d && !d.open) d.showModal(); }
  document.querySelectorAll('[data-oeffne]').forEach(function (b) {
    b.addEventListener('click', function () { oeffne(b.dataset.oeffne); });
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.querySelector('.zu').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });
  // Rabatt-Pop-up wie im Original nach 3 s – aber nur einmal pro Besuch und nur bis Aktionsende
  try {
    if (new Date() < new Date('2026-12-01') && !sessionStorage.getItem('rabatt-gesehen')) {
      setTimeout(function () {
        if (document.querySelector('dialog[open]')) return;
        oeffne('rabatt'); sessionStorage.setItem('rabatt-gesehen', '1');
      }, 3000);
    }
  } catch (e) {}
  if (new Date() >= new Date('2026-12-01')) {
    var a = document.querySelector('.aktion'); if (a) a.remove();
  }

  // Formular per fetch absenden
  var f = document.getElementById('formular');
  var m = document.getElementById('meldung');
  if (/[?&]anfrage=ok/.test(location.search)) { m.className = 'meldung ok'; m.textContent = 'Danke! Wir melden uns zeitnah bei Ihnen.'; }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var knopf = f.querySelector('.senden'); knopf.disabled = true;
    fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        m.className = 'meldung ' + (j.ok ? 'ok' : 'fehler'); m.textContent = j.text;
        if (j.ok) f.reset();
      })
      .catch(function () {
        m.className = 'meldung fehler';
        m.textContent = 'Senden fehlgeschlagen – bitte rufen Sie uns an: 09547 2390029';
      })
      .finally(function () { knopf.disabled = false; });
  });

  // Dezentes Einblenden beim Scrollen
  var els = document.querySelectorAll('.auf');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('da'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('da'); }); }
})();

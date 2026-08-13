/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});
/* Interactive project showcase */
(function () {
  const section = document.querySelector('.projects-showcase');
  const scrollArea = document.querySelector('.projects-scroll-area');
  const track = document.querySelector('.projects-scroll-track');
  const panels = document.querySelectorAll('.project-panel');
  const prev = document.getElementById('projectsPrev');
  const next = document.getElementById('projectsNext');
  const progress = document.getElementById('projectsProgress');

  if (!section || !scrollArea || !track || !panels.length) return;

  let maxTranslate = 0;
  let ticking = false;
  let desktopMode = window.innerWidth > 600;

  function measure() {
    desktopMode = window.innerWidth > 600;
    if (!desktopMode) {
      section.style.height = '';
      maxTranslate = 0;
      return;
    }

    const totalWidth = track.scrollWidth;
    const viewport = window.innerWidth;
    maxTranslate = Math.max(0, totalWidth - viewport + 24);
    section.style.height = Math.max(window.innerHeight + maxTranslate, 760) + 'px';
    update();
  }

  function update() {
    if (!desktopMode) return;

    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const progressValue = Math.min(1, Math.max(0, -rect.top / travel));
    const translate = maxTranslate * progressValue;

    track.style.transform = `translate3d(${-translate}px, 0, 0)`;

    const active = Math.min(panels.length - 1, Math.round(progressValue * (panels.length - 1)));
    panels.forEach((panel, index) => {
      const distance = Math.abs(index - active);
      panel.style.transform = `scale(${Math.max(0.96, 1 - distance * 0.018)})`;
      panel.style.opacity = Math.max(0.72, 1 - distance * 0.08);
    });

    if (progress) {
      progress.style.transform = `scaleX(${Math.max(0.1, progressValue)})`;
    }
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  function goToPanel(index) {
    const clamped = Math.max(0, Math.min(panels.length - 1, index));
    if (!desktopMode) {
      scrollArea.scrollTo({ left: panels[clamped].offsetLeft - 18, behavior: 'smooth' });
      return;
    }

    const targetProgress = panels.length === 1 ? 0 : clamped / (panels.length - 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top: sectionTop + targetProgress * (section.offsetHeight - window.innerHeight), behavior: 'smooth' });
  }

  prev && prev.addEventListener('click', () => {
    const current = Math.round((window.scrollY - (window.scrollY + section.getBoundingClientRect().top)) / Math.max(1, section.offsetHeight - window.innerHeight) * (panels.length - 1));
    goToPanel(current - 1);
  });

  next && next.addEventListener('click', () => {
    const current = Math.round((-section.getBoundingClientRect().top) / Math.max(1, section.offsetHeight - window.innerHeight) * (panels.length - 1));
    goToPanel(current + 1);
  });

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  measure();
})();

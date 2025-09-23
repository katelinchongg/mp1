/* Your JS here. */

(function () {
  const header = document.querySelector('.navbar');
  const navLinks = Array.from(document.querySelectorAll('.navlink'));
  const sections = Array.from(document.querySelectorAll('main section'));
  const SCROLL_THRESHOLD = 50; 

  function clearActive() {
    navLinks.forEach(l => l.classList.remove('active'));
  }

  function getSectionUnderNavbar() {
    const headerRect = header.getBoundingClientRect();
    const checkY = headerRect.bottom + 1; 

    for (let sec of sections) {
      const r = sec.getBoundingClientRect();
      if (r.top <= checkY && r.bottom > checkY) {
        return sec;
      }
    }
    return null;
  }

 
  function atBottomOfPage() {
 
    return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 2);
  }

  function onScroll() {
    // 1) navbar resizing
    if (window.scrollY > SCROLL_THRESHOLD) {
      if (!header.classList.contains('small')) {
        header.classList.remove('large');
        header.classList.add('small');
      }
    } else {
      if (!header.classList.contains('large')) {
        header.classList.remove('small');
        header.classList.add('large');
      }
    }

    if (atBottomOfPage()) {
      clearActive();
      navLinks[navLinks.length - 1].classList.add('active');
      return;
    }

    const sec = getSectionUnderNavbar();
    if (sec) {
      const id = sec.id;
      clearActive();
      const match = navLinks.find(a => a.getAttribute('href') === `#${id}`);
      if (match) match.classList.add('active');
    } else {

      clearActive();
    }
  }

  window.addEventListener('load', onScroll);
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll); // recompute on resize

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const headerHeight = header.getBoundingClientRect().height;
      const targetTop = window.scrollY + target.getBoundingClientRect().top;
      const scrollTo = targetTop - headerHeight - 8; // small gap
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    });
  });
})();

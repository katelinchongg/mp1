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
  window.addEventListener('resize', onScroll);

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const headerHeight = header.getBoundingClientRect().height;
      const targetTop = window.scrollY + target.getBoundingClientRect().top;
      const scrollTo = targetTop - headerHeight - 8;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      
    });
  });
  const carousel = document.querySelector("#aboutme-carousel");
  if (carousel) {
    const slides = carousel.querySelector(".carousel-slides");
    const slideElems = carousel.querySelectorAll(".slide");
    const leftArrow = carousel.querySelector(".carousel-arrow.left");
    const rightArrow = carousel.querySelector(".carousel-arrow.right");

    let currentIndex = 0;
    const totalSlides = slideElems.length;

    function updateCarousel() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    });
  }
  const animatedSections = document.querySelectorAll('.stripe .content');

// 2. Set up the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the '.is-visible' class
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // 3. Tell the observer to watch each of your sections
  animatedSections.forEach(section => {
    observer.observe(section);
  });
})();

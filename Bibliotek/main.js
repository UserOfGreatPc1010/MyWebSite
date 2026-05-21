document.addEventListener('DOMContentLoaded', () => {
  // ===== Slider Code =====
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const viewport = document.querySelector('.slider-viewport');

  let currentIndex = 0;

  function updateSlider() {
    if (slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width + 12; // includes gap
    const visibleCount = Math.floor(viewport.offsetWidth / slides[0].getBoundingClientRect().width);
    const maxIndex = slides.length - visibleCount;

    if (slides.length <= visibleCount) {
      currentIndex = 0;
      viewport.style.justifyContent = 'center';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    } else {
      viewport.style.justifyContent = 'flex-start';
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = Math.floor(viewport.offsetWidth / slides[0].getBoundingClientRect().width);
    const maxIndex = slides.length - visibleCount;
    if (currentIndex < maxIndex) currentIndex++;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
  window.addEventListener('load', updateSlider);

  // ===== Hamburger Menu Code =====
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    primaryNav.classList.toggle('open');
  });
});

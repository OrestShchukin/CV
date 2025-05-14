function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImg.src = src;
  }

  function closeModal(event) {
    if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
      document.getElementById("imageModal").style.display = "none";
    }
  }

  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-image');

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);


function setTheme(mode) {
  const body = document.body;
  const icon = document.getElementById('theme-icon');

  if (mode === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    icon.textContent = '🌙';
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    icon.textContent = '🌞';
  }

  localStorage.setItem('theme', mode);
}

function autoSetThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 21) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}
autoSetThemeByTime();

const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    autoSetThemeByTime();
  }
});
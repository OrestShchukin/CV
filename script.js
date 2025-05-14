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

  const browserInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    appVersion: navigator.appVersion
  };
  localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

  function displayLocalStorageInfo() {
    const footer = document.getElementById('footer-info');
    let info = '';
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        info += `<p><strong>${key}</strong>: ${localStorage.getItem(key)}</p>`;
      }
    }
    footer.innerHTML = info;
  }
  displayLocalStorageInfo();

  fetch('https://jsonplaceholder.typicode.com/posts/28/comments')
    .then(response => response.json())
    .then(comments => {
      const section = document.createElement('section');
      section.classList.add('comments');
      section.innerHTML = '<h2>Коментарі роботодавців</h2>';
      comments.forEach(comment => {
        const div = document.createElement('div');
        div.innerHTML = `<h4>${comment.name}</h4><p>${comment.body}</p><hr>`;
        section.appendChild(div);
      });
      const oldSection = document.querySelector('.comments');
      if (oldSection) {
        oldSection.replaceWith(section);
      } else {
        document.body.appendChild(section);
      }
    });


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
let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  const navbar = document.querySelector("nav");
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("navbar").innerHTML = `
  <nav>
    <div class="nav-left">
      <img src="nemtas.png" alt="Logo 1" class="logo">
    </div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#friend">Friends</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <img src="rpl.png" alt="Logo 2" class="logo">
  </nav>
  `;
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
});

    document.addEventListener('DOMContentLoaded', function() {
      const slider = document.querySelector('.card-list');
      const wrapper = document.querySelector('.wrapper');
      const cards = document.querySelectorAll('.card');
      const prevBtn = document.querySelector('.prev');
      const nextBtn = document.querySelector('.next');
      const pagination = document.querySelector('.pagination');
      
      let currentIndex = 0;
      let cardsPerView = calculateCardsPerView();
      function calculateCardsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 640) return 2;
        return 1;
      }
 
      function createPagination() {
        pagination.innerHTML = '';
        const dotCount = Math.ceil(cards.length / cardsPerView);
        
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('div');
          dot.classList.add('pagination-dot');
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(i));
          pagination.appendChild(dot);
        }
      }

      function updateSlider() {
        cardsPerView = calculateCardsPerView();
        const cardWidth = cards[0].offsetWidth + 20; 
        if (currentIndex >= cards.length) {
          currentIndex = 0;
        } else if (currentIndex < 0) {
          currentIndex = cards.length - cardsPerView;
        }
        
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        const activeDotIndex = Math.floor(currentIndex / cardsPerView);
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeDotIndex);
        });
      }
      

      function goToSlide(index) {
        cardsPerView = calculateCardsPerView();
        currentIndex = index * cardsPerView;
        updateSlider();
      }
      

      prevBtn.addEventListener('click', () => {
        cardsPerView = calculateCardsPerView();
        
        if (currentIndex <= 0) {
          currentIndex = cards.length - cardsPerView;
        } else {
          currentIndex--;
        }
        
        updateSlider();
      });
      
      nextBtn.addEventListener('click', () => {
        cardsPerView = calculateCardsPerView();
        
        if (currentIndex >= cards.length - cardsPerView) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        
        updateSlider();
      });
      
      let touchStartX = 0;
      let touchEndX = 0;
      
      wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50;
        
        cardsPerView = calculateCardsPerView();
        
        if (diff > swipeThreshold) {
          if (currentIndex >= cards.length - cardsPerView) {
            currentIndex = 0;
          } else {
            currentIndex++;
          }
          updateSlider();
        } else if (diff < -swipeThreshold) {
          if (currentIndex <= 0) {
            currentIndex = cards.length - cardsPerView;
          } else {
            currentIndex--;
          }
          updateSlider();
        }
      }
      
      window.addEventListener('resize', () => {
        cardsPerView = calculateCardsPerView();
        createPagination();
        updateSlider();
      });
      
      createPagination();
      updateSlider();
    });
  

/**
 * 대전경찰청 메인 페이지 JavaScript
 * 모던한 ES6+ 문법 사용
 */

(function () {
  "use strict";

  // DOM이 로드된 후 실행
  document.addEventListener("DOMContentLoaded", function () {
    // 기존 jQuery 슬라이더 코드가 있다면 비활성화
    if (typeof jQuery !== "undefined") {
      jQuery(".slider").off("click");
      jQuery(".slider").off("animate");
      // 기존 슬라이더 애니메이션 중지
      jQuery(".slider").stop(true, true);
      jQuery(".slider").css("margin-left", "0px");
    }

    // 약간의 지연 후 초기화 (기존 코드와의 충돌 방지)
    setTimeout(function () {
      initSlider();
      initMobileMenu();
      initSmoothScroll();
    }, 100);
  });

  /**
   * 메인 슬라이더 초기화
   */
  function initSlider() {
    const slider = document.querySelector(".slider-list");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!slider || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = slider.children.length;
    let autoplayInterval;

    // 초기 위치 설정 (강제로 첫 번째 슬라이드 표시)
    slider.style.transform = "translateX(0%)";
    slider.style.marginLeft = "0px";
    slider.style.left = "0px";

    // 기존 jQuery 코드가 설정한 스타일 제거
    if (typeof jQuery !== "undefined") {
      jQuery(slider).css({
        "margin-left": "0px",
        left: "0px",
      });
    }

    // 슬라이드 이동 함수
    function moveSlide(direction) {
      if (direction === "next") {
        currentSlide = (currentSlide + 1) % totalSlides;
      } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }

      // 각 슬라이드는 33.333333% 너비이므로, 이동 거리는 currentSlide * 33.333333%
      const translateX = -currentSlide * 33.333333;
      slider.style.transform = `translateX(${translateX}%)`;
      slider.style.marginLeft = "0px";
      slider.style.left = "0px";
      slider.style.transition = "transform 0.5s ease-in-out";

      // jQuery가 다시 설정하는 것을 방지
      if (typeof jQuery !== "undefined") {
        jQuery(slider).css({
          "margin-left": "0px",
          left: "0px",
          transform: `translateX(${translateX}%)`,
        });
      }
    }

    // 자동 재생
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        moveSlide("next");
      }, 5000);
    }

    // 자동 재생 중지
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    // 이벤트 리스너
    nextBtn.addEventListener("click", () => {
      moveSlide("next");
      stopAutoplay();
      startAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      moveSlide("prev");
      stopAutoplay();
      startAutoplay();
    });

    // 마우스 호버 시 자동 재생 중지
    const sliderContainer = document.querySelector(".main-slider");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoplay);
      sliderContainer.addEventListener("mouseleave", startAutoplay);
    }

    // 자동 재생 시작
    startAutoplay();

    // 터치 이벤트 지원 (모바일)
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderContainer) {
      sliderContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      sliderContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
    }

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        moveSlide("next");
      }
      if (touchEndX > touchStartX + 50) {
        moveSlide("prev");
      }
    }
  }

  /**
   * 모바일 메뉴 초기화
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const menuItems = document.querySelectorAll(".has-submenu > .menu-item");

    if (!menuToggle || !mainNav) {
      console.warn("모바일 메뉴 요소를 찾을 수 없습니다.");
      return;
    }

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const newIsExpanded = !isExpanded;

      this.setAttribute("aria-expanded", newIsExpanded);
      mainNav.classList.toggle("active");

      // 햄버거 아이콘 애니메이션
      const spans = this.querySelectorAll("span");
      if (newIsExpanded) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 2px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -4px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // 서브메뉴 토글 (모바일)
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const submenu = this.nextElementSibling;
          if (submenu) {
            submenu.classList.toggle("active");
            this.classList.toggle("active");
          }
        }
      });
    });

    // 화면 크기 변경 시 메뉴 닫기
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        const spans = menuToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
          mainNav.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          const spans = menuToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      }
    });
  }

  /**
   * 부드러운 스크롤 초기화
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  /**
   * 스크롤 시 헤더 스타일 변경
   */
  let lastScroll = 0;
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
      }

      lastScroll = currentScroll;
    });
  }

  /**
   * 탭 전환 애니메이션 개선
   */
  const tabInputs = document.querySelectorAll(".tab-input");
  tabInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const tabContents = document.querySelectorAll(".tab-content");
      tabContents.forEach((content) => {
        content.style.opacity = "0";
        setTimeout(() => {
          content.style.opacity = "1";
        }, 150);
      });
    });
  });

  /**
   * 이미지 lazy loading (성능 최적화)
   */
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
})();

/**
 * 대전경찰청 서브 페이지 JavaScript
 * 모던한 ES6+ 문법 사용
 */

(function() {
    'use strict';

    // DOM이 로드된 후 실행
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initPopup();
        initYearSelector();
        initSmoothScroll();
    });

    /**
     * 모바일 메뉴 초기화
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const menuItems = document.querySelectorAll('.has-submenu > .menu-item');

        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            // 햄버거 아이콘 애니메이션
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // 서브메뉴 토글 (모바일)
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const submenu = this.nextElementSibling;
                    if (submenu) {
                        submenu.classList.toggle('active');
                        this.classList.toggle('active');
                    }
                }
            });
        });

        // 화면 크기 변경 시 메뉴 닫기
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    /**
     * 팝업 모달 초기화
     */
    function initPopup() {
        const popupModal = document.getElementById('popupModal');
        const openPopupBtns = document.querySelectorAll('.open-popup');
        const closePopupBtns = document.querySelectorAll('.popup-close, .popup-close-btn');
        const popupOverlay = document.querySelector('.popup-overlay');

        if (!popupModal) return;

        // 팝업 열기
        openPopupBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                popupModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        // 팝업 닫기
        function closePopup() {
            popupModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        closePopupBtns.forEach(btn => {
            btn.addEventListener('click', closePopup);
        });

        if (popupOverlay) {
            popupOverlay.addEventListener('click', closePopup);
        }

        // ESC 키로 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupModal.getAttribute('aria-hidden') === 'false') {
                closePopup();
            }
        });
    }

    /**
     * 연도 선택기 초기화
     */
    function initYearSelector() {
        const prevBtn = document.querySelector('.year-btn.prev-btn');
        const nextBtn = document.querySelector('.year-btn.next-btn');
        const currentYearEl = document.querySelector('.current-year');

        if (!prevBtn || !nextBtn || !currentYearEl) return;

        let currentYear = parseInt(currentYearEl.textContent);

        prevBtn.addEventListener('click', function() {
            currentYear--;
            currentYearEl.textContent = currentYear;
        });

        nextBtn.addEventListener('click', function() {
            currentYear++;
            currentYearEl.textContent = currentYear;
        });
    }

    /**
     * 부드러운 스크롤 초기화
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * 스크롤 시 헤더 스타일 변경
     */
    let lastScroll = 0;
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }

            lastScroll = currentScroll;
        });
    }

    /**
     * 이미지 lazy loading (성능 최적화)
     */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

})();


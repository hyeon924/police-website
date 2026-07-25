/**
 * 파트너 사이트 롤링 슬라이더
 * 모던한 JavaScript로 재작성
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initPartnerSlider();
  });

  /**
   * 파트너 사이트 슬라이더 초기화
   * CSS 애니메이션을 사용하되, JavaScript로 제어 가능하도록 구현
   */
  function initPartnerSlider() {
    const sliderContainer = document.querySelector(".partner-slider-container");

    if (!sliderContainer) return;

    // 슬라이더가 중단되었는지 확인
    let isPaused = false;

    // 마우스 호버 시 일시정지
    const partnerSection = document.querySelector(".partner-section");
    if (partnerSection) {
      partnerSection.addEventListener("mouseenter", function () {
        isPaused = true;
        sliderContainer.style.animationPlayState = "paused";
      });

      partnerSection.addEventListener("mouseleave", function () {
        isPaused = false;
        sliderContainer.style.animationPlayState = "running";
      });
    }

    // 무한 루프를 위한 이미지 복제 (필요한 경우)
    const images = sliderContainer.querySelectorAll("a");
    if (images.length > 0) {
      // CSS 애니메이션이 자동으로 처리하므로 추가 작업 불필요
      // 필요시 여기에 추가 로직 구현
    }
  }

  /**
   * 레거시 jQuery 코드와의 호환성을 위한 함수들
   * (기존 코드가 jQuery를 사용하는 경우를 대비)
   */
  if (typeof jQuery !== "undefined") {
    // jQuery가 로드된 경우 기존 코드와의 호환성 유지
    jQuery(document).ready(function ($) {
      // 기존 코드가 필요한 경우 여기에 추가
    });
  }
})();

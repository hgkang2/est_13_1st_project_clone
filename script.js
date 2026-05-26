window.addEventListener("load", () => {
  const popup = document.getElementById("main-popup");
  const closeBtn = document.getElementById("popup-close-btn");
  const checkbox = document.getElementById("today-close-checkbox");

  // [기능 1] 쿠키 가져오는 함수 (특정 이름의 쿠키 값 추출)
  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // [기능 2] 쿠키 설정하는 함수 (이름, 값, 유지 시간-일 단위)
  const setCookie = (name, value, days) => {
    const date = new Date();
    // 현재 시간에 n일(여기서는 1일)만큼 더함
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();

    // 쿠키 저장 (보안과 경로 설정을 포함하는 것이 좋습니다)
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  };

  // 1. 페이지 로드 시 'hidePopup'이라는 쿠키가 있는지 확인
  if (popup && closeBtn && checkbox) {
    const isPopupHidden = getCookie("hidePopup");

    // 쿠키가 존재한다면 팝업을 숨김
    if (isPopupHidden === "true") {
      popup.classList.add("hidden");
    }

    // 2. 닫기 버튼 클릭 이벤트
    closeBtn.addEventListener("click", () => {
      // '오늘 하루 보지 않기'에 체크했다면 1일짜리 쿠키 생성
      if (checkbox.checked) {
        setCookie("hidePopup", "true", 1); // 1 = 1일 동안 유지
      }

      // 팝업 닫기
      popup.classList.add("hidden");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("main-popup");
  const closeBtn = document.getElementById("popup-close-btn");
  const checkbox = document.getElementById("today-close-checkbox");

  // 1. 페이지가 열릴 때 로컬스토리지 확인 후 팝업 출력 여부 결정
  const checkPopup = () => {
    const expiry = localStorage.getItem("popupHideExpiry");
    const now = new Date().getTime();

    // 저장된 만료 시간이 있고, 아직 그 시간이 지나지 않았다면 숨김 처리
    if (expiry && now < parseInt(expiry)) {
      popup.classList.add("hidden");
    }
  };

  // 2. 닫기 버튼 눌렀을 때 이벤트
  closeBtn.addEventListener("click", () => {
    if (checkbox.checked) {
      const now = new Date();
      // 현재 시간 기준 정확히 24시간 뒤 계산 (24시간 * 60분 * 60초 * 1000밀리초)
      const expiryTime = now.getTime() + 24 * 60 * 60 * 1000;

      localStorage.setItem("popupHideExpiry", expiryTime);
    }

    // 팝업 숨기기
    popup.classList.add("hidden");
  });

  // 로드 시 자동 실행
  checkPopup();
});

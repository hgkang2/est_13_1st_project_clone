// 'load' 대신 'DOMContentLoaded'를 사용하면 훨씬 빠르게 실행됩니다.
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("main-popup");
  const closeBtn = document.getElementById("popup-close-btn");
  const checkbox = document.getElementById("today-close-checkbox");

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  };

  if (popup && closeBtn && checkbox) {
    const isPopupHidden = getCookie("hidePopup");

    // [변경 핵심] 쿠키가 "true"가 아닐 때만(체크 안 했을 때만) 팝업을 보여줍니다.
    if (isPopupHidden !== "true") {
      popup.classList.add("show"); // CSS에서 만든 show 클래스 추가
    }

    // 닫기 버튼 클릭 이벤트
    closeBtn.addEventListener("click", () => {
      if (checkbox.checked) {
        setCookie("hidePopup", "true", 1);
      }

      // 팝업 닫을 때는 show 클래스를 제거
      popup.classList.remove("show");
    });
  }
});

# 이스트캠프 랜딩 페이지 HTML/CSS 작성 가이드

## 1. 기본 정책

- **언어/인코딩**: 한국어(`lang="ko"`), UTF-8
- **POC(담당자) 섹션 단위**: `<section>` 태그 단위로 영역을 분리하며, 시작 주석에 `<!-- section 이름 - 담당자 -->` 형식으로 명시합니다.
- **접근성(A11y)**: 시맨틱 태그와 ARIA 속성을 기본으로 사용합니다.
- **반응형**: 모든 레이아웃은 데스크탑 퍼스트를 기본으로 합니다.

---

## 2. 에디터 및 포맷팅 (.vscode/settings.json 기준)

### 2.1 Prettier 설정

저장(`Ctrl/Cmd + S`) 시 자동 포맷팅되며, 아래 규칙을 따릅니다.

| 항목              | 값      | 설명                                             |
| ----------------- | ------- | ------------------------------------------------ |
| `printWidth`      | `80`    | 한 줄 최대 80자                                  |
| `tabWidth`        | `2`     | 들여쓰기 공백 2칸                                |
| `useTabs`         | `false` | **탭(Tab) 대신 공백(Space) 사용**                |
| `semi`            | `true`  | 문장 끝 세미콜론 필수                            |
| `singleQuote`     | `false` | **문자열은 쌍따옴표(`"`) 사용**                  |
| `trailingComma`   | `"es5"` | ES5 호환 범위에서 후행 쉼표 허용                 |
| `bracketSameLine` | `true`  | 여는 태그의 `>`는 속성 줄과 **동일한 줄**에 배치 |

> **예시** (`bracketSameLine: true`)
>
> ```html
> <!-- O -->
> <link rel="stylesheet" href="css/common.css" />
>
> <!-- X: 닫는 꺽쇠가 다음 줄로 넘어가면 안 됨 -->
> <link rel="stylesheet" href="css/common.css" />
> ```

---

## 3. HTML 마크업 규칙

### 3.1 기본 템플릿 구조

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>이스트캠프 | 프론트엔드 14기</title>
    <!-- 외부 폰트/아이콘은 head 상단에 preconnect 후 link -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    ...
    <link rel="stylesheet" href="css/common.css" />
    <link rel="stylesheet" href="css/현재페이지.css" />
  </head>
  <body>
    <!-- header - 담당자명 -->
    <header>...</header>

    <main>
      <!-- section 이름 - 담당자명 -->
      <section class="section-class-name" aria-labelledby="title-id">
        ...
      </section>
    </main>

    <!-- footer - 담당자명 -->
    <footer>...</footer>
  </body>
</html>
```

### 3.2 섹션 작성 규칙

- **주석**: 반드시 `<!-- 영문 섹션명 - 한글 담당자명 -->` 형식을 사용합니다.
- **컨테이너**: 섹션 내부 콘텐츠는 `<div class="container">` (또는 `.container.flex-column.margin-auto` 등 공통 레이아웃 클래스)로 감쌉니다.
- **제목 레벨**: 페이지당 하나의 `<h1>`(로고/메인 타이틀)만 사용하고, 섹션 제목은 `<h2>`, 그 하위는 `<h3>`~`<h4>` 순차적으로 사용합니다. 단계를 건너뛰지 않습니다.

### 3.3 클래스 및 속성

- 클래스명은 **케밥 케이스(kebab-case)**를 사용합니다. (`hero-content`, `result-grid`)
- 여러 클래스 부여 시 공백으로 구분합니다.
- **접근성 속성**: 섹션 제목 연결을 위해 `aria-labelledby`를 사용하고, 캐러셀/슬라이드 영역에는 `aria-roledescription`을 활용합니다.
  ```html
  <section class="result" aria-labelledby="result-title">
    <h2 id="result-title" class="text-heading-2xl">검증된 성과</h2>
  </section>
  ```

### 3.4 아이콘 사용

- **Material Icons**: `Material Icons Outlined`를 기본으로 사용합니다.
  ```html
  <span class="material-icons-outlined">trending_up</span>
  ```
- **Font Awesome**: 필요 시 CDN 버전(`all.min.css`)을 사용합니다.
  ```html
  <i class="fa-solid fa-check"></i>
  ```

### 3.5 이미지

- `alt` 텍스트는 **의미 전달 여부**에 따라 작성합니다. (장식용은 `alt=""` 가능)
- 뷰포트 밖 이미지는 지연 로딩을 적용합니다.
  ```html
  <img
    class="curriculum-image"
    src="https://images.unsplash.com/..."
    alt="프로젝트 미리보기"
    loading="lazy" />
  ```

---

## 4. CSS 속성 선언 순서 (PostCSS Sorting)

### NHN 코딩 컨벤션을 적용했습니다.

`.vscode/settings.json`의 `postcssSorting.config`를 기준으로, **선택자 블록 내 속성은 아래 순서대로 작성**합니다.  
_(에디터 플러그인 사용 시 자동 정렬됩니다.)_

### 그룹별 핵심 순서

1. **레이아웃 (Layout)**  
   `display`, `grid-*`, `flex-*`, `gap`, `align-*`, `justify-*`, `place-*`, `order` 등
2. **박스모델 (Box Model)**  
   `margin`, `padding`, `border`, `outline`, `box-shadow`, `overflow`, `position`, `top/right/bottom/left`, `z-index`, `width`, `height`, `float`, `clear` 등
3. **배경 (Background)**  
   `background`, `background-color`, `background-image`, `background-size` 등
4. **타이포그래피 (Typography)**  
   `font-*`, `line-height`, `color`, `text-*`, `letter-spacing`, `white-space`, `word-*` 등
5. **애니메이션/전환 (Animation & Transition)**  
   `animation-*`, `transition-*` 등
6. **기타 (Misc)**  
   `content`, `list-style`, `cursor`, `pointer-events`, `resize`, `scrollbar-*` 등

> **상세 순서가 필요하면** `settings.json`의 `properties-order` 배열 전체를 참고합니다.

---

## 5. 파일 및 폴더 구조 예시

```
project-root/
├── index.html
├── css/
│   ├── common.css      (공통 변수, 리셋, 유틸리티)
│   └── index.css       (페이지별 스타일)
│   └── normalize.css   (브라우저간 스타일 통일)
│   └── reset.css       (스타일 초기화)
└── .vscode/
    └── settings.json
```

---

## 6. 체크리스트 (PR 전 자체 점검)

- [ ] `<section>` 시작/끝에 `<!-- 섹션명 - 담당자 -->` 주석이 있는가?
- [ ] `alt` 속성이 빠진 `<img>`는 없는가?
- [ ] heading 레벨(`h1` → `h2` → `h3`)이 순차적인가?
- [ ] Prettier 자동 포맷팅 후 80자를 초과하는 이상한 줄바꿈은 없는가?
- [ ] CSS 속성이 PostCSS 순서 규칙을 따르는가?

---

_향후 협의를 통해 네이밍 컨벤션, 색상/간격 변수명, 적용 범위 등을 추가 보완 예정입니다._

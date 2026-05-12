# 📸 Snapmove

> **"기록은 가볍게, 성취는 선명하게"**
> 복잡한 루틴 관리를 덜어내고, "운동 기록(30초) → 인증 카드 생성 → SNS 공유(클릭 2회)"라는 핵심 경험에 집중한 경량 운동 트래커입니다.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-BaaS-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?logo=vercel)](https://vercel.com/)

---

## 🔗 Live Demo

**[Snapmove 서비스 바로가기](https://snapmove.vercel.app/)**
*(회원가입 없이 익명(게스트)으로 바로 체험할 수 있습니다.)*

> 📸 *(이미지배치)*

---

## ✨ Features

| 기능 | 설명 |
| :--- | :--- |
| **Auth** | Supabase 기반 소셜/이메일 인증 및 `proxy.ts` 라우트 보호 |
| **Workout** | 92종 프리셋 기반 카테고리별 맞춤 입력 (근력/유산소/유연성 분기) |
| **Snap Card** | 4:5 비율 3종 커스텀 레이아웃, 실시간 데이터 합성 및 Web Share API 공유 |
| **Calendar** | 월간 그리드 기반 운동 히스토리 시각화 및 상세 기록 조회 |

---

## 🛠️ Tech Stack

| 구분 | 기술 스택 |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), TypeScript |
| **Styling** | Tailwind CSS v4, Shadcn UI |
| **Backend (BaaS)** | Supabase (Database, Auth) |
| **Image Engine** | html-to-image, canvas-confetti |

---

## 🏗️ Technical Highlights (주요 고민 및 트러블슈팅)
- **Next.js 16 도입과 의식적인 컴포넌트 분리**
  - App Router 환경에서 상태와 인터랙션이 필요한 부분만 Client Component로 두고, 나머지는 Server Component로 분리하여 렌더링을 최적화했습니다.
  - Next.js 16의 미들웨어 변경점에 선제적으로 대응하여 `proxy.ts`를 활용한 라우트 가드를 구현했습니다.
- **클라이언트 사이드 이미지 캡처 최적화**
  - 4:5 인스타그램 최적 비율의 3종 인증 카드를 구현했습니다. 
  - `html-to-image`를 활용한 캡처 시 발생하는 `backdrop-blur` 깨짐 현상과 모바일 환경의 화질 저하 문제를 렌더링 옵션 조절과 오버레이 처리로 해결했습니다.
  - 기기별 공유 UX를 고려하여 모바일은 네이티브 공유 창(Web Share API), PC는 다운로드로 분기 처리했습니다.
- **유연성을 고려한 JSONB 데이터 모델링**
  - 근력(세트/무게)과 유산소(시간) 등 카테고리별로 달라지는 데이터를 효율적으로 관리하기 위해, 무리한 테이블 정규화 대신 JSONB 컬럼을 활용하여 스키마 유연성과 개발 속도를 확보했습니다.
- **접근성(a11y)을 고려한 컬러 토큰 시스템**
  - Tailwind 색상을 하드코딩하지 않고 주요 테마를 CSS 변수(`brand-*`)로 추상화하여 유지보수성을 높였습니다. 
  - 텍스트와 배경 간의 WCAG 명도 대비를 계산하여 어떤 기기에서도 글씨가 명확히 보이도록 설계했습니다.
---

## 📈 Roadmap

- [ ] **Offline-first**: PWA 도입으로 네트워크 불안정 환경에서도 기록 보존
- [ ] **Advanced Analytics**: JSONB 데이터를 활용한 부위별 볼륨 추이 및 PR(개인 최고 기록) 분석 기능
- [ ] **Social Integration**: 사용자 피드 공유 및 운동 메이트 응원

---

## ⚙️ Getting Started

```
# 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

npm install
npm run dev
```

---

## 📄 License

MIT

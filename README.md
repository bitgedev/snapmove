# Snapmove

운동을 기록하고, 완료 순간을 인증 카드로 남기는 모바일 퍼스트 운동 트래커

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)


**[→ 서비스 바로가기](https://snapmove.vercel.app)** _(회원가입 없이 게스트 체험 가능)_
<!-- screenshot -->

---

## 주요 기능

| 기능 | 설명 |
| :--- | :--- |
| **인증** | Supabase Auth 이메일/소셜 로그인, `proxy.ts` 기반 라우트 보호 |
| **운동 기록** | 92종 프리셋, 카테고리별 입력 분기 (근력: 세트/무게/횟수 · 유산소·유연성: 시간) |
| **인증 카드** | 4:5 비율 3종 레이아웃, 운동 데이터 실시간 합성, Web Share API / 다운로드 분기 |
| **캘린더** | 월간 그리드로 운동 히스토리 시각화, 날짜 클릭 시 상세 기록 조회 |

---

## 기술 스택

| 구분 | 스택 |
| :--- | :--- |
| **프레임워크** | Next.js 16 (App Router), TypeScript |
| **스타일링** | Tailwind CSS v4, shadcn/ui |
| **백엔드** | Supabase (PostgreSQL + RLS, Auth) |
| **이미지 캡처** | html-to-image |
| **배포** | Vercel |

---

## 기술적 고민

**Server / Client Component 분리**

상태·이벤트가 필요한 부분(운동 입력 폼, 캘린더 날짜 선택 등)만 Client Component로 두고 나머지는 Server Component로 유지했습니다. 불필요한 `"use client"` 경계를 줄여 클라이언트 번들을 최소화했습니다.

**Next.js 16 `proxy.ts` 라우트 가드**

Next.js 16에서 `middleware` 컨벤션이 `proxy`로 변경됐습니다. `proxy.ts`로 라우트 가드를 구현해 미인증 접근은 `/login`으로, 인증 후 `/login` 재접근은 `/calendar`로 리다이렉트합니다.

**인증 카드 이미지 캡처**

`backdrop-blur`는 `html-to-image` 캡처 시 렌더링되지 않습니다. solid 오버레이(`bg-black/60`)로 대체해 화면과 캡처 결과를 일치시켰고, `pixelRatio: 2`로 고해상도 출력을 확보했습니다. 모바일은 Web Share API, 데스크탑은 다운로드로 분기했습니다.

**JSONB 운동 데이터 모델링**

근력(세트/무게/횟수)과 유산소(시간)는 데이터 구조가 다릅니다. nullable 컬럼 대신 `exercises`를 JSONB로 설계해 스키마 변경 없이 카테고리를 확장할 수 있게 했습니다. `(user_id, date DESC)` 복합 인덱스로 월별 조회 성능도 확보했습니다.

**CSS 변수 기반 컬러 토큰**

`teal-*` 직접 사용 대신 `--brand-*` 변수로 추상화하고 WCAG 대비율 기준으로 용도를 제한했습니다.

---

## 시작하기

```bash
git clone https://github.com/bitgedev/snapmove.git
cd snapmove
npm install
npm run dev
```

`.env.local`에 아래 값을 설정하세요.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Roadmap

- [ ] PWA + 오프라인 지원 — 네트워크 없이도 운동 기록 보존
- [ ] 부위별 볼륨 추이 및 PR(개인 최고 기록) 분석
- [ ] 소셜 피드 — 인증 카드 공유 및 운동 메이트 기능

---

## License

MIT

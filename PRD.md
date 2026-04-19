# Snapmove PRD

---

## 1. 문제 정의

운동을 꾸준히 하는 사람도 자신의 기록을 체계적으로 관리하고 SNS에 공유할 도구가 부족하다.  
Snapmove는 **운동 기록(Move)**과 **인증 카드 생성(Snap)** 두 가지에만 집중한 경량 운동 트래커다.

- **Move**: 복잡한 루틴 관리 없이, 세트·무게·횟수 기반의 직관적인 실시간 기록
- **Snap**: 운동 완료 후 데이터를 시각화한 인스타그램 공유용 인증 카드 자동 생성

---

## 2. 타겟 사용자

운동 기록을 단순하게 남기고 SNS에 인증하고 싶은 20~30대 운동 입문자 및 중급자.

---

## 3. 제안 해결책

별도의 루틴 관리 탭 없이, **오늘의 운동 기록**과 **캘린더 기반 히스토리** 두 트랙에 집중한다.  
수동 입력 방식으로 웹 백그라운드 제한을 회피하고, 완료 시 자동 인증 카드로 성취감을 제공한다.

---

## 4. 목표 및 성공 지표

| 지표 | 목표 |
|---|---|
| 운동 세션 완료율 | Workout 진입 후 Finish까지 도달 비율 |
| 인증 카드 저장/공유 횟수 | SNS 공유 플로우 완주 횟수 |
| 재방문율 | Calendar에서 과거 기록 조회 빈도 |

---

## 5. 핵심 기능 (MVP)

### 인증 (Auth) ✅ 구현 완료
- Supabase Auth 이메일 회원가입 / 로그인
- Next.js proxy(middleware) 라우팅 보호 — 미인증 시 `/login` redirect
- 로그인 후 첫 화면: `/calendar`

### Calendar (히스토리) ⚠️ mock 데이터
- 월간 캘린더 그리드 — 운동한 날 teal dot 표시
- 날짜 클릭 → 해당 날 운동 요약 카드 (루틴명·총 볼륨·운동 시간)
- 월 이동 내비게이션 (`<` / `>`)
- 과거 세션의 인증 카드 재확인

### Workout (운동 기록) ⚠️ UI 설계 완료, DB 연동 예정
- 운동 검색·선택 Drawer (카테고리: 근력 / 유산소 / 유연성 / 기타)
- 선택한 운동별 세트·무게·횟수 inline 입력 테이블
- 세트 추가 / 삭제
- **Finish 버튼** → 운동 시간 수동 입력 → 인증 카드 생성 플로우 진입

### 인증 카드 (Snap) ✅ 구현 완료
- `canvas-confetti` 폭죽 효과
- 카메라 / 갤러리 사진 업로드 (`<input capture="environment">`)
- 사진 + 운동 데이터(날짜·운동 목록·총 볼륨·운동 시간) 합성
- 비율 토글: 1:1 / 4:5
- `html2canvas` PNG 저장, 공유 버튼

### Settings (설정) ⚠️ 정적 UI
- 프로필 (이름, 이메일)
- 목표 설정 (주간 운동 목표 횟수, 목표 체중)
- 서비스 (로그아웃)

---

## 6. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | Next.js 14+ App Router, TypeScript, Tailwind CSS v4, Shadcn UI |
| 상태 관리 | React 상태 (Client Component) |
| UI 패턴 | Server Component 우선, 입력 폼은 Shadcn Drawer |
| 인증 / DB | Supabase Auth + Supabase Database |
| 인증 카드 저장 | html2canvas |
| 폭죽 효과 | canvas-confetti |
| 배포 | Vercel |

---

## 7. 페이지 구조 (3탭 기반)

| 페이지 | 경로 | 탭 | 설명 |
|---|---|---|---|
| 랜딩 | `/` | — | 서비스 소개 및 로그인 유도 |
| 로그인 | `/login` | — | 이메일 로그인 → `/calendar` |
| 회원가입 | `/signup` | — | 이메일 회원가입 → `/calendar` |
| 캘린더 | `/calendar` | Calendar (좌) | **메인 화면** — 월간 운동 현황, 날짜 탭 시 기록 상세 |
| 운동 기록 | `/workout` | Workout (FAB 중앙) | 운동 추가 + 세트·무게·횟수 실시간 입력 |
| 운동 완료 | `/workout/complete` | — (nav 숨김) | 인증 카드 생성 + SNS 공유 |
| 설정 | `/settings` | Settings (우) | 프로필·목표·서비스 설정 |

> `/dashboard` → `/calendar` redirect (하위 호환)

---

## 8. UX 원칙

- **모바일 퍼스트**: 375px 기준 설계, 입력 폼은 Shadcn Drawer(바텀 시트)
- **수동 입력 중심**: 실시간 추적 대신 운동 후 회고 입력으로 부담 최소화
- **성취감 부여**: 운동 완료 → 폭죽 → 인증 카드 생성 → SNS 공유의 자연스러운 플로우
- **단일 컬러 시스템**: teal 단일 계열, 보조 강조색 없음
- **3탭 집중**: Calendar / Workout(FAB) / Settings — 범용 탭 제거

---

## 9. TODO

### DB 연동 (우선순위 높음)
- [ ] Workout 세션 기록 → Supabase DB 저장/조회
- [ ] Calendar 캘린더 → 로그인 유저의 실제 세션 데이터 기반
- [ ] Supabase RLS(Row Level Security) 정책 적용

### 기능 확장 (Post-MVP)
- [ ] 무게 증가 그래프 (Settings 또는 Calendar 상세)
- [ ] 스트릭 히트맵
- [ ] 소셜 피드 / 친구 기능

# Snapmove — 실행 계획 (SPEC)

## 프로젝트 개요

| 항목              | 내용                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **기술 스택**     | Next.js 16.2.2 App Router, TypeScript, Tailwind CSS, Shadcn UI                                    |
| **Supabase**      | @supabase/supabase-js 2.103.3, @supabase/ssr 0.10.2                                               |
| **환경변수**      | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`ANON_KEY` 아님)              |
| **제약 조건**     | Supabase Auth + 운동 기록 저장은 실제 구현, 캘린더/운동은 mock 데이터                             |
| **디자인 방향**   | 라이트 모드, 연한 민트(teal) 단일 계열, 흰색 + teal-50 교차 배경, 보조 강조색 없음, 모바일 퍼스트 |
| **컴포넌트 원칙** | Server Component 우선, Client Component는 상태·인터랙션 필요 시만                                 |

## DB 스키마 (`public.workout_logs`) ✅ 생성 완료

```
id               uuid        PK
user_id          uuid        → auth.users(id) ON DELETE CASCADE
date             date        NOT NULL
routine_name     text        NOT NULL
duration_minutes integer     NOT NULL, CHECK > 0
category         text        NOT NULL
photo_url        text        NULL
exercises        jsonb       NOT NULL, default '[]'
created_at       timestamptz NOT NULL, default now()
```

**exercises JSONB 구조**

category에 따라 set 내부 필드가 달라짐:

```json
// 근력 (strength) — 무게 optional, 횟수 필수
[{ "name": "스쿼트", "category": "strength", "sets": [{ "w": 60, "r": 10 }] }]
[{ "name": "풀업",   "category": "strength", "sets": [{ "r": 10 }] }]

// 유산소 (cardio) / 유연성 (flexibility) — 시간만 (초 단위), 세트 개념 없음
[{ "name": "달리기",   "category": "cardio",      "sets": [{ "duration": 1800 }] }]
[{ "name": "스트레칭", "category": "flexibility", "sets": [{ "duration": 600 }] }]

// 기타 (other) — 무게 없음, 횟수만
[{ "name": "버피",   "category": "other", "sets": [{ "r": 20 }] }]
```

- RLS 4개 정책: SELECT / INSERT / UPDATE / DELETE 모두 `auth.uid() = user_id`
- 인덱스: `(user_id, date DESC)` — 달력 조회 최적화
- TypeScript 타입: `src/lib/supabase/types.ts` (`WorkoutLog`, `WorkoutLogInsert`, `Exercise`, `ExerciseSet`)
- **존재하지 않는 테이블**: `workout_sessions`, `set_records`, `routines`, `exercises` — MVP에서는 단일 `workout_logs`만 사용

---

## 네비게이션 구조 — 3탭 + 중앙 FAB ✅ 완료

> **2026-04-19 변경**: 기존 4탭(홈/루틴/기록/프로필) → 3탭(캘린더/운동FAB/설정)으로 재정의.  
> Snapmove 핵심 흐름(운동 기록 → 완료 → 인증 카드)에 집중하기 위해 루틴·프로필 탭 제거.

```
         ╭──────╮               ← FAB: absolute -top-8, size-14, bg-teal-600
┌────────│  🏋️  │───────────────┐
│  📅    ╰──────╯           ⚙️  │
│ 캘린더   운동              설정 │  h-16, overflow-visible
└───────────────────────────────┘
```

| 탭     | 경로        | 아이콘         | 스타일                             |
| ------ | ----------- | -------------- | ---------------------------------- |
| 캘린더 | `/calendar` | `CalendarDays` | 일반 탭 (좌)                       |
| 운동   | `/workout`  | `Dumbbell`     | 가운데 FAB, teal 원형, -top-8 돌출 |
| 설정   | `/settings` | `Settings`     | 일반 탭 (우)                       |

- FAB 활성: `bg-teal-700` / 기본: `bg-teal-600`
- 숨김: `pathname.startsWith("/workout")` (몰입 모드)
- 레이아웃 여백: `pb-24` (nav 64px + FAB 돌출 32px)

---

## 라우트 구조

| 페이지        | 경로                | 상태                  |
| ------------- | ------------------- | --------------------- |
| 랜딩          | `/`                 | ✅                    |
| 로그인        | `/login`            | ✅ Supabase Auth 연결 |
| 회원가입      | `/signup`           | ✅ Supabase Auth 연결 |
| 캘린더 (메인) | `/calendar`         | ✅ 구현 완료          |
| 운동 기록     | `/workout`          | ❌ 미생성             |
| 인증 카드     | `/workout/complete` | ❌ 미생성             |
| 설정          | `/settings`         | ✅ 구현 완료          |

---

## - [x] Phase 1: 프로젝트 초기 세팅 & 기반 구조

### 개요

새로운 Next.js 프로젝트를 `/Desktop/snapmove` 디렉토리에 설정한다. 이미 `.git`, `PRD.md`, `.gitignore`가 존재하는 디렉토리이므로 `--yes` 플래그로 충돌 없이 설치한다. 이 단계가 완료되면 이후 모든 Phase의 공통 기반(타입 정의, mock 데이터, 레이아웃 컴포넌트)이 갖춰진다.

### 설치 명령어 (순서대로 실행)

```bash
# 1. Next.js 프로젝트 생성 (기존 디렉토리에 설치)
cd /Users/munbichgo-eun/Desktop/snapmove
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --yes

# 2. Shadcn 초기화 (Default style, Zinc color, CSS variables)
npx shadcn@latest init -d

# 3. Shadcn 컴포넌트 설치
npx shadcn@latest add button card badge input label separator avatar progress dialog drawer tabs skeleton dropdown-menu form checkbox

# 4. 아이콘 패키지
npm install lucide-react
```

### 파일 구조

```
src/
├── app/
│   ├── layout.tsx              # Root layout — <html>, Geist font (dark 클래스 없음)
│   ├── globals.css             # Tailwind + Shadcn CSS 변수
│   └── (app)/
│       └── layout.tsx          # 인증 후 공통 레이아웃 (BottomNav 포함)
├── components/
│   ├── ui/                     # Shadcn 자동 생성
│   ├── layout/
│   │   ├── BottomNav.tsx       # CLIENT ← 3탭+FAB로 재설계 완료
│   │   └── TopBar.tsx          # CLIENT
│   └── shared/
│       ├── MuscleGroupBadge.tsx  # SERVER
│       ├── StatBadge.tsx         # SERVER
│       └── EmptyState.tsx        # SERVER
├── lib/
│   ├── mock-data.ts
│   └── utils.ts
└── types/
    └── index.ts
```

### 구현 체크리스트

- [x] `create-next-app` 실행 완료 (`PRD.md` 보존 확인)
- [x] Shadcn `init` 완료, `components.json` 생성 확인
- [x] Shadcn 컴포넌트 13종 설치 완료
- [x] `src/types/index.ts` 작성
  - [x] `ExerciseCategory` 타입: `"strength" | "cardio" | "flexibility" | "other"` ← **신규**
  - [x] `MuscleGroup` 타입: `"chest" | "back" | "shoulders" | "arms" | "legs" | "core" | "cardio" | "full-body"`
  - [x] `Exercise` 인터페이스 (`category: ExerciseCategory` 필드 포함)
  - [x] `Routine` 인터페이스
  - [x] `SetRecord` 인터페이스
  - [x] `ExerciseRecord` 인터페이스 (`category: ExerciseCategory` 필드 포함)
  - [x] `WorkoutSession` 인터페이스
- [x] `src/lib/mock-data.ts` 작성
  - [x] `MOCK_ROUTINES` — Push Day / Pull Day / Leg Day / Core&Cardio / Mobility&Stretch 5개 루틴, 각 4~5개 운동 (`category` 필드 포함)
  - [x] `MOCK_SESSIONS` — 최근 30일 내 8개 완료 세션 (exerciseRecord에 `category` 포함)
  - [x] `getMockRoutineById(id: string)` 헬퍼 함수
  - [x] `getMockSessionsByMonth(year: number, month: number)` 헬퍼 함수
- [x] `tailwind.config.ts` 커스터마이징 — 전체 컬러 시스템 (Tailwind v4 — `globals.css`의 `@theme inline`으로 대체)
  - [x] **브랜드 색상 (연한 민트 계층)**
    - [x] `brand.bg: "#F0FDFA"` — `teal-50` — 섹션 교체 배경 (가장 연한 민트)
    - [x] `brand.border: "#CCFBF1"` — `teal-100` — 카드 테두리, 구분선
    - [x] `brand.icon: "#5EEAD4"` — `teal-300` — **장식 전용** 아이콘/도형 (대비율 낮아 정보 전달 불가, 의미 있는 아이콘은 teal-600 사용)
    - [x] `brand.DEFAULT: "#14B8A6"` — `teal-500` — 칩, 비인터랙티브 장식 강조 (텍스트/Progress 바에는 사용 금지 — 대비율 2.4:1)
    - [x] `brand.button: "#0D9488"` — `teal-600` — CTA 버튼, 활성 탭, 정보성 아이콘, Progress 바 (흰색 텍스트 대비율 ~3.9:1, 대형/굵은 텍스트 AA 통과)
    - [x] `brand.hover: "#0F766E"` — `teal-700` — 버튼 hover
    - [x] ※ 보조 강조색 없음 — 민트 단일 계열로 통일
  - [x] **배경 시스템**
    - [x] 페이지: `bg-white`
    - [x] 대체 섹션: `bg-teal-50` (연한 민트, 흰색과 자연스러운 교차)
    - [x] 카드: `bg-white border border-teal-100 shadow-sm`
    - [x] Footer: `bg-teal-800` (다크 민트, 흰색 텍스트)
  - [x] **그라디언트**
    - [x] `hero-gradient`: `from-teal-50 via-white to-teal-50`
    - [x] `mint-gradient`: `from-teal-700 to-teal-600` — CTA 섹션 배경 (흰색 텍스트 대비율 확보: teal-700 기준 ~6.2:1 ✅)
    - [x] `card-gradient`: `from-teal-700 to-teal-600` — WorkoutShareCard 전용 (모든 텍스트 `text-white` 사용 가능, 대비율 확보)
- [x] `src/app/globals.css` — Shadcn CSS 변수 재매핑
  - [x] `--primary: 173 80% 40%` → teal-600 HSL 값으로 설정 (Shadcn Button이 brand 색상 따라가도록)
  - [x] `--primary-foreground: 0 0% 100%` → 흰색 유지
  - [x] `--ring: 173 80% 40%` → 포커스 링도 teal 계열로
- [x] `src/app/layout.tsx` — `<html lang="ko">` (dark 클래스 없음), Geist Sans 폰트 적용
- [x] `src/components/shared/MuscleGroupBadge.tsx` (SERVER)
  - [x] chest: `bg-red-100 text-red-700` — 강함/파워
  - [x] back: `bg-blue-100 text-blue-700` — 넓이/안정 (틸과 충분히 구분되는 순수 파랑)
  - [x] shoulders: `bg-violet-100 text-violet-700` — 독립적인 보라
  - [x] arms: `bg-rose-100 text-rose-700` — 핑크-레드 계열
  - [x] legs: `bg-amber-100 text-amber-700` — 따뜻한 앰버 (배지 전용, 브랜드 색과 무관)
  - [x] core: `bg-green-100 text-green-700` — 초록 (틸과 색조 다름, 파란 기운 없는 순수 초록)
  - [x] cardio: `bg-pink-100 text-pink-700` — 심박/에너지
  - [x] full-body: `bg-slate-100 text-slate-600` — 중립/포괄
- [x] `src/components/shared/StatBadge.tsx` — sets×reps 표시 배지 (SERVER)
- [x] `src/components/shared/EmptyState.tsx` — 빈 상태 플레이스홀더 with CTA (SERVER)
- [x] `src/components/layout/BottomNav.tsx` (CLIENT) ← **3탭+FAB로 재설계 완료**
  - [x] `usePathname()`으로 활성 탭 강조
  - [x] 탭 구성: Calendar(CalendarDays) / Workout FAB(Dumbbell) / Settings(Settings)
  - [x] `/workout` 경로 진입 시 자동 숨김
  - [x] FAB: `absolute -top-8 size-14 bg-teal-600 rounded-full shadow-lg`, 활성 시 `bg-teal-700`
- [x] `src/components/layout/TopBar.tsx` (CLIENT)
  - [x] `useRouter()`로 뒤로가기 버튼
  - [x] `title` prop 지원
  - [x] 우측 액션 slot 지원
- [x] `src/app/(app)/layout.tsx` (SERVER wrapper)
  - [x] `<main className="flex-1 pb-24">{children}</main>` ← pb-20 → pb-24 변경 완료
  - [x] `<BottomNav />` 포함

### 검증 체크리스트

- [x] `npm run dev` 오류 없이 실행
- [x] `http://localhost:3000` 접속 시 페이지 렌더링 확인 (빈 상태 OK)
- [x] `src/components/ui/` 폴더에 Shadcn 파일 존재 확인
- [x] 라이트 배경(`bg-white`) 적용 확인
- [x] Geist 폰트 적용 확인
- [x] TypeScript 타입 오류 없음 (`npm run build`)

---

## - [x] Phase 2: 랜딩 & 인증 페이지

### 개요

서비스 진입점인 랜딩 페이지(`/`)와 인증 페이지(`/login`, `/signup`)를 구현한다. **Supabase Auth 실제 연동** — 이메일/비밀번호 회원가입·로그인, Next.js proxy 라우팅 보호 포함. 랜딩 페이지는 전체 Server Component, 인증 폼은 Client Component.

> **실제 구현 범위**: Supabase Auth 회원가입/로그인 ✅ 완료.
> `proxy.ts` 라우팅 보호 ✅ — Next.js 16에서 `middleware` 파일 컨벤션이 deprecated되고 `proxy`로 변경됨.

### 파일 구조

```
src/
├── proxy.ts                      # 라우트 가드 ✅
├── app/
│   ├── page.tsx                  # 랜딩 (/) ✅
│   ├── login/
│   │   └── page.tsx              # 로그인 ✅
│   └── signup/
│       └── page.tsx              # 회원가입 ✅
└── components/
    ├── landing/
    │   ├── LandingNav.tsx        # SERVER ✅
    │   ├── HeroSection.tsx       # SERVER ✅
    │   └── FeaturesSection.tsx   # SERVER ✅
    └── auth/
        ├── LoginForm.tsx         # CLIENT ✅ — Supabase Auth 연결 완료
        └── SignupForm.tsx        # CLIENT ✅ — Supabase Auth 연결 완료
```

### 구현 체크리스트

**랜딩 페이지 (`/`)**

- [x] `LandingNav.tsx` (SERVER)
- [x] `HeroSection.tsx` (SERVER)
- [x] `FeaturesSection.tsx` — 3열 카드 그리드 (SERVER)
- [x] How It Works 섹션
- [x] 하단 CTA 배너
- [x] Footer

**로그인 페이지 (`/login`) ✅**

- [x] 전체 화면 중앙 정렬 카드 레이아웃
- [x] `LoginForm.tsx` (CLIENT)
  - [x] 이메일 `<Input>` + `<Label>`
  - [x] 비밀번호 `<Input type="password">` + Eye/EyeOff 표시 토글
  - [x] "Forgot password?" 링크 (장식)
  - [x] 제출 버튼 — `supabase.auth.signInWithPassword` → 성공 시 `/calendar` push, 실패 시 에러 메시지

**회원가입 페이지 (`/signup`) ✅**

- [x] 전체 화면 중앙 정렬 카드 레이아웃
- [x] `SignupForm.tsx` (CLIENT)
  - [x] 이름 `<Input>` — `options.data.full_name`으로 전달
  - [x] 이메일 `<Input>`
  - [x] 비밀번호 `<Input>` + 강도 표시 바 (≤5자: 약함/red, ≤9자: 보통/yellow, 10자+: 강함/green)
  - [x] 비밀번호 확인 `<Input>` + 불일치 시 클라이언트 검증 에러
  - [x] 약관 동의 `<Checkbox>` + 레이블
  - [x] 제출 버튼 — `supabase.auth.signUp` → 성공 시 `/calendar` push, 실패 시 에러 메시지

**Proxy 라우트 가드 ✅ 완료**

- [x] `src/proxy.ts` 생성 (Next.js 16: `middleware` → `proxy` 파일 컨벤션 변경)
  - 보호 경로: `/calendar`, `/workout`, `/settings`
  - 미인증 → `/login` redirect (307 확인)
  - 인증 후 `/login`, `/signup` 접근 → `/calendar` redirect

### 검증 체크리스트

- [x] `/` 랜딩 페이지 정상 렌더링
- [x] `/login` 폼 정상 렌더링 + 비밀번호 토글
- [x] `/signup` 폼 정상 렌더링 + 강도 바
- [x] 미인증 상태에서 `/calendar` 직접 접근 시 `/login` redirect — 307 확인 ✅

---

## - [ ] Phase 3: Calendar 페이지 & Settings 페이지 (캘린더 ✅ / 설정 ✅)

### 개요

로그인 후 메인 화면인 캘린더(`/calendar`)와 설정(`/settings`) 페이지를 구현한다.
캘린더는 월간 운동 현황을 한눈에 보여주고, 날짜 클릭 시 해당 날 운동 상세를 인라인으로 표시한다.
설정은 프로필·목표·로그아웃을 포함한 정적 UI로 시작해 Supabase 연동은 후속 구현한다.

> **기존 Phase 3 (Dashboard & Routines) 대체** — 2026-04-19 기획 변경  
> 루틴 탭 제거, Dashboard → Calendar로 전환. `/dashboard`는 `/calendar`로 redirect.

> **TODO (DB 연동 시 구현):**
>
> - 캘린더 → 로그인 유저의 실제 `workout_logs` 조회로 교체
> - 설정 → `profiles` 테이블 조회/업데이트

### 파일 구조

```
src/
├── app/
│   └── (app)/
│       ├── calendar/
│       │   └── page.tsx            # 캘린더 메인 (CLIENT)
│       └── settings/
│           └── page.tsx            # 설정 (SERVER + CLIENT island)
└── components/
    ├── calendar/
    │   ├── MonthNav.tsx            # CLIENT — < YYYY년 M월 > 내비게이션
    │   ├── CalendarGrid.tsx        # CLIENT — 7열 그리드, dot, 날짜 선택
    │   └── DayDetailCard.tsx       # SERVER — 선택된 날 운동 요약
    └── settings/
        └── SettingsForm.tsx        # CLIENT — 로그아웃 등 인터랙션
```

### 구현 체크리스트

**캘린더 페이지 (`/calendar`)**

- [x] `calendar/page.tsx` (CLIENT) — MonthNav + CalendarGrid + DayDetailCard 조합 (TopBar 대신 MonthNav가 헤더 역할)
- [x] `MonthNav.tsx` (CLIENT)
  - [x] `< 2026년 4월 >` 형식 헤더
  - [x] `←` / `→` 버튼으로 `currentMonth` state 업데이트
- [x] `CalendarGrid.tsx` (CLIENT)
  - [x] `currentMonth`, `selectedDate` state (기본값: 현재 월, 오늘 날짜 선택)
  - [x] **7열 CSS grid** — 요일 헤더 행: 일/월/화/수/목/금/토
  - [x] 날짜 셀:
    - [x] 운동 있는 날: 날짜 숫자 아래 dot
    - [x] 선택된 날: `bg-brand-button text-white rounded-full` 강조
    - [x] 오늘 날짜: `bg-red-500 text-white rounded-full` (선택 안 된 상태)
  - [x] 날짜 클릭 → `selectedDate` 업데이트
  - [x] `getMockSessionsByMonth(year, month)`으로 해당 월 세션 조회
  - [x] 운동한 날 Set: `new Set(sessions.map(s => s.date.slice(0, 10)))`
- [x] `DayDetailCard.tsx` (SERVER)
  - [x] `selectedDate`가 없으면: "날짜를 선택하면 기록을 볼 수 있어요" 안내
  - [x] 선택한 날에 세션 있으면: 날짜 헤더 + 운동 목록 (이름·세트·최대무게)
  - [x] 선택한 날에 세션 없으면: `<EmptyState>` ("이 날은 기록된 운동이 없어요")
  - [x] 총 볼륨, 운동 시간 표시
  - [ ] "인증 카드 보기" 버튼 → `WorkoutShareCard` Dialog

**설정 페이지 (`/settings`)**

- [x] `settings/page.tsx` — TopBar("설정") + 섹션 구성 (SERVER wrapper)
- [x] **프로필 섹션**
  - [x] 이름, 이메일 표시 (정적, `supabase.auth.getUser()` 후속 연동)
- [x] **목표 설정 섹션**
  - [x] 주간 운동 목표 횟수 (정적 표시, 후속 연동)
  - [x] 목표 체중 (정적 표시, 후속 연동)
- [x] **서비스 섹션**
  - [x] 로그아웃 버튼 (CLIENT) — `supabase.auth.signOut()` → `/login` redirect

### 검증 체크리스트

- [x] `/calendar` 접속 시 캘린더 그리드 정상 렌더링
- [x] 운동 있는 날에 teal dot 표시 확인
- [x] 날짜 클릭 시 선택 강조 + 하단 DayDetailCard 업데이트
- [x] 운동 없는 날 클릭 시 EmptyState 표시
- [x] 월 이동 화살표 클릭 시 캘린더 월 변경
- [x] BottomNav Calendar 탭 활성 강조 확인
- [x] `/settings` 접속 시 프로필·목표·서비스 섹션 렌더링
- [x] 로그아웃 버튼 클릭 시 `/login` redirect
- [x] BottomNav Settings 탭 활성 강조 확인
- [ ] 모바일(375px) — 캘린더 그리드 7열 가로 넘침 없음

---

## - [ ] Phase 4: 운동 기록 페이지

### 개요

운동 기록의 핵심 인터랙션 페이지(`/workout`). BottomNav FAB 클릭 시 진입하며 nav가 숨겨진 몰입 모드로 동작한다.
**실시간 타이머 없음** — 수동 입력 방식. 운동 추가 → 세트별 무게·횟수 입력 → Finish → 인증 카드로 이어진다.
완료 시 Supabase `workout_logs`에 INSERT.

> **기존 Phase 4 (/workout/[id]) 대체** — 2026-04-19 기획 변경  
> 루틴 선택 없이 `/workout`에서 바로 운동 추가·기록. 루틴 개념 제거.

> **실제 구현 범위**: Finish 후 Supabase `workout_logs` 테이블에 단건 INSERT (로그인 유저 기준)
>
> **INSERT 페이로드:**
>
> ```ts
> {
>   date: "2026-04-19",
>   routine_name: "오늘의 운동",   // 고정값 또는 사용자 입력
>   duration_minutes: durationMinutes,
>   category: "strength",
>   photo_url: null,
>   exercises: [{ name: "스쿼트", sets: [{ w: 60, r: 10 }] }]
> }
> ```

### 설치 명령어

```bash
npm install canvas-confetti
npm install -D @types/canvas-confetti
```

### 파일 구조

```
src/
├── app/
│   └── (app)/
│       └── workout/
│           ├── page.tsx              # CLIENT — 전체 상태 관리
│           └── complete/
│               └── page.tsx          # CLIENT — 인증 카드 생성
└── components/
    ├── workout/
    │   ├── ExerciseDrawer.tsx        # CLIENT — Shadcn Drawer, 운동 검색·선택
    │   ├── ExerciseCard.tsx          # CLIENT — 운동 카드 + SetTable
    │   ├── SetTable.tsx              # CLIENT — 세트별 무게·횟수 입력
    │   └── FinishModal.tsx           # CLIENT — 시간 입력 + 인증 카드 진입
    └── shared/
        └── WorkoutShareCard.tsx      # CLIENT — Phase 3 Calendar에서도 재사용
```

### 구현 체크리스트

**운동 기록 페이지 (`/workout`)**

- [ ] `workout/page.tsx` (CLIENT)
  - [ ] 상태: `exercises: ExerciseEntry[]`
  - [ ] **헤더 바** — TopBar: "오늘의 운동 · 날짜", 우측 "×" 닫기 → 확인 Dialog → `/calendar`
  - [ ] `[+ 운동 추가]` 버튼 — ExerciseDrawer 트리거
  - [ ] ExerciseCard 목록 렌더링
  - [ ] 하단 고정 "운동 완료 (Finish)" 버튼 → FinishModal 열림

- [ ] `ExerciseDrawer.tsx` (CLIENT)
  - [ ] Shadcn `<Drawer>` (바텀 시트)
  - [ ] 카테고리 탭: 근력 / 유산소 / 유연성 / 기타
  - [ ] 근력 선택 시 세부 근육군: 가슴 / 등 / 어깨 / 팔 / 하체 / 복근
  - [ ] 운동명 검색 `<Input>` (이름 필터링)
  - [ ] 항목 선택 → Drawer 닫힘 + `exercises`에 새 항목 push

- [ ] `ExerciseCard.tsx` (CLIENT)
  - [ ] 운동 이름 헤더 + 우측 삭제 `[✕]` 버튼
  - [ ] category에 따라 분기:
    - [ ] `"strength"` / `"other"` → `<SetTable>` + `[+ 세트 추가]` 버튼
    - [ ] `"cardio"` / `"flexibility"` → `<DurationInput>` (시간 단일 입력, 세트 없음)
  - [ ] `[+ 세트 추가]` 버튼 (근력/기타만) — 이전 세트 값 복사하여 새 행 push

- [ ] `SetTable.tsx` (CLIENT) — 근력·기타 전용
  - [ ] `category === "strength"` 헤더 행: 세트 / 무게(kg) / 횟수 / 완료
  - [ ] `category === "other"` 헤더 행: 세트 / 횟수 / 완료
  - [ ] 각 세트 행:
    - [ ] 세트 번호 레이블
    - [ ] 무게 `<input type="number" inputMode="decimal">` — strength만, 비워도 됨 (placeholder="0")
    - [ ] 횟수 `<input type="number" inputMode="numeric">`
    - [ ] 완료 체크박스 — 체크 시 행 `opacity-50`
  - [ ] props: `sets`, `onChange`, `category`

- [ ] `DurationInput.tsx` (CLIENT) — 유산소·유연성 전용
  - [ ] `<input type="number" inputMode="numeric" placeholder="시간 (분)">` 단일 입력
  - [ ] props: `duration`, `onChange`

- [ ] `FinishModal.tsx` (CLIENT)
  - [ ] `canvas-confetti` 폭죽 실행 (`confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })`)
  - [ ] 운동 요약 (총 볼륨 / 운동 종목 수)
  - [ ] **운동 시간 수동 입력**
    - [ ] 퀵 버튼: "15분" / "30분" / "60분" / "90분" — 선택 버튼 `bg-teal-600 text-white`
    - [ ] `<Input type="number" placeholder="직접 입력 (분)">` — 퀵 버튼과 양방향 동기화
  - [ ] **사진 업로드** (선택)
    - [ ] `<input type="file" accept="image/*" capture="environment">` — 카메라/갤러리
    - [ ] 선택 시 `URL.createObjectURL(file)`로 미리보기 썸네일
    - [ ] 취소 `[×]` 버튼으로 사진 제거
  - [ ] "완료" 버튼 → Supabase INSERT → `/workout/complete` 이동

**인증 카드 페이지 (`/workout/complete`)**

- [ ] `WorkoutShareCard.tsx` (CLIENT, `components/shared/`)
  - [ ] `photoUrl?: string` prop 수신
  - [ ] **사진 있을 때**: 카드 상단 1/3 `<img>` `object-cover`, 하단 2/3 운동 데이터
  - [ ] **사진 없을 때**: `card-gradient` 전체 배경 유지
  - [ ] 비율 토글 — "1:1" / "4:5" 버튼, `aspect-square` ↔ `aspect-[4/5]` 전환
  - [ ] 좌상단 Snapmove 로고 (`text-white`)
  - [ ] 날짜 표시 (크게, `text-white font-bold`)
  - [ ] 운동 목록 + 볼륨 (`text-white`)
  - [ ] 하단 총 볼륨 + 운동 시간 (`text-white font-bold`)
  - [ ] Download 버튼 — html2canvas PNG 저장 (실제 구현)
  - [ ] Share 버튼 (`border-white/50 text-white hover:bg-white/10`, 장식)

### 검증 체크리스트

- [ ] `/workout` 접속 시 BottomNav 숨김 확인
- [ ] `[+ 운동 추가]` 클릭 → Drawer(바텀 시트) 열림/닫힘
- [ ] 운동 선택 시 ExerciseCard 추가 확인
- [ ] 근력 카테고리 선택 시 근육군 셀렉터 표시
- [ ] 근력 운동 선택 시 SetTable (세트/무게/횟수) 렌더링 확인
- [ ] 풀업 등 맨몸 근력 — 무게 비운 채로 횟수만 입력 가능 확인
- [ ] 유산소·유연성 운동 선택 시 DurationInput (시간 단일 입력) 렌더링 확인
- [ ] 기타 운동 선택 시 SetTable (세트/횟수, 무게 없음) 렌더링 확인
- [ ] 완료 체크 시 행 opacity 변화
- [ ] `[+ 세트 추가]` 클릭 시 이전 값 복사 새 행 추가 (근력/기타만)
- [ ] "Finish" 클릭 → FinishModal 열림 + confetti 폭죽 실행
- [ ] 퀵 버튼 클릭 시 입력 필드 값 동기화 + 선택 버튼 강조
- [ ] 사진 선택 시 썸네일 미리보기 표시
- [ ] "완료" 클릭 시 `/workout/complete` 이동
- [ ] WorkoutShareCard "1:1" / "4:5" 비율 전환 동작
- [ ] Download 버튼 클릭 시 PNG 저장
- [ ] 모바일(375px) — 세트 입력 행 가로 스크롤 없음

---

## - [ ] Phase 5: DB 연동 & 마무리 폴리시

### 개요

mock 데이터를 Supabase 실제 데이터로 교체하고, 전체 UX를 점검·마무리한다.

> **실제 구현 범위**: 로그인 유저의 `workout_logs` SELECT로 Calendar 데이터 구동
>
> **SELECT 쿼리:**
>
> ```ts
> supabase
>   .from("workout_logs")
>   .select("*")
>   .eq("user_id", user.id)
>   .gte("date", firstDayOfMonth)
>   .lte("date", lastDayOfMonth)
>   .order("date", { ascending: false });
> ```

### 구현 체크리스트

**DB 연동**

- [ ] Calendar `/calendar` — mock → Supabase `workout_logs` SELECT
- [ ] Workout `/workout` — Supabase `workout_logs` INSERT (Phase 4에서 선행 구현)
- [ ] Settings `/settings` — `supabase.auth.getUser()` 프로필 표시
- [ ] Supabase RLS 정책 전 테이블 적용 확인

**마무리 폴리시**

- [ ] 모든 `loading.tsx` 파일 존재 확인 (calendar / workout / settings)
- [ ] BottomNav Calendar / Workout FAB / Settings 탭 활성 강조 확인
- [ ] 전체 페이지 라이트 모드 색상 일관성 점검 (흰색 배경, teal-50 교체 섹션)
- [ ] `MuscleGroupBadge` 색상이 모든 페이지에서 동일하게 표시되는지 확인
- [ ] 모든 Shadcn 컴포넌트 라이트 테마 가독성 확인

### 검증 체크리스트

- [ ] Calendar — 실제 운동한 날 teal dot 표시 확인 (DB 기반)
- [ ] Calendar 날짜 클릭 시 실제 운동 데이터 표시
- [ ] Workout 완료 후 Calendar에 해당 날 dot 생성 확인 (DB 반영)
- [ ] 로그아웃 후 재로그인 시 데이터 유지 확인
- [ ] **전체 흐름 E2E 테스트**: `/` → `/signup` → `/calendar` → `/workout` (운동 추가·기록) → Finish → 인증 카드 생성 → `/calendar` 복귀 → 해당 날 dot 확인
- [ ] 모바일(375px) 전 페이지 레이아웃 이상 없음
- [ ] `npm run build` 오류 없이 통과
- [ ] TypeScript 타입 오류 없음

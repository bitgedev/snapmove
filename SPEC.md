# Snapmove — 실행 계획 (SPEC)

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| **기술 스택** | Next.js 16.2.2 App Router, TypeScript, Tailwind CSS, Shadcn UI |
| **Supabase** | @supabase/supabase-js 2.103.3, @supabase/ssr 0.10.2 |
| **환경변수** | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`ANON_KEY` 아님) |
| **제약 조건** | Supabase Auth + 운동 기록 저장은 실제 구현, 루틴/대시보드/히스토리는 mock 데이터 |
| **디자인 방향** | 라이트 모드, 연한 민트(teal) 단일 계열, 흰색 + teal-50 교차 배경, 보조 강조색 없음, 모바일 퍼스트 |
| **컴포넌트 원칙** | Server Component 우선, Client Component는 상태·인터랙션 필요 시만 |

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
```json
[{ "name": "스쿼트", "sets": [{ "w": 60, "r": 10 }] }]
```

- RLS 4개 정책: SELECT / INSERT / UPDATE / DELETE 모두 `auth.uid() = user_id`
- 인덱스: `(user_id, date DESC)` — 달력 조회 최적화
- TypeScript 타입: `src/lib/supabase/types.ts` (`WorkoutLog`, `WorkoutLogInsert`, `Exercise`, `ExerciseSet`)
- **존재하지 않는 테이블**: `workout_sessions`, `set_records`, `routines`, `exercises` — MVP에서는 단일 `workout_logs`만 사용

---

## 라우트 구조

| 페이지 | 경로 | 상태 |
|---|---|---|
| 랜딩 | `/` | ✅ |
| 로그인 | `/login` | ✅ Supabase Auth 연결 |
| 회원가입 | `/signup` | ✅ Supabase Auth 연결 |
| 대시보드 | `/dashboard` | ❌ 미생성 |
| 루틴 목록 | `/routines` | ❌ 미생성 |
| 루틴 상세 | `/routines/[id]` | ❌ 미생성 |
| 운동 실행 | `/workout/[id]` | ❌ 미생성 |
| 히스토리 | `/history` | ❌ 미생성 |

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
│   │   ├── BottomNav.tsx       # CLIENT
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
- [x] `src/components/layout/BottomNav.tsx` (CLIENT)
  - [x] `usePathname()`으로 활성 탭 강조
  - [x] 탭 구성: Dashboard(Home) / Routines(Dumbbell) / History(Clock) / Profile(User, 장식)
  - [x] `/workout` 경로 진입 시 자동 숨김
- [x] `src/components/layout/TopBar.tsx` (CLIENT)
  - [x] `useRouter()`로 뒤로가기 버튼
  - [x] `title` prop 지원
  - [x] 우측 액션 slot 지원
- [x] `src/app/(app)/layout.tsx` (SERVER wrapper)
  - [x] `<main className="flex-1 pb-20">{children}</main>`
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
  - [x] 제출 버튼 — `supabase.auth.signInWithPassword` → 성공 시 `/dashboard` push, 실패 시 에러 메시지

**회원가입 페이지 (`/signup`) ✅**

- [x] 전체 화면 중앙 정렬 카드 레이아웃
- [x] `SignupForm.tsx` (CLIENT)
  - [x] 이름 `<Input>` — `options.data.full_name`으로 전달
  - [x] 이메일 `<Input>`
  - [x] 비밀번호 `<Input>` + 강도 표시 바 (≤5자: 약함/red, ≤9자: 보통/yellow, 10자+: 강함/green)
  - [x] 비밀번호 확인 `<Input>` + 불일치 시 클라이언트 검증 에러
  - [x] 약관 동의 `<Checkbox>` + 레이블
  - [x] 제출 버튼 — `supabase.auth.signUp` → 성공 시 `/dashboard` push, 실패 시 에러 메시지

**Proxy 라우트 가드 ✅ 완료**

- [x] `src/proxy.ts` 생성 (Next.js 16: `middleware` → `proxy` 파일 컨벤션 변경)
  - 보호 경로: `/dashboard`, `/routines`, `/workout`, `/history`
  - 미인증 → `/login` redirect (307 확인)
  - 인증 후 `/login`, `/signup` 접근 → `/dashboard` redirect

### 검증 체크리스트

- [x] `/` 랜딩 페이지 정상 렌더링
- [x] `/login` 폼 정상 렌더링 + 비밀번호 토글
- [x] `/signup` 폼 정상 렌더링 + 강도 바
- [x] 미인증 상태에서 `/dashboard` 직접 접근 시 `/login` redirect — 307 확인 ✅

---

## - [ ] Phase 3: 대시보드 & 루틴 페이지

### 개요
로그인 후 첫 화면인 대시보드(`/dashboard`)와 루틴 탐색/관리 페이지를 구현한다. 모든 입력 폼은 모바일 최적화를 위해 Shadcn `<Drawer>` (바텀 시트)를 사용한다. `(app)` 라우트 그룹 안에 위치해 Phase 1의 BottomNav, TopBar가 자동 적용된다.

> **TODO (DB 연동 시 구현):**
> - 대시보드 주간 게이지 → 로그인 유저의 실제 `workout_logs` 조회로 교체
> - 루틴 목록 → 현재 MVP에서는 mock 데이터 유지 (Supabase 루틴 테이블 없음)
> - 루틴 상세 → 현재 MVP에서는 mock 데이터 유지

### 파일 구조

```
src/
├── app/
│   └── (app)/
│       ├── dashboard/
│       │   └── page.tsx            # 대시보드 (SERVER)
│       └── routines/
│           ├── page.tsx            # 루틴 목록 (SERVER)
│           ├── loading.tsx
│           └── [id]/
│               ├── page.tsx        # 루틴 상세 (SERVER)
│               └── loading.tsx
└── components/
    ├── dashboard/
    │   ├── WeeklyGauge.tsx         # CLIENT — 주간 게이지 바
    │   └── RecentSessionList.tsx   # SERVER — 최근 운동 카드 2~3개
    └── routines/
        ├── RoutineCard.tsx         # SERVER
        ├── RoutineGrid.tsx         # SERVER
        ├── RoutineFilterTabs.tsx   # CLIENT
        ├── AddRoutineDrawer.tsx    # CLIENT — Drawer 사용
        ├── AddExerciseDrawer.tsx   # CLIENT — Drawer 사용
        └── ExerciseListItem.tsx    # SERVER
```

### 구현 체크리스트

**대시보드 (`/dashboard`)**

- [ ] `dashboard/page.tsx` (SERVER) — TopBar("안녕하세요 👋") + WeeklyGauge + RecentSessionList 조합
- [ ] `WeeklyGauge.tsx` (CLIENT)
  - [ ] 이번 주 목표 운동 횟수 (mock: 목표 5회, 현재 N회)
  - [ ] Shadcn `<Progress>` 바 — `value={(완료/목표)*100}`, `bg-teal-600`
  - [ ] "이번 주 3 / 5 완료" 텍스트 + 퍼센트
  - [ ] 요일별 dot 마커 행 (월~일, 운동한 날은 `bg-teal-500` 채움)
- [ ] `RecentSessionList.tsx` (SERVER)
  - [ ] 섹션 제목 "최근 운동"
  - [ ] 최근 3개 `MOCK_SESSIONS` → 미니 카드 (날짜 / 루틴명 / 총 볼륨)
  - [ ] "전체 기록 보기 →" → `/history` 링크

**루틴 목록 (`/routines`)**

- [ ] `page.tsx` — `MOCK_ROUTINES` import, TopBar + 컴포넌트 조합 (SERVER)
- [ ] `RoutineFilterTabs.tsx` (CLIENT)
  - [ ] "All" / "Recent" / "Favorites" 탭
  - [ ] `activeTab` state로 탭 전환 (실제 필터링 없이 동일 데이터 표시)
  - [ ] Shadcn `<Tabs>` 컴포넌트 사용
- [ ] `RoutineGrid.tsx` — `grid-cols-2 md:grid-cols-3` (SERVER)
- [ ] `RoutineCard.tsx` (SERVER)
  - [ ] 카드 상단 컬러 악센트 바 (주 근육군 색상)
  - [ ] 루틴 이름 (bold, lg)
  - [ ] 운동 개수 배지
  - [ ] `MuscleGroupBadge` 최대 3개
  - [ ] "Last performed: 3 days ago" 상대 날짜
  - [ ] 예상 소요 시간 칩
  - [ ] 전체 카드 `<Link href="/routines/[id]">`
- [ ] `AddRoutineDrawer.tsx` (CLIENT)
  - [ ] 화면 우하단 FAB "+" 버튼
  - [ ] 클릭 시 Shadcn `<Drawer>` (바텀 시트) 열림
  - [ ] Drawer 내용: 루틴 이름 `<Input>` + 취소/생성 버튼 (실제 동작 없음)
- [ ] `loading.tsx` — 4개 Skeleton 카드 그리드

**루틴 상세 (`/routines/[id]`)**

- [ ] `page.tsx` — `getMockRoutineById(params.id)`, 없으면 `notFound()` (SERVER)
- [ ] 루틴 헤더 섹션 (SERVER)
  - [ ] 루틴 이름 (2xl bold)
  - [ ] 설명 텍스트
  - [ ] 통계 행: 운동 개수 / 총 세트 수 / 예상 시간
  - [ ] `MuscleGroupBadge` 행
- [ ] TopBar: 뒤로가기(→ `/routines`), 루틴 이름, 우측 케밥 메뉴 (`DropdownMenu` — Edit/Delete 장식)
- [ ] `ExerciseListItem.tsx` (SERVER)
  - [ ] 운동 이름 + `MuscleGroupBadge` + 카테고리 칩 (근력/유산소/유연성/기타)
  - [ ] 세트×반복×무게: "4 × 10 @ 60 kg" 형식
  - [ ] 휴식 시간 칩
  - [ ] 드래그 핸들 아이콘 (장식)
  - [ ] 우측 삭제 버튼 (X 아이콘, 장식)
  - [ ] `<Separator>`로 항목 구분
- [ ] `AddExerciseDrawer.tsx` (CLIENT)
  - [ ] 운동 목록 하단 "운동 추가 +" 버튼
  - [ ] 클릭 시 Shadcn `<Drawer>` (바텀 시트) 열림
  - [ ] Drawer 내용:
    - [ ] **카테고리 셀렉터** (근력 / 유산소 / 유연성 / 기타) — 선택에 따라 근육군 셀렉터 표시 여부 결정
    - [ ] 근력 선택 시: 근육군 셀렉터 노출 (chest/back/…)
    - [ ] 운동 이름 / 세트 수 / 횟수 / 무게 / 휴식 시간 `<Input>`
    - [ ] 취소/추가 버튼 (실제 동작 없음)
- [ ] 하단 고정 "Start Workout" 버튼 (CLIENT, fixed position) → `<Link href="/workout/[id]">`
- [ ] `loading.tsx` — 통계 스켈레톤 + 4개 운동 행 스켈레톤

### 검증 체크리스트

- [ ] `/dashboard` 접속 시 WeeklyGauge + RecentSessionList 렌더링
- [ ] WeeklyGauge Progress 바 수치 정상 표시
- [ ] "전체 기록 보기" 링크 → `/history` 이동
- [ ] BottomNav "Dashboard" 탭 활성 강조 확인
- [ ] `/routines` 접속 시 루틴 카드 렌더링
- [ ] BottomNav "Routines" 탭 활성 강조 확인
- [ ] 필터 탭 클릭 시 탭 전환 (UI 변화만)
- [ ] "+" FAB 클릭 시 Drawer(바텀 시트) 열림/닫힘
- [ ] 루틴 카드 클릭 시 `/routines/[id]` 이동
- [ ] `/routines/1` 접속 시 루틴 상세 정상 렌더링
- [ ] `/routines/999` 접속 시 404 페이지
- [ ] 케밥 메뉴 클릭 시 DropdownMenu 표시
- [ ] `ExerciseListItem` 카테고리 칩 렌더링 확인
- [ ] "운동 추가 +" 버튼 클릭 시 Drawer 열림/닫힘
- [ ] AddExerciseDrawer: 근력 선택 시 근육군 셀렉터 표시 확인
- [ ] "Start Workout" 버튼 클릭 시 `/workout/1` 이동
- [ ] TopBar 뒤로가기 버튼 클릭 시 `/routines` 이동
- [ ] 모바일(375px) — 카드 2열, BottomNav 정상

---

## - [ ] Phase 4: 운동 실행 페이지

### 개요
운동 기록의 핵심 인터랙션 페이지. `(app)` 그룹 **밖**에 위치해 BottomNav 없이 풀스크린으로 표시된다. **실시간 타이머 없음** — 웹 백그라운드 제한 이슈와 회고 중심 UX를 위해 수동 입력 방식 채택. 완료 시 `canvas-confetti` 폭죽 + 공유 카드 다이얼로그.

> **실제 구현 범위**: "Done" 버튼 클릭 시 Supabase `workout_logs` 테이블에 단건 INSERT (로그인 유저 기준)
>
> **INSERT 페이로드 구조:**
> ```ts
> {
>   date: "2026-04-18",           // 오늘 날짜
>   routine_name: routine.name,
>   duration_minutes: durationMinutes,  // 수동 입력값
>   category: "strength",              // 루틴 주 카테고리
>   photo_url: uploadedPhotoUrl,       // null 허용
>   exercises: [                       // JSONB — SetTracker 입력값
>     { name: "스쿼트", sets: [{ w: 60, r: 10 }] }
>   ]
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
│   └── workout/                      # (app) 그룹 밖 — BottomNav 없음
│       └── [id]/
│           └── page.tsx              # SERVER wrapper (thin)
└── components/
    ├── workout/
    │   ├── WorkoutSession.tsx        # CLIENT — 전체 상태 관리
    │   └── SetTracker.tsx            # CLIENT
    └── shared/
        └── WorkoutShareCard.tsx      # CLIENT — Phase 5 히스토리에서도 재사용
```

### 구현 체크리스트

- [ ] `page.tsx` — `getMockRoutineById(params.id)` → `<WorkoutSession routine={routine} />` (SERVER)
- [ ] `WorkoutSession.tsx` (CLIENT)
  - [ ] **헤더 바** (타이머 없음)
    - [ ] "×" 닫기 버튼 → 확인 Dialog ("운동을 종료하시겠습니까?") → `/routines` 이동
    - [ ] 루틴 이름 중앙 표시
    - [ ] ~~경과 타이머~~ — **제거됨** (수동 입력으로 대체)
  - [ ] **진행 바**
    - [ ] "Exercise 2 of 5" 텍스트
    - [ ] Shadcn `<Progress>` 바
  - [ ] **운동 네비게이터**
    - [ ] 현재 운동 이름 (2xl bold) + `MuscleGroupBadge`
    - [ ] 이전/다음 화살표 버튼 (`currentExerciseIndex` state)
- [ ] `SetTracker.tsx` (CLIENT)
  - [ ] 헤더 행: Set # / Previous / Weight(kg) / Reps
  - [ ] 각 세트 행
    - [ ] 세트 번호 레이블
    - [ ] 이전 기록 (회색 텍스트, mock 데이터)
    - [ ] 무게 `<Input>` (숫자)
    - [ ] 반복 `<Input>` (숫자)
    - [ ] 완료 체크 버튼 (클릭 시 해당 행 `bg-teal-50 border-l-2 border-teal-500`)
  - [ ] "Add Set" 버튼 → `sets` state에 새 행 push
- [ ] 하단 고정 "Complete Workout" 버튼 (CLIENT)
  - [ ] 클릭 시 **`canvas-confetti` 폭죽 실행** (`confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })`)
  - [ ] 클릭 시 `<Dialog>` 열림
  - [ ] Dialog 상단: 운동 요약 (총 볼륨 / 완료 운동 수)
  - [ ] Dialog 중앙: **운동 시간 수동 입력 섹션**
    - [ ] "오늘 운동은 얼마나 했나요?" 레이블
    - [ ] **퀵 버튼 행**: "15분" / "30분" / "60분" / "90분" — 클릭 시 `durationMinutes` state 세팅, 선택된 버튼 `bg-teal-600 text-white`
    - [ ] `<Input type="number" placeholder="직접 입력 (분)">` — 퀵 버튼과 양방향 동기화
  - [ ] Dialog: **사진 업로드 섹션** (운동 인증샷)
    - [ ] "운동 사진 추가 (선택)" 레이블 + 카메라 아이콘 업로드 버튼
    - [ ] `<input type="file" accept="image/*" capture="environment">` — 모바일에서 카메라/갤러리 선택 가능
    - [ ] 선택 시 `URL.createObjectURL(file)`로 미리보기 썸네일 표시
    - [ ] 선택 취소(×) 버튼으로 사진 제거
  - [ ] Dialog 하단: `<WorkoutShareCard>` 미리보기 (업로드한 사진 반영)
  - [ ] "Save & Share" 버튼 (장식)
  - [ ] "Done" 버튼 → `/history` 이동
- [ ] `WorkoutShareCard.tsx` (CLIENT, `components/shared/`)
  - [ ] `photoUrl?: string` prop 수신
  - [ ] **사진 있을 때**: 카드 상단 1/3 영역에 `<img>` `object-cover` 배치, 하단 2/3에 운동 데이터
  - [ ] **사진 없을 때**: 기존 `card-gradient` 전체 배경 유지
  - [ ] 비율 전환 토글 — "1:1" / "4:5" 버튼, `ratio` state로 `aspect-square` ↔ `aspect-[4/5]` 전환
  - [ ] 좌상단 Snapmove 로고 (`text-white`)
  - [ ] 날짜 표시 (크게, `text-white font-bold`)
  - [ ] 운동 목록 + 각 볼륨 (`text-white` — 불투명도 변형 사용 금지, 대비율 유지)
  - [ ] 하단 "Total Volume" + 수동 입력한 운동 시간 통계 (`text-white font-bold`)
  - [ ] Download 버튼 — html2canvas로 카드 PNG 저장 (실제 구현)
  - [ ] Share 버튼 (`border-white/50 text-white hover:bg-white/10`, 아웃라인, 장식)

### 검증 체크리스트

- [ ] `/workout/1` 접속 시 풀스크린 레이아웃 (BottomNav 없음)
- [ ] 헤더에 타이머 없음 확인
- [ ] 이전/다음 화살표로 운동 전환, Progress 바 업데이트
- [ ] 세트 체크 버튼 클릭 시 해당 행 초록 강조
- [ ] "Add Set" 클릭 시 새 세트 행 추가
- [ ] "×" 닫기 버튼 → 확인 다이얼로그 표시
- [ ] "Complete Workout" 클릭 → confetti 폭죽 실행 확인
- [ ] 완료 다이얼로그 열림 + 퀵 버튼(15m/30m/60m/90m) 표시
- [ ] 퀵 버튼 클릭 시 입력 필드 값 동기화 + 선택 버튼 강조
- [ ] 직접 입력 시 퀵 버튼 선택 해제
- [ ] 완료 다이얼로그: 사진 업로드 버튼 표시 확인
- [ ] 사진 선택 시 썸네일 미리보기 표시
- [ ] 사진 있을 때 WorkoutShareCard 상단에 사진 반영 확인
- [ ] 사진 없을 때 card-gradient 배경 유지 확인
- [ ] WorkoutShareCard "1:1" / "4:5" 토글 버튼 클릭 시 비율 전환
- [ ] "Done" 클릭 시 `/history` 이동
- [ ] 모바일(375px) — 세트 입력 행 가로 스크롤 없음

---

## - [ ] Phase 5: 히스토리 페이지 & 마무리 폴리시

### 개요
달력 뷰 기반 히스토리 페이지를 구현한다. 상단 캘린더 그리드에서 운동한 날을 한눈에 파악하고, 날짜를 선택하면 하단 패널에 해당 날의 운동 기록이 표시된다. Phase 4의 `WorkoutShareCard`를 재사용.

> **실제 구현 범위**: 로그인 유저의 `workout_logs`를 SELECT해서 달력과 상세 패널에 표시
>
> **SELECT 쿼리:**
> ```ts
> supabase
>   .from('workout_logs')
>   .select('*')
>   .eq('user_id', user.id)
>   .gte('date', firstDayOfMonth)
>   .lte('date', lastDayOfMonth)
>   .order('date', { ascending: false })
> ```

### 파일 구조

```
src/
├── app/
│   └── (app)/
│       └── history/
│           ├── page.tsx              # SERVER wrapper
│           └── loading.tsx
└── components/
    └── history/
        ├── HistoryCalendar.tsx       # CLIENT — 캘린더 그리드 + 날짜 선택
        ├── HistoryDayPanel.tsx       # CLIENT — 선택 날짜 운동 목록
        └── HistoryCard.tsx           # SERVER
```

### 구현 체크리스트

**히스토리 페이지 (`/history`)**

- [ ] `page.tsx` — TopBar("운동 기록") + `<HistoryCalendar sessions={MOCK_SESSIONS} />` (SERVER wrapper)
- [ ] `HistoryCalendar.tsx` (CLIENT)
  - [ ] `currentMonth`, `selectedDate` state (기본값: 현재 년월, 선택 없음)
  - [ ] 헤더: `←` / `→` 월 이동 버튼 + "2026년 4월" 형식 표시
  - [ ] **7열 CSS grid** 캘린더 그리드
    - [ ] 요일 헤더 행: 일/월/화/수/목/금/토 (`text-xs text-gray-400`)
    - [ ] 날짜 셀: 날짜 숫자 표시
    - [ ] 운동 있는 날: 날짜 숫자 아래 `w-1.5 h-1.5 bg-teal-500 rounded-full` dot 표시
    - [ ] 선택된 날: `bg-teal-600 text-white rounded-full` 강조
    - [ ] 오늘 날짜: `font-bold text-teal-700` (선택 안 된 상태)
  - [ ] 날짜 클릭 → `selectedDate` 업데이트
  - [ ] `getMockSessionsByMonth(year, month)`으로 해당 월 세션 조회
- [ ] `HistoryDayPanel.tsx` (CLIENT)
  - [ ] `selectedDate`가 없으면: "날짜를 선택하면 기록을 볼 수 있어요" 안내 (`EmptyState` 변형)
  - [ ] 선택한 날에 세션 있으면: 날짜 헤더 ("4월 14일 월요일") + `HistoryCard` 목록
  - [ ] 선택한 날에 세션 없으면: `<EmptyState>` ("이 날은 기록된 운동이 없어요")
- [ ] `HistoryCard.tsx` (SERVER)
  - [ ] 루틴 이름 + 소요 시간 칩
  - [ ] 총 볼륨 배지 ("4,320 kg total")
  - [ ] 운동 요약 "5 exercises · 18 sets"
  - [ ] `MuscleGroupBadge` 행
  - [ ] "View Card" 버튼 → `WorkoutShareCard` Dialog (CLIENT island)
- [ ] `loading.tsx` — 캘린더 그리드 스켈레톤 + 3개 히스토리 카드 스켈레톤

**마무리 폴리시**

- [ ] 모든 `loading.tsx` 파일 존재 확인 (routines / routines/[id] / history)
- [ ] `/workout/[id]/loading.tsx` 불필요 확인 (전체 CLIENT라 제외)
- [ ] BottomNav "Dashboard" / "Routines" / "History" 탭 활성 강조 확인
- [ ] 전체 페이지 라이트 모드 색상 일관성 점검 (흰색 배경, teal-50 교체 섹션)
- [ ] `MuscleGroupBadge` 색상이 모든 페이지에서 동일하게 표시되는지 확인
- [ ] 모든 Shadcn 컴포넌트 라이트 테마 가독성 확인 (버튼·인풋·다이얼로그·드로어 teal 적용 여부)

### 검증 체크리스트

- [ ] `/history` 접속 시 캘린더 그리드 정상 렌더링
- [ ] 운동 있는 날에 teal dot 표시 확인
- [ ] 날짜 클릭 시 선택 강조 + 하단 패널 업데이트
- [ ] 운동 없는 날 클릭 시 EmptyState 표시
- [ ] 선택 없는 초기 상태에서 안내 메시지 표시
- [ ] 월 이동 화살표 클릭 시 캘린더 월 변경
- [ ] BottomNav "History" 탭 활성 강조 확인
- [ ] "View Card" 클릭 시 `WorkoutShareCard` Dialog 열림
- [ ] 공유 카드 내 1:1 / 4:5 비율 전환 동작 확인
- [ ] **전체 흐름 E2E 테스트**: `/` → `/signup` → `/dashboard` → `/routines` → `/routines/1` → `/workout/1` → `/history`
- [ ] 모바일(375px) 전 페이지 레이아웃 이상 없음
- [ ] `npm run build` 오류 없이 통과
- [ ] TypeScript 타입 오류 없음

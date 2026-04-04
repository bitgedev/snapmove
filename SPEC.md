# Snapmove — 실행 계획 (SPEC)

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| **기술 스택** | Next.js 14+ App Router, TypeScript, Tailwind CSS, Shadcn UI |
| **제약 조건** | DB 없음, mock 데이터, 기능 구현 없이 UI만 제작 |
| **디자인 방향** | 라이트 모드, 연한 민트(teal) 단일 계열, 흰색 + teal-50 교차 배경, 보조 강조색 없음, 모바일 퍼스트 |
| **컴포넌트 원칙** | Server Component 우선, Client Component는 상태·인터랙션 필요 시만 |

## 라우트 구조

| 페이지 | 경로 | 설명 |
|---|---|---|
| 랜딩 | `/` | 서비스 소개, CTA |
| 로그인 | `/login` | 이메일 로그인 |
| 회원가입 | `/signup` | 이메일 회원가입 |
| 루틴 목록 | `/routines` | 루틴 카드 그리드 |
| 루틴 상세 | `/routines/[id]` | 운동 목록, 운동 시작 버튼 |
| 운동 실행 | `/workout/[id]` | 세트별 입력, 완료 카드 |
| 히스토리 | `/history` | 날짜별 운동 기록 |

---

## - [ ] Phase 1: 프로젝트 초기 세팅 & 기반 구조

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
npx shadcn@latest add button card badge input label separator avatar progress dialog tabs skeleton dropdown-menu form checkbox

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

- [ ] `create-next-app` 실행 완료 (`PRD.md` 보존 확인)
- [ ] Shadcn `init` 완료, `components.json` 생성 확인
- [ ] Shadcn 컴포넌트 13종 설치 완료
- [ ] `src/types/index.ts` 작성
  - [ ] `MuscleGroup` 타입: `"chest" | "back" | "shoulders" | "arms" | "legs" | "core" | "cardio" | "full-body"`
  - [ ] `Exercise` 인터페이스
  - [ ] `Routine` 인터페이스
  - [ ] `SetRecord` 인터페이스
  - [ ] `ExerciseRecord` 인터페이스
  - [ ] `WorkoutSession` 인터페이스
- [ ] `src/lib/mock-data.ts` 작성
  - [ ] `MOCK_ROUTINES` — Push Day / Pull Day / Leg Day / Core&Cardio 4개 루틴, 각 4~5개 운동
  - [ ] `MOCK_SESSIONS` — 최근 30일 내 8개 완료 세션
  - [ ] `getMockRoutineById(id: string)` 헬퍼 함수
  - [ ] `getMockSessionsByMonth(year: number, month: number)` 헬퍼 함수
- [ ] `tailwind.config.ts` 커스터마이징 — 전체 컬러 시스템
  - [ ] **브랜드 색상 (연한 민트 계층)**
    - [ ] `brand.bg: "#F0FDFA"` — `teal-50` — 섹션 교체 배경 (가장 연한 민트)
    - [ ] `brand.border: "#CCFBF1"` — `teal-100` — 카드 테두리, 구분선
    - [ ] `brand.icon: "#5EEAD4"` — `teal-300` — **장식 전용** 아이콘/도형 (대비율 낮아 정보 전달 불가, 의미 있는 아이콘은 teal-600 사용)
    - [ ] `brand.DEFAULT: "#14B8A6"` — `teal-500` — 칩, 비인터랙티브 장식 강조 (텍스트/Progress 바에는 사용 금지 — 대비율 2.4:1)
    - [ ] `brand.button: "#0D9488"` — `teal-600` — CTA 버튼, 활성 탭, 정보성 아이콘, Progress 바 (흰색 텍스트 대비율 ~3.9:1, 대형/굵은 텍스트 AA 통과)
    - [ ] `brand.hover: "#0F766E"` — `teal-700` — 버튼 hover
    - [ ] ※ 보조 강조색 없음 — 민트 단일 계열로 통일
  - [ ] **배경 시스템**
    - [ ] 페이지: `bg-white`
    - [ ] 대체 섹션: `bg-teal-50` (연한 민트, 흰색과 자연스러운 교차)
    - [ ] 카드: `bg-white border border-teal-100 shadow-sm`
    - [ ] Footer: `bg-teal-800` (다크 민트, 흰색 텍스트)
  - [ ] **그라디언트**
    - [ ] `hero-gradient`: `from-teal-50 via-white to-teal-50`
    - [ ] `mint-gradient`: `from-teal-700 to-teal-600` — CTA 섹션 배경 (흰색 텍스트 대비율 확보: teal-700 기준 ~6.2:1 ✅)
    - [ ] `card-gradient`: `from-teal-700 to-teal-600` — WorkoutShareCard 전용 (모든 텍스트 `text-white` 사용 가능, 대비율 확보)
- [ ] `src/app/globals.css` — Shadcn CSS 변수 재매핑
  - [ ] `--primary: 173 80% 40%` → teal-600 HSL 값으로 설정 (Shadcn Button이 brand 색상 따라가도록)
  - [ ] `--primary-foreground: 0 0% 100%` → 흰색 유지
  - [ ] `--ring: 173 80% 40%` → 포커스 링도 teal 계열로
- [ ] `src/app/layout.tsx` — `<html lang="ko">` (dark 클래스 없음), Geist Sans 폰트 적용
- [ ] `src/components/shared/MuscleGroupBadge.tsx` (SERVER)
  - [ ] chest: `bg-red-100 text-red-700` — 강함/파워
  - [ ] back: `bg-blue-100 text-blue-700` — 넓이/안정 (틸과 충분히 구분되는 순수 파랑)
  - [ ] shoulders: `bg-violet-100 text-violet-700` — 독립적인 보라
  - [ ] arms: `bg-rose-100 text-rose-700` — 핑크-레드 계열
  - [ ] legs: `bg-amber-100 text-amber-700` — 따뜻한 앰버 (배지 전용, 브랜드 색과 무관)
  - [ ] core: `bg-green-100 text-green-700` — 초록 (틸과 색조 다름, 파란 기운 없는 순수 초록)
  - [ ] cardio: `bg-pink-100 text-pink-700` — 심박/에너지
  - [ ] full-body: `bg-slate-100 text-slate-600` — 중립/포괄
- [ ] `src/components/shared/StatBadge.tsx` — sets×reps 표시 배지 (SERVER)
- [ ] `src/components/shared/EmptyState.tsx` — 빈 상태 플레이스홀더 with CTA (SERVER)
- [ ] `src/components/layout/BottomNav.tsx` (CLIENT)
  - [ ] `usePathname()`으로 활성 탭 강조
  - [ ] 탭 구성: Routines(Dumbbell) / History(Clock) / Profile(User, 장식)
  - [ ] `/workout` 경로 진입 시 자동 숨김
- [ ] `src/components/layout/TopBar.tsx` (CLIENT)
  - [ ] `useRouter()`로 뒤로가기 버튼
  - [ ] `title` prop 지원
  - [ ] 우측 액션 slot 지원
- [ ] `src/app/(app)/layout.tsx` (SERVER wrapper)
  - [ ] `<main className="flex-1 pb-20">{children}</main>`
  - [ ] `<BottomNav />` 포함

### 검증 체크리스트

- [ ] `npm run dev` 오류 없이 실행
- [ ] `http://localhost:3000` 접속 시 페이지 렌더링 확인 (빈 상태 OK)
- [ ] `src/components/ui/` 폴더에 Shadcn 파일 존재 확인
- [ ] 라이트 배경(`bg-white`) 적용 확인
- [ ] Geist 폰트 적용 확인
- [ ] TypeScript 타입 오류 없음 (`npm run build`)

---

## - [ ] Phase 2: 랜딩 & 인증 페이지

### 개요
서비스 진입점인 랜딩 페이지(`/`)와 인증 페이지(`/login`, `/signup`)를 구현한다. Phase 1 완료 후 진행. 랜딩 페이지는 전체 Server Component, 인증 폼은 상태 관리가 필요하므로 Client Component. 실제 인증 없음 — 제출 시 1.5초 로딩 → `/routines` 이동.

### 파일 구조

```
src/
├── app/
│   ├── page.tsx                  # 랜딩 (/)
│   ├── login/
│   │   └── page.tsx              # 로그인
│   └── signup/
│       └── page.tsx              # 회원가입
└── components/
    ├── landing/
    │   ├── LandingNav.tsx        # SERVER
    │   ├── HeroSection.tsx       # SERVER
    │   └── FeaturesSection.tsx   # SERVER
    └── auth/
        ├── LoginForm.tsx         # CLIENT
        └── SignupForm.tsx        # CLIENT
```

### 구현 체크리스트

**랜딩 페이지 (`/`)**

- [ ] `LandingNav.tsx` (SERVER)
  - [ ] 로고 좌측 (`text-teal-700 font-bold`)
  - [ ] Login 고스트 버튼 — `text-teal-700 border-teal-200 hover:bg-teal-50`
  - [ ] Get Started 솔리드 버튼 — `bg-teal-600 text-white hover:bg-teal-700`
- [ ] `HeroSection.tsx` (SERVER)
  - [ ] 헤드라인: "Track your grind. Share your gains." (틸 강조 텍스트)
  - [ ] 서브텍스트
  - [ ] CTA1: "Get Started" → `/signup` (틸 솔리드 버튼)
  - [ ] CTA2: "See Demo" → `/routines` (틸 아웃라인 버튼)
  - [ ] 배경: `bg-hero-gradient` (연한 민트→흰색→연한 민트 그라디언트)
- [ ] 통계 스트립 (SERVER) — `bg-white` 배경, 아이콘 `text-teal-500`, 수치 `text-gray-900 font-bold`, 레이블 `text-gray-500`
  - [ ] "2,400+ routines logged"
  - [ ] "98% completion rate"
  - [ ] "10K+ cards shared"
- [ ] `FeaturesSection.tsx` — 3열 카드 그리드 (SERVER)
  - [ ] 루틴 빌더 카드 (Dumbbell 아이콘)
  - [ ] 운동 트래커 카드 (Timer 아이콘)
  - [ ] 인스타 카드 생성기 카드 (Share2 아이콘)
- [ ] How It Works 섹션 — 3단계 번호 흐름 (SERVER)
- [ ] 하단 CTA 배너 — `mint-gradient` (`from-teal-700 to-teal-600`) 배경, `text-white`, 흰색 아웃라인 버튼 (SERVER)
- [ ] Footer — `bg-teal-900` 배경, `text-white`, 로고/저작권/링크 (SERVER)

**로그인 페이지 (`/login`)**

- [ ] 전체 화면 중앙 정렬 카드 레이아웃
- [ ] `LoginForm.tsx` (CLIENT)
  - [ ] 이메일 `<Input>` + `<Label>`
  - [ ] 비밀번호 `<Input type="password">` + Eye/EyeOff 표시 토글
  - [ ] "Forgot password?" 링크 (장식)
  - [ ] 제출 버튼 — `isLoading` state → 스피너 → 1.5초 후 `/routines` push
- [ ] "Don't have an account? Sign up" → `/signup` 링크

**회원가입 페이지 (`/signup`)**

- [ ] 전체 화면 중앙 정렬 카드 레이아웃
- [ ] `SignupForm.tsx` (CLIENT)
  - [ ] 이름 `<Input>`
  - [ ] 이메일 `<Input>`
  - [ ] 비밀번호 `<Input>` + 강도 표시 바 (길이 기반: red → yellow → green)
  - [ ] 비밀번호 확인 `<Input>`
  - [ ] 약관 동의 `<Checkbox>` + 레이블
  - [ ] 제출 버튼 — 1.5초 로딩 → `/routines` push
- [ ] "Already have an account? Log in" → `/login` 링크

### 검증 체크리스트

- [ ] `/` 랜딩 페이지 정상 렌더링
- [ ] 랜딩 페이지 모바일(375px) 레이아웃 이상 없음
- [ ] `/login` 카드 중앙 정렬 확인
- [ ] 로그인 폼: 비밀번호 표시/숨김 토글 동작
- [ ] 로그인 폼: 제출 → 로딩 스피너 → `/routines` 이동
- [ ] `/signup` 카드 중앙 정렬 확인
- [ ] 회원가입 폼: 비밀번호 입력 시 강도 바 색상 변화
- [ ] 회원가입 폼: 제출 → 로딩 → `/routines` 이동
- [ ] `/` ↔ `/login` ↔ `/signup` 링크 이동 정상

---

## - [ ] Phase 3: 루틴 페이지 (목록 & 상세)

### 개요
운동 루틴을 탐색/관리하는 두 페이지를 구현한다. `(app)` 라우트 그룹 안에 위치해 Phase 1의 BottomNav, TopBar가 자동 적용된다. `getMockRoutineById(id)`로 동적 라우트 mock 데이터를 조회한다.

### 파일 구조

```
src/
├── app/
│   └── (app)/
│       └── routines/
│           ├── page.tsx            # 루틴 목록 (SERVER)
│           ├── loading.tsx
│           └── [id]/
│               ├── page.tsx        # 루틴 상세 (SERVER)
│               └── loading.tsx
└── components/
    └── routines/
        ├── RoutineCard.tsx         # SERVER
        ├── RoutineGrid.tsx         # SERVER
        ├── RoutineFilterTabs.tsx   # CLIENT
        ├── AddRoutineButton.tsx    # CLIENT
        ├── AddExerciseButton.tsx   # CLIENT
        └── ExerciseListItem.tsx    # SERVER
```

### 구현 체크리스트

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
- [ ] `AddRoutineButton.tsx` (CLIENT)
  - [ ] 화면 우하단 FAB "+" 버튼
  - [ ] 클릭 시 Shadcn `<Dialog>` 열림
  - [ ] Dialog: 루틴 이름 `<Input>` + 취소/생성 버튼 (실제 동작 없음)
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
  - [ ] 운동 이름 + `MuscleGroupBadge`
  - [ ] 세트×반복×무게: "4 × 10 @ 60 kg" 형식
  - [ ] 휴식 시간 칩
  - [ ] 드래그 핸들 아이콘 (장식)
  - [ ] 우측 삭제 버튼 (X 아이콘, 장식)
  - [ ] `<Separator>`로 항목 구분
- [ ] `AddExerciseButton.tsx` (CLIENT)
  - [ ] 운동 목록 하단 "운동 추가 +" 버튼
  - [ ] 클릭 시 `<Dialog>` 열림
  - [ ] Dialog: 운동 이름 / 세트 수 / 횟수 / 무게 / 휴식 시간 `<Input>` + 취소/추가 버튼 (실제 동작 없음)
- [ ] 하단 고정 "Start Workout" 버튼 (CLIENT, fixed position) → `<Link href="/workout/[id]">`
- [ ] `loading.tsx` — 통계 스켈레톤 + 4개 운동 행 스켈레톤

### 검증 체크리스트

- [ ] `/routines` 접속 시 4개 루틴 카드 렌더링
- [ ] BottomNav "Routines" 탭 활성 강조 확인
- [ ] 필터 탭 클릭 시 탭 전환 (UI 변화만)
- [ ] "+" FAB 클릭 시 Dialog 열림/닫힘
- [ ] 루틴 카드 클릭 시 `/routines/[id]` 이동
- [ ] `/routines/1` 접속 시 루틴 상세 정상 렌더링
- [ ] `/routines/999` 접속 시 404 페이지
- [ ] 케밥 메뉴 클릭 시 DropdownMenu 표시
- [ ] `ExerciseListItem` 우측 삭제(X) 버튼 렌더링 확인
- [ ] "운동 추가 +" 버튼 클릭 시 Dialog 열림/닫힘 확인
- [ ] "Start Workout" 버튼 클릭 시 `/workout/1` 이동
- [ ] TopBar 뒤로가기 버튼 클릭 시 `/routines` 이동
- [ ] 모바일(375px) — 카드 2열, BottomNav 정상

---

## - [ ] Phase 4: 운동 실행 페이지

### 개요
운동 기록의 핵심 인터랙션 페이지. `(app)` 그룹 **밖**에 위치해 BottomNav 없이 풀스크린으로 표시된다. 타이머·세트 입력·운동 네비게이션 모두 Client Component 상태로 관리. 완료 시 인스타그램 공유 카드 미리보기 다이얼로그 표시.

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
  - [ ] **헤더 바**
    - [ ] "×" 닫기 버튼 → 확인 Dialog ("운동을 종료하시겠습니까?") → `/routines` 이동
    - [ ] 루틴 이름 중앙 표시
    - [ ] 경과 타이머 우측 (`setInterval` 1초마다 증가, "mm:ss" 포맷)
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
  - [ ] 클릭 시 `<Dialog>` 열림
  - [ ] Dialog: 운동 요약 (경과 시간 / 총 볼륨 / 완료 운동 수)
  - [ ] Dialog: `<WorkoutShareCard>` 미리보기
  - [ ] "Save & Share" 버튼 (장식)
  - [ ] "Done" 버튼 → `/history` 이동
- [ ] `WorkoutShareCard.tsx` (CLIENT, `components/shared/`)
  - [ ] 비율 전환 토글 — "1:1" / "4:5" 버튼, `ratio` state로 `aspect-square` ↔ `aspect-[4/5]` 전환
  - [ ] `card-gradient` 배경 (`from-teal-700 to-teal-600`, 흰색 텍스트 대비 충분히 확보)
  - [ ] 좌상단 Snapmove 로고 (`text-white`)
  - [ ] 날짜 표시 (크게, `text-white font-bold`)
  - [ ] 운동 목록 + 각 볼륨 (`text-white` — 불투명도 변형 사용 금지, 대비율 유지)
  - [ ] 하단 "Total Volume" 통계 (`text-white font-bold`)
  - [ ] Download / Share 버튼 (`border-white/50 text-white hover:bg-white/10`, 아웃라인, 장식)

### 검증 체크리스트

- [ ] `/workout/1` 접속 시 풀스크린 레이아웃 (BottomNav 없음)
- [ ] 페이지 진입 즉시 타이머 카운트업 시작
- [ ] 이전/다음 화살표로 운동 전환, Progress 바 업데이트
- [ ] 세트 체크 버튼 클릭 시 해당 행 초록 강조
- [ ] "Add Set" 클릭 시 새 세트 행 추가
- [ ] "×" 닫기 버튼 → 확인 다이얼로그 표시
- [ ] "Complete Workout" 클릭 → 완료 다이얼로그 + 공유 카드 표시
- [ ] WorkoutShareCard "1:1" / "4:5" 토글 버튼 클릭 시 비율 전환
- [ ] "Done" 클릭 시 `/history` 이동
- [ ] 모바일(375px) — 세트 입력 행 가로 스크롤 없음

---

## - [ ] Phase 5: 히스토리 페이지 & 마무리 폴리시

### 개요
날짜별 운동 기록 히스토리 페이지를 구현하고, Phase 4의 `WorkoutShareCard`를 재사용해 과거 운동의 공유 카드를 볼 수 있게 한다. 완료 후 전체 앱 loading 상태, 반응형 레이아웃, 시각적 일관성을 최종 점검한다.

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
        ├── HistoryList.tsx           # CLIENT — 월 필터링
        └── HistoryCard.tsx           # SERVER
```

### 구현 체크리스트

**히스토리 페이지 (`/history`)**

- [ ] `page.tsx` — TopBar("Workout History") + `<HistoryList />` (SERVER wrapper)
- [ ] `HistoryList.tsx` (CLIENT)
  - [ ] `currentMonth` state (기본값: 현재 년월)
  - [ ] 좌/우 화살표로 월 이동, "April 2026" 형식 표시
  - [ ] `getMockSessionsByMonth(year, month)` 호출로 해당 월 세션 필터링
  - [ ] 날짜별 그룹 헤더 ("Monday, April 1") + `HistoryCard` 목록
  - [ ] 세션 없는 월 → `<EmptyState />` 표시
- [ ] `HistoryCard.tsx` (SERVER)
  - [ ] 루틴 이름 + 소요 시간 칩
  - [ ] 총 볼륨 배지 ("4,320 kg total")
  - [ ] 운동 요약 "5 exercises · 18 sets"
  - [ ] `MuscleGroupBadge` 행
  - [ ] "View Card" 버튼 → `WorkoutShareCard` Dialog (CLIENT island)
- [ ] `loading.tsx` — 월 선택기 스켈레톤 + 3개 히스토리 카드 스켈레톤

**마무리 폴리시**

- [ ] 모든 `loading.tsx` 파일 존재 확인 (routines / routines/[id] / history)
- [ ] `/workout/[id]/loading.tsx` 불필요 확인 (전체 CLIENT라 제외)
- [ ] BottomNav "History" 탭 활성 강조 확인
- [ ] 전체 페이지 라이트 모드 색상 일관성 점검 (흰색 배경, teal-50 교체 섹션)
- [ ] `MuscleGroupBadge` 색상이 모든 페이지에서 동일하게 표시되는지 확인
- [ ] 모든 Shadcn 컴포넌트 라이트 테마 가독성 확인 (버튼·인풋·다이얼로그 teal 적용 여부)

### 검증 체크리스트

- [ ] `/history` 접속 시 현재 월 세션 렌더링
- [ ] BottomNav "History" 탭 활성 강조 확인
- [ ] 월 이동 화살표 클릭 시 월 변경 + 해당 월 세션 표시
- [ ] 세션 없는 월 이동 시 `EmptyState` 컴포넌트 표시
- [ ] "View Card" 클릭 시 `WorkoutShareCard` Dialog 열림
- [ ] 공유 카드 내 1:1 / 4:5 비율 전환 동작 확인
- [ ] 공유 카드 내 운동 데이터 정상 표시
- [ ] **전체 흐름 E2E 테스트**: `/` → `/signup` → `/routines` → `/routines/1` → `/workout/1` → `/history`
- [ ] 모바일(375px) 전 페이지 레이아웃 이상 없음
- [ ] `npm run build` 오류 없이 통과
- [ ] TypeScript 타입 오류 없음

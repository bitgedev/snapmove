import { test, expect } from '@playwright/test';

// 실제 signup은 Supabase 이메일 인증이 필요하므로
// 회원가입 페이지 진입까지 확인 후 게스트 계정으로 이후 흐름을 검증한다
test('전체 흐름: 랜딩 → 회원가입 → 로그인 → 운동 기록 → 인증 카드 → 캘린더 dot', async ({ page }) => {
  // 1. 랜딩 페이지
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /오늘의 운동을 기록하고/ })).toBeVisible();

  // 2. 회원가입 페이지 진입 확인
  await page.getByRole('link', { name: '무료로 시작하기' }).click();
  await expect(page).toHaveURL(/\/signup/);
  await expect(page.getByRole('button', { name: '회원가입' })).toBeVisible();

  // 3. 게스트 로그인 → 캘린더
  await page.goto('/login');
  await page.getByRole('button', { name: '게스트로 체험하기' }).click();
  await page.waitForURL(/\/calendar/);
  await expect(page.getByText(/이번 달/)).toBeVisible();

  // 4. 운동 페이지
  await page.goto('/workout');
  await expect(page.getByRole('heading', { name: '오늘의 운동' })).toBeVisible();

  // 5. 운동 추가 — 벤치 프레스 선택
  await page.getByRole('button', { name: '운동 추가' }).click();
  await expect(page.getByRole('dialog', { name: '운동 추가' })).toBeVisible();
  await page.getByRole('button', { name: '벤치 프레스 가슴', exact: true }).click();

  // 드로어 닫힌 뒤 ExerciseCard 등장 대기
  await expect(page.getByRole('table')).toBeVisible();

  // 6. 세트 입력 — 1행 무게·횟수
  const setRow = page.getByRole('row').nth(1);
  await setRow.getByRole('textbox').first().fill('60');
  await setRow.getByRole('textbox').last().fill('10');

  // 7. 운동 완료 모달
  await page.getByRole('button', { name: '운동 완료' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('textbox', { name: '시간 직접 입력' }).fill('30');
  await page.getByRole('button', { name: '다음 →' }).click();

  // 8. 인증 카드 페이지
  await page.waitForURL(/\/workout\/complete/);
  await expect(page.getByRole('heading', { name: '인증 카드' })).toBeVisible();

  // 9. 기록 완료 → 캘린더 이동
  await page.getByRole('button', { name: /기록 완료.*캘린더 보기/ }).click();
  await page.waitForURL(/\/calendar/);

  // 10. DB 반영 대기 후 오늘 날짜 dot 확인
  await page.waitForLoadState('networkidle');
  const todayCell = page.locator('.grid > div').filter({
    has: page.locator('.bg-red-500'),
  });
  await expect(todayCell.locator('.bg-brand-button')).not.toHaveClass(/invisible/);
});

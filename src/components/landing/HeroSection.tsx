import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-brand-button/40 bg-brand-dark/50 px-3 py-1 text-sm font-medium text-brand-accent">
          ✨ 2026년 가장 스마트한 운동 기록 앱
        </div>

        <h1 className="text-balance break-keep text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
  오늘의 운동을 기록하고,{' '}
  <br className="hidden md:block" />
  <span className="text-brand-accent">성장을 공유하세요.</span>
</h1>

        <p className="mx-auto mt-8 break-keep max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
          매 세트, 매 반복을 빠짐없이 기록하고 한 번의 탭으로 공유까지.{' '}
          <br className="hidden sm:inline" />
          성장을 추구하는 사람들을 위한 최적의 운동 트래커
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button className="h-12 w-48 bg-brand-button text-lg font-semibold text-white shadow-lg shadow-brand-button/30 transition-all hover:scale-105 hover:bg-brand-hover active:scale-95">
              지금 시작하기
            </Button>
          </Link>
          <Link href="/routines">
            <Button
              variant="outline"
              className="h-12 w-48 border-brand-border text-lg font-semibold text-white text-brand-button hover:text-brand-hover transition-colors hover:scale-105 transition-all active:scale-95"
            >
              서비스 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

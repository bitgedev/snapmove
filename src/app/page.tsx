import Link from 'next/link';
import { Users, CheckCircle, ImageIcon, ClipboardList, PlayCircle, Share2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';

const stats = [
  { icon: Users, value: '2,400+', label: '기록된 루틴' },
  { icon: CheckCircle, value: '98%', label: '완료율' },
  { icon: ImageIcon, value: '10K+', label: '공유된 카드' },
];

const steps = [
  {
    step: '01',
    title: '루틴 만들기',
    description: '원하는 운동을 선택하고 나만의 루틴을 구성하세요.',
    icon: ClipboardList,
  },
  {
    step: '02',
    title: '운동 기록하기',
    description: '세트별로 무게와 횟수를 기록하며 운동을 진행하세요.',
    icon: PlayCircle,
  },
  {
    step: '03',
    title: '성과 공유하기',
    description: '완료 후 자동 생성된 카드로 나의 성과를 공유하세요.',
    icon: Share2,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <LandingNav />

      <main>
        {/* 히어로 섹션 */}
        <HeroSection />

        {/* 통계 스트립 */}
        <section className="relative z-20 -mt-16 px-4">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/50 border border-brand-border/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-brand-bg p-2">
                    <Icon className="size-5 text-brand" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 md:text-2xl">{value}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* How It Works */}
        <section className="bg-slate-50/50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl leading-tight">
                움직임(<span className="text-brand-button">Move</span>)은 뜨겁게, <br className="md:hidden" />
                기록(<span className="text-brand-button">Snap</span>)은 선명하게
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map(({ step, title, description, icon: Icon }) => (
                <div key={step} className="group relative rounded-3xl bg-white p-10 shadow-sm border border-brand-border/50 transition-all hover:shadow-xl hover:-translate-y-1">
                  <span className="absolute right-8 top-6 text-5xl font-black text-slate-50 transition-colors group-hover:text-brand/10">
                    {step}
                  </span>
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-button text-white shadow-lg shadow-brand-button/20">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 배너 */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center relative shadow-2xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-button/20 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                지금 바로 시작하세요
              </h2>
              <p className="mb-10 text-white/70 max-w-lg mx-auto">
                무료로 시작하고 나만의 운동 루틴을 만들어 보세요. <br/>
                당신의 성장은 이미 시작되었습니다.
              </p>
              <Link href="/signup">
                <Button className="h-14 w-52 bg-brand-button text-lg font-bold text-white hover:bg-brand-hover shadow-lg shadow-brand-button/20 transition-all hover:scale-105">
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-4 py-16 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-center gap-1.5">
            <Zap className="size-6 fill-brand-button text-brand-button" />
            <span className="text-2xl font-black tracking-tighter text-gray-900">Snapmove</span>
          </div>
          <div className="mb-8 flex justify-center gap-8 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-brand transition-colors">서비스 소개</Link>
            <Link href="#" className="hover:text-brand transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-brand transition-colors">문의하기</Link>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 Snapmove. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
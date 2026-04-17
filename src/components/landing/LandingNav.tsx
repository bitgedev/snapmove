import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/80 px-4 backdrop-blur-md md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-brand transition-opacity hover:opacity-80"
        >
          Snapmove
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-brand-border text-brand-button hover:bg-brand-bg hover:text-brand-hover transition-colors"
            >
              로그인
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              className="bg-brand-button text-white hover:bg-brand-hover shadow-sm transition-all active:scale-95"
            >
              시작하기
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
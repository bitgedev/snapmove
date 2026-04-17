'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e:React.SubmitEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push('/dashboard'), 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="#" className="text-xs text-brand-button hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-button text-white hover:bg-brand-hover disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            로그인 중...
          </>
        ) : (
          '로그인'
        )}
      </Button>
    </form>
  );
}

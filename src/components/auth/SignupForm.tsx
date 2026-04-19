'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/lib/supabase/client';

function getPasswordStrength(password: string): {
  level: 0 | 1 | 2 | 3;
  label: string;
  color: string;
} {
  if (password.length === 0) return { level: 0, label: '', color: '' };
  if (password.length <= 5) return { level: 1, label: '약함', color: 'bg-red-400' };
  if (password.length <= 9) return { level: 2, label: '보통', color: 'bg-yellow-400' };
  return { level: 3, label: '강함', color: 'bg-green-500' };
}

export default function SignupForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = getPasswordStrength(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const passwordConfirm = formData.get('passwordConfirm') as string;

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push('/calendar');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" type="text" placeholder="홍길동" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" name="email" type="email" placeholder="example@email.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {strength.level > 0 && (
          <div className="space-y-2">
            <div className="h-1 w-full rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${strength.color}`}
                style={{ width: `${(strength.level / 3) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              비밀번호 강도:{' '}
              <span
                className={
                  strength.level === 1
                    ? 'text-red-500'
                    : strength.level === 2
                      ? 'text-yellow-500'
                      : 'text-green-600'
                }
              >
                {strength.label}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-gray-600">
          이용약관 및 개인정보처리방침에 동의합니다
        </Label>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-button text-white hover:bg-brand-hover disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            가입 중...
          </>
        ) : (
          '회원가입'
        )}
      </Button>
    </form>
  );
}

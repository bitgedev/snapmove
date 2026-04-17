import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <Card className="w-full max-w-md border border-brand-border shadow-sm">
        <CardHeader className="pb-2 text-center">
          <p className="text-sm font-bold text-brand-hover">Snapmove</p>
          <CardTitle className="text-xl">로그인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />
          <p className="text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-brand-button hover:underline">
              회원가입
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

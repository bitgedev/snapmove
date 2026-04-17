import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <Card className="w-full max-w-md border border-brand-border shadow-sm">
        <CardHeader className="pb-2 text-center">
          <p className="text-sm font-bold text-brand-hover">Snapmove</p>
          <CardTitle className="text-xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignupForm />
          <p className="text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-brand-button hover:underline">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

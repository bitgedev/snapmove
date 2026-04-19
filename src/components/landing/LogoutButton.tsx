'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      className="border-brand-border text-brand-button hover:bg-brand-bg hover:text-brand-hover transition-colors"
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  );
}

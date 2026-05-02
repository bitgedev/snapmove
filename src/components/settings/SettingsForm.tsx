"use client";

import { useRouter } from "next/navigation";
import TopBar from "../layout/TopBar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? "");
    });
  }, []);
  const handleLogout = () => {
    const supabase = createClient();
    setIsLoading(true);
    supabase.auth.signOut().then(() => {
      router.push("/login");
      router.refresh();
    });
  };
  return (
    <>
      <TopBar title="설정" />
      <div className="divide-y divide-gray-100">
        <section className="px-4 py-6">
          <h2>프로필</h2>
          <div>이메일 | {email}</div>
        </section>
        <section className="px-4 py-6">
          <h2>목표 설정</h2>
          <div>주간 운동 목표 | 4회</div>
          <div>목표 체중 | 60kg</div>
        </section>
        <section className="px-4 py-6">
          <h2>서비스</h2>
          <div>
            <Button onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "로그아웃 중 ..." : "로그아웃"}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

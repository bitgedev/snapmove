"use client";

import { useRouter } from "next/navigation";
import TopBar from "../layout/TopBar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const supabase = createClient();
export default function SettingsForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.is_anonymous) {
        setFullName("게스트");
        setEmail("게스트 체험 계정");
      } else {
        setFullName(user?.user_metadata?.full_name ?? "");
        setEmail(user?.email ?? "");
      }
    });
  }, []);
  const handleLogout = () => {
    setIsLoading(true);
    supabase.auth
      .signOut()
      .then(() => {
        router.push("/login");
        router.refresh();
      })
      .catch(() => {
        setIsLoading(false); //실패 후 복구
        toast.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
      });
  };
  return (
    <>
      <TopBar title="설정" />
      <div className="divide-y">
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">
            프로필
          </h2>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">이름</span>
            <span className="text-foreground">
              {fullName || "불러오는 중..."}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">이메일</span>
            <span className="text-foreground">{email || "불러오는 중..."}</span>
          </div>
        </section>
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">
            목표 설정
          </h2>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">주간 운동 목표</span>
            <span className="text-foreground">4회</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">목표 체중</span>
            <span className="text-foreground">60kg</span>
          </div>
        </section>
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">
            서비스
          </h2>
          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/5"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "로그아웃 중..." : "로그아웃"}
          </Button>
        </section>
      </div>
    </>
  );
}

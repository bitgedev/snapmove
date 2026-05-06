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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? "");
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
      <div className="divide-y divide-gray-100">
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-gray-700">프로필</h2>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">이메일</span>
            <span className="text-gray-900">{email || "불러오는 중..."}</span>
          </div>
        </section>
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-gray-700">
            목표 설정
          </h2>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">주간 운동 목표</span>
            <span className="text-gray-900">4회</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">목표 체중</span>
            <span className="text-gray-900">60kg</span>
          </div>
        </section>
        <section className="px-4 py-6">
          <h2 className="mb-3 text-base font-semibold text-gray-700">서비스</h2>
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-500 hover:bg-red-50"
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

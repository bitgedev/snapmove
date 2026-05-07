"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, Settings } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const calendarActive = pathname.startsWith("/calendar");
  const workoutActive = pathname.startsWith("/workout");
  const settingsActive = pathname.startsWith("/settings");

  return (
    <nav className="fixed bottom-0 left-0 right-0 overflow-visible border-t border-gray-100 bg-white">
      <div className="relative flex h-16 items-center">
        {/* Calendar 탭 */}
        <Link
          href="/calendar"
          className={`flex flex-1 flex-col items-center gap-1 text-xs font-medium ${
            calendarActive ? "text-brand-button" : "text-gray-400"
          }`}
        >
          <CalendarDays className="size-5" />
          캘린더
        </Link>

        {/* 가운데 FAB 공간 */}
        <div className="relative flex flex-1 justify-center">
          <Link
            href="/workout"
            className={`absolute -top-8 flex size-14 items-center justify-center rounded-full shadow-lg transition-colors ${
              workoutActive ? "bg-brand-hover" : "bg-brand-button"
            } text-white`}
          >
            <Dumbbell className="size-6" />
          </Link>
        </div>

        {/* Settings 탭 */}
        <Link
          href="/settings"
          className={`flex flex-1 flex-col items-center gap-1 text-xs font-medium ${
            settingsActive ? "text-brand-button" : "text-gray-400"
          }`}
        >
          <Settings className="size-5" />
          설정
        </Link>
      </div>
    </nav>
  );
}

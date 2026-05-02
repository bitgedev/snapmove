"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
}

export default function TopBar({ title, showBack, rightSlot }: Props) {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center gap-2 border-b border-gray-100 bg-white px-4">
      {showBack && (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
      )}
      <h1 className="flex-1 text-lg font-bold text-gray-900">{title}</h1>
      {rightSlot && <div>{rightSlot}</div>}
    </header>
  );
}

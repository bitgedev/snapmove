"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Clock, User } from "lucide-react";

const tabs = [
  { href: "/routines", label: "Routines", icon: Dumbbell },
  { href: "/history", label: "History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/workout")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center border-t border-gray-100 bg-white">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 text-xs font-medium ${
              active ? "text-teal-600" : "text-gray-400"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

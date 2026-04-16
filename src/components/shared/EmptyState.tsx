import { Inbox } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({ title, description, ctaLabel, ctaHref }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <Inbox className="size-12 text-gray-300" />
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-gray-700">{title}</p>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

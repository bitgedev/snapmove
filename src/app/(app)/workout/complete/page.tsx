"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseRecord } from "@/types";
import TopBar from "@/components/layout/TopBar";
import { Camera, Share2, X } from "lucide-react";

type Preset = "stamp" | "editorial" | "panel";

interface CardSettings {
  preset: Preset;
  showMuscleGroups: boolean;
  showVolume: boolean;
  showDuration: boolean;
}

interface PendingSession {
  exercises: ExerciseRecord[];
  totalVolume: number;
  durationMinutes: number;
  date: number;
}

const MUSCLE_GROUP_LABEL: Record<string, string> = {
  chest: "가슴", back: "등", shoulders: "어깨",
  arms: "팔", legs: "하체", core: "코어", "full-body": "전신",
};

const CATEGORY_LABEL: Record<string, string> = {
  cardio: "유산소", flexibility: "유연성", other: "기타",
};

const DEFAULT_SETTINGS: CardSettings = {
  preset: "stamp",
  showMuscleGroups: true,
  showVolume: true,
  showDuration: true,
};

const PRESETS: Record<Preset, { label: string; cardBg: string }> = {
  stamp:     { label: "스탬프",    cardBg: "bg-zinc-900" },
  editorial: { label: "에디토리얼", cardBg: "bg-zinc-900" },
  panel:     { label: "패널",      cardBg: "bg-zinc-900" },
};

function StampThumb({ active }: { active: boolean }) {
  return (
    <div className={`relative h-10 w-10 rounded-xl bg-zinc-800 transition-all ${active ? "ring-2 ring-brand-button ring-offset-2 scale-110" : "opacity-60"}`}>
      <div className="absolute top-1.5 right-1.5 h-0.5 w-3 rounded bg-white/30" />
      <div className="absolute bottom-2 left-1.5 flex flex-col gap-0.5">
        <div className="h-1 w-7 rounded bg-white/70" />
        <div className="h-0.5 w-4 rounded bg-white/40" />
      </div>
    </div>
  );
}

function EditorialThumb({ active }: { active: boolean }) {
  return (
    <div className={`relative h-10 w-10 rounded-xl bg-zinc-800 transition-all ${active ? "ring-2 ring-brand-button ring-offset-2 scale-110" : "opacity-60"}`}>
      <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5">
        <div className="h-0.5 w-2 rounded bg-white/30" />
        <div className="h-1.5 w-7 rounded bg-white/80" />
        <div className="h-0.5 w-4 rounded bg-white/40" />
      </div>
      <div className="absolute bottom-1.5 left-1.5 right-1.5">
        <div className="h-px bg-white/20 mb-1" />
        <div className="flex justify-between items-end">
          <div className="h-2 w-5 rounded bg-white/70" />
          <div className="h-1 w-2 rounded bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function PanelThumb({ active }: { active: boolean }) {
  return (
    <div className={`relative h-10 w-10 rounded-xl bg-zinc-800 overflow-hidden transition-all ${active ? "ring-2 ring-brand-button ring-offset-2 scale-110" : "opacity-60"}`}>
      <div className="absolute bottom-0 left-0 right-0 h-[18px] bg-white/15 flex flex-col justify-center px-1.5 gap-0.5">
        <div className="flex items-center gap-0.5">
          <div className="h-0.5 w-1.5 rounded bg-white/40" />
          <div className="h-0.5 w-0.5 rounded-full bg-white/25" />
          <div className="h-0.5 w-4 rounded bg-white/60" />
          <div className="h-0.5 w-0.5 rounded-full bg-white/25" />
          <div className="h-0.5 w-2 rounded bg-white/40" />
        </div>
        <div className="flex justify-between">
          <div className="h-0.5 w-3 rounded bg-white/35" />
          <div className="h-0.5 w-2 rounded bg-white/35" />
        </div>
      </div>
    </div>
  );
}

export default function WorkoutCompletePage() {
  const router = useRouter();
  const [session, setSession] = useState<PendingSession | null>(null);
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [settings, setSettings] = useState<CardSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const raw = sessionStorage.getItem("snapmove_pending_session");
    if (!raw) { router.replace("/workout"); return; }
    setSession(JSON.parse(raw));
    const saved = localStorage.getItem("snapmove_card_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CardSettings;
        if (!(parsed.preset in PRESETS)) parsed.preset = DEFAULT_SETTINGS.preset;
        setSettings(parsed);
      } catch {}
    }
  }, [router]);

  useEffect(() => {
    localStorage.setItem("snapmove_card_settings", JSON.stringify(settings));
  }, [settings]);

  const previewUrl = useMemo(() => {
    if (!photoFile) return null;
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!session) return null;

  const { exercises, totalVolume, durationMinutes, date } = session;
  const dateObj = new Date(date);
  const yy = String(dateObj.getFullYear()).slice(2);
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${yy}. ${mm}. ${dd}`;
  const formattedTime = dateObj.toLocaleTimeString("ko-KR", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });

  const tags = Array.from(new Set([
    ...exercises.filter((ex) => ex.muscleGroup).map((ex) => MUSCLE_GROUP_LABEL[ex.muscleGroup!]),
    ...exercises.filter((ex) => ex.category !== "strength").map((ex) => CATEGORY_LABEL[ex.category]).filter(Boolean),
  ]));

  const { preset } = settings;
  const { cardBg } = PRESETS[preset];

  const toggle = (key: keyof Omit<CardSettings, "preset">) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    sessionStorage.removeItem("snapmove_pending_session");
    router.replace("/calendar");
  };

  const tagCls = "rounded-full px-2.5 py-0.5 text-xs font-medium bg-white/15 text-white backdrop-blur-sm";
  const volumeStr = totalVolume > 0 ? totalVolume.toLocaleString() : "—";

  return (
    <>
      <TopBar title="인증 카드" />
      <div className="flex flex-col gap-4 p-4 pb-8">

        {/* 인증 카드 */}
        <div
          className={`relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl ${cardBg}`}
          onClick={() => !photoFile && fileInputRef.current?.click()}
        >
          {previewUrl && (
            <img src={previewUrl} alt="운동 인증 사진" className="absolute inset-0 h-full w-full object-cover" />
          )}

          {/* Gradient overlays — always on */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/65 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {!photoFile && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Camera className="h-5 w-5 text-white/40" />
                </div>
                <p className="text-xs text-white/40">탭해서 사진 추가</p>
              </div>
            </div>
          )}

          {/* ── STAMP preset ── */}
          {preset === "stamp" && (
            <div className="pointer-events-none absolute inset-0">
              {/* Watermark top-right */}
              <div className="absolute top-5 right-5">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/35">Snapmove</span>
              </div>
              {/* Bottom */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2">
                {settings.showMuscleGroups && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => <span key={tag} className={tagCls}>{tag}</span>)}
                  </div>
                )}
                <div className="flex items-end justify-between">
                  {/* Date/time — stamp style, monospace feel */}
                  <div className="flex flex-col">
                    <span className="font-mono text-2xl font-bold leading-none tracking-tight text-white">{formattedDate}</span>
                    <span className="mt-1 font-mono text-sm text-white/55">{formattedTime}</span>
                  </div>
                  {/* Stats right */}
                  <div className="flex flex-col items-end gap-1">
                    {settings.showVolume && totalVolume > 0 && (
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl font-bold text-white">{volumeStr}</span>
                        <span className="text-xs text-white/55">kg</span>
                      </div>
                    )}
                    {settings.showDuration && (
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-semibold text-white">{durationMinutes}</span>
                        <span className="text-xs text-white/55">분</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EDITORIAL preset ── */}
          {preset === "editorial" && (
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
              {/* Top: logo + big date */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/55">Snapmove</span>
                <span className="text-4xl font-bold leading-tight text-white">{formattedDate}</span>
                <span className="text-sm font-medium text-white/60">{formattedTime}</span>
              </div>
              {/* Bottom: tags + volume */}
              <div className="flex flex-col gap-3">
                {settings.showMuscleGroups && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => <span key={tag} className={tagCls}>{tag}</span>)}
                  </div>
                )}
                {(settings.showVolume || settings.showDuration) && (
                  <>
                    <div className="h-px bg-white/15" />
                    <div className="flex items-end justify-between">
                      {settings.showVolume && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-white/55">총 볼륨</span>
                          <span className="text-5xl font-bold leading-none text-white">
                            {volumeStr}
                            {totalVolume > 0 && <span className="ml-1 text-xl font-normal">kg</span>}
                          </span>
                        </div>
                      )}
                      {settings.showDuration && (
                        <div className={`flex flex-col gap-0.5 ${settings.showVolume ? "items-end" : ""}`}>
                          <span className="text-xs text-white/55">소요 시간</span>
                          <span className="text-2xl font-bold text-white">
                            {durationMinutes}
                            <span className="ml-0.5 text-sm font-normal">분</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── PANEL preset ── */}
          {preset === "panel" && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 bg-black/45 p-5 backdrop-blur-md">
                {/* Header: logo · date · time */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Snapmove</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{formattedDate}</span>
                    <span className="text-xs text-white/55">{formattedTime}</span>
                  </div>
                </div>
                {settings.showMuscleGroups && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => <span key={tag} className={tagCls}>{tag}</span>)}
                  </div>
                )}
                {(settings.showVolume || settings.showDuration) && (
                  <div className="flex items-center justify-between">
                    {settings.showVolume ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">{volumeStr}</span>
                        {totalVolume > 0 && <span className="text-xs text-white/55">kg</span>}
                      </div>
                    ) : <span />}
                    {settings.showDuration && (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-white">{durationMinutes}</span>
                        <span className="text-xs text-white/55">분</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {photoFile && (
            <button
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              onClick={(e) => { e.stopPropagation(); setPhotoFile(undefined); }}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) setPhotoFile(e.target.files[0]); }}
          />
        </div>

        {/* 사진 규격 안내 */}
        {!photoFile && (
          <p className="text-center text-xs leading-relaxed text-muted-foreground/60">
            4:5 비율 사진을 권장해요 · JPG / PNG · 최대 10MB
          </p>
        )}

        {/* 설정 패널 */}
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4">

          {/* 레이아웃 프리셋 */}
          <div className="flex items-center justify-around">
            {(["stamp", "editorial", "panel"] as Preset[]).map((p) => (
              <button
                key={p}
                onClick={() => setSettings((prev) => ({ ...prev, preset: p }))}
                className="flex flex-col items-center gap-1.5"
              >
                {p === "stamp"     && <StampThumb     active={settings.preset === p} />}
                {p === "editorial" && <EditorialThumb active={settings.preset === p} />}
                {p === "panel"     && <PanelThumb     active={settings.preset === p} />}
                <span className={`text-xs transition-colors ${settings.preset === p ? "font-semibold text-brand-button" : "text-muted-foreground"}`}>
                  {PRESETS[p].label}
                </span>
              </button>
            ))}
          </div>

          <div className="h-px bg-border" />

          {/* 표시 항목 토글 */}
          <div className="flex flex-col divide-y">
            {([
              { key: "showMuscleGroups", label: "운동 부위" },
              { key: "showVolume",       label: "총 볼륨" },
              { key: "showDuration",     label: "소요 시간" },
            ] as { key: keyof Omit<CardSettings, "preset">; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="flex w-full items-center justify-between py-2.5"
              >
                <span className="text-sm">{label}</span>
                <div className={`relative h-[22px] w-10 rounded-full transition-colors ${settings[key] ? "bg-brand-button" : "bg-muted"}`}>
                  <div className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${settings[key] ? "translate-x-[18px]" : "translate-x-[3px]"}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 액션 버튼 영역 */}
        <div className="flex flex-col gap-4">

          {/* 인증 카드 저장 · 공유 (secondary) */}
          <div className="flex flex-col gap-1.5">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-foreground/30 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-button/40 hover:text-brand-button"
              onClick={() => {}}
            >
              <Share2 className="h-4 w-4" />
              인증 카드 저장 · 공유
            </button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
              오늘의 기록을 SNS에 공유하거나 갤러리에 저장해요
            </p>
          </div>

          {/* 기록 저장 (primary) */}
          <div className="flex flex-col gap-1.5">
            <button
              className="w-full rounded-2xl bg-mint-gradient py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:scale-95"
              onClick={handleSave}
            >
              기록 저장
            </button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
              캘린더에 오늘의 운동이 기록돼요
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

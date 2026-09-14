"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries/en";
import { format } from "@/i18n/format";

type Mode = "light" | "dark" | "system";

const STORAGE_KEY = "dyvix-theme";
const CHANGE_EVENT = "dyvix:theme-change";

/**
 * localStorage is external state, so it is read through useSyncExternalStore
 * rather than mirrored into component state inside an effect. That keeps the
 * render pure, avoids the cascading re-render an effect would cause, and gives
 * a correct server snapshot for free.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // `storage` fires in *other* tabs, keeping the control in sync across them.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Mode {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

/** The server cannot know the visitor's choice; the boot script fixes it up. */
const getServerSnapshot = (): Mode => "system";

function applyMode(mode: Mode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle(
    "dark",
    mode === "dark" || (mode === "system" && prefersDark),
  );
  if (mode === "system") localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, mode);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const NEXT_MODE: Record<Mode, Mode> = { light: "dark", dark: "system", system: "light" };
const ICONS: Record<Mode, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };

export function ThemeToggle({ labels }: { labels: Dictionary["theme"] }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const cycle = useCallback(() => applyMode(NEXT_MODE[mode]), [mode]);

  const Icon = ICONS[mode];
  const label = `${labels[mode]}. ${format(labels.switchTo, { next: labels.names[NEXT_MODE[mode]] })}`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-(--radius-sm) border border-transparent text-ink-muted transition-colors duration-(--duration-fast) hover:border-line hover:text-primary"
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

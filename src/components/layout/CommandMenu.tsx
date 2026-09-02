"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { buildSearchIndex, searchIndex } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "dyvix:open-command-menu";

/** Lets any component open the palette without prop-drilling a setter. */
export function openCommandMenu() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const index = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => searchIndex(index, query), [index, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        restoreFocusRef.current = document.activeElement as HTMLElement;
        setOpen((v) => !v);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset the highlighted row when the query changes. Adjusting state during
  // render is the documented pattern here; an effect would render twice.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActive(0);
  }

  if (!open) return null;

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      // Resolve against the input's live DOM value rather than the `query`
      // state captured by this closure: a paste immediately followed by Enter
      // can deliver the keydown before React has flushed the input change,
      // and acting on the stale result set would open the wrong page.
      const live = searchIndex(index, inputRef.current?.value ?? query);
      const target = live[Math.min(active, live.length - 1)];
      if (target) go(target.href);
    }
  };

  // Precompute where each group starts so the render stays pure.
  const groupStarts = new Set<number>();
  results.forEach((entry, i) => {
    if (i === 0 || entry.group !== results[i - 1]!.group) groupStarts.add(i);
  });

  return (
    <div
      className="fixed inset-0 z-(--z-modal) flex items-start justify-center bg-surface-inverse/45 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search and commands"
        className="w-full max-w-2xl border border-line-strong bg-surface-raised shadow-[0_28px_80px_-32px_rgb(0_0_0/0.6)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search
            size={15}
            strokeWidth={1.75}
            aria-hidden="true"
            className="shrink-0 text-ink-faint"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions, industries and actions…"
            aria-label="Search"
            aria-controls="command-results"
            aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
            role="combobox"
            aria-expanded="true"
            className="h-14 w-full bg-transparent text-(length:--text-base) outline-none placeholder:text-ink-faint"
          />
          <kbd className="rail-label shrink-0">esc</kbd>
        </div>

        <ul
          id="command-results"
          role="listbox"
          aria-label="Results"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-(length:--text-sm) text-ink-faint">
              No match for “{query}”. Try “security”, “cloud” or “assessment”.
            </li>
          )}
          {results.map((entry, i) => {
            const showGroup = groupStarts.has(i);
            return (
              <li key={`${entry.href}-${entry.label}`}>
                {showGroup && (
                  <div className="rail-label px-3 pt-4 pb-1.5 first:pt-1">{entry.group}</div>
                )}
                <button
                  type="button"
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(entry.href)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-(--radius-sm) px-3 py-2.5 text-left text-(length:--text-sm)",
                    i === active ? "bg-surface-sunken text-primary" : "text-ink",
                  )}
                >
                  {entry.label}
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className={cn(i === active ? "opacity-100" : "opacity-0")}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";

import { primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu, openCommandMenu } from "./CommandMenu";

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes everything — without this the panel survives
  // navigation. Adjusted during render rather than in an effect so the open
  // menu never paints for a frame on the new route.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock scroll only while the mobile drawer owns the viewport.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    // The drawer and the command palette are siblings of <header>, not
    // children of it. The header uses backdrop-filter, which makes it a
    // containing block for `position: fixed` descendants — nesting them inside
    // sized the drawer against the 64px header instead of the viewport.
    <>
      <header className="sticky top-0 z-(--z-header) border-b border-line bg-surface/88 backdrop-blur-md">
        <div
          ref={navRef}
          className="mx-auto flex h-16 max-w-(--container-rail) items-center justify-between gap-6 px-(--spacing-gutter)"
        >
          <Logo />

          <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center lg:gap-0.5">
            {primaryNav.map((group) => {
              const active = pathname.startsWith(group.href) && group.href !== "/";
              if (!group.children) {
                return (
                  <Link
                    key={group.href}
                    href={group.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-(--radius-sm) px-3 py-2 text-(length:--text-sm) transition-colors duration-(--duration-fast)",
                      active ? "text-primary" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {group.label}
                  </Link>
                );
              }

              const isOpen = openGroup === group.label;
              const panelId = `menu-${group.label.toLowerCase()}`;
              return (
                <div
                  key={group.href}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-(--radius-sm) px-3 py-2 text-(length:--text-sm) transition-colors duration-(--duration-fast)",
                      active || isOpen ? "text-primary" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-(--duration-fast)",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      className="absolute top-full left-1/2 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 pt-2"
                    >
                      <div className="brackets border border-line bg-surface-raised p-2 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.4)]">
                        <ul className="grid grid-cols-2 gap-0.5">
                          {group.children.map((leaf) => (
                            <li key={leaf.href}>
                              <Link
                                href={leaf.href}
                                className="group/leaf block rounded-(--radius-sm) p-3 transition-colors duration-(--duration-fast) hover:bg-surface-sunken"
                              >
                                <span className="flex items-center gap-2 text-(length:--text-sm) font-medium">
                                  {leaf.label}
                                  <ArrowRight
                                    size={12}
                                    aria-hidden="true"
                                    className="-translate-x-1 opacity-0 transition-all duration-(--duration-fast) group-hover/leaf:translate-x-0 group-hover/leaf:opacity-100"
                                  />
                                </span>
                                {leaf.note && (
                                  <span className="mt-1 block text-(length:--text-sm) leading-snug text-ink-faint">
                                    {leaf.note}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-2 flex items-center justify-between gap-4 border-t border-line px-3 pt-3 pb-1">
                          <Link href={group.href} className="rail-label hover:text-primary">
                            All {group.label} →
                          </Link>
                          {group.feature && (
                            <Link
                              href={group.feature.href}
                              className="text-(length:--text-sm) text-primary hover:underline"
                            >
                              {group.feature.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCommandMenu}
              aria-label="Search — press Command K or Control K"
              className="hidden items-center gap-2 rounded-(--radius-sm) border border-line px-3 py-2 text-(length:--text-sm) text-ink-faint transition-colors duration-(--duration-fast) hover:border-line-strong hover:text-ink md:inline-flex"
            >
              <Search size={13} strokeWidth={1.75} aria-hidden="true" />
              <span>Search</span>
              <kbd className="ml-3 font-mono text-(length:--text-micro) text-ink-faint">⌘K</kbd>
            </button>

            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden min-h-11 items-center rounded-(--radius-sm) border border-primary bg-primary px-4 text-(length:--text-sm) font-medium text-surface transition-colors duration-(--duration-fast) hover:border-ink hover:bg-ink sm:inline-flex dark:hover:bg-ink-inverse dark:hover:text-surface"
            >
              Start a Project
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-(--radius-sm) border border-line text-ink lg:hidden"
            >
              {mobileOpen ? (
                <X size={17} aria-hidden="true" />
              ) : (
                <Menu size={17} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
      <CommandMenu />
    </>
  );
}

/** Full-height drawer. Groups are plain lists — no nested disclosure to fight. */
function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="mobile-nav"
      className="fixed inset-x-0 top-16 bottom-0 z-(--z-overlay) overflow-y-auto overscroll-contain border-t border-line bg-surface lg:hidden"
    >
      <nav aria-label="Mobile navigation" className="px-(--spacing-gutter) py-8">
        {primaryNav.map((group) => (
          <div key={group.href} className="border-b border-line py-5 first:pt-0">
            <Link
              href={group.href}
              onClick={onNavigate}
              className="flex items-center justify-between text-(length:--text-h4) font-semibold"
            >
              {group.label}
              <ArrowRight size={15} aria-hidden="true" className="text-primary" />
            </Link>
            {group.children && (
              <ul className="mt-3 grid gap-0.5">
                {group.children.map((leaf) => (
                  <li key={leaf.href}>
                    <Link
                      href={leaf.href}
                      onClick={onNavigate}
                      className="flex min-h-11 items-center text-(length:--text-sm) text-ink-muted"
                    >
                      {leaf.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-8 grid gap-3">
          <Link
            href="/request-audit"
            onClick={onNavigate}
            className="inline-flex min-h-12 items-center justify-center rounded-(--radius-sm) border border-primary bg-primary px-5 font-medium text-surface"
          >
            Request an Assessment
          </Link>
          <Link
            href="/contact"
            onClick={onNavigate}
            className="inline-flex min-h-12 items-center justify-center rounded-(--radius-sm) border border-line-strong px-5 font-medium"
          >
            Start a Project
          </Link>
        </div>
      </nav>
    </div>
  );
}

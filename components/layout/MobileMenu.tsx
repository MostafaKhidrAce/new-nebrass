"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import type { Category } from "@/lib/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  staticCategories: Category[];
  dynamicCategories: Category[];
};

export function MobileMenu({ open, onClose, staticCategories, dynamicCategories }: MobileMenuProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("drawer-open");
      return;
    }

    document.body.classList.add("drawer-open");
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible pointer-events-none"}`}>
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="إغلاق القائمة"
        onClick={onClose}
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-[82%] max-w-[330px] flex-col bg-chrome text-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-sm font-bold">القائمة</span>
          <button type="button" onClick={onClose} aria-label="إغلاق" className="rounded p-1 hover:opacity-70">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {staticCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              onClick={onClose}
              className="block rounded px-3 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              {category.name}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            className="mt-1 flex w-full items-center justify-between rounded px-3 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            المزيد
            <ChevronDown className={`h-4 w-4 transition ${moreOpen ? "rotate-180" : ""}`} />
          </button>
          {moreOpen && (
            <div className="mb-2 space-y-1 border-r border-white/15 pr-2">
              {dynamicCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  onClick={onClose}
                  className="block rounded px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
}

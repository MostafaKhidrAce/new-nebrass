"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { SiteLogo } from "@/components/shared/SiteLogo";
import type { Category } from "@/lib/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  staticCategories: Category[];
  dynamicCategories: Category[];
};

export function MobileMenu({ open, onClose, staticCategories, dynamicCategories }: MobileMenuProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-navy/50" aria-label="إغلاق القائمة" onClick={onClose} />
      <aside className="absolute inset-y-0 end-0 flex w-[82%] max-w-xs flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <SiteLogo compact />
          <button type="button" onClick={onClose} aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {staticCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              onClick={onClose}
              className="block rounded px-3 py-2 text-sm font-semibold text-navy hover:bg-neutral-50"
            >
              {category.name}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            className="mt-1 flex w-full items-center justify-between rounded px-3 py-2 text-sm font-semibold text-navy hover:bg-neutral-50"
          >
            المزيد
            <ChevronDown className={`h-4 w-4 transition ${moreOpen ? "rotate-180" : ""}`} />
          </button>
          {moreOpen && (
            <div className="mb-2 me-3 space-y-1 border-r border-border pr-2">
              {dynamicCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  onClick={onClose}
                  className="block rounded px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
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

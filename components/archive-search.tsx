"use client";

import { useEffect, useRef, useState } from "react";

export function ArchiveSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <>
    <button ref={triggerRef} className="search-trigger" type="button" aria-haspopup="dialog" aria-controls="archive-search-dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      Search the archive <span aria-hidden="true">⌕</span>
    </button>
    {open && <div className="search-modal-backdrop" role="presentation" onMouseDown={closeModal}>
      <section id="archive-search-dialog" className="search-modal" role="dialog" aria-modal="true" aria-labelledby="archive-search-title" aria-describedby="archive-search-help" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <div className="search-modal-topline">
          <span className="eyebrow">THE ARCHIVE / FIND A TRACE</span>
          <button className="search-modal-close" type="button" aria-label="Close search" onClick={closeModal}>Close ×</button>
        </div>
        <h2 id="archive-search-title">Search the archive</h2>
        <p id="archive-search-help">Search by place, evidence, period or subject.</p>
        <form action="/blog" method="get" className="search-form search-modal-form">
          <label className="sr-only" htmlFor="archive-search">Search stories</label>
          <input ref={inputRef} id="archive-search" type="search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Homo naledi”" autoComplete="off" enterKeyHint="search" />
          <button type="submit">Search archive</button>
        </form>
      </section>
    </div>}
  </>;
}

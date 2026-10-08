"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({ label = "Advertising space" }: { label?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may not be available while the site is being reviewed or in local preview.
    }
  }, [client, slot]);

  if (!client || !slot) {
    return <div className="ad-slot" aria-label={label}><span>{label}</span><small>300 × 250</small></div>;
  }

  return <div className="ad-slot ad-slot-live" aria-label={label}><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></div>;
}

"use client"

import { useEffect } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { linkInteraction } from "@/lib/analytics-events"

export function InteractionAnalytics() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return
    function track(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null
      if (!anchor) return
      const placement = anchor.closest("footer") ? "footer" : anchor.closest("header") ? "header" : anchor.closest("main") ? "main" : "other"
      const interaction = linkInteraction(anchor.getAttribute("href") || "", location.origin, placement)
      if (interaction) sendGAEvent("event", interaction.name, interaction.params)
    }
    document.addEventListener("click", track)
    return () => document.removeEventListener("click", track)
  }, [])
  return null
}

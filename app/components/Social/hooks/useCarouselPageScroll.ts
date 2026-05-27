import { useCallback, useEffect, useRef } from "react";
import type { CarouselApi } from "../../ui/carousel";

/**
 * On mobile, swipe past the first or last carousel slide to
 * scroll the page up or down respectively.
 */
export function useCarouselPageScroll(
  api: CarouselApi | undefined,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartY.current === null || !api) return;

      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      const SWIPE_THRESHOLD = 30;
      const atEnd   = delta >  SWIPE_THRESHOLD && !api.canScrollNext();
      const atStart = delta < -SWIPE_THRESHOLD && !api.canScrollPrev();

      if (atEnd)   window.scrollBy({ top:  window.innerHeight, behavior: "smooth" });
      if (atStart) window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    },
    [api]
  );

  useEffect(() => {
    if (!enabled || !wrapperRef.current) return;
    const el = wrapperRef.current;
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [enabled, wrapperRef, onTouchStart, onTouchEnd]);
}
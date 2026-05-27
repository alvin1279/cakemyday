import { useEffect, useRef } from "react";

const SCROLL_TIMEOUT_MS = 1200;

// --- Global Scroll Lock Manager ---
// Prevents premature unlocking if multiple hooks are active simultaneously.
let lockCount = 0;

function blockScroll(e: Event) {
    e.preventDefault();
}

function lockUserScroll() {
    if (lockCount === 0) {
        window.addEventListener("wheel", blockScroll, { passive: false });
        window.addEventListener("touchmove", blockScroll, { passive: false });
    }
    lockCount++;
}

function unlockUserScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        window.removeEventListener("wheel", blockScroll);
        window.removeEventListener("touchmove", blockScroll);
    }
}
// ----------------------------------

export function useSnapIntoView(targetRef: React.RefObject<HTMLElement | null>) {
    // Tracks if we have already snapped to this section to prevent the "Scroll Trap"
    const hasSnappedRef = useRef(false);

    useEffect(() => {
        let locked = false;
        let rafId = 0;
        let timeoutId: ReturnType<typeof setTimeout>;
        let lastScrollY = window.scrollY;

        function unlock() {
            clearTimeout(timeoutId);
            window.removeEventListener("scrollend", unlock);
            if (locked) {
                unlockUserScroll();
                locked = false;
            }
        }

        function snap(el: HTMLElement) {
            locked = true;
            hasSnappedRef.current = true; // Mark as snapped
            lockUserScroll();
            el.scrollIntoView({ behavior: "smooth", block: "start" });

            timeoutId = setTimeout(unlock, SCROLL_TIMEOUT_MS);
            window.addEventListener("scrollend", unlock);
        }

        function onScroll() {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const el = targetRef.current;
                
                // Moved check inside the event loop so late-mounting refs still work
                if (locked || !el) return;

                const scrollingDown = window.scrollY > lastScrollY;
                lastScrollY = window.scrollY;

                const rect = el.getBoundingClientRect();
                const snapLine = window.innerHeight * 0.6; // 40% up from bottom

                // Reset the snap lock if the user scrolls completely above the element
                // (e.g., the element is pushed down below the snap line)
                if (hasSnappedRef.current && rect.top > snapLine) {
                    hasSnappedRef.current = false;
                }

                if (!scrollingDown) return;

                // Added a 2px buffer to prevent sub-pixel infinite snapping traps
                if (!hasSnappedRef.current && rect.top > 2 && rect.top <= snapLine) {
                    snap(el);
                }
            });
        }

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
            unlock();
        };
    }, [targetRef]); // targetRef object identity won't change, but it correctly binds the effect once
}
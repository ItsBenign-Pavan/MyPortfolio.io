/* ==========================================================
   PROJECTS — STABLE DYNAMIC CAROUSEL
   ========================================================== */

(function () {
    "use strict";

    function initProjectsCarousel() {
        const carousel = document.querySelector("[data-projects-carousel]");
        if (!carousel) return;

        const viewport = carousel.querySelector(".projects-viewport");
        const track = carousel.querySelector(".projects-track");
        const slides = Array.from(carousel.querySelectorAll(".project-slide"));
        const prev = carousel.querySelector("[data-project-prev]");
        const next = carousel.querySelector("[data-project-next]");
        const dots = Array.from(carousel.querySelectorAll("[data-project-dot]"));
        const currentEl = carousel.querySelector("[data-project-current]");
        const totalEl = carousel.querySelector("[data-project-total]");

        if (!viewport || !track || slides.length === 0) return;

        let current = 0;
        let startX = 0;
        let startY = 0;
        let dragging = false;
        let dragDelta = 0;

        if (totalEl) totalEl.textContent = String(slides.length).padStart(2, "0");

        function update(index, animate = true) {
            current = Math.max(0, Math.min(index, slides.length - 1));

            track.style.transitionDuration = animate ? "560ms" : "0ms";

            // Every slide is exactly one viewport wide, so this remains stable
            // regardless of screen size or content height.
            track.style.transform = "translate3d(" + (-current * 100) + "%, 0, 0)";

            slides.forEach((slide, i) => {
                slide.setAttribute("aria-hidden", i === current ? "false" : "true");
            });

            dots.forEach((dot, i) => {
                const active = i === current;
                dot.classList.toggle("is-active", active);
                dot.setAttribute("aria-selected", active ? "true" : "false");
            });

            if (currentEl) currentEl.textContent = String(current + 1).padStart(2, "0");

            if (prev) prev.disabled = current === 0;
            if (next) next.disabled = current === slides.length - 1;
        }

        function goNext() {
            if (current < slides.length - 1) update(current + 1);
        }

        function goPrev() {
            if (current > 0) update(current - 1);
        }

        prev?.addEventListener("click", goPrev);
        next?.addEventListener("click", goNext);

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number(dot.dataset.projectDot);
                if (Number.isFinite(index)) update(index);
            });
        });

        // Keyboard navigation while the carousel is focused/hovered.
        carousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                goNext();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                goPrev();
            }
        });

        // Touch / pointer swipe. This does not hijack page scrolling.
        viewport.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            dragging = true;
            startX = event.clientX;
            startY = event.clientY;
            dragDelta = 0;

            track.style.transitionDuration = "0ms";

            try {
                viewport.setPointerCapture(event.pointerId);
            } catch (_) {}
        });

        viewport.addEventListener("pointermove", (event) => {
            if (!dragging) return;

            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            // If the gesture is primarily vertical, let the page scroll normally.
            if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
                dragging = false;
                track.style.transitionDuration = "560ms";
                return;
            }

            dragDelta = dx;
            const width = viewport.clientWidth || 1;
            const percentage = (dragDelta / width) * 100;
            const base = -current * 100;

            // Small resistance at the ends.
            const resistance = (current === 0 && dragDelta > 0) ||
                               (current === slides.length - 1 && dragDelta < 0)
                ? 0.28
                : 1;

            track.style.transform =
                "translate3d(" + (base + percentage * resistance) + "%, 0, 0)";
        });

        function finishPointer(event) {
            if (!dragging) return;
            dragging = false;

            const width = viewport.clientWidth || 1;
            const threshold = Math.max(45, width * 0.16);

            track.style.transitionDuration = "560ms";

            if (Math.abs(dragDelta) >= threshold) {
                if (dragDelta < 0) goNext();
                else goPrev();
            } else {
                update(current);
            }

            try {
                viewport.releasePointerCapture(event.pointerId);
            } catch (_) {}
        }

        viewport.addEventListener("pointerup", finishPointer);
        viewport.addEventListener("pointercancel", finishPointer);
        viewport.addEventListener("pointerleave", (event) => {
            if (dragging && event.pointerType === "mouse") finishPointer(event);
        });

        // Keep the transform correct if the browser size changes.
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => update(current, false), 120);
        });

        update(0, false);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProjectsCarousel);
    } else {
        initProjectsCarousel();
    }
})();

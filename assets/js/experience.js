/* ==========================================================
   PROFESSIONAL WORK EXPERIENCE — REVEAL
   ========================================================== */

(function () {
    "use strict";

    function initExperienceReveal() {
        const items = document.querySelectorAll(".experience-item");
        if (!items.length) return;

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            items.forEach(item => item.classList.add("is-visible"));
            return;
        }

        if (!("IntersectionObserver" in window)) {
            items.forEach(item => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        items.forEach(item => observer.observe(item));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initExperienceReveal);
    } else {
        initExperienceReveal();
    }
})();

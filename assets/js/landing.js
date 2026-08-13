/* ==========================================================
   PREMIUM LANDING HERO — SUBTLE INTERACTION
   ========================================================== */

(function () {
    "use strict";

    const hero = document.querySelector(".premium-hero");
    const consoleCard = document.getElementById("heroConsole");

    if (!hero || !consoleCard) return;

    // Keep the interaction deliberately subtle — the content remains stable.
    const finePointer = window.matchMedia &&
        window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) return;

    let raf = null;

    hero.addEventListener("pointermove", function (event) {
        if (raf) cancelAnimationFrame(raf);

        raf = requestAnimationFrame(function () {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            const rotateY = x * 2.2;
            const rotateX = y * -1.4;
            const moveX = x * 5;
            const moveY = y * 4;

            consoleCard.style.transform =
                "translate3d(" + moveX + "px," + moveY + "px,0) " +
                "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
        });
    });

    hero.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        consoleCard.style.transform = "";
    });
})();

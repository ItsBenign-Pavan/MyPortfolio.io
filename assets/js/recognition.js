/* ==========================================================
   Professional Recognition Carousel
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".recognition-track");
    const cards = document.querySelectorAll(".recognition-card");
    const slider = document.querySelector(".recognition-slider");
    const prevBtn = document.getElementById("prevRecognition");
    const nextBtn = document.getElementById("nextRecognition");
    const current = document.getElementById("currentRecognition");
    const total = document.getElementById("totalRecognition");
    const progress = document.querySelector(".recognition-progress span");

    if (!track || !slider || !cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let autoSlide = null;

    total.textContent = cards.length;

    function restartProgress() {
        if (!progress) return;
        progress.style.animation = "none";
        void progress.offsetWidth;
        progress.style.animation = "progressBar 6s linear infinite";
    }

    function updateSlider() {
        track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
        if (current) current.textContent = currentIndex + 1;
        restartProgress();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
    }

    function stopAutoSlide() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }

    function startAutoSlide() {
        stopAutoSlide();
        if (cards.length > 1) {
            autoSlide = setInterval(nextSlide, 9000);
        }
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    document.addEventListener("keydown", (e) => {
        if (!document.getElementById("recognition")) return;
        if (e.key === "ArrowRight") {
            nextSlide();
            startAutoSlide();
        } else if (e.key === "ArrowLeft") {
            prevSlide();
            startAutoSlide();
        }
    });

    let touchStartX = 0;

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
        const distance = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(distance) >= 60) {
            distance > 0 ? nextSlide() : prevSlide();
        }
        startAutoSlide();
    }, { passive: true });

    updateSlider();
    startAutoSlide();
});

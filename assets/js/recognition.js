/* ==========================================================
   Professional Recognition Carousel
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".recognition-track");
    const cards = document.querySelectorAll(".recognition-card");

    const prevBtn = document.getElementById("prevRecognition");
    const nextBtn = document.getElementById("nextRecognition");

    const current = document.getElementById("currentRecognition");
    const total = document.getElementById("totalRecognition");

    const progress = document.querySelector(".recognition-progress span");

    let currentIndex = 0;
    let autoSlide;

    total.textContent = cards.length;

    /* ============================= */

    function updateSlider() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        current.textContent = currentIndex + 1;

        restartProgress();

    }

    /* ============================= */

    function nextSlide() {

        currentIndex++;

        if (currentIndex >= cards.length) {

            currentIndex = 0;

        }

        updateSlider();

    }

    /* ============================= */

    function prevSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = cards.length - 1;

        }

        updateSlider();

    }

    /* ============================= */

    // function startAutoSlide() {

    //     setInterval(nextSlide, 15000);

    // }

    // /* ============================= */

    // function stopAutoSlide() {

    //     clearInterval(autoSlide);

    // }

    // /* ============================= */

    // function restartAutoSlide() {

    //     stopAutoSlide();

    //     startAutoSlide();

    // }

    /* ============================= */

    function restartProgress() {

        if (!progress) return;

        progress.style.animation = "none";

        progress.offsetHeight;

        progress.style.animation =
            "progressBar 6s linear infinite";

    }

    /* ============================= */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartAutoSlide();

    });

    prevBtn.addEventListener("click", function () {

        prevSlide();

        restartAutoSlide();

    });

    /* =============================
       Pause on Hover
    ============================== */

    const slider = document.querySelector(".recognition-slider");

    slider.addEventListener("mouseenter", stopAutoSlide);

    slider.addEventListener("mouseleave", startAutoSlide);

    /* =============================
       Keyboard Support
    ============================== */

    document.addEventListener("keydown", function (e) {

        if (e.key === "ArrowRight") {

            nextSlide();

            restartAutoSlide();

        }

        if (e.key === "ArrowLeft") {

            prevSlide();

            restartAutoSlide();

        }

    });

    /* =============================
       Touch Swipe Support
    ============================== */

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", function (e) {

        touchStartX = e.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend", function (e) {

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    });

    function handleSwipe() {

        const distance = touchStartX - touchEndX;

        if (Math.abs(distance) < 60) return;

        if (distance > 0) {

            nextSlide();

        } else {

            prevSlide();

        }

        restartAutoSlide();

    }

    /* ============================= */

    updateSlider();

    startAutoSlide();

});
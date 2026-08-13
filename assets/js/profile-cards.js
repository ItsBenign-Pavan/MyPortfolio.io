document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll("#profiles .profile-card");
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener("pointermove", (event) => {
            if (window.matchMedia("(max-width: 900px)").matches) return;

            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform =
                `translateY(-7px) perspective(900px) rotateX(${(-y * 1.6).toFixed(2)}deg) rotateY(${(x * 1.8).toFixed(2)}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const toast = document.getElementById("cyberToast");
    const closeButton = document.getElementById("toastClose");

    if (!toast) return;

    let timer = setTimeout(hideToast, 7000);

    function hideToast() {
        if (toast.classList.contains("cyber-toast-hiding")) return;
        clearTimeout(timer);
        toast.classList.add("cyber-toast-hiding");

        setTimeout(() => {
            if (toast && toast.parentNode) toast.remove();
        }, 360);
    }

    if (closeButton) {
        closeButton.addEventListener("click", hideToast);
    }
});

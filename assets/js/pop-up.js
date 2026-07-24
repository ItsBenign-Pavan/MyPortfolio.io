const toast = document.getElementById("cyberToast");
const closeBtn = document.getElementById("toastClose");

window.addEventListener("load", () => {

    setTimeout(() => {
        toast.classList.add("show");
    }, 600);

    setTimeout(() => {
        toast.classList.remove("show");
    }, 6000);

});

if (closeBtn) {

    closeBtn.addEventListener("click", () => {
        toast.classList.remove("show");
    });

}
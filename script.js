document.addEventListener("DOMContentLoaded", () => {
    const cookieConsent = getCookie("cookie-consent");
    
    if (cookieConsent === "true") {
        document.getElementById("cookie-consent").style.display = "none";
        document.getElementById("product-list").style.display = "block";
        loadFavorites();
    } else {
        document.getElementById("cookie-consent").style.display = "flex";
    }
});

function acceptCookies() {
    setCookie("cookie-consent", "true", 365);
    document.getElementById("cookie-consent").style.display = "none";
    document.getElementById("product-list").style.display = "block";
    loadFavorites();
}

function declineCookies() {
    alert("Você precisa aceitar os cookies para salvar seus favoritos.");
}

function saveFavorites() {
    const selectedProducts = document.querySelectorAll(".product:checked");
    const favoriteProducts = Array.from(selectedProducts).map(product => product.value);
    setCookie("favorite-products", JSON.stringify(favoriteProducts), 365);
}

function loadFavorites() {
    const favoriteProducts = JSON.parse(getCookie("favorite-products") || "[]");
    const checkboxes = document.querySelectorAll(".product");
    
    checkboxes.forEach(checkbox => {
        if (favoriteProducts.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

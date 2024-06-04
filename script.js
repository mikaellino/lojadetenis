document.addEventListener('DOMContentLoaded', function() {
    // Função para obter um cookie pelo nome
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Função para definir um cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Verifica se o usuário já autorizou o uso de cookies
    let cookie_place = getCookie("cookie_place");

    if (cookie_place !== "accepted") {
        let consentElement = document.getElementById('cookie-consent');
        if (consentElement) {
            consentElement.classList.remove('hidden');
        }
    } else {
        loadFavorites();
    }

    document.getElementById('acceptCookies').addEventListener('click', function() {
        setCookie("cookie_place", "accepted", 365);
        document.getElementById('cookie-consent').classList.add('hidden');
        loadFavorites();
    });

    document.getElementById('declineCookies').addEventListener('click', function() {
        alert("Você precisa aceitar o uso de cookies para salvar suas preferências.");
    });

    document.getElementById('bnt_enviar').addEventListener('click', function() {
        if (getCookie("cookie_place") === "accepted") {
            saveFavorites();
        } else {
            alert("Você precisa aceitar o uso de cookies para salvar suas preferências.");
        }
    });

    function saveFavorites() {
        let checkboxes = document.querySelectorAll('.product:checked');
        let favorites = [];
        checkboxes.forEach(function(checkbox) {
            favorites.push(checkbox.value);
        });
        setCookie("favorites", JSON.stringify(favorites), 365);
        alert("Preferências salvas!");
    }

    function loadFavorites() {
        let favorites = JSON.parse(getCookie("favorites") || "[]");
        let checkboxes = document.querySelectorAll('.product');
        checkboxes.forEach(function(checkbox) {
            if (favorites.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }
});

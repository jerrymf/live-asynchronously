(function () {
    function updateRandomNumber() {
        const request = new XMLHttpRequest();
        request.open("GET", "/math/random", false); // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            updateRandomNumberFromResponse(request.responseText);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        document
            .querySelector("*[data-rel='random-generator']")
            .addEventListener("click", updateRandomNumber);
    });
})();

(function () {
    function updateRandomNumber() {
        sendRequestAsynchronously("/math/random", request => {
            const num = getRandomNumberFromResponse(request.responseText);
            sendRequestAsynchronously(`/math/round?num=${encodeURIComponent(num)}`, request => {
                updateRandomNumberFromResponse(request.responseText);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        document
            .querySelector("*[data-rel='random-generator']")
            .addEventListener("click", updateRandomNumber);
    });
})();

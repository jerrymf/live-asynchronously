(function () {
    function sendRequest(url) {
        return new Promise((resolve, reject) => {
            sendRequestAsynchronously(url, resolve, reject);
        });
    }

    function updateRandomNumber() {
        sendRequest("/math/random")
            .then(request => {
                const num = getRandomNumberFromResponse(request.responseText);
                return sendRequest(`/math/round?num=${encodeURIComponent(num)}`);
            })
            .then(request => updateRandomNumberFromResponse(request.responseText))
            .catch(e => console.error(e));
    }

    document.addEventListener("DOMContentLoaded", function () {
        document
            .querySelector("*[data-rel='random-generator']")
            .addEventListener("click", updateRandomNumber);
    });
})();

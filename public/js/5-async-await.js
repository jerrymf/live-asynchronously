(function () {
    function sendRequest(url) {
        return new Promise((resolve, reject) => {
            sendRequestAsynchronously(url, resolve, reject);
        });
    }

    async function updateRandomNumber() {
        try {
            const request1 = await sendRequest("/math/random");
            const num = getRandomNumberFromResponse(request1.responseText);
            const request2 = await sendRequest(`/math/round?num=${encodeURIComponent(num)}`);
            updateRandomNumberFromResponse(request2.responseText);
        } catch (err) {
            console.error(err);
        }
    }

    function updateRandomNumberTranslatedToES5() {
        return sendRequest("/math/random")
            .then(request1 => {
                const num = getRandomNumberFromResponse(request1.responseText);
                return sendRequest(`/math/round?num=${encodeURIComponent(num)}`);
            })
            .then(request2 => {
                updateRandomNumberFromResponse(request2.responseText);
            })
            .catch(err => console.error(err));
    }

    document.addEventListener("DOMContentLoaded", function () {
        document
            .querySelector("*[data-rel='random-generator']")
            .addEventListener("click", updateRandomNumberTranslatedToES5);
    });
})();

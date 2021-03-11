(function () {
    function updateRandomNumberByRequest() {
        sendRequestAsynchronously("/math/random", request =>
            updateRandomNumberFromResponse(request.responseText),
        );
    }

    document.addEventListener("DOMContentLoaded", () => {
        document
            .querySelector("*[data-rel='random-generator']")
            .addEventListener("click", updateRandomNumberByRequest);
    });
})();

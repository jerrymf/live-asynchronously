function sendRequestAsynchronously(url, callbackSuccess, callbackError) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = e => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            resolve(null);
            return;
        }

        callbackSuccess(request);
    };
    request.onerror = e => callbackError(e.currentTarget.statusText);
    request.send(null);
}

function getRandomNumberFromResponse(responseText) {
    return JSON.parse(responseText).num;
}

function updateRandomNumberFromResponse(responseText) {
    document.querySelector("*[data-rel='random-number']").innerHTML = getRandomNumberFromResponse(
        responseText,
    );
}

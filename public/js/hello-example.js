(function () {
    const native = async () => "Hello";
    const translated = () => Promise.resolve("Hello");
    const translatedMore = () => new Promise(resolve => resolve("Hello"));
    const translatedEvenMore = () => {
        return {
            then(onResolve) {
                queueMicrotask(() => onResolve("Hello"));
            },
        };
    };

    function callMeMaybe() {
        native().then(console.log);
        translated().then(console.log);
        translatedMore().then(console.log);
        translatedEvenMore().then(console.log);
    }

    callMeMaybe();
})();

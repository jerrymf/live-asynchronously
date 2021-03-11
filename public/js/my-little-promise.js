/**
 * WARNING!
 * IT'S NOT A POLYFILL! ONLY FOR STUDYING PURPOSES.
 */
(function () {
    class MyLittlePromise {
        #state = 0;
        #value = undefined;
        #resolvers = [];
        #rejecters = [];
        #thenResolveQueue = [];
        #thenRejectQueue = [];

        constructor(callback) {
            callback(this.#onResolve, this.#onReject);
        }

        then(onResolve, onReject) {
            onResolve && this.#resolvers.push(onResolve);
            onReject && this.#rejecters.push(onReject);

            const promise = new MyLittlePromise((resolve, reject) => {
                this.#thenResolveQueue.push(resolve);
                this.#thenRejectQueue.push(reject);
            });

            if (this.#state > 0) {
                this.#processQueue();
            }

            return promise;
        }

        catch(onReject) {
            return this.then(null, onReject);
        }

        #onResolve = value => {
            this.#state = 1;
            this.#value = value;
            this.#processQueue();
        };

        #onReject = err => {
            this.#state = 2;
            this.#value = err;
            this.#processQueue();
        };

        #processQueue = () => {
            queueMicrotask(() => {
                while (this.#resolvers.length) {
                    const resolveCbk = this.#resolvers.shift();
                    const thenResolveCbk = this.#thenResolveQueue.shift();

                    const rejectCbk = this.#rejecters.shift();
                    const thenRejectCbk = this.#thenRejectQueue.shift();

                    let newValue;

                    try {
                        const cbk = this.#state === 1 ? resolveCbk : rejectCbk;

                        if (cbk) {
                            newValue = cbk(this.#value);

                            if (
                                newValue &&
                                typeof newValue === "object" &&
                                typeof newValue.then === "function"
                            ) {
                                newValue.then(thenResolveCbk, thenRejectCbk);
                            } else {
                                thenResolveCbk(newValue);
                            }
                        } else {
                            const thenCbk = this.#state === 1 ? thenResolveCbk : thenRejectCbk;
                            thenCbk(this.#value);
                        }
                    } catch (error) {
                        const cbk = rejectCbk || thenRejectCbk;
                        newValue = cbk && cbk(error);
                        thenResolveCbk && thenResolveCbk(newValue);
                    }
                }
            });
        };
    }

    window.Promise = MyLittlePromise;
})();

const all = (promises) => {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([])
        }

        const results = []
        let resolved = 0;

        promises.forEach(promise => {
            if (!(promise instanceof Promise)) {
                Promise.resolve(promise).then(data => results.push(data));
            }

            promise.then(result => {
                results.push(result);
                resolved++;
                if (resolved === promises.length) {
                    resolve(results);
                }
            }).catch(error => reject(error))
        })

    })
}

const allSettled = promises => {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([])
        }

        const results = []
        let resolved = 0;

        promises.forEach((promise, index) => {
            if (!(promise instanceof Promise)) {
                Promise.resolve(promise).then(data => results.push(data));
            }

            promise.then(result => {
                results[index] = {status: 'fulfilled', value: result};
            }).catch(error => {
                results[index] = {status: 'rejected', error: error}
            }).finally(() => {
                resolved++;
                if (resolved === promises.length) {
                    resolve(results);
                }
            })
        })
    })
}

const race = promises => {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([])
        }

        promises.forEach(promise => {
            if (!(promise instanceof Promise)) {
                Promise.resolve(promise).then(data => resolve(data));
            }

            promise.then(result => resolve(result)).catch(error => reject(error))
        })
    })
}

const any = promises => {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) resolve([])

        let rejectCount = 0;
        const errors = []

        promises.forEach((promise, index) => {
            if (!(promise instanceof Promise)) Promise.resolve(promise).then(data => resolve(data));

            promise.then(result => resolve(result)).catch(error => {
                rejectCount++
                errors[index] = error

                if (rejectCount === promises.length) {
                    reject(new AggregateError(errors))
                }
            })
        })
    })
}



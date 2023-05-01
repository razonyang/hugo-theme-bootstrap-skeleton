(() => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/hugo-theme-bootstrap-skeleton/service-worker.min.js').then(() => {
            }).catch(function (err) {
                throw new Error(`Error whilst registering service worker: ${err.Error}`)
            });
        });
    } else {
        throw new Error('You browser does not support service worker.')
    }
})()

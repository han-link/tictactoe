const CACHE_NAME = `tic-tac-toe-game`;

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll([
            '/',
            '/assets/index.js',
            '/assets/index.css',
            '/burger.svg',
            '/donut.svg',
            '/github.svg',
            '/tic-tac-toe-game.svg'
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);

                await cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {}
        }
    })());
});

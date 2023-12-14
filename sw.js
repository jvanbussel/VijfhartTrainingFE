caches.open("mijnFileCache")
    .then(cache => {
        cache.add("mijnStyles.css"); // voegt 1 resource toe
        cache.addAll(["globalFun.js", "app.js"]); //voegt meerdere resources toe
    });

caches.open("mijnFileCache")
    .then(
        cache => {
            cache.delete("plaatje1.png")
                .then( () => {cache.add("plaatje2.png")})
        }
    )

self.addEventListener('fetch', event => {
    let url = 'https://bgg-json.azurewebsites.net/collection/edwalter';
    fetch(url).then(response => {
            return response.json();
        }
    )
});

self.addEventListener('fetch', (ev) => {
    ev.respondWith(

        // Deze functie wilt een Promise;
        // 'async function(){..}() wordt door JavaScript
        // AUTOMATISCH in een Promise verpakt! :-)

        async function() {

            console.log(`Request onderschept met data: `);
            console.dir(ev.request);

            if (ev.request.url.indexOf('bgg')>-1){

                let oudRequest = ev.request;
                let nieuweURL = oudRequest.url.replace('edwalter','stinow');

                let nieuwRequest = new Request(
                    nieuweURL,
                    {
                        method: oudRequest.method,
                        headers: oudRequest.headers,
                        mode: oudRequest.mode,
                        credentials: oudRequest.credentials
                    }
                );

                console.log("nieuw request:", nieuwRequest)

                return fetch(nieuwRequest); //Hier wordt een Promise verwacht
            } else {
                return fetch(ev.request);
            }
        }()
    );
});

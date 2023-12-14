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

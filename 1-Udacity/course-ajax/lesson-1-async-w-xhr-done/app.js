//key via: https://unsplash.com/developers
// public key voorbeeld = unsplashRequest.setRequestHeader('Authorization', 'Client-ID DitIsHetEnigeDatIkAanpas');

(function () {
    const form = document.querySelector('#search-form');
    let searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    let searchedForText = searchField;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
 
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID MNgTDimJh-k_CdN5Hkq5FNDAGX6FQySsw49-vT6CgBA');
    unsplashRequest.send();
});
    
function addImage()
    {
    //debugger; via   debugger; krijg je in  netwerk/headers,     het totaal va 13 paginas te zien in het object!
        //Omdat ik groen status 200 krijg, ga ik nu verder met het schrijven van wat er gebeuren moet by OK response.
        let htmlContent= '';
        const data = JSON.parse(this.responseText);
        if (data && data.results && data.results[0]) 
        {
        //1: converteer opgehaalde data naar een object

            //via de JSON reply tab in dev-console -> netwerk --> antwoord, zie je het object met de naam: results
        const firstImage = data.results[0];   

        //Nu moet de afbeelding worden geladen op de webpagina
            htmlContent =  `<figure>
                                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                            </figure>`;
        } else {
          htmlContent = 'div class="error-no-image">Geen afbeelding beschikbaar</div>';
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    })();

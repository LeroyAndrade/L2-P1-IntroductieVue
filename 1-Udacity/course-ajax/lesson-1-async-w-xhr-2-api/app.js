//key via: https://unsplash.com/developers
//XHR request: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
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

  /*Unsplash API*/
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,true);
    unsplashRequest.onload = addImage;
    unsplashRequest.onError = function (err) {
       requestError(err, 'image');
     }
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID MNgTDimJh-k_CdN5Hkq5FNDAGX6FQySsw49-vT6CgBA');
    unsplashRequest.send();


/*New York times API*/
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=kBVnW80vnlxFA93V2kSr6apRC4nSgUA1`,true);
    articleRequest.onError = function (err) {
       requestError(err, 'article');
       console.log('NY times error');
     }
     articleRequest.onload= articleRequestOK;
    articleRequest.send();
});

function addImage()
    {
    //debugger; via   debugger; krijg je in  netwerk/headers,     het totaal va 13 paginas te zien in het object
        //Omdat ik groen status 200 krijg en 304, ga ik nu verder met het schrijven van wat er gebeuren moet by OK response.
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

    /*New York Times*/
  function articleRequestOK(){
    const NyTData= JSON.parse(this.responseText);
    const nyTDataArtikel = NyTData.response.docs[0];

      document.getElementById('NewYorkTimes').innerText = nyTDataArtikel.abstract;

  }
    })();

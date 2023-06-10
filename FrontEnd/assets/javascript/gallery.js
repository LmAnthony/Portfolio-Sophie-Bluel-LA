const url = 'http://localhost:5678/api/works';
// Récupération des travaux depuis l'API, transformation de la réponse de l'api en json et utilisation des données (data).
    fetch(url)
    .then(reponse => reponse.json())
    .then(data => {
        function genererGallery(data) {
        // On supprime visuellement ma galerie, pour la régénérer derrière, pour ne pas faire de doublons.
        document.querySelector(".gallery").innerHTML = "";
        // Fonction qui génère la galerie avec tous les travaux de Sophie Bluel.
            for(let i = 0; i < data.length; i++){
                // Récupération des éléments dans ma balise gallery
                const gallery = document.querySelector(".gallery");
                // Création d'une balise dédiée à un projet
                const dataElement = document.createElement("figure")
                // Création des balises
                const imageElement = document.createElement("img");
                imageElement.src = data[i].imageUrl;
                const titleElement = document.createElement("figcaption");
                titleElement.innerText = data[i].title;
                // Balise principale
                gallery.appendChild(dataElement);
                // On rattache le contenu à dataElement, img et son titre
                dataElement.appendChild(imageElement);
                dataElement.appendChild(titleElement);
            }
        };
    // Première génération de la galerie.
    genererGallery(data);
        // Ajout du listener pour regénérer normalement tous ma galerie =========> BOUTON "TOUS"
        const boutonAll = document.querySelector(".btn-all");
        boutonAll.addEventListener("click", function () {
            // Effacement de l'écran et regénération de la page
            document.querySelector(".gallery").innerHTML = "";
            // Regénérer normalement tous ma galerie
            genererGallery(data);
        });
        
        // Ajout du listener pour filtrer les =========> BOUTON "OBJETS"
        const boutonFiltrerObjects = document.querySelector(".btn-filtrer-objets");
        boutonFiltrerObjects.addEventListener("click", function () {
           const objetsFiltrees = data.filter(function (objets) {
               return objets.category.id == 1;
           });
           // Effacement de l'écran et regénération de la page avec le contenu filtré uniquement
          document.querySelector(".gallery").innerHTML = "";
          genererGallery(objetsFiltrees);
        });

        // Ajout du listener pour filtrer les =========> BOUTON "APPARTEMENTS"
        const boutonFiltrerAppartement = document.querySelector(".btn-filtrer-appartements");
        boutonFiltrerAppartement.addEventListener("click", function () {
           const appartementsFiltrees = data.filter(function (appartements) {
               return appartements.category.id == 2;
           });
           // Effacement de l'écran et regénération de la page avec le contenu filtré uniquement
          document.querySelector(".gallery").innerHTML = "";
          genererGallery(appartementsFiltrees);
        });
        
        // Ajout du listener pour filtrer les =========> BOUTON "HOTELS ET LES RESTAURANTS"
        const boutonFiltrerHotelRestaurants = document.querySelector(".btn-filtrer-hotelrest");
        boutonFiltrerHotelRestaurants.addEventListener("click", function () {
           const hotelrestFiltrees = data.filter(function (hotelrest) {
               return hotelrest.category.id == 3;
           });
           // Effacement de l'écran et regénération de la page avec le contenu filtré uniquement
          document.querySelector(".gallery").innerHTML = "";
          genererGallery(hotelrestFiltrees);
        });
});
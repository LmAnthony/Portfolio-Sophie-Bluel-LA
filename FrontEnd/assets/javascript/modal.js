// Première génération de la galerie.
genererGallery();
// Première génération de la galerie dans la première modal.
genererGalleryModal();
// Permets de récupérer les catégories de mon API et les transférer dans une select>options.
getcategory();

// Récupération de la modal.
var modal = document.getElementById("myModal");
// Récuperer le bouton pour ouvrir la modal
var btn = document.getElementById("myBtn");
// Récuperer le span qui permet de fermer la modal
var spanCloseModal = document.getElementsByClassName("close")[0];
// Le bouton (modifier) va permettre d'ouvrir la modal
btn.onclick = function() {
  modal.style.display = "block";
}
// Permet de quitter la modal en cliquer sur l'icon croix en haut à droite de la modal (x)
spanCloseModal.onclick = function() {
  modal.style.display = "none";
}
// Pour que l'utilisation quitte la modal en cliquant en dehors de celle-ci.
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function genererGallery() {
  // Récupération des travaux depuis l'API, transformation de la réponse de l'api en json et utilisation des données (data).
  fetch('http://localhost:5678/api/works')
  .then(reponse => reponse.json())
  .then(data => {
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
      });
}
// Récupération des travaux depuis l'API, transformation de la réponse de l'api en json et utilisation des données (data).
function genererGalleryModal() {
  fetch('http://localhost:5678/api/works')
      .then(reponse => reponse.json())
      .then(data => {
              // On supprime visuellement ma galerie, pour la régénérer derrière, pour ne pas faire de doublons.
              document.querySelector(".galleryModal").innerHTML = "";
              // Création d'un FOR qui regénère la galerie avec tous les travaux de Sophie Bluel.
              for(let i = 0; i < data.length; i++){
                  // Récupération des éléments dans ma balise gallery
                  const gallery = document.querySelector(".galleryModal");
                  // Création d'une balise dédiée à un projet
                  const dataElement = document.createElement("figure")
                  // Création des balises
                  const imageElement = document.createElement("img");
                  imageElement.src = data[i].imageUrl;
                  const titleElement = document.createElement("figcaption");
                  titleElement.innerText = "éditer";
                  const trash = document.createElement('i');
                  trash.setAttribute("class", "fa fa-trash-can");
                  trash.setAttribute("data-id", data[i].id);
                  trash.addEventListener("click", function(event) {
                    deleteWork(event, data[i].id);
                  });
                  // Balise principale
                  gallery.appendChild(dataElement);
                  // On rattache le contenu à dataElement, img et son titre
                  dataElement.appendChild(imageElement);
                  dataElement.appendChild(titleElement);
                  dataElement.appendChild(trash);
              }
      });
}
    
// Récupération du bouton "Ajouter une photo"
var btnAddProject = document.getElementById("addProject");
// Récupération de l'intégralité de la modal "Add project modal"
var modalAddProject = document.getElementById("AddProject__Modal");
// Récupération du bouton pour fermer la deuxième modal.
var closeAddProjectModal = document.getElementById("closeAddProjectModal");
// Récupération du bouton pour revenir à la première modal.
var previousModal = document.getElementById("previousModal");
// Onclick sur le bouton 'Ajouter une photo' faire disparaitre la première modal et apparaitre la deuxième.
btnAddProject.onclick = function() {
  modal.style.display = "none";
  modalAddProject.style.display = "block";
}
// Revenir à la modal précédante avec un onclick (avec la flèche).
previousModal.onclick = function() {
    modalAddProject.style.display = "none";
    modal.style.display = "block";
}
// Même utilisation, mais qu'on va ré-utiliser dans d'autres fonctions.
function previous(){
  modalAddProject.style.display = "none";
  modal.style.display = "block";
}
// Function pour fermer la modal (x)
closeAddProjectModal.onclick = function() {
    modalAddProject.style.display = "none";
}

// Vérification de l'autorisation
function getAuthorization() {
  const token = JSON.parse(localStorage.getItem('auth')).token;
  return 'Bearer ' + token;
}
// Cela va permettre de récupérer les catégories de l'api et de les transmettre dans le select>options.
function getcategory(){
  fetch('http://localhost:5678/api/categories')
    .then(reponse => reponse.json())
    .then(category => {
      let nameCategory = '<option value="">> Choisissez une catégorie ! <</option>';
        category.forEach((category) => {
          nameCategory += '<option value=' + category['id'] + '>' + category['name'] + '</option>';
        });
        document.getElementById('categoryOptions').innerHTML = nameCategory;
  });
}

// ########################### Fonction pour l'ajout d'un projet ########################################################
const addWorkBtn = document.querySelector("#addWorkBtn");
addWorkBtn.addEventListener("click", function () {
  // Création d'un constructeur pour facilité la prise de valeur
  const formData = new FormData();
// Formulaire html récupérer : titre, catégorie et l'image de l'utilisateur
  const titre = document.querySelector("#titre").value;
  const categorie = document.querySelector("#categoryOptions").value;
  const fileField = document.querySelector('input[type="file"]');
// Si l'input type file est vide et que l'utilisateur submit, un message d'erreur apparaît.
  if (fileField.files[0] == undefined) {
    const alert = document.getElementById('message_alert');
    alert.innerHTML = "Image obligatoire";
    alert.style.display = "block";
    setTimeout(function () { alert.style.display = "none"; }, 3000);
    return false;
  }
// Récupérer les 'const/enfants' dans le constructeur (parent).
  formData.append('title', titre);
  formData.append('category', categorie);
  formData.append('image', fileField.files[0]);
// Call API/ travaux de sophie + récupérer le token id de l'user
  const url = 'http://localhost:5678/api/works';
  const userId = JSON.parse(localStorage.getItem('auth')).userId;
  fetch(url, {
    method: "POST",
    headers: {
      'Authorization': getAuthorization()
    },
    auth: {
      'userId': userId
    },
    body: formData,
    file: {
      'filename': fileField.files[0]
    }
  })
    .then((response) => response.json())
    .then((data) => {
      // Function previous() pour revenir à la modal précédante + on regénère les galeries.
      previous();
      genererGalleryModal();
      genererGallery();
      // Message d'alerte pour l'utilisateur pour lui dire que la photo est bien arrivé ! (timeout de 4s)
      const alert = document.getElementById('alert');
      alert.innerHTML = "La photo est arrivée!";
      alert.style.display = "block";
      setTimeout(function () { alert.style.display = "none"; }, 4000);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
});

// Fonction pour permet de montrer l'aperçu de l'image de l'utilisateur + supprimé les autres entitées autour pour prendre toute la div
var loadFile = function(event) {
  var output = document.getElementById('UserImgFile');
  var replaceImg = document.getElementById('replaceImg');
  var removeLabelFile = document.getElementById('removeLabelFile');
  var removeText = document.getElementById('removeText');
  var FileDivPadding = document.querySelector('.file');
  // Création et récupération de l'image de l'utilisateur pour l'afficher.
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // permet de libérer la mémoire utilisée par l'URL créée précédemment
    replaceImg.style.display = "none";
    removeLabelFile.style.display = "none";
    removeText.style.display = "none";
    FileDivPadding.style.padding = "0";
  }
  // Petit if qui permet que lorsque l'utilisateur pose son image, le bouton submit vire au VERT
  const fileField = document.querySelector('input[type="file"]');
    if (fileField.files[0]){
      const SubmitBtn = document.querySelector(".btnValid_style");
      SubmitBtn.style.backgroundColor = "#1D6154";
    }
};

// ########## Fonction qui va permettre de supprimer un projet avec l'icone "poubelle" ########################################
function deleteWork(event, id) {
  // Message de confirmation pour l'utilisateur
  var result = confirm("Voulez-vous vraiment supprimer ce projet ?");
  if (result) {
  fetch('http://localhost:5678/api/works/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getAuthorization()
    },
    params: {
      'id': id
    }
  })
  .then(() => {
    // On regénère la galerie, on récupère le parent de l'icon poubelle et on supprime son parent soit le projet en question.
      genererGallery();
      const parentDiv = event.target.parentNode;
      parentDiv.remove();
      // Message pour confirmer qu'un projet a bien été supprimé. (message sous timeout pendant 4s)
      const alert = document.getElementById('alert');
      alert.innerHTML = "Photo supprimé!";
      alert.style.display = "block";
      setTimeout(function () { alert.style.display = "none"; }, 4000);
    })
    // Catch de l'erreur
    .catch((error) => {
      console.error('Error:', error);
    });
  }
};
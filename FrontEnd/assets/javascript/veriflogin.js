// Récupération du token et vérification de la connexion
function checklog() {
    const auth = localStorage.getItem('auth');
    if (auth !== null) {
        return true;
        
    }
    alert("Erreur de connexion");
    return false;
}
// Déconnexion de la session et on retire le token (redirection vers la map de login) (ONCLICK SUR LE BOUTON 'LOGOUT')
function logout() {
    localStorage.removeItem('auth');
    window.location = "login.html";
}
// Vérification de l'autorisation de la connexion, pour l'affichage du boutons et de l'icon (edit) + texte 'modifier'
if ( checklog() == true ) {  
    document.querySelector(".editprojet").innerHTML ='<div class="Edit_style"><img src="./assets/images/editgallery.png" alt="icon edit gallerie"><button class="btnEdit_style" id="myBtn"><p>modifier</p></button></div>';
} else { 
    document.querySelector(".editprojet").innerHTML ='';
}
// Vérification de l'autorisation de la connexion, pour l'affichage de la barre noire.
if ( checklog() == true ) {  
    document.querySelector(".blackBar").innerHTML ='<img src="./assets/images/edit.png" alt="icon edit subheader"><p>Mode édition</p><span><p>publier les changements</p></span>';
} else { 
    document.querySelector(".blackBar").innerHTML ='';
}
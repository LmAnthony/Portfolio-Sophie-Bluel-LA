    // On construit un objet avec 4 valeurs du formulaire
    const form = {
      email: document.querySelector("#email"),
      password: document.querySelector("#password"),
      submit: document.querySelector("#BtnSubmitLogin"),
      messages: document.getElementById("form-messages"),
    };
  // Ajout d'un event sur le bouton submit du formulaire de connexion.
    form.submit.addEventListener("click", (e) => {
      e.preventDefault();
      const url = 'http://localhost:5678/api/users/login';
  
      fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          email: form.email.value,    
          password: form.password.value,
        }),
      })
        .then((reponse) => reponse.json())
        .then((data) => {
          console.log(data);
          // Message pour informer à l'utilisateur qu'il y a une erreur dans le formulaire de connexion.
          if ((data.error) || (data.message)) {
            var errorLogin = document.getElementById('error_login');
            errorLogin.innerText = "Email ou Mot de passe incorrect !";
            errorLogin.style.color = "red";
            errorLogin.style.marginTop = "1em";
           
          } else {
            localStorage.setItem('auth', JSON.stringify(data));
            window.location = "editmainpage.html";
          }
        // Récupération de l'erreur.
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
// Fonction pour faire disparaître un élément avec une animation de fondu
function fadeOut(element, duration) {
   element.style.transition = `opacity ${duration}ms`;
   element.style.opacity = 0;
   setTimeout(() => {
      element.style.display = 'none';
      element.style.transition = '';
   }, duration);
}

// Fonction pour faire apparaître un élément avec une animation de fondu
function fadeIn(element, duration) {
   element.style.transition = `opacity ${duration}ms`;
   element.style.opacity = 1;
   element.style.display = 'block';
}

// Événement de message
window.addEventListener("message", function (event) {
   // Sélection de l'élément avec la classe "container"
   let container = document.querySelector(".container");
   let image = document.querySelector(".body-image");

   if (event.data.action === "show") {
      // Apparition de l'élément avec une animation de fondu
      fadeIn(container, 500);

      // Sélection de l'élément avec la classe "body-document"
      let body = document.querySelector(".body-document");
      let dataJoueur = event.data.infos;

      // Nettoyage du contenu de l'élément
      body.innerHTML = "";

      // Ajout du contenu HTML à l'élément
      body.innerHTML = `
             <div class="content-header">
                 <span id="charid">${dataJoueur.lastname}</span>
             </div>
             <div class="content-center">
                 <span id="name" class="name">${dataJoueur.firstname}</span>
             </div>
             <div class="content-footer">
                 <span id="name" class="signature">${dataJoueur.lastname}</span>
             </div>
         `;

      image.src = `background-${event.data.type}.png`;

      // Fonction pour faire disparaître l'élément après 15 secondes
      setTimeout(function () {
         body.innerHTML = "";
         fadeOut(container, 500);
      }, event.data.timer);
   }

   if (event.data.action === "hide") {
      // Disparition de l'élément avec une animation de fondu
      fadeOut(container, 500);
      // Nettoyage du contenu de l'élément avec la classe "body-document"
      document.querySelector(".body-document").innerHTML = "";
   }
});

window.addEventListener("load", function (event) {
   document.onkeydown = function (data) {
      console.log(' test2');
      if (data.which === 27 || data.which === 8) { // ESC or Backspace
         $.post('http://lgw_carteid/close', JSON.stringify({}));
      }
   };
});


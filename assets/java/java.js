/* index.html functions START */

// Funzione per attivare e disattivare con un click il menu hamburger, quando si attiva il menu hamburger si opacizza lo sfondo
function toggleCurtain() {
	let menu_links = document.getElementById('menu-links');
	let toggleButton = document.getElementById('toggleButton');
	let opaque = document.getElementById('opaque-page');
	if (menu_links.style.display === "grid") {
		menu_links.style.display = "none";
		opaque.classList.remove("active");
		document.body.style.overflow = "";
	} else {
		menu_links.style.display = "grid";
		opaque.classList.add("active");
		document.body.style.overflow = "hidden";	
	}
	toggleButton.classList.toggle('x');
  }

// Funzione per avere un pulsante che rimandi all'inizio della pagina
window.addEventListener('scroll', function() { // Necessario per controllare il valore dello scroll della pagina 
	let upButton = document.getElementById("upButton");
	if (window.scrollY >= document.documentElement.clientHeight) { //clientHeight sarebbe il valore dell'altezza massima della viewport
	  upButton.style.visibility = "visible";
	  upButton.addEventListener("click", () => window.scrollTo({
		top: 0,
		behavior: "smooth",
	  }));
	} else if (window.scrollY < document.documentElement.clientHeight) {
	  upButton.style.visibility = "hidden";
	}
  });


  document.addEventListener("DOMContentLoaded", function() { //Necessario per poter agire sugli elementi una volta che sono stati caricati dal browser
	
	// Funzione per APRIRE il pannello informativo sugli oggetti della timeline
	const infoButtons = document.getElementsByClassName("infoButton");

	for (let i = 0; i < infoButtons.length; i++) {
		let button = infoButtons[i];
		button.addEventListener("click", function() {
			let info_closer = this.nextElementSibling;
			let img = info_closer.nextElementSibling;
			let info_bar = img.nextElementSibling;
			this.style.visibility = "hidden";
			info_closer.style.visibility = "visible";
			info_bar.classList.add("active");
			img.style.filter = "blur(3px)";
		});
	};

	// Funzione per CHIUDERE il pannello informativo sugli oggetti della timeline
	const infoClosers = document.getElementsByClassName("infoCloser");

	for (let i = 0; i < infoClosers.length; i++) {
		let closer = infoClosers[i];
		closer.addEventListener("click", function() {
			let info_button = this.previousElementSibling;
			let img = this.nextElementSibling;
			let info_bar = img.nextElementSibling;
			info_bar.classList.remove("active");
			info_button.style.visibility = "visible";
			img.style.filter = "none";
			this.style.visibility = "hidden";
		});
	};

	// Qui si attribuisce la classe con l'animazione alle immagini per farle entrare dai lati della viewport
	const elements = document.querySelectorAll('div.image-box');

	const options = {
		root: null, // Valore per ottenere la viewport come contenitore da osservare
		rootMargin: '0px',
		threshold: 0.3 // Valore che fa scattare l'animazione quando l'elemento è per il 50% visibile
	};

	const elements_array = Array.from(elements);
	const observer = new IntersectionObserver((entries) => {  // Si dichiara cosa deve fare l'osservatore agli elementi che gli vengono inseriti (entries)
		entries.forEach(entry => {
			const wideScreen = getComputedStyle(document.querySelector(":root")).getPropertyValue("--wideScreen");
			const data = entry.target.parentElement.children[0].children[0];
			if (entry.isIntersecting) {
				if (wideScreen === "True") {
					const index = elements_array.indexOf(entry.target);
                	if (index % 2 == 0) {
						entry.target.style.animation = "left-enter 1s ease";
					} else {
						entry.target.style.animation = "right-enter 1s ease";
					}
					
				} else { // questo è il caso della visione da schermo stretto, quindi ingresso solo da destra
					entry.target.style.animation = "right-enter 1s ease";
				}

				entry.target.classList.add("enter");
				data.classList.add("entrance");
				observer.unobserve(entry.target); // Fatta l'animaizone qui si smette di osservare l'elemento per non ripeterla
			}
		});
	}, options);
	elements.forEach(element => {
		observer.observe(element); // Qui si inizia ad osservare l'elemento
	});
});

/* index.thml functions END */

/* index.html functions START */

// Funzione per attivare e disattivare con un click il menu hamburger
function toggleCurtain() {
	let menu_links = document.getElementById('menu-links');
	let toggleButton = document.getElementById('toggleButton');
	let opaque = document.getElementById('opaque-page');
	if (menu_links.style.display === "grid") {
		menu_links.style.display = "none";
		opaque.classList.remove("active");
		setTimeout(() => {
			opaque.style.visibility = "hidden";
			document.body.style.overflow = "";
		}, 500);
	} else {
		menu_links.style.display = "grid";
		opaque.style.visibility = "visible";
		setTimeout(() => {
			opaque.classList.add("active");
			document.body.style.overflow = "hidden";
		}, 10);	
	}
	toggleButton.classList.toggle('x');
  }

// Funzione per avere un pulsante che rimandi all'inizio della pagina
window.addEventListener('scroll', function() { // Necessario per controllare il valore dello scroll della pagina 
	let upButton = document.getElementById("upButton");
	if (window.scrollY >= document.documentElement.clientHeight) {
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
	
	// Funzione per aprire il pannello informativo sugli oggetti della timeline
	const infoButtons = document.getElementsByClassName("infoButton");

	for (let i = 0; i < infoButtons.length; i++) {
		let button = infoButtons[i];
		button.addEventListener("click", function() {
			let _ = this.parentElement;
			let info_closer = _.children[1];
			let img = _.children[2];
			let info_bar = _.children[3];
			this.style.visibility = "hidden";
			info_closer.style.visibility = "visible";
			info_bar.style.visibility = "visible";
			img.style.filter = "blur(3px)";
		});
	};

	// Funzione per chiudere il pannello informativo sugli oggetti della timeline
	const infoClosers = document.getElementsByClassName("infoCloser");

	for (let i = 0; i < infoClosers.length; i++) {
		let closer = infoClosers[i];
		closer.addEventListener("click", function() {
			let _ = this.parentElement;
			let info_button = _.children[0];
			let img = _.children[2];
			let info_bar = _.children[3];
			info_bar.style.visibility = "hidden";
			info_button.style.visibility = "visible";
			img.style.filter = "none";
			this.style.visibility = "hidden";
		});
	};

	// Qui si attribuisce la classe a cui è legata un'animazione
	const elements = document.querySelectorAll('div.image-box');

	const options = {
		root: null, // Valore per ottenere la viewport come contenitore da osservare
		rootMargin: '0px',
		threshold: 0.5 // Valore che fa scattare l'animazione quando l'elemento è per il 50% visibile
	};

	const elements_array = Array.from(elements);
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const wideScreen = getComputedStyle(document.querySelector(":root")).getPropertyValue("--wideScreen");
			if (entry.isIntersecting) {
				if (wideScreen === "True") {
					const index = elements_array.indexOf(entry.target);
                	if (index % 2 == 0) {
						entry.target.style.animation = "left-enter 1.5s ease-out forwards";
					} else {
						entry.target.style.animation = "right-enter 1.5s ease-out forwards";
					}
					
				} else {
					entry.target.style.animation = "right-enter 1.5s ease-out forwards";
				}
				observer.unobserve(entry.target); // Fatta l'animaizone qui si smette di osservare l'elemento
			}
		});
	}, options);
	elements.forEach(element => {
		observer.observe(element); // Qui si inizia ad osservare l'elemento
	});

	// Funzione per aprire i pannelli delle narratives
	const narBtns = document.getElementsByClassName("nar-btn");

	for (let i = 0; i < narBtns.length; i++) {
		let btn = narBtns[i];		
		btn.addEventListener("click", function() {
			let _ = this.parentElement;
			let panel = _.nextElementSibling;
			let symbol = this.innerHTML;
			if (symbol === "+") {
				panel.style.display = "grid";
				this.innerHTML = "-";
			} else {
				panel.style.display = "none";
				this.innerHTML = "+";
			}
		});
	};
});

/* index.thml functions END */

/* Spinner pagine */
/* window.onload = function() {
	// Rimuovi lo spinner e mostra il contenuto
	document.body.classList.add('loaded');
	document.querySelector('.content').style.display = 'block'; // Mostra il contenuto
}; 

// Funzione che nasconde lo spinner e mostra il contenuto dopo un ritardo
window.onload = function() {
    setTimeout(function() {
        // Rimuovi lo spinner e mostra il contenuto
        document.body.classList.add('loaded');
        document.querySelector('.content').style.display = 'block'; // Mostra il contenuto
    }, 5000); // 3 secondi di ritardo
};*/

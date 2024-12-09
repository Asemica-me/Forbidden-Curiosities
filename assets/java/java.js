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
	  upButton.classList.add("appear");
      upButton.removeAttribute("disabled");
	  upButton.addEventListener("click", () => window.scrollTo({
		top: 0,
		behavior: "smooth",
	  }));
	} else if (window.scrollY < document.documentElement.clientHeight) {
        upButton.classList.remove("appear");
        upButton.setAttribute("disabled", "disabled");
	}
});


document.addEventListener("DOMContentLoaded", function() { //Necessario per poter agire sugli elementi una volta che sono stati caricati dal browser
	
	// Animazione freccia nella prima sezione della pagina #arrow

	const arrow = document.getElementById("arrow");
	arrow.classList.add("pointed");

	
	
	// Qui si attribuisce la classe con l'animazione alle immagini per farle entrare dai lati della viewport
	const museumDescr_arr = Array.from([document.getElementById("museum-descr")]);

	const option = {
		root: null, // Valore per ottenere la viewport come contenitore da osservare
		rootMargin: '0px',
		threshold: 0.6 // Valore che fa scattare l'animazione quando l'elemento è per il 100% visibile
	};

	
	const observer = new IntersectionObserver((entries) => {  // Si dichiara cosa deve fare l'osservatore agli elementi che gli vengono inseriti (entries)
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				
				entry.target.style.opacity = "1";
				observer.unobserve(entry.target); // Fatta l'animaizone qui si smette di osservare l'elemento per non ripeterla
			}
		});
	}, option);
	museumDescr_arr.forEach(element => {
		observer.observe(element); // Qui si inizia ad osservare l'elemento
	});

});

/* index.thml functions END */

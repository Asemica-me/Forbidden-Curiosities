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
	
	// Animazione freccia nella prima sezione della pagina #arrow

	const arrow = document.getElementById("arrow");
	arrow.classList.add("pointed");

});

/* index.thml functions END */

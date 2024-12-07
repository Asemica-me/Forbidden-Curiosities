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
    // InterSectionObserver per far apparire side-search solo quando inizia la timeline
	const sideSearch = document.getElementById("side-search");
	const timeline = document.getElementById("timeline");
	const opts = {
		root: null, // Valore per ottenere la viewport come contenitore da osservare
		rootMargin: '0px',
		threshold: 0.07 // Valore che fa scattare l'animazione quando l'elemento è per il 8% visibile
	};

	const timelineObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				sideSearch.classList.add("show");
			} else {
				sideSearch.classList.remove("show");
			}
		});
	}, opts);

	timelineObserver.observe(timeline);


    const sections = document.querySelectorAll(".section");
    const sectionOpts = {
		root: null, // Valore per ottenere la viewport come contenitore da osservare
		rootMargin: '0px',
		threshold: 0.8 // Valore che fa scattare l'animazione quando l'elemento è per il 80% visibile
	};
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
        });
    }, sectionOpts);

    sections.forEach(section => {console.log(section.dataset.value);});





    const searchIcon = document.getElementById("search-icon");
    const wideScreen = getComputedStyle(document.querySelector(":root")).getPropertyValue("--wideScreen");

    searchIcon.addEventListener("click", function() {
        sideSearch.classList.toggle("no-hover");
        sideSearch.classList.toggle("shift");
    });


	
	// Si aggiunge un EventListener a tutti i link della side-search per centrare gli elementi selezionati e farlo in maniera fluida.
	document.querySelectorAll('#search-list a').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
	
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			
            //Il calcolo è fatto per centrare il primo elemento di un periodo selezionato.
			const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (targetElement.offsetHeight / 2);
	
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});


	
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
		threshold: 0.3 // Valore che fa scattare l'animazione quando l'elemento è per il 30% visibile
	};

	const elements_array = Array.from(elements);
	const observer = new IntersectionObserver((entries) => {  // Si dichiara cosa deve fare l'osservatore agli elementi che gli vengono inseriti (entries)
		entries.forEach(entry => {
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
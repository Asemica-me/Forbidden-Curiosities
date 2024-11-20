var items = []
var narratives = []
var currentSelection = []
var currentNarrative =""
var currentValue= ""
var currentSort = ""


document.addEventListener("DOMContentLoaded", async function(event) {
	console.log("Items Data")
	fetch('assets/data/items.json')
	.then(response => response.json())
	.then(data => {	
		items = data.items
		var startWith = data.meta.startWith
		var item = items[startWith] // items is the json key containing all information of 15 objects

		narratives = data.meta.narratives
		currentNarrative = data.meta.startNarrative
		currentValue = data.meta.startValue
		prepareNarratives()
	})
});


// function prepareNarratives(currentSort) {
//     // Filter items (assuming all items are stored in a global or accessible variable named 'items')
//     var currentSelection = items.slice(); // Create a copy of 'items'

//     // Sort currentSelection based on the '@sort' field (assuming it's a string like "Object 1", "Object 2", etc.)
//     currentSelection.sort((i, j) =>
//         i['@sort'].localeCompare(j['@sort'])
//     );

//     var index = currentSelection.findIndex(i => i['@sort'] === currentSort);
//     if (index === -1) {
//         index = 0; // Default to the first item if currentSort is not found
//     }

//     // Assuming showInfo function displays information
//     showInfo(currentSelection[index]);
// }



function prepareNarratives() {
	currentSelection = items.filter( i => 
		i.info[currentNarrative]?.includes(currentValue) 
	)
	currentSelection.sort( (i,j) =>  
		i['@sort'] < j['@sort'] ? -1 : 1 
	)
	if (currentSelection.length==0) 
		currentSelection = items	

	var index  = currentSelection.findIndex( i => i['@sort'] == currentSort )
	if (index == -1) index = 0
	showInfo(index)
}

function showInfo(index) {
	var item = currentSelection[index]
	currentSort = item['@sort']
	inner("header",item.shortName) ;
	inner("fullHeader",item.shortName) ;
	byId("img").src = item.image
	byId("img").alt = item.shortName
	createInfoTable(item)
	inner("shortInfo",item.shortInfo + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="more()">Tell me more...</a>'); 
	inner("longerInfo","<p>"+item.longerInfo.join("</p><p>")+ '<a type="button" class="btn btn-outline-primary btn-sm" onclick="less()">Tell me less</a> or <a type="button" class="btn btn-outline-primary btn-sm" onclick="muchMore()">Tell me even more...</a></p>'); 
	byId("fullInfo").dataset['uri'] = item.fullInfo
	
	prepareNavigationButtons(index)
}

function more() {
	hide("shortInfo") ;
	show("longerInfo") ;
	hide("fullInfo") ;
}
function less() {
	hide("longerInfo") ;
	show("shortInfo") ;
	hide("fullInfo") ;
}
function muchMore() {
	var uri = byId("fullInfo").dataset['uri']
	fetch(uri)
	.then(response => response.text())
	.then(data => {	
		inner("fullInfoContent", data) ;
		hide("mainCard") ;
		show("fullInfo") ;
		window.scrollTo(0,0)
	})
}
function hideFullInfo() {
	hide("longerInfo") ;
	show("shortInfo") ;
	hide("fullInfo") ;
	show("mainCard") ;
}

function createInfoTable(item) {
	inner("infoTable","",true) ;
	for (i in item.info) {
		if (item.info[i] !== null) {
			if (narratives.includes(i)) {
				var items = item.info[i].split(", ")
				var val = []
				for (j in items) {
					val.push('<a class="button" role="button" href="#" onclick="changeNarrative(\''+i+'\',\''+items[j]+'\')">'+items[j]+'</a>')
				}
			inner("infoTable","<tr><th>"+i+"</th><td>"+val.join(", ")+"</td></tr>", false)
			} else {
				inner("infoTable","<tr><th>"+i+"</th><td>"+item.info[i]+"</td></tr>", false)
			}
		}
	}
}
function prepareNavigationButtons(index) {
	if (index > 0) {
		byId("buttonPrevious").disabled = false
		byId("buttonPrevious").onclick = () => showInfo(index-1)
		byId("buttonPrevious").innerHTML = currentSelection[index-1].shortName		
	} else {
		byId("buttonPrevious").disabled = true
		byId("buttonPrevious").onclick = null
		byId("buttonPrevious").innerHTML = "--"
	}
	if (index < currentSelection.length-1) {
		byId("buttonNext").disabled = false
		byId("buttonNext").onclick = () => showInfo(index+1)
		byId("buttonNext").innerHTML = currentSelection[index+1].shortName
	} else {
		byId("buttonNext").disabled = true
		byId("buttonNext").onclick = null
		byId("buttonNext").innerHTML = "--"
	}
	inner('narrative', currentNarrative+": "+currentValue)
}

function changeNarrative(narrative,value) {
		currentNarrative = narrative
		currentValue = value
		prepareNarratives()
}

function byId(id) {
	return document.getElementById(id)
}

function show(id) {
	document.getElementById(id).classList.remove('d-none')
}

function hide(id) {
	document.getElementById(id).classList.add('d-none')
}

function inner(id,content, emptyFirst=true) {
	if(emptyFirst) document.getElementById(id).innerHTML = "" ; 
	document.getElementById(id).innerHTML += content ; 
}


/* 
START NARRATIVES PAGE
*/

/*modal */

function openModalBtn(btn) {
	document.getElementById("sumModal").style.display = 'block';
   
        var buttonText = btn.innerText;
        var title = document.getElementById('sumTitle');
        title.innerText = buttonText;

		if (btn.innerText == "ETHICS OF WAR"){
			var summary = NarSum["ethics"];
		}
		if (btn.innerText == "SCIENTIFIC REVOLUTION"){
			var summary = NarSum["scientific"];
		}
		if (btn.innerText == "WOMEN'S HISTORY"){
			var summary = NarSum["women"];
		}
		if (btn.innerText == "RELIGIOUS DISSENT"){
			var summary = NarSum["religious"];
		}
		if (btn.innerText == "PROVOCATIVE ART"){
			var summary = NarSum["provocative"];
		}
		if (btn.innerText == "DIGITAL PRIVACY"){
			var summary = NarSum["digital"];
		}
		if (btn.innerText == "TEXTS"){
			var summary = NarSum["texts"];
		}
		if (btn.innerText == "TOOLS"){
			var summary = NarSum["tools"];
		}
		if (btn.innerText == "WEAPONS"){
			var summary = NarSum["weapons"];
		}
		if (btn.innerText == "GARMENTS"){
			var summary = NarSum["garments"];
		}
		if (btn.innerText == "EVENTS"){
			var summary = NarSum["events"];
		}
		if (btn.innerText == "WORKS OF ART"){
			var summary = NarSum["works"];
		}
		if (btn.innerText == "XV-XVII"){
			var summary = NarSum["XV"];
		}
		if (btn.innerText == "XVII-XIX"){
			var summary = NarSum["XVII"];
		}
		if (btn.innerText == "FIRST HALF XX"){
			var summary = NarSum["FIRST"];
		}
		if (btn.innerText == "SECOND HALF XX"){
			var summary = NarSum["SECOND"];
		}
		if (btn.innerText == "XXI"){
			var summary = NarSum["XXI"];
		}
		var sumCont = document.getElementById('sumCont');
        sumCont.innerText = summary;
		
    }


function closeModalBtn(){
	document.getElementById("sumModal").style.display = 'none';
}

let NarSum = {
	ethics: "John Doe",
	scientific: "Scientific progress is marked by revolutionary discoveries that change our view of the world. Galileo, with his telescopic observations in 1609, challenged the geocentric conception, promoting the acceptance of the heliocentric model. His empirical and experimental approach marked a turning point in the scientific method, making direct observation central to the investigative process. Charles Darwin, with 'On the Origin of Species' (1859), proposed natural selection as the mechanism of evolution. His theory not only transformed biology but also deeply influenced modern thought, unifying knowledge from various disciplines to explain the diversity of life. Darwin's work represents a milestone in the understanding of biological evolution. Marie Curie, a pioneer in research on radioactivity, discovered elements such as polonium and radium, opening new avenues in nuclear physics and medicine. Her work had a lasting impact, demonstrating the potential of the scientific method to revolutionize science and its applications, such as radiotherapy for cancer treatment. The Apollo 11 Moon landing (1969) showcased humanity's engineering capabilities, inspiring generations of scientists. Finally, the cloning of Dolly (1996) challenged established theories, opening new perspectives in biology and regenerative medicine, marking a breakthrough in the understanding of cloning and the potential of genetic science." ,
	women: "The selected artifacts illustrate the diverse and impactful roles women have played throughout history, shedding light on key moments and objects that reflect the evolving status and contributions of women in society. Women’s History encompasses a broad spectrum of experiences and achievements, revealing the struggles, triumphs, and transformations that have defined the female experience across different eras.",
	religious: "John Doe",
	provocative: "Welcome to the realm of Provocative Art, where creative expression pushes the limits of conventional norms and stirs heated debate. This narrative explores how artists use their works to question, confront, and sometimes even outrage societal standards and expectations, with the deliberate intention to provoke a reaction. These artists challenged traditional aesthetics, moral values, and cultural taboos, prompting viewers to reconsider their perspectives and engage in meaningful discussions. ",
	digital: "The AI-generated image of Pope Francis in a puffer jacket highlights the dangers of digital manipulation in the modern era. These deepfakes undermine trust in the authenticity of images, raising serious concerns about privacy and the integrity of identities. The ease with which false images can be created and spread calls for reflection on how to protect people's reputations and identities in today's digital context. The Enigma encryption system, used by the Germans during World War II, represents a turning point in the history of cryptography and information security. Its decryption by the Allies underscored the importance of protecting sensitive communications, a crucial aspect in the protection of privacy in the digital realm today, where information security is paramount. Edward Snowden's revelations brought to light the NSA's mass surveillance practices, sparking a global debate about the tension between national security and individual privacy. These revelations highlighted the need for transparency and democratic oversight of surveillance programs, raising critical questions about how to balance security with the right to privacy in an increasingly interconnected world. In summary, these examples show the complexity and multidimensionality of the concept of privacy. Digital manipulation, communication security, and mass surveillance are interconnected issues that require a careful and balanced approach. Privacy is not just a technical issue, but an essential element of democracy and individual freedom, which must be protected against modern threats.",
	texts: "John Doe",
	tools: "John Doe",
	weapons: "John Doe",
	garments: "sukkiame le palle fratello",
	events: "John Doe",
	works: "John Doe",
	XV: "John Doe",
	XVII: "John Doe",
	FIRST: "John Doe",
	SECOND: "John Doe",
	XXI: "John Doe",

  };

/* 
END NARRATIVES PAGE
*/

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
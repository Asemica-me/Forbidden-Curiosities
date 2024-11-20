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
	document.getElementById("sumModal").classList.add('visible') ;
	document.getElementById("content").classList.add('opaque');
	document.body.style.overflow = 'hidden';
   
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
	document.getElementById("sumModal").classList.remove('visible') ;
	document.getElementById("content").classList.remove('opaque');
	document.body.style.overflow = ''; 
}

let NarSum = {
	scientific:"The selected artifacts highlight the transformative impact of the Scientific Revolution, shedding light on pivotal discoveries, inventions, and ideas that redefined humanity's understanding of the natural world. These objects capture the spirit of inquiry and innovation that characterized this era, reflecting the groundbreaking achievements and the challenges faced by scientists as they questioned traditional beliefs and developed new frameworks of knowledge. By exploring these artifacts, we gain insight into the profound influence of the Scientific Revolution on modern science, technology, and society, as well as the enduring legacy of this period in shaping the way we perceive and engage with the world.",
	ethics: "The selected artifacts on the ethics of war highlight the moral dilemmas and philosophical debates surrounding armed conflict. They explore key concepts like just war theory, pacifism, and humanitarian principles aimed at reducing suffering. These works reveal how individuals and societies grapple with issues of legitimacy, proportionality, and the rights of combatants and civilians. By examining them, we gain insight into the ethical frameworks that shape decisions on warfare, peacebuilding, and justice, underscoring the enduring quest for ethical conduct in times of conflict." ,
	women: "The selected artifacts illustrate the diverse and impactful roles women have played throughout history, shedding light on key moments and objects that reflect the evolving status and contributions of women in society. Women’s History encompasses a broad spectrum of experiences and achievements, revealing the struggles, triumphs, and transformations that have defined the female experience across different eras.",
	religious: "The selected artifacts showcase the significant role of religious dissent throughout history, reflecting key moments of challenge and transformation. They reveal the struggles and convictions of individuals and groups who questioned authority, redefined faith, and advocated for freedom of belief, shaping spiritual and social landscapes across eras.",
	provocative: "Welcome to the realm of Provocative Art, where creative expression pushes the limits of conventional norms and stirs heated debate. This narrative explores how artists use their works to question, confront, and sometimes even outrage societal standards and expectations, with the deliberate intention to provoke a reaction. These artists challenged traditional aesthetics, moral values, and cultural taboos, prompting viewers to reconsider their perspectives and engage in meaningful discussions. ",
	digital: "The AI-generated image of Pope Francis in a puffer jacket highlights the dangers of digital manipulation in the modern era. These deepfakes undermine trust in the authenticity of images, raising serious concerns about privacy and the integrity of identities. The ease with which false images can be created and spread calls for reflection on how to protect people's reputations and identities in today's digital context. The Enigma encryption system, used by the Germans during World War II, represents a turning point in the history of cryptography and information security. Its decryption by the Allies underscored the importance of protecting sensitive communications, a crucial aspect in the protection of privacy in the digital realm today, where information security is paramount. Edward Snowden's revelations brought to light the NSA's mass surveillance practices, sparking a global debate about the tension between national security and individual privacy. These revelations highlighted the need for transparency and democratic oversight of surveillance programs, raising critical questions about how to balance security with the right to privacy in an increasingly interconnected world. In summary, these examples show the complexity and multidimensionality of the concept of privacy. Digital manipulation, communication security, and mass surveillance are interconnected issues that require a careful and balanced approach. Privacy is not just a technical issue, but an essential element of democracy and individual freedom, which must be protected against modern threats.",
	texts: "The selected texts illuminate the diverse and influential roles that written works have played throughout history, offering a window into key moments and ideas that reflect the evolving intellectual, cultural, and social landscapes of different eras. Texts, whether literary, philosophical, or political, encompass a wide array of voices and perspectives, revealing the struggles, triumphs, and transformations that have shaped human thought and society. These writings bear witness to the power of words to inspire change, challenge norms, and document the complexities of the human experience across time.",
	tools: "The selected tools illustrate the diverse and essential roles that human ingenuity and innovation have played throughout history, offering insight into key moments and objects that reflect the evolving ways in which people have shaped and interacted with their environments. Tools, whether simple or complex, span a wide range of functions and applications, revealing the progress, challenges, and transformations that have defined human creativity and survival. These artifacts demonstrate the power of invention in addressing needs, solving problems, and advancing societies across different periods.",
	weapons: "The selected weapons reveal the diverse and pivotal roles that armed conflict and defense have played throughout history, providing insight into key moments and objects that reflect the evolving strategies, technologies, and power dynamics of warfare. Weapons, from rudimentary tools of survival to advanced instruments of battle, span a broad range of forms and functions, illustrating the struggles, conquests, and transformations that have shaped civilizations. These artifacts bear witness to the human capacity for both destruction and protection, highlighting the complex relationship between warfare, society, and technological advancement across different eras.",
	garments: "The selected garments showcase the diverse and meaningful roles that clothing has played throughout history, offering insight into key moments and pieces that reflect the evolving cultural, social, and economic landscapes of various societies. Garments, from everyday attire to ceremonial or symbolic wear, span a wide range of styles and functions, revealing the traditions, status markers, and transformations that have defined personal and collective identities. These artifacts highlight the ways in which clothing has communicated power, gender, and cultural values, illustrating the changing dynamics of fashion, craftsmanship, and expression across different periods.",
	events: "The selected events illustrate the diverse and profound impact of pivotal moments throughout history, shedding light on key occurrences that have shaped the political, cultural, and social landscapes of various societies. These events, whether driven by conflict, innovation, or social movements, span a wide range of scales and significances, revealing the struggles, triumphs, and transformations that have defined the course of human history. Each event serves as a reflection of its time, highlighting the evolving values, power dynamics, and collective aspirations that have influenced societies across different eras.",
	works: "The selected works exemplify the diverse and significant contributions that creative expression has made throughout history, offering insights into key pieces that reflect the evolving cultural, artistic, and intellectual currents of various societies. These works, whether in literature, visual arts, music, or other forms, span a broad spectrum of styles and genres, revealing the struggles, inspirations, and transformations that have shaped human creativity. Each piece serves as a testament to the power of artistic expression to challenge norms, provoke thought, and inspire change, highlighting the dynamic interplay between culture and society across different eras.",
	XV: "The selected artifacts from the 15th to 17th centuries illustrate the profound and multifaceted transformations that occurred during this dynamic period in history, reflecting key moments and objects that shaped the political, cultural, and social landscapes of Europe and beyond. Spanning the Renaissance, the Reformation, and the Age of Exploration, this era was marked by an explosion of artistic innovation, scientific discovery, and religious upheaval. Artifacts from these centuries reveal the struggles and triumphs of individuals and communities as they navigated shifting power dynamics, challenged established norms, and expanded their horizons through exploration and colonization. These pieces serve as vital reminders of the rich tapestry of human experience, highlighting the interconnections between creativity, belief, and the quest for knowledge that defined the 15th to 17th centuries.",
	XVII: "The selected artifacts from the 17th to 19th centuries illuminate the transformative changes that defined this critical period in history, reflecting key moments and objects that shaped the political, cultural, and social landscapes across the globe. This era witnessed the rise of Enlightenment thought, the expansion of empires, and significant social upheavals, including revolutions and movements for rights and freedoms. Artifacts from these centuries reveal the complexities of industrialization, the evolution of artistic expression, and the shifting dynamics of power and class. They highlight the struggles and aspirations of individuals and groups as they sought to redefine society, challenge oppressive structures, and embrace new ideas. These pieces serve as essential reminders of the rich interplay between innovation, ideology, and social change that characterized the 17th to 19th centuries.",
	FIRST: "The selected artifacts from the first half of the 20th century reflect the dramatic and transformative changes that characterized this tumultuous period in history, showcasing key moments and objects that shaped global political, cultural, and social landscapes. This era witnessed two world wars, the rise and fall of empires, and significant movements for social justice and civil rights. Artifacts from this time reveal the complexities of technological advancement, artistic innovation, and ideological struggle, as societies grappled with the consequences of conflict and the quest for progress. They highlight the voices of individuals and groups who challenged norms and advocated for change, illustrating the profound impact of modernity on everyday life. These pieces serve as important reminders of the resilience and creativity of humanity in the face of upheaval, as well as the ongoing pursuit of identity and meaning in an increasingly interconnected world.",
	SECOND: "The selected artifacts from the second half of the 20th century illustrate the profound and varied changes that shaped this dynamic period in history, reflecting key moments and objects that influenced global political, cultural, and social landscapes. This era was marked by the aftermath of World War II, the Cold War, the civil rights movement, and significant shifts in technology and culture. Artifacts from this time reveal the complexities of decolonization, the rise of counterculture, and the ongoing struggles for equality and justice. They highlight the voices of individuals and movements that challenged established norms, embraced new ideologies, and sought to redefine identities in an increasingly interconnected world. These pieces serve as crucial reminders of the resilience of the human spirit and the transformative power of creativity, activism, and innovation during a time of rapid change and global interdependence.",
	XXI: "The selected artifacts from the 21st century illuminate the rapid and multifaceted changes that define this current era, reflecting key moments and objects that shape contemporary political, cultural, and social landscapes. This period has been characterized by significant technological advancements, globalization, and urgent discussions around issues such as climate change, social justice, and human rights. Artifacts from this time reveal the complexities of a digital age, where information flows freely and communities are both connected and divided. They highlight the voices of diverse individuals and movements that challenge traditional power structures, advocate for inclusivity, and strive for sustainable futures. These pieces serve as vital reminders of the dynamic interplay between innovation, activism, and cultural expression, illustrating the ongoing quest for identity, belonging, and meaningful change in an increasingly interconnected world.",

  };

/* 
END NARRATIVES PAGE
*/

/* 
START MAP PAGE
*/
function showList() {
	const listContainer = document.getElementById('list-container');
	const icon = document.getElementById('icon');
  
	// Toggle display between 'none' and 'block'
	if (listContainer.style.display === 'none' || listContainer.style.display === '') {
	  listContainer.style.display = 'block';
	  icon.style.transform = 'rotate(180deg)'; // Rotate icon by 180°
	} else {
	  listContainer.style.display = 'none';
	  icon.style.transform = 'rotate(0deg)'; // Reset icon rotation
	}
  }
  
/* 
END MAP PAGE
*/

/* index.html functions START */

// Funzione per attivare e disattivare con un click il menu hamburger
function toggleCurtain() {
	let menu_links = document.getElementById('menu-links');
	let toggleButton = document.getElementById('toggleButton');
	if (menu_links.style.display === "grid") {
		menu_links.style.display = "none";
	} else {
		menu_links.style.display = "grid";
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
});

/* index.thml functions END */

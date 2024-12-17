// Global variables 
let index = 0; 
let items = [];             // Array to store all items from the JSON
let narratives = [];        // Array to store narratives
let currentSelection = [];  // Array to store filtered items
let currentNarrative = "";  // Current narrative filter selected
let currentValue = "";      // Current value for the narrative filter
let currentSort = "";       // Sorting index for the current item
let nar = sessionStorage.getItem("nar");    // Retrieve "nar" value from sessionStorage
let value = sessionStorage.getItem("value");// Retrieve "value" from sessionStorage


// Funzione per attivare e disattivare con un click il menu hamburger / Romolo
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

document.addEventListener("DOMContentLoaded", function() {
    
    // Romolo // Event Listener per far apparire il layer con le frecce di navigazione e 
    // per farlo sparire quando il puntatore esce dall'area
    const switchPanel = document.getElementById("switchPanel");

    switchPanel.addEventListener("mouseover", () => {
        switchPanel.style.opacity = "1";
    });

    switchPanel.addEventListener("mouseout", () => {
        switchPanel.style.opacity = "0";
    });

    // inizio FUNZIONI PER SELECTED CUSTOMIZATO
    // Adattamento elementi selected a larghezza loro opzioni
    const sel_spans = document.getElementsByClassName("selected");
    const arrowDown = document.getElementsByClassName("arrow-down")[0];

    for (let i = 0; i < sel_spans.length; i++) {
        const sel_span = sel_spans[i];
        const name = sel_span.dataset.name;
        const opts_div = document.getElementById(name);
        sel_span.style.width =  `${opts_div.offsetWidth + (arrowDown.offsetWidth * 1.5) }px`; //non sono quote ma backtick;
        
        // auto selezione iniziale e selezione con click
        sel_span.innerHTML = opts_div.children[0].innerHTML;
        const opts_children = opts_div.children;

        for (let j = 0; j < opts_children.length; j++) {
            opt = opts_children[j];
            opt.addEventListener("click", function() {
                sel_span.innerHTML = this.innerHTML;
                sel_span.dataset.value = this.dataset.value;
                opts_div.style.visibility = "hidden";
            });
        };
    };

    // apertura e chiusura opzioni
    const toggle_opts_divs = document.getElementsByClassName("toggle-options");
    for (let i = 0; i < toggle_opts_divs.length; i++) {
        const toggle = toggle_opts_divs[i];
        toggle.addEventListener("click", function() {
            const parent = this.parentElement;
            const opts = parent.nextElementSibling;
            const visible = (opts.style.visibility === "visible");
            if (visible) {
                opts.style.visibility = "hidden";
            } else {
                opts.style.visibility = "visible";
            }
        })
    }
    // fine FUNZIONI PER SELECTED CUSTOMIZATO

    // fissare linea link menu navbar in base a selezione
	// Ottieni l'URL corrente
    const currentUrl = window.location.href;

    // Seleziona tutti i link con la classe nav-link
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Controlla se l'href del link corrisponde all'URL corrente
        if (link.href === currentUrl) {
            // Aggiungi la classe 'active' al link corrispondente
            link.classList.add('perm');
        }
    });
    
});


// JSON Data / Lucrezia

document.addEventListener("DOMContentLoaded", async function(event) { // add event listener to the document object // when DOMContentLoaded event is triggered
    fetch('assets/data/items.json') // Fetch the JSON file containing item data
    .then(response => response.json())
    .then(data => {	
        items = data.items; // Store all items
        let startWith = data.meta.startWith; // Index of the starting item
        let item = items[startWith]; // Select the starting item
        narratives = data.meta.narratives;
        currentNarrative = data.meta.startNarrative;
        currentValue = data.meta.startValue; // Default value for narrative
        prepareNarratives();                  
    })
    
});

function prepareNarratives() {
    // Resetta le caselle di selezione nel search-space
    resetSelectionFields();

    if (sessionStorage.getItem("redirect")) {
        redirectTrue(); // Handle case when redirected from another page / Pietro
    } else {
        redirectFalse(); // Default filtering behavior
    }
};

function redirectTrue(){
    let itemRedirect = sessionStorage.getItem("itemRedirect");
    currentNarrative = sessionStorage.getItem("nar");
    currentValue = sessionStorage.getItem("value");
    sessionStorage.clear();
    counter = -1;
    sortItemIndex = 0;

    // Filtra gli item in base alla narrativa
    currentSelection = items.filter(i => 
        i.info[currentNarrative]?.includes(currentValue)
    );

    if (currentSelection.length === 0) currentSelection = items; // Fallback to all items if no match

    // Ordina i risultati in base al campo '@sort'
    currentSelection.sort((i, j) => i['@sort'] - j['@sort']);

    // Aggiorna l'indice dell'item selezionato
    currentSelection.forEach(sel => {
        counter++;
        if (sel["@sort"] === itemRedirect) {
            sortItemIndex = counter;
        }
        
    });

    // Aggiorna gli indici e mostra l'item selezionato
    updateIndices();
    showInfo(sortItemIndex);
};

function redirectFalse(){
    // Filtra gli item in base alla narrativa
    currentSelection = items.filter(i => 
        i.info[currentNarrative]?.includes(currentValue)
    );

    currentSelection.sort((i, j) => i['@sort'] - j['@sort']);

    if (currentSelection.length === 0) currentSelection = items;

    // Aggiorna gli indici e mostra il primo risultato
    updateIndices();
    showInfo(0);
}

function resetSearchResults() {
    const results = document.getElementById("results");

    // Pulisce i risultati attuali nel search-space
    results.style.visibility = "hidden";  // Nasconde i risultati fino al filtro

    // Azzera altre variabili di stato se necessario
    currentSelection = [];
    index = -1;
    currentSort = null; // Resetta anche l'ordinamento se applicabile
}

function resetSelectionFields() {
    // Reset dei dropdown dei temi
    const themesSelected = document.querySelector('.selected[data-name="Themes"]');
    themesSelected.setAttribute('data-value', '');
    themesSelected.innerText = 'All';

    // Reset del dropdown della tipologia
    const typologySelected = document.querySelector('.selected[data-name="Typology"]');
    typologySelected.setAttribute('data-value', '');
    typologySelected.innerText = 'All';

    // Reset del dropdown del periodo storico
    const periodSelected = document.querySelector('.selected[data-name="Historical period"]');
    periodSelected.setAttribute('data-value', '');
    periodSelected.innerText = 'All';
}


function updateIndices() {
    let indicesBar = "";
    for (let curSelIndex = 0; curSelIndex < currentSelection.length; curSelIndex++) {
        let displayedIndex = curSelIndex + 1;
        indicesBar += "<a class=\"index\" id=\""+curSelIndex+"\" onclick=showInfo("+curSelIndex+")>"+displayedIndex+"</a>"
    }
    inner("indicesBox", indicesBar, true);
}

function showInfo(index) {
    let item = currentSelection[index];
    currentSort = item['@sort'];
    inner("title-header",item.shortName);

    // Creazione dell'elemento div contenente l'icona
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon-class");  // Aggiungi classe div

    const iconImg = document.createElement("img");
    iconImg.src = item.info.icon;
    iconImg.alt = "Icon of:";
    iconImg.classList.add("icon-obj");
    iconDiv.appendChild(iconImg);

    // Seleziona l'elemento h3 title-header
    const titleHeader = byId("title-header");

    // Inserisci l'icona prima dell'h3
    titleHeader.insertBefore(iconDiv, titleHeader.firstChild);

    byId("img").src = item.image;
    byId("img").alt = item.shortName;
    createInfoTable(item);
    inner("shortInfo",`<p>${item.shortInfo}</p>`); 
    inner("longerInfo",`<p>${item.longerInfo.join("</p><p>")}</p>`);
    byId("fullInfo").dataset['uri'] = item.fullInfo;
    highlightIndex(index);
}

function inner(id,content, emptyFirst=true) {
    if(emptyFirst) document.getElementById(id).innerHTML = "" ; 
    document.getElementById(id).innerHTML += content ; 
}

function byId(id) {
    return document.getElementById(id)
}

function createInfoTable(item) {
    inner("infoTable","",true) ;
    const exb_room = "<tr><th>Exhibition Room</th><td><a type=\"button\" class=\"btn\" href=\"#\" onclick=\"changeNarrative(\'Historical Period\',\'";
    for (i in item.info) {
        if (["Type", "Exhibition", "icon"].includes(i)) continue; 
        if (item.info[i] !== null) {
            if (narratives.includes(i)) {
                if (i==="Historical Period") {
                    inner("infoTable",exb_room + item.info[i] +"\')\">" + item.info[i] + "</a></td></tr>", false);
                } else {
                    let themes = item.info[i].split(", ");
                    let val = [];
                    for (j in themes) {
                        let theme = themes[j];
                        if (theme==="Women's history") {
                            theme = "Women\\&#39;s history";
                        }
                        val.push(`<a type="button" class="btn" href="#" onclick="changeNarrative('${i}', '${theme}')">${themes[j]}</a>`)
                    }
                    inner("infoTable","<tr><th>"+i+"</th><td>"+val.join(" ")+"</td></tr>", false);
                }
            } else {
                inner("infoTable","<tr><th>"+i+"</th><td>"+item.info[i]+"</td></tr>", false);
            };
        };
    };
};


// Funzione per evidenziare l'indice corrente nella barra degli indici / Romolo
function highlightIndex(n) {
    const indeces = document.getElementsByClassName("index");
    for (let i = 0; i < indeces.length; i++) {
        indeces[i].classList.remove("highlighted");
    }
    let numBar = document.getElementById(String(n));
    numBar.classList.add("highlighted");
    index = n;
}

// INIZIO funzioni per bottoni LESS - MORE / Lucrezia

function more() {
    let lessBtn = document.getElementById("lessBtn");
    let moreBtn = document.getElementById("moreBtn");

    lessBtn.removeAttribute("disabled");
    moreBtn.setAttribute("onclick", "muchMore();");
    show("longerInfo");
    hide("shortInfo")
}

function less() {
    let moreBtn = document.getElementById("moreBtn");
    let lessBtn = document.getElementById("lessBtn");

    moreBtn.setAttribute("onclick", "more();");
    lessBtn.setAttribute("disabled", "disabled");
    hide("longerInfo");
    show("shortInfo")
}

function muchMore() {
    let uri = byId("fullInfo").dataset['uri']
    let lessBtn = document.getElementById("lessBtn");
    let moreBtn = document.getElementById("moreBtn");

    fetch(uri)
    .then(response => response.text())
    .then(data => {	
        inner("fullInfoContent",data) ;
        show("fullInfo") ;
    })

    moreBtn.setAttribute("disabled", "disabled");
    lessBtn.setAttribute("onclick", "hideFullInfo();")
}

function hideFullInfo() {
    let moreBtn = document.getElementById("moreBtn");
    let lessBtn = document.getElementById("lessBtn");

    moreBtn.removeAttribute("disabled");
    moreBtn.setAttribute("onclick", "muchMore();")
    lessBtn.setAttribute("onclick", "less();")
    hide("fullInfo");
}

// FINE funzioni per bottoni LESS - MORE

// Funzioni narrative / Lucrezia e Romolo

function changeNarrative(narrative, value) {
    // Reset dei risultati nel search-space
    resetSearchResults();

    // Reset delle caselle di selezione nel search-space
    resetSelectionFields();

    // Aggiorna la narrativa selezionata
    currentNarrative = narrative;
    currentValue = value;

    // Filtra i risultati in base alla nuova selezione
    prepareNarratives();
}

function matchNarratives(item, narrativesList) {
    item_narratives = item.info.Themes.split(", ").concat(item.info.Typology.split(", "), [item.info["Historical Period"]]);
    for (let i = 0; i < narrativesList.length; i++) {
        if (narrativesList[i]==="") {continue}
        else if (!item_narratives.includes(narrativesList[i])) {return false;}
    };
    return true;
}

function combinedNarratives() {
    const results = document.getElementById("results");
    const sel_spans = document.getElementsByClassName("selected");
    const list = [];
    for (let i = 0; i < sel_spans.length; i++) {
        list.push(sel_spans[i].dataset.value);
    }

    const combo = items.filter(item => matchNarratives(item, list));

    if (combo.length===0) {
        results.innerHTML = "0 results";
    } else {
        results.innerHTML = `${combo.length} results`
        currentSelection = combo;
    }
    results.style.visibility = "visible";
    index = currentSelection.findIndex( i => i['@sort'] == currentSort )
    if (index == -1) index = 0;
    updateIndices();
    showInfo(index);
}

function show(id) {
    const element = document.getElementById(id);
    element.classList.remove('hidden'); // Rimuove lo stato "nascosto"
    element.classList.add('fade-in');  // Aggiunge l'animazione di dissolvenza
    setTimeout(() => element.classList.remove('fade-in'), 500); // Rimuove la classe dopo l'animazione
}

function hide(id) {
    document.getElementById(id).classList.add('hidden');
}

function switchItem(n) {
    index += n;
    if (index === currentSelection.length) {
        index = 0;
    } else if (index < 0) {
        index = currentSelection.length - 1;
    }
    showInfo(index);
};


//=========================
//
// ANIMAZIONI DISSOLVENZA  / Lucrezia
//
// ========================

window.addEventListener('load', () => {
    // Animazione dal basso verso l'alto
    const elementsBottomUp = document.querySelectorAll('.hidden-animation-bottom-up');
    elementsBottomUp.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-bottom-up');
            element.classList.add('fade-in-up');
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });

    // Animazione dall'alto verso il basso
    const elementsTopDown = document.querySelectorAll('.hidden-animation-top-down');
    elementsTopDown.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-top-down');
            element.classList.add('fade-in-down');
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });

    // Animazione dal centro
    const elementsCenter = document.querySelectorAll('.hidden-animation-center');
    elementsCenter.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-center');
            element.classList.add('fade-in-center');
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });

    // Animazione da sinistra
    const elementsLeft = document.querySelectorAll('.hidden-animation-left');
    elementsLeft.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-left');
            element.classList.add('fade-in-left');
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });

    // Animazione da destra
    const elementsRight = document.querySelectorAll('.hidden-animation-right');
    elementsRight.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-right');
            element.classList.add('fade-in-right');
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });
});

//=========================
//  INIZIO TENDINE FILTER  // Lucrezia
// ========================

document.addEventListener('click', (event) => {
    // Seleziona tutti i dropdown attivi
    const dropdowns = document.querySelectorAll('.options');
    const selects = document.querySelectorAll('.select'); // Seleziona tutti i div select

    // Chiudi tutti i dropdown se il click non è dentro un dropdown
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
            dropdown.style.visibility = 'hidden';
            dropdown.style.opacity = '0';
        }
    });

    // Controlla se l'utente ha cliccato su un div.select per aprire/chiudere il relativo menu
    selects.forEach((select) => {
        if (select.contains(event.target)) {
            const dropdown = select.querySelector('.options'); // Trova il menu associato
            const isVisible = dropdown.style.visibility === 'visible'; // Verifica se il menu è visibile

            // Mostra o nasconde il dropdown
            dropdown.style.visibility = isVisible ? 'hidden' : 'visible';
            dropdown.style.opacity = isVisible ? '0' : '1';
        }
    });

    // Se l'utente clicca su un'opzione, chiudi il menu
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        if (option.contains(event.target)) {
            const dropdown = option.closest('.select').querySelector('.options');
            dropdown.style.visibility = 'hidden';
            dropdown.style.opacity = '0';

            // Aggiorna la selezione del valore
            const selectedBox = option.closest('.select').querySelector('.selected');
            selectedBox.setAttribute('data-value', option.getAttribute('data-value'));
            selectedBox.textContent = option.textContent; // Cambia il testo della selezione
        }
    });
});

//=========================
//  FINE TENDINE         //
// ========================

//=========================
//  INIZIO NARRATIVE     // Funzioni Pietro
// ========================

function goNar(btn){
    let redirect = true;

    let nar = btn.dataset.nar; 
    let value = btn.dataset.value;
    
    sessionStorage.setItem("nar",nar);
    sessionStorage.setItem("value",value);
    sessionStorage.setItem("redirect",redirect);
    window.location.href = `items.html`;

}

// Function to call when an item is clicked
function goItem(listElement) {
    
    let redirect = true;
    let itemRedirect =  listElement.dataset.item
    let nar = listElement.dataset.nar; 
    let value = listElement.dataset.value;
    sessionStorage.setItem("itemRedirect",itemRedirect);
    sessionStorage.setItem("nar",nar);
    sessionStorage.setItem("value",value);
    sessionStorage.setItem("redirect",redirect);
    window.location.href = `items.html`;
}


//=========================
//  FINE NARRATIVE       //
// ========================
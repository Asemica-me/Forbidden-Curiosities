let index = 0;
let items = [];
let narratives = [];
let currentSelection = [];
let currentNarrative = "";
let currentValue = "";
let currentSort = "";

// Funzione per attivare e disattivare con un click il menu hamburger
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
    
    // Event Listener per far apparire il layer con le frecce di navigazione e 
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
    
});

// JSON Data
document.addEventListener("DOMContentLoaded", async function(event) {
    fetch('assets/data/items.json')
    .then(response => response.json())
    .then(data => {	
        items = data.items;
        let startWith = data.meta.startWith;
        let item = items[startWith];

        narratives = data.meta.narratives;
        currentNarrative = data.meta.startNarrative;
        currentValue = data.meta.startValue;
        prepareNarratives();                  
    })
});

function prepareNarratives() {
    currentSelection = items.filter( i => 
        i.info[currentNarrative]?.includes(currentValue)
    );
    currentSelection.sort( (i,j) =>  
        i['@sort'] < j['@sort'] ? -1 : 1
    );
    if (currentSelection.length==0) currentSelection = items;

    updateIndices();
    showInfo(0);
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
    inner("title-header",item.info.Title);
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
        if (["Type", "Controversies/Debates", "Significance", "Exhibition"].includes(i)) continue; 
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
                    inner("infoTable","<tr><th>"+i+"</th><td>"+val.join(", ")+"</td></tr>", false);
                }
            } else {
                inner("infoTable","<tr><th>"+i+"</th><td>"+item.info[i]+"</td></tr>", false);
            };
        };
    };
};


// Funzione per evidenziare l'indice corrente nella barra degli indici
function highlightIndex(n) {
    const indeces = document.getElementsByClassName("index");
    for (let i = 0; i < indeces.length; i++) {
        indeces[i].classList.remove("highlighted");
    }
    let numBar = document.getElementById(String(n));
    numBar.classList.add("highlighted");
    index = n;
}

// INIZIO funzioni per bottoni LESS - MORE

function more() {
    let lessBtn = document.getElementById("lessBtn");
    let moreBtn = document.getElementById("moreBtn");

    lessBtn.removeAttribute("disabled");
    moreBtn.setAttribute("onclick", "muchMore();");
    show("longerInfo");
}

function less() {
    let moreBtn = document.getElementById("moreBtn");
    let lessBtn = document.getElementById("lessBtn");

    moreBtn.setAttribute("onclick", "more();");
    lessBtn.setAttribute("disabled", "disabled");
    hide("longerInfo");
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

function changeNarrative(narrative,value) {
        currentNarrative = narrative;
        currentValue = value;
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
    document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
    document.getElementById(id).classList.add('hidden');
}

// Funzione per cambiare oggetto da vedere da applicare sui pulsanti a destra e a sinistra dell'immagine
function switchItem(n) {
        index += n;
        if (index === currentSelection.length) {
            index = 0;
        } else if (index < 0) {
            index = currentSelection.length - 1;
        }
        showInfo(index);
    };


// FUNZIONE ANIMAZIONE DISSOLVENZA BOTTOM-UP
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.hidden-animation-bottom-up'); // Seleziona tutti gli elementi con classe 'hidden'
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-bottom-up'); // Rimuovi stato iniziale
            element.classList.add('fade-in-up'); // Aggiungi animazione
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });
});


    // FUNZIONE ANIMAZIONE DISSOLVENZA TOP-DOWN
    window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.hidden-animation-top-down'); // Seleziona tutti gli elementi con classe 'hidden'
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('hidden-animation-top-down'); // Rimuovi stato iniziale
            element.classList.add('fade-in-down'); // Aggiungi animazione
        }, index * 200); // Ritardo sequenziale tra gli elementi
    });
});

//=========================
//  TENDINE              //
// ========================



//=========================
//  FINE TENDINE         //
// ========================
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

document.addEventListener("DOMContentLoaded", function() {
    // Event Listener per aprire i pannelli delle narratives
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

    // Event Listener per far apparire il layer con le frecce di navigazione e 
    // per farlo sparire dopo 5 secondi
    const switchPanel = document.getElementById("switchPanel");

    switchPanel.addEventListener("mouseover", () => {
        switchPanel.style.opacity = "1";
    });

    switchPanel.addEventListener("mouseout", () => {
        switchPanel.style.opacity = "0";
    });

    // inizio FUNZIONI PER SELECTED CUSTOMIZATO
    // Adattamento elementi selected a larghezza loro opzioni
    const sel_boxes = document.getElementsByClassName("selected-box");
    const opts_divs = document.getElementsByClassName("options");
    const sel_spans = document.getElementsByClassName("selected");
    const guide = document.getElementById("guide");

    for (let i = 0; i < sel_spans.length; i++) {
        const sel_span = sel_spans[i];
        const name = sel_span.dataset.name;
        const opts_div = document.getElementById(name);
        sel_span.style.width =  `${opts_div.offsetWidth+7}px`; //non sono quote ma backtick; 7 sono i px della freccetta
        
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

function highlightIndex(index) {
    const indeces = document.getElementsByClassName("index");
    for (let i = 0; i < indeces.length; i++) {
        indeces[i].classList.remove("highlighted");
    }
    let numBar = document.getElementById(String(index));
    numBar.classList.add("highlighted");
}

function showInfo(index) {
    let item = currentSelection[index]
    currentSort = item['@sort']
    inner("title-header",item.info.Title) ;
    byId("img").src = item.image
    byId("img").alt = item.shortName
    createInfoTable(item)
    inner("shortInfo",`<p>${item.shortInfo}</p>`); 
    inner("longerInfo",`<p>${item.longerInfo.join("</p><p>")}</p>`);
    byId("fullInfo").dataset['uri'] = item.fullInfo;
    highlightIndex(index);
}

function more() {
    const moreBtn = document.getElementById("moreBtn");
    const shortBtn = document.getElementById("shortBtn");
    moreBtn.removeAttribute("href");
    moreBtn.removeAttribute("onclick");
    moreBtn.style.cursor = "default";
    moreBtn.style.opacity = "0.5";
    shortBtn.style.cursor = "pointer";
    shortBtn.setAttribute("onclick", "less()");
    shortBtn.setAttribute("href", "#");
    shortBtn.style.opacity = "1";

    hide("shortInfo");
    show("longerInfo");
    hide("fullInfo");
}

function less() {
    const moreBtn = document.getElementById("moreBtn");
    const shortBtn = document.getElementById("shortBtn");
    shortBtn.removeAttribute("href");
    shortBtn.removeAttribute("onclick");
    shortBtn.style.cursor = "default";
    shortBtn.style.opacity = "0.5";
    moreBtn.style.cursor = "pointer";
    moreBtn.setAttribute("onclick", "more()");
    moreBtn.setAttribute("href", "#");
    moreBtn.style.opacity = "1";

    hide("longerInfo");
    show("shortInfo");
}

function muchMore() {
    let uri = byId("fullInfo").dataset['uri']
    fetch(uri)
    .then(response => response.text())
    .then(data => {	
        inner("fullInfoContent",data) ;
        show("fullInfo") ;
    })
    document.body.style.overflow = "hidden";
}

function hideFullInfo() {
    hide("fullInfo");
    document.body.style.overflow = "";
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
                        if (themes[j]==="Women's history") {theme = "Women\\&#39;s history";}
                        else {theme = themes[j];}
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

function updateIndices() {
    let indicesBar = "";
    for (let curSelIndex = 0; curSelIndex < currentSelection.length; curSelIndex++) {
        let displayedIndex = curSelIndex + 1;
        indicesBar += "<a class=\"index\" id=\""+curSelIndex+"\" onclick=showInfo("+curSelIndex+")>"+displayedIndex+"</a>"
    }
    inner("indicesBox", indicesBar, true);
}

function prepareNarratives() {
    currentSelection = items.filter( i => 
        i.info[currentNarrative]?.includes(currentValue)
    );
    currentSelection.sort( (i,j) =>  
        i['@sort'] < j['@sort'] ? -1 : 1
    );
    if (currentSelection.length==0) currentSelection = items;

    index = currentSelection.findIndex( i => i['@sort'] == currentSort )
    if (index == -1) index = 0;
    updateIndices();
    showInfo(index);
}

function changeNarrative(narrative,value) {
        currentNarrative = narrative
        currentValue = value
        prepareNarratives()
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
    let alert = document.getElementById("noResults");
    if (!alert.classList.contains("hidden")) { //All'inizio di una nuova ricerca si rimuove
        alert.classList.add("hidden");         //l'avviso di fallimento se è presente.
    }

    const sel_spans = document.getElementsByClassName("selected");
    const list = [];
    for (let i = 0; i < sel_spans.length; i++) {
        list.push(sel_spans[i].dataset.value);
    }

    const combo = items.filter(item => matchNarratives(item, list));

    
    if (combo.length===0) {
        alert.classList.remove("hidden"); // Appare il messaggio che comunica il fallimento della ricerca e rimane la narrativa selezionata in precedenza
    } else {
        currentSelection = combo;
    }
    index = currentSelection.findIndex( i => i['@sort'] == currentSort )
    if (index == -1) index = 0;
    updateIndices();
    showInfo(index);
}

function byId(id) {
    return document.getElementById(id)
}

function show(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
    document.getElementById(id).classList.add('hidden');
}

function inner(id,content, emptyFirst=true) {
    if(emptyFirst) document.getElementById(id).innerHTML = "" ; 
    document.getElementById(id).innerHTML += content ; 
}

// Funzione per cambiare oggetto da vedere da applicare sui pulsanti a destra e a sinistra dell'immagine
function switchItem(n) {
        index += n;
        if (index > currentSelection.length) index = 0;
        else if (index < 0) index = currentSelection.length - 1;
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
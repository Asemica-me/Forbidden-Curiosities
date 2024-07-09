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


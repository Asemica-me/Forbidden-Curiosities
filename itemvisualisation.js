var items = []
var narratives = []
var currentSelection = []
var currentNarrative =""
var currentValue=""
var currentSort = ""


document.addEventListener("DOMContentLoaded", async function(event) {
	console.log(" DO NOT PEEP o((>ω< ))o")
	fetch('https://raw.githubusercontent.com/KodeKronicles/codechronicles.github.io/main/data.json')
	.then(response => response.json())
	.then(data => {	
		items = data.items
		var startWith = data.meta.startWith
		var item = items[startWith]

		narratives = data.meta.narratives
		currentNarrative = data.meta.startNarrative
		currentValue = data.meta.startValue
		prepareNarratives()
	})
});



function prepareNarratives() {
	currentSelection = items.filter( i => 
		i.info["Type of device"]?.includes(currentNarrative) 
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
	inner("fullHeader",item.info.Name) ;
	byId("img").src = item.image
	byId("img").alt = item.shortName
	createInfoTable(item)
	inner("shortInfo","<p>"+item.shortInfo + "</p><p>" + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="more()">Tell me more...</a></p>'); 
	inner("mediumInfo","<p>"+item.mediumInfo + "</p><p>" + '<a type="button" class="btn btn-outline-primary btn-sm" onclick="less()">Tell me less</a> or <a type="button" class="btn btn-outline-primary btn-sm" onclick="muchMore()">Tell me even more...</a></p>'); 
	byId("longInfo").dataset['uri'] = item.longInfo
	currentValue = item.shortName
	prepareNavigationButtons(index)
}

function more() {
	hide("shortInfo") ;
	show("mediumInfo") ;
	hide("longInfo") ;
}
function less() {
	hide("mediumInfo") ;
	show("shortInfo") ;
	hide("longInfo") ;
}
function muchMore() {
	var uri = byId("longInfo").dataset['uri']
	fetch(uri)
	.then(response => response.text())
	.then(data => {	
		inner("longInfoContent",data) ;
		hide("mainCard") ;
		show("longInfo") ;
		window.scrollTo(0,0)
	})
}
function hideLongInfo() {
	hide("mediumInfo") ;
	show("shortInfo") ;
	hide("longInfo") ;
	show("mainCard") ;
}

function createInfoTable(item) {
	inner("infoTable","",true) ;
	for (i in item.info) {
		if (item.info[i] !== null) {
			if(i == "Invention date"){
				var items = item.info[i].split(", ")
				var val = []
				for (j in items) {
					val.push('<a class="button" role="button" href="#" onclick="changeNarrative(\''+"Timeline"+'\',\''+items[j]+'\')">'+items[j]+'</a>')
				}
				inner("infoTable","<tr><th>"+i+"</th><td>"+val.join(", ")+"</td></tr>", false)
			}
			else if (narratives.includes(item.info[i])) {
				var items = item.info[i].split(", ")
				var val = []
				for (j in items) {
					val.push('<a class="button" role="button" href="#" onclick="changeNarrative(\''+item.info[i]+'\',\''+items[j]+'\')">'+items[j]+'</a>')
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
		inner('narrative', currentNarrative+": "+currentValue)
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



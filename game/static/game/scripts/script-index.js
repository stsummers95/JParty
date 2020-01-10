episodeList = [['Select a season!']]
seasonList = ['Select a season!']
var listBeginner = ['Select an episode!']

function populateEpisodesList() {
	var dropdown = document.getElementById("seasonList")
	var selected = dropdown.value
	console.log(dropdown)
	console.log(selected)
	episodeHTML = ""
	if(selected == "s") {
		episodeHTML = "<option value=\"0\">Select a season!</option>"
	}
	else {
		for (episode in episodeList[selected]) {
			episodeHTML += "<option value=\"" + episodeList[selected][episode] + "\">" + episodeList[selected][episode] + "</option>"
		}
	}
	document.getElementById("episodeList").innerHTML = episodeHTML
	setOKButton()
}

function populateSeasonsList() {
	var dropdown = document.getElementById('seasonList')
	value = ""
	seasonHTML = ""
	for (season in seasonList) {
		console.log(season)
		console.log(seasonList[season])
		if(seasonList[season] == 'Select a season!') {
			value = "s"
		}
		else if(seasonList[season] == 'Super Jeopardy!') {
			value = "sj"
		}
		else if(seasonList[season] < 7) {
			value = parseInt(seasonList[season]) + 1
		}
		else {
			value = parseInt(seasonList[season]) + 2
		}
		seasonHTML += "<option value = \"" + value + "\">" + seasonList[season] + "</option>"
	}
	dropdown.innerHTML = seasonHTML
}

function eList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			episodeTextRaw = JSON.parse(this.responseText)
			for(var i = 0; i < episodeTextRaw.length; i++) {
				episodeList.push([])
				episodeList[i+1].push(listBeginner)
				for(var j = 0; j < episodeTextRaw[i].length; j++) {
					episodeList[i+1].push(episodeTextRaw[i][j][1])
				}
				if(episodeList[i+1].length != 1) {
					if(i == 0) {
						seasonList.push("Pilot Season")
					}
					else if(i < 7) {
						seasonList.push(i.toString())
					}
					else if(i == 7) {
						seasonList.push("Super Jeopardy!")
					}
					else {
						seasonList.push((i-1).toString())
					}
				}
			}
			populateSeasonsList()
			populateEpisodesList()
		}
	}
	xhttp.open("GET", "ajax/", true)
	xhttp.send()
}

eList()

function setOKButton() {
	var episodeSelect = document.getElementById("episodeList")
	var button = document.getElementById("submitButton")
	console.log(episodeSelect.selectedIndex)
	if(episodeSelect.selectedIndex == 0 || episodeSelect.selectedIndex == -1) {
		console.log("zero")
		button.disabled = true
		if(button.classList.contains("button-enabled")) {
			button.classList.remove("button-enabled")
		}
	}
	else {
		console.log("not zero")
		button.disabled = false
		if(!button.classList.contains("button-enabled")) {
			button.classList.add("button-enabled")
		}
		var form = document.getElementById("form")
		form.setAttribute("action", "/game/" + episodeSelect.value.toString())
	}
}

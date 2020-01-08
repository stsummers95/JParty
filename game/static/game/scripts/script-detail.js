let round = "jeopardy"
let cluesClicked = 0;
let ep = ""
let jeopardyRoundClickedClues = [];
let doubleRoundClickedClues = [];

function runFirst(episode, eventRound) {
	if(episode != null) {
		ep = episode;
	}
	let clues = document.querySelectorAll('.clue');
	let screenNode = document.querySelector('.entire-screen');
	let categories = document.querySelectorAll('.category');
	let roundOffset = round == "double" ? 30 : 0;
	let moneyMultiplier = ep[0].fields.episode >= 3966 ? 2 : 1;
	let doubleJMultiplier = round == "double" ? 2 : 1;
	cluesClicked = 0;
	categories.forEach((category) => {
		if(category.classList.contains('col1')) {
			category.children[0].textContent = ep[roundOffset].fields.category.toUpperCase();
		}
		else if(category.classList.contains('col2')) {
			category.children[0].textContent = ep[5 + roundOffset].fields.category.toUpperCase();
		}
		else if(category.classList.contains('col3')) {
			category.children[0].textContent = ep[10 + roundOffset].fields.category.toUpperCase();
		}
		else if(category.classList.contains('col4')) {
			category.children[0].textContent = ep[15 + roundOffset].fields.category.toUpperCase();
		}
		else if(category.classList.contains('col5')) {
			category.children[0].textContent = ep[20 + roundOffset].fields.category.toUpperCase();
		}
		else if(category.classList.contains('col6')) {
			category.children[0].textContent = ep[25 + roundOffset].fields.category.toUpperCase();
		}
	});
	clues.forEach((clue) => {
		let clicked = false;
		clue.classList.remove("no-clue");
		if(ep[parseInt(clue.id) - 1 + roundOffset].fields.clue_text == "") {
			clue.children[0].textContent = "";
			clue.classList.add("no-clue");
			cluesClicked++;
		}
		else {
			if(clue.classList.contains('row1')) {
				clue.children[0].textContent = "$" + (100 * moneyMultiplier * doubleJMultiplier);
			}
			else if(clue.classList.contains('row2')) {
				clue.children[0].textContent = "$" + (200 * moneyMultiplier * doubleJMultiplier);
			}
			else if(clue.classList.contains('row3')) {
				clue.children[0].textContent = "$" + (300 * moneyMultiplier * doubleJMultiplier);
			}
			else if(clue.classList.contains('row4')) {
				clue.children[0].textContent = "$" + (400 * moneyMultiplier * doubleJMultiplier);
			}
			else if(clue.classList.contains('row5')) {
				clue.children[0].textContent = "$" + (500 * moneyMultiplier * doubleJMultiplier);
			}
			if(round == "jeopardy" && !jeopardyRoundClickedClues.includes(parseInt(clue.id)-1) ||
				round == "double" && !doubleRoundClickedClues.includes(parseInt(clue.id)-1)) {
				if(round == "jeopardy") {
					let a = jeopardyRoundClickedClues.push(parseInt(clue.id)-1);
				}
				else if(round == "double") {
					let b = doubleRoundClickedClues.push(parseInt(clue.id)-1);
				}
				clue.addEventListener('click', () => {
					if(clicked == false && round == eventRound) {
						clicked = true;
						cluesClicked++;
						if(round == "jeopardy") {
							let index = jeopardyRoundClickedClues.indexOf(parseInt(clue.id)-1);
							jeopardyRoundClickedClues.splice(index, 1);
						}
						else if(round == "double") {
							let index = doubleRoundClickedClues.indexOf(parseInt(clue.id)-1);
							doubleRoundClickedClues.splice(index, 1);
						}
						clue.children[0].textContent = "";
						let clueText = document.createElement('div');
						clueText.setAttribute('class', 'answer-text');
						var rect = clue.getBoundingClientRect();
						clueText.style.top = rect.top + "px";
						clueText.style.left = rect.left + "px";
						clueText.style.width = (rect.right - rect.left) + "px";
						clueText.style.height = (rect.bottom - rect.top) + "px";
						console.log(clueText.style.height);
						screenNode.appendChild(clueText);
						let answer = document.createElement('p');
						answer.textContent = ep[parseInt(clue.id) - 1 + roundOffset].fields.clue_text.toUpperCase()
						answer.style.display = "table-cell";
						clueText.appendChild(answer);
						var windowWidth = Math.max( document.body.scrollWidth, document.body.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth, document.documentElement.offsetWidth);
						var windowHeight = Math.max( document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight);
						let initialTransition = false;
						var horizShift = (windowWidth/2) - rect.left - ((rect.right - rect.left) / 2);
						var vertShift = (windowHeight/2) - rect.top - ((rect.bottom - rect.top) / 2);
						var horizStretch = windowWidth/(rect.right - rect.left);
						var vertStretch = windowHeight/(rect.bottom - rect.top);
						clueText.addEventListener('mouseover', () => {
							if(!initialTransition) {
								clueText.style.transform = "translate(" + horizShift + "px, " + vertShift + "px) scale(" + horizStretch + ", " + vertStretch + ")";
								initialTransition = true;
								console.log("first");
							}
							else {
								//clueText.style.transform = "translate(0px, 0px)";
								console.log("other");
							}
						});
						let responseText = document.createElement('div');
						responseText.setAttribute('class', 'response-text');
						responseText.setAttribute('id', 'response');
						responseText.style.bottom = "0px";
						responseText.style.maxWidth = (windowWidth * 0.92) + "px";
						screenNode.appendChild(responseText);
						let response = document.createElement('p');
						response.textContent = ep[parseInt(clue.id) - 1 + roundOffset].fields.correct_response.toUpperCase();
						response.style.display = "table-cell";
						responseText.appendChild(response);
						let responseHeight = Math.max( responseText.clientHeight, responseText.offsetHeight, responseText.scrollHeight );
						console.log(responseHeight);
								//console.log(clueText.style.removeProperty("transform"));
						clueText.addEventListener('click', () => {
							let blackOverlay = document.createElement('div');
							blackOverlay.style.backgroundColor = "black";
							blackOverlay.style.position = "absolute";
							blackOverlay.style.top = "0px";
							blackOverlay.style.left = "0px";
							blackOverlay.style.height = windowHeight + "px";
							blackOverlay.style.width = windowWidth + "px";
							blackOverlay.style.zIndex = 1;
							screenNode.appendChild(blackOverlay);
							vertShift = vertShift - (responseHeight/2);
							var stretchRatio = horizStretch / vertStretch;
							vertStretch = (windowHeight - responseHeight)/(rect.bottom - rect.top);
							horizStretch = stretchRatio * vertStretch;
							clueText.style.transform = "translate(" + horizShift + "px, " + vertShift + "px) scale(" + horizStretch + ", " + vertStretch + ")";
							clueText.style.transition = "all 0.5s linear";
							clueText.style.transitionDelay = "0s";
							responseText.classList.toggle("fadein");
							let clickableScreen = document.createElement('div');
							clickableScreen.style.position = "absolute";
							clickableScreen.style.top = "0px";
							clickableScreen.style.left = "0px";
							clickableScreen.style.height = windowHeight + "px";
							clickableScreen.style.width = windowWidth + "px";
							clickableScreen.style.zIndex = "3";
							clickableScreen.style.opacity = 0;
							screenNode.appendChild(clickableScreen);
							clickableScreen.addEventListener("click", () => {
								console.log("click click click");	
								screenNode.removeChild(responseText);
								screenNode.removeChild(clueText);
								screenNode.removeChild(blackOverlay);
								screenNode.removeChild(clickableScreen);
							});
							if(cluesClicked == 30) {
								if(round == "jeopardy") {
									changeRound("double");
								}
								else if(round == "double") {
									changeRound("final")
								}
							}
							//screenNode.removeChild(clueText);
						});
					}
				});
			}
		}
	});
}

function playFinalRound(ep) {

}

function changeRound(newRound, ep) {
	round = newRound;
	runFirst(ep, eventRound=newRound);
}

function menuChange(indexLink) {
	console.log(indexLink);
	var menu = document.getElementById("menu");
	if(menu.selectedIndex == 0) {
		round = "jeopardy";
		runFirst(ep, "jeopardy");
	}
	else if(menu.selectedIndex == 1) {
		round = "double";
		runFirst(ep, "double");
	}
	else if(menu.selectedIndex == 2) {
		round = "final";
		playFinalRound(ep);
	}
	else {
		window.location.href = indexLink;
	}
}

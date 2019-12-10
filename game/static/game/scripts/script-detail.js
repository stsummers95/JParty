let round = "jeopardy"
let cluesClicked = 0;
let ep = ""

function runFirst(episode) {
	if(episode != null) {
		ep = episode;
	}
	let clues = document.querySelectorAll('.clue');
	let screenNode = document.querySelector('.entire-screen');
	let categories = document.querySelectorAll('.category');
	let roundOffset = round == "double" ? 30 : 0;
	let moneyMultiplier = ep[0].fields.episode >= 3966 ? 2 : 1;
	let doubleJMultiplier = round == "double" ? 2 : 1;
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
			clue.addEventListener('click', () => {
				if(clicked == false) {
					clicked = true;
					cluesClicked++;
					clue.children[0].textContent = "";
					let clueText = document.createElement('div');
					clueText.setAttribute('class', 'answer-text');
					clueText.style.position = "absolute";
					var rect = clue.getBoundingClientRect();
					clueText.style.top = rect.top + "px";
					clueText.style.left = rect.left + "px";
					clueText.style.width = (rect.right - rect.left) + "px";
					clueText.style.height = (rect.bottom - rect.top) + "px";
					clueText.style.display = "table";
					clueText.style.textShadow = "0.05em 0.05em black";
					screenNode.appendChild(clueText);
					let answer = document.createElement('p');
					console.log(ep[parseInt(clue.id) - 1 + roundOffset].fields.clue_text);
					answer.textContent = ep[parseInt(clue.id) - 1 + roundOffset].fields.clue_text.toUpperCase()
					answer.style.display = "table-cell";
					clueText.appendChild(answer);
					clueText.addEventListener('mouseover', () => {
						var windowWidth = Math.max( document.body.scrollWidth, document.body.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth, document.documentElement.offsetWidth);
						var horizShift = (windowWidth/2) - rect.left - ((rect.right - rect.left) / 2);
						var windowHeight = Math.max( document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight);
						var vertShift = (windowHeight/2) - rect.top - ((rect.bottom - rect.top) / 2);
						clueText.style.transform = "translate(" + horizShift + "px, " + vertShift + "px) scale(" + windowWidth/(rect.right - rect.left) + ", " + windowHeight/(rect.bottom - rect.top) + ")";
					});
					clueText.addEventListener('click', () => {
						let responseText = document.createElement('div');
						if(cluesClicked == 5) {
							if(round == "jeopardy") {
								changeRound("double");
							}
							else if(round == "double") {
								changeRound("final")
							}
						}
						responseText.setAttribute('class', 'response-text');
						responseText.style.position = "absolute";
						screenNode.removeChild(clueText);
					});
				}
			});
		}
	});
}

function changeRound(newRound, ep) {
	round = newRound;
	runFirst();
}

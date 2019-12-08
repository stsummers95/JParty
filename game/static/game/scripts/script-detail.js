function runFirst(ep) {
let clues = document.querySelectorAll('.clue');
let screenNode = document.querySelector('.entire-screen');
clues.forEach((clue) => {
    clue.addEventListener('click', () => {
        clue.textContent = "";
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
		console.log(ep[parseInt(clue.id) - 1].fields.clue_text);
        answer.textContent = ep[parseInt(clue.id) - 1].fields.clue_text.toUpperCase()
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
			responseText.setAttribute('class', 'response-text');
			responseText.style.position = "absolute";
            screenNode.removeChild(clueText);
        });
    });
});

}

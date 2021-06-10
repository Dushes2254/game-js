var field = document.querySelector('#game-field');
var firstPlayer = document.querySelector('#first-player');
var secondPlayer = document.querySelector('#second-player');
var gameOver = document.querySelector('#game-over');
var form = document.forms.сharacters;
var startGame = form.elements['start-game'];

var getFieldStyles = getComputedStyle(field);
var fieldWidth = parseInt(getFieldStyles.width);
var fieldHeight = parseInt(getFieldStyles.height);

var firstPlayerCssSize = form.elements['first-player-css-size'];
var secondPlayerCssSize = form.elements['second-player-css-size'];
var firstPlayerSpeed = form.elements['first-player-speed'];
var secondPlayerSpeed = form.elements['second-player-speed'];

var minPlayerSize = 20;
var maxPlayerSize = 100;
var minPlayerSpeed = 1;
var maxPlayerSpeed = 10;

var keyState = {};

document.addEventListener('keydown', function (e) {
	keyState[e.keyCode] = true;
}, true);
document.addEventListener('keyup', function (e) {
	keyState[e.keyCode] = false;
}, true);

startGame.addEventListener('click', function (e) {
	e.preventDefault();

	if (!isAllDataEnered()) return;

	form.style.display = 'none';
	field.style.display = 'flex';
	firstPlayer.style.width = firstPlayer.style.height = firstPlayerCssSize.value + 'px';
	secondPlayer.style.width = secondPlayer.style.height = secondPlayerCssSize.value + 'px';
	movePlayers();
})

checkPlayerParam();

function isAllDataEnered() {
	if (firstPlayerCssSize.value && secondPlayerCssSize.value
		&& firstPlayerSpeed.value && secondPlayerSpeed.value) {
		return true;
	} else {
		alert('Заполните все поля!')
		return false;
	}
}

function movePlayers() {
	var firstPlayerTop = firstPlayer.offsetTop;
	var firstPlayerLeft = firstPlayer.offsetLeft;
	var secondPlayerTop = secondPlayer.offsetTop;
	var secondPlayerLeft = secondPlayer.offsetLeft;
	var firstPlayerWidth = parseInt(firstPlayer.style.width);
	var secondPlayerWidth = parseInt(secondPlayer.style.width);

	if (keyState[87]) {
		firstPlayer.style.top = firstPlayerTop - +firstPlayerSpeed.value + "px";
	}
	if (keyState[68]) {
		firstPlayer.style.left = firstPlayerLeft + +firstPlayerSpeed.value + "px";
	}
	if (keyState[83]) {
		firstPlayer.style.top = firstPlayerTop + +firstPlayerSpeed.value + "px";
	}
	if (keyState[65]) {
		firstPlayer.style.left = firstPlayerLeft - +firstPlayerSpeed.value + "px";
	}
	if (keyState[38]) {
		secondPlayer.style.top = secondPlayerTop - +secondPlayerSpeed.value + "px";
	}
	if (keyState[39]) {
		secondPlayer.style.left = secondPlayerLeft + +secondPlayerSpeed.value + "px";
	}
	if (keyState[40]) {
		secondPlayer.style.top = secondPlayerTop + +secondPlayerSpeed.value + "px";
	}
	if (keyState[37]) {
		secondPlayer.style.left = secondPlayerLeft - +secondPlayerSpeed.value + "px";
	}

	if (firstPlayerTop < 0
		|| firstPlayerTop > fieldHeight - firstPlayerWidth
		|| firstPlayerLeft < 0
		|| firstPlayerLeft > fieldWidth - firstPlayerWidth) {
		alert('Игрок 1 проиграл!');
		showGameOver();
		return;
	} else if (secondPlayerTop < 0
		|| secondPlayerTop > fieldHeight - secondPlayerWidth
		|| secondPlayerLeft < 0
		|| secondPlayerLeft > fieldWidth - secondPlayerWidth) {
		alert('Игрок 2 проиграл!');
		showGameOver();
		return;
	} else if ((firstPlayerWidth > secondPlayerWidth)
		&& (firstPlayerTop >= secondPlayerTop - firstPlayerWidth)
		&& (firstPlayerLeft >= secondPlayerLeft - firstPlayerWidth)
		&& (firstPlayerTop <= secondPlayerTop + secondPlayerWidth)
		&& (firstPlayerLeft <= secondPlayerLeft + secondPlayerWidth)) {
		alert('Игрок 2 проиграл!');
		showGameOver();
		return;
	} else if ((firstPlayerWidth == secondPlayerWidth)
		&& (firstPlayerTop >= secondPlayerTop - firstPlayerWidth)
		&& (firstPlayerLeft >= secondPlayerLeft - firstPlayerWidth)
		&& (firstPlayerTop <= secondPlayerTop + secondPlayerWidth)
		&& (firstPlayerLeft <= secondPlayerLeft + secondPlayerWidth)) {
		alert('Ничья!');
		showGameOver();
		return;
	} else if ((firstPlayerWidth < secondPlayerWidth)
		&& (secondPlayerTop >= firstPlayerTop - secondPlayerWidth)
		&& (secondPlayerLeft >= firstPlayerLeft - secondPlayerWidth)
		&& (secondPlayerTop <= firstPlayerTop + firstPlayerWidth)
		&& (secondPlayerLeft <= firstPlayerLeft + firstPlayerWidth)) {
		alert('Игрок 1 проиграл!');
		showGameOver();
		return;
	}
	setTimeout(movePlayers, 20);
}

function checkPlayerParam() {
	firstPlayerCssSize.onchange = function () {
		if (this.value > maxPlayerSize) this.value = maxPlayerSize;
		if (this.value < minPlayerSize) this.value = minPlayerSize;
	}

	secondPlayerCssSize.onchange = function () {
		if (this.value > maxPlayerSize) this.value = maxPlayerSize;
		if (this.value < minPlayerSize) this.value = minPlayerSize;
	}

	firstPlayerSpeed.onchange = function () {
		if (this.value > maxPlayerSpeed) this.value = maxPlayerSpeed;
		if (this.value < minPlayerSpeed) this.value = minPlayerSpeed;
	}

	secondPlayerSpeed.onchange = function () {
		if (this.value > maxPlayerSpeed) this.value = maxPlayerSpeed;
		if (this.value < minPlayerSpeed) this.value = minPlayerSpeed;
	}
}

function showGameOver() {
	alert('Нажмите F5, чтобы начать заново!');
	field.style.display = 'none';
	gameOver.style.display = 'flex';
}
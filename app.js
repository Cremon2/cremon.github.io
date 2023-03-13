const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('#reset');
const xClass = 'x';
const oClass = 'o';
let currentPlayer = xClass;

cells.forEach(cell => {
	cell.addEventListener('click', handleClick, { once: true });
});

resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
	const cell = e.target;
	cell.classList.add(currentPlayer);
	if (currentPlayer === xClass) {
		cell.innerHTML = 'X';
	} else {
		cell.innerHTML = 'O';
	}
	if (checkWin()) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		switchPlayer();
	}
}

function switchPlayer() {
	currentPlayer = currentPlayer === xClass ? oClass : xClass;
}

function checkWin() {
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	return winningCombos.some(combo => {
		return combo.every(index => {
			return cells[index].classList.contains(currentPlayer);
		});
	});
}

function isDraw() {
	return [...cells].every(cell => {
		return cell.classList.contains(xClass) || cell.classList.contains(oClass);
	});
}

function endGame(draw) {
	if (draw) {
		alert('Draw!');
	} else {
		alert(`${currentPlayer.toUpperCase()} Wins!`);
	}
	cells.forEach(cell => {
		cell.removeEventListener('click', handleClick);
	});
	resetBtn.style.display = 'block';
}

function resetGame() {
	cells.forEach(cell => {
		cell.classList.remove(xClass);
		cell.classList.remove(oClass);
		cell.innerHTML = '';
		cell.addEventListener('click', handleClick, { once: true });
	});
	resetBtn.style.display = 'none';
	currentPlayer = xClass;
}
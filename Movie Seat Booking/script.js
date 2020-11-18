const container = document.querySelector('.container'); //Selects only one 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //due to the numerous duplicates we use queryselectorall
const count = document.getElementById("count"); 
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = movieSelect.value; //this is a string object

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;

	const seatsIndex = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat);
	});
	// making above lines a single line command
	//const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
	
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

function setMovieData (movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach ((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//using arrouw style
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);

	updateSelectedCount();
});

container.addEventListener('click', function(e) {
	//console.log(e.target);//gives the clicked item inside the container class

	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});

updateSelectedCount();
// =================================================================
// ANIMAL SEARCH
// =================================================================

// =================================================================
// 1. Start with an array of animal types on buttons
// 2. When clicked, buttons populate 10 gifs of related animal
// 3. When clicked, gifs play. When clicked again, gifs stop
// 4. Upon search, new animal button is added to array and screen
// 5. Display rating of images (G, PG, etc)
// =================================================================

// =================================================================
// VARIABLES
var animals = ["Guinea Pigs", "Dogs", "Cats", "Goats", "Alpacas", 
				"Gerbils", "Cheetahs", "Lions", "Tigers", "Bears"];

// =================================================================

// =================================================================
// FUNCTIONS

// Display animal 10 gifs
function displayAnimalGifs() {

	// Change data attr for clicked id
	var animal = $(this).attr('data-name');

	// Create queryURl framework
	var api_key = 'd98945d47bd04f889c2e49844b7f7a85';
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&q=' + animal + '&limit=10&offset=0&rating=PG&lang=en';


	// Create Ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		// TODO: Append ratings to page above images

		// TODO: Append images to page in #animal-view
			// Loop through animals.length
			for (var i = 0; i < animals.length; i++) {
				// Create animal view div
				var animalView = $('<div>');
				// attr() animal view div with #animal-view
				animalView.attr('id', 'animal-view');
				// Insert animalView within column
				$('.animalGifs').after(animalView);

				// Animated url
				var animateURL = response.data[i].images.original.url;
				// Still url
				var stillURL = response.data[i].images.original_still.url;
				// Create <img> tag
				var img = $('<img>');
				// attr() class attribute "gif"
				img.addClass('gif');
				// attr() data-state
				img.attr('data-state', 'still');
				// attr() data-still attribute 
				img.attr('data-still', stillURL);
				// attr() data-animate attribute
				img.attr('data-animate', animateURL);
				// attr() src attribute
				img.attr('src', stillURL);
				// append images to div
				$('#animal-view').prepend(img);

				// Ratings
				var rating = response.data[i].rating;
				var ratingDiv = $('<div>' + 'Rating : ' + rating + '</div>' + '<br>');
				ratingDiv.attr('id', 'rating');
				$(ratingDiv).insertBefore('#animal-view');
			}
	});	
}
 
// Populate new search terms as buttons
function renderButtons() {

	// Use .empty() to avoid repeat buttons
	$('#btn-section').empty();
	// Loop through animals array { 
	for (i = 0; i < animals.length; i++) {
		// Generate buttons in html using jquery
		var a = $('<button>');
		a.addClass('animal');
		a.attr('data-name', animals[i]);
		a.text(animals[i]);
		$('#btn-section').append(a);

	}			
}

// Add animal button onclick action
$('#add-animal').on('click', function(event) {
	event.preventDefault();
	var animal = $('#animal-input').val().trim();
	// Push new animals to array
	animals.push(animal);
	// Call renderButtons
	renderButtons();
});

// State change function
$('.gif').on('click', function() {
	var state = $(this).attr('data-state');
	if (state === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	}
	if (state === 'animate') {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('src', 'still');
	}
});

$(document).on('click', '.animal', displayAnimalGifs);

renderButtons();
	

	




// =================================================================
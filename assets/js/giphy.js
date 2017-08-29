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

// Display 10 animal gifs
function displayAnimalGifs() {

	// Change data attr for clicked id
	var animal = $(this).attr('data-name');

	// Create queryURl framework
	var api_key = 'd98945d47bd04f889c2e49844b7f7a85';
	var limit = 10;
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&q=' + animal + '&limit=' + limit + '&offset=0&rating=PG&lang=en';


	// Create Ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		//Append images & ratings to page
			// Loop through animals.length
			for (var i = 0; i < response.data.length; i++) {
				
				// ---- Animal View ----
				// Create animal view div
				var animalView = $('<div>');
				// attr() animal view div with #animal-view
				animalView.attr('id', 'animal-view');
				// Insert animalView within column
				$('.animalGifs').after(animalView);

				// ---- GIFS ----
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

				// ----  Ratings ----
				// Retrieve ratings from api
				var rating = response.data[i].rating;
				// Create rating div and insert response
				var ratingDiv = $('<div>' + 'Rating : ' + rating + '</div>');
				// Give rating div id of #rating
				ratingDiv.attr('id', 'rating');
				// Insert rating div before each gif
				$(ratingDiv).insertBefore('#animal-view');
			}

				// State change function
				$('.gif').on('click', function() {
					var state = $(this).attr('data-state');
					if (state === 'still') {
						$(this).attr('src', $(this).attr('data-animate'));
						$(this).attr('data-state', 'animate');
					}
					if (state === 'animate') {
						$(this).attr('src', $(this).attr('data-still'));
						$(this).attr('data-state', 'still');
					}
				});


	});	

}

$(document.body).on('click', '.animal', displayAnimalGifs);

// Function to render buttons upon page initialization
function renderButtons() {

	// Use .empty() to avoid repeat buttons
	$('#btn-section').empty();
	// Loop through animals array { 
	for (var j = 0; j < animals.length; j++) {
		// Generate buttons in html using jquery
		var a = $('<button>');
		// Add class .animal to newly created buttons
		a.addClass('animal');
		// Add data-name attribute equal to position in animals array
		a.attr('data-name', animals[j]);
		// Write newly created data to button
		a.text(animals[j]);
		// Append newly created button to button section
		$('#btn-section').append(a);

	}			
}

// Populate new search terms as buttons
$('#add-animal').on('click', function(event) {
	event.preventDefault();
	var newAnimal = $('#animal-input').val().trim();
	// Push new animals to array
	animals.push(newAnimal);
	// Call renderButtons
	renderButtons();
	// Clear search form upon button click
	$('#animal-input').val('');
});

renderButtons();
	

	




// =================================================================
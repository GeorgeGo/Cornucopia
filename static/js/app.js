
// Connect to food api
// Potential APIS
//	 https://developer.edamam.com/


// Test Case:
// User only has potatoes
// Provides Recipe for mashed potatoes
// query = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';

function getRecipes() {
	$.post({
		url: '/getRecipes',
		data: $('#ingredientsForm').serialize(),
		success: function(response) {
			$('#recipeDivHolder').empty();
			var r = JSON.parse(response);
			for (var i = 0; i < r['count']; i++) {
				var recipeDiv = $('<div></div>');
				recipeDiv.addClass('recipeDiv');
				recipeDiv.css('background-image', "url(" + r['recipes'][i]['image_url'] + ")");
				recipeDiv.css('backgroundRepeat', "no-repeat");
				var recipeNameDiv = $('<div></div>');
				recipeNameDiv.addClass('recipeNameDiv');
				recipeNameDiv.text(r['recipes'][i]['title']);
				recipeDiv.append(recipeNameDiv);
				recipeDiv.click(function (event){
					if (this.className === 'recipeDiv') {
						$(this).css('background-image', 'none');
						$(this).addClass('recipe-card');
						$(this).removeClass('recipeDiv');
						$(this).children().addClass('recipe-name-card');
						$(this).children().removeClass('recipeNameDiv');

					}else if (this.className === 'recipe-card') {
						$(this).css('background-image', "url(" + r['recipes'][i]['image_url'] + ")");
						$(this).addClass('recipeDiv');
						$(this).removeClass('recipe-card');
						$(this).children().addClass('recipeNameDiv');
						$(this).children().removeClass('recipe-name-card');
					}
				})
				// recipe-card.click(function (event){
				// 	recipe-card.addClass('recipeDiv');
				// 	recipe-card.removeClass('recipeDiv');
				// })
				$('#recipeDivHolder').append(recipeDiv);
			}
		},
		error: function(error) {
			console.log('There was an error with recipe retrieval');
		}
	});
}

$('#getRecipes span').click(function () {
	$('#ingredientsForm').submit();
});

// $.post({
// 	url: '/getIngredients',
// 	data: r['recipes'][i]['recipe_id'],
// 	success: function (response) {
// 		// console.log(response);
// 	},
// 	error: function (error) {
// 		console.log('There was an error with ingredients retrieval');
// 	}
// })

$('#ingredientsNumber').change(function (event) {
	var previousLength = $('#ingredientsForm').children().length;
	var newLength = $('#ingredientsNumber').val();
	console.log("Previous Length: "+previousLength);
	console.log("New Length:"+newLength);

	if (newLength >= previousLength) {
		var difference = newLength - previousLength;
		for (var i = 0; i < difference; i++) {
			var formEntry = $("<input type=\"text\" name=\"ingredient_"+i+"\" class=\"new-ingredient\">");
			$('#ingredientsForm').append(formEntry);
		}
	} else {
		var difference = previousLength - newLength;
		for (var i = 0; i < difference; i++) {
			$('#ingredientsForm input:last-child').remove()
		}
	}
	event.preventDefault();
});

$('#ingredientsForm').keypress(function(event) {
    if (event.which == 13) {
        $('#ingredientsForm').submit();
		event.preventDefault();
    }
});

$('#ingredientsForm').submit(function(event) {
	getRecipes();
 	event.preventDefault();
});

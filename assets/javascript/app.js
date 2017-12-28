var topics = ["astronomy","meteor shower","earth","jupiter","saturn","moon","nebula","cosmos","space shuttle","astronaut"];

function renderButtons() {
  $(".gif-buttons").empty();
  for (i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.attr("class", "button search-button");
    newButton.attr("value", topics[i]);
    newButton.text(topics[i]);
    $(".gif-buttons").append(newButton);
  }
};


$(".submit").click(function(event) {
  event.preventDefault();
  var newSearchTerm = $("#userTerm").val().trim();
  topics.push(newSearchTerm);

  renderButtons();
})

function animateGif () {
  var state = $(this).attr("data-state");
  console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
};

function displayNatureGifs() {
  $(".gif-results").empty()
  // set variable searchTerm equal to the text of the button that was clicked
  var searchTerm = $(this).attr("value");
  console.log(searchTerm);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mrGCdgNdevK93fpe0hQPCfMFeY7ZQpOx&q="+searchTerm+"&limit=10&offset=0&rating=PG&lang=en";

  $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(natureGifs) {
      console.log(natureGifs);
      for (i = 0; i < natureGifs.data.length; i++) {
        //create a new div to hold the gif and rating
        var newGifDiv = $("<div class='new-gif-div'>");
        var newGifDescription = $("<p class='gif-rating'>").text("rating: " + natureGifs.data[i].rating);
        // add the gif image
        var resultGif = $("<img class='gif-image'>");
        resultGif.attr("src", natureGifs.data[i].images.fixed_height_still.url);
        resultGif.attr("data-animated", natureGifs.data[i].images.fixed_height.url);
        resultGif.attr("data-still", natureGifs.data[i].images.fixed_height_still.url);
        resultGif.attr("data-state","still");
        resultGif.attr("alt", searchTerm + "image");
        $(newGifDiv).append(resultGif);
        $(newGifDiv).append(newGifDescription);
        $(".gif-results").append(newGifDiv);
      }

    });

};
$(document).on("click", ".search-button", displayNatureGifs);
$(document).on("click", ".gif-image", animateGif);
renderButtons();

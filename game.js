// these are my basic variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0

// this makes all the sounds for random and chosen tiles

function playSound(name) {

  switch (name) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
  }
}

// this picks and animates a random tile + calls sound

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// this animates all my buttons that are clicked

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


// this checks my answer

function checkAnswer(currentLevel) {


  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("wrong");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }





}


// this recognizes the keys
$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("level 0");
    nextSequence();
    started = true;
  }
});

// this recognizes the click
$(".btn").on("click", function() {


  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

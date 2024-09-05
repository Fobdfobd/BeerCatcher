$(document).ready(function() {
  var currentScore = parseInt($(".score").text()),
      currentTimer = 15, // Temporizador inicial cambiado a 15 segundos
      started = false,
      timer = null;

  // Random number
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Increment current score
  function incrementScore() {
    currentScore++;
    $(".score").html(currentScore);
  }

  // Move ball
  function moveBall(selection) {
    var left = randomIntFromInterval(2, 75),
        top = randomIntFromInterval(2, 75),
        size = randomIntFromInterval(10, 30);
    $(selection).css("left", left + "%").css("top", top + "%").css("height", size + "vw").css("width", size + "vw");
  }

  // Game ends
  function endGame() {
    $(".ball").addClass("end");
    $(".score").html("Game Over!<br/>Your final score is: " + currentScore);
  }

  // Timer start
  function timerStart() {
    timer = setInterval(function() {
      currentTimer--;
      $(".timer").html(currentTimer);
      if (currentTimer < 1) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

  // Ball clicked
  $(".ball").click(function() {
    incrementScore();
    moveBall($(this));
  });

  // Ball clicked first time
  $(".start").click(function() {
    if (!started) {
      started = true;
      timerStart();
    }
  });
});

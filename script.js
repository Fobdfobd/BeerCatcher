$(document).ready(function() {
  var currentScore = parseInt($(".score").text()),
      currentTimer = 15,
      started = false,
      timer = null;

// Crear y reproducir la banda sonora en loop
document.addEventListener('DOMContentLoaded', () => {
    const backgroundAudio = new Audio('https://fobdfobd.github.io/BeerCatcher/trim_takeachance160.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 1.0;

    // Función para reproducir el audio
    const playAudio = () => {
        backgroundAudio.play().catch((error) => {
            console.log('Autoplay no permitido, esperando interacción del usuario:', error);
        });
    };

    // Intentar reproducir el audio al cargar la página
    playAudio();

    // Si no se reproduce automáticamente, esperar a la interacción del usuario
    document.addEventListener('click', () => {
        playAudio();  // Intentar reproducir el audio al hacer clic
    });

    // Agregar también un evento para touchstart (para móviles y tablets)
    document.addEventListener('touchstart', () => {
        playAudio();  // Intentar reproducir el audio al tocar la pantalla
    });
});


  // Random number
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Increment current score
  function incrementScore() {
    currentScore++;
    $(".score").html(currentScore);
  }

  // Decrement score
  function decrementScore() {
    currentScore--;
    $(".score").html(currentScore);
  }

  // Función para calcular la distancia entre la cerveza y la botella de agua
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Move beer
function moveBall(selection) {
  var left = randomIntFromInterval(2, 75),
      top = randomIntFromInterval(2, 75),
      size = randomIntFromInterval(10, 30); // Tamaño variable
  $(selection).css("left", left + "%").css("top", top + "%").css("height", size + "vw").css("width", size + "vw");
}

// Move water bottle (and ensure it doesn't overlap with the beer)
function moveWaterBottle() {
  var left, top, size;

  // Obtener la posición actual de la cerveza
  var beerLeft = parseFloat($(".ball").css("left")),
      beerTop = parseFloat($(".ball").css("top"));

  // Asegurar que la botella no esté demasiado cerca de la cerveza
  do {
    left = randomIntFromInterval(2, 75);
    top = randomIntFromInterval(2, 75);
  } while (getDistance(left, top, beerLeft, beerTop) < 15); // Asegura que no estén muy cerca (ajusta el valor si es necesario)

  // Tamaño variable para la botella de agua
  size = randomIntFromInterval(10, 30);
  
  $(".water-bottle").css("left", left + "%").css("top", top + "%").css("height", size + "vw").css("width", size + "vw").show();

  setTimeout(function() {
    $(".water-bottle").hide();
  }, 2000); // Desaparece después de 2 segundos
}


  // Game ends
function endGame() {
  $(".ball").addClass("end");
  $(".water-bottle").hide(); // Ocultar la botella al final del juego

  var message = "";
  var imageUrl = "";

  // Evaluar el marcador final y asignar mensaje e imagen
  if (currentScore >= 0 && currentScore <= 5) {
    message = "Fluixet, fluixet com una merda del teu tiet";
    imageUrl = "https://i.postimg.cc/gwb8Vbds/Avila.jpg";
  } else if (currentScore >= 6 && currentScore <= 10) {
    message = "Aixo s'anima. Tothom es el teu amic!";
    imageUrl = "https://i.postimg.cc/wy6Nr51s/ferran-ruben.jpg";
  } else if (currentScore >= 11 && currentScore <= 15) {
    message = "Desfaseee! Porteu-me a casa que jo sol no puc";
    imageUrl = "https://i.postimg.cc/94PT1gQh/segui.jpg";
  } else if (currentScore >= 16) {
    message = "Nivell Deu!";
    imageUrl = "https://i.postimg.cc/WFXZcDZY/llobete.jpg";
  }

  // Mostrar el mensaje y la imagen
  $(".score").html(`<div class="final-message">${message}<br/>Your final score is: ${currentScore}</div>`);
  $(".game").append(`<img class="final-image" src="${imageUrl}" alt="Resultado final">`);
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

  // Ball (beer) clicked
  $(".ball").click(function() {
    incrementScore();
    moveBall($(this));
  });

  // Water bottle clicked (reduce score)
  $(".water-bottle").click(function() {
    decrementScore();
    $(this).hide(); // Ocultar la botella cuando se hace clic
  });

  // Ball clicked first time
  $(".start").click(function() {
    if (!started) {
      started = true;
      timerStart();

      // Move the beer continuously
      setInterval(function() {
        moveBall($(".ball"));

        // One-third of the time, show the water bottle
        if (Math.random() < 0.33) {
          moveWaterBottle();
        }
      }, 1000); // La cerveza se mueve cada segundo
    }
  });
});


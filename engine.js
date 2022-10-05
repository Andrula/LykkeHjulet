window.onload = function () {

  // Prize Array
  prize = [100, 150, 350, 500, 1000, 1500, 'Fallit'];

 // Variables
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var word;              // Selected word
  var guess;             // Guess
  var guesses = [];      // Stored guesses as numbers
  var counter;           // Count correct guesses
  var space;              // Number of spaces in word '-'
  var getSpin = "";
  var totalPrize = 0;
  var isSpun = false;
  var fullGuess = "";

var variable = ['1','2'];

var variable2 = {'1':'2'};

console.log(variable + variable2)

  // Get elements
  var showSpin = document.getElementById("myspin");
  var showTotal = document.getElementById("mytotal");


  // Create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Function that creates a dynamic randomizer that can be called in other functions to randomize stuff. :-)
  function get_random(random) {
    return random[Math.floor((Math.random() * random.length))];
  }

  // Select Catagory based on the chosen word
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Kategorien er premier league fodbold klubber";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Kategorien er film";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Kategorien er byer";
    } else if (chosenCategory === categories[3]) {
      catagoryName.innerHTML = "Kategorien er programmeringssprog";
    }
  }

  //Handles spin event
  document.getElementById('spin').onclick = function () {
    //Run this in case of spin event where user has already spun.
    if (isSpun) {
      //Replaces "totalPrize" with a notification message, then swaps back to "totalPrize"
      showTotal.innerHTML = "Du må kun spinne én gang!"
      setTimeout(function () {
        comments();
      }, 2000);
    }
    //Else run this 
    else {
      //Throws our prize array into our get_random function
      getSpin = get_random(prize);
      isSpun = true;
      comments();
    }
    //In case of "fallit", show a message, reset totalprize and reset spin
    if (getSpin == 'Fallit') {
      showTotal.innerHTML = "Du er gået fallit og har mistet dine penge. Prøv igen!"
      totalPrize = 0;
      getSpin = "";
      isSpun = false;
    }
  }

  //Creates the template for the generated word the user has to guess
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < wordReplaced.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (wordReplaced[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // This is the function we call to update innerHtml (totalPrize & spin value).
  comments = function () {
    showTotal.innerHTML = "Du har " + totalPrize + " kr.";
    showSpin.innerHTML = getSpin;
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showTotal.innerHTML = "Tillykke, du har vundet " + totalPrize + " kr.!";
      }
    }
  }

  //Event handler when user takes a guess on the full word
  document.getElementById('submitGuess').onclick = function () {
    var fullGuess = document.getElementById("fullGuess").value; //Initiallizes the guess as a variable
    if (fullGuess.toUpperCase() == word.toUpperCase()) { //Converts the guess and the correct word to uppercase and sees if they match
      showTotal.innerHTML = "Tillykke, du har vundet " + totalPrize + " kr.!";
      //If guess was correct, replace the hidden letters with the full word
      for (var i = 0; i < word.length; i++) {
        guesses[i].innerHTML = word[i];
        counter += 1;
      }
    }
    else {
      showTotal.innerHTML = "Du gættede desværre forkert."
      setTimeout(function () {
        comments();
      }, 2000);
    }
  }

  check = function () {
    list.onclick = function () {
      if (isSpun) { // Checks if the spin button has been clicked*/
        var geuss = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < wordReplaced.length; i++) {
          if (wordReplaced[i] === geuss) {
            guesses[i].innerHTML = geuss; // Then it replaces the specific box with the correct letter
            counter += 1;
            totalPrize = totalPrize + getSpin;
            getSpin = "";
            comments();
          }
          var index = alphabet.indexOf(geuss); //searches the entire calling string, and returns the index of the first occurrence of the specified substring.
          if (index > -1) // If statement that says only splice array when item is found
          {
            alphabet.splice(index, 1); // 2nd parameter means remove one item only
            myButtons = document.getElementById('buttons').innerHTML = "";
            buttons(); // Calls the buttons(); method to update which buttons are left.
          }
        }
      }
      else { // Runs if IF conditioon is not fulfilled
        showTotal.innerHTML = "Du skal spinne først!"
        setTimeout(function () {
          comments();
        }, 2000);
      }
    }

    isSpun = false;
  }


  // This play function acts as the game engine.
  play = function () {
    categories = [ // Category array with multiple values
      ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester city", "newcastle united"],
      ["alien", "dirty harry", "gladiator", "finding nemo", "jaws"],
      ["manchester", "milan", "madrid", "amsterdam", "prague"],
      ["javascript", "php", "rust", "python", "java", "ruby", "sql"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    wordReplaced = word.replace(/\s/g, "-"); // erstatter mellemrum med - hvis ordet har mellemrum
    console.log(wordReplaced);
    console.log(word);

    // Alphabet array with our letters.
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];

    buttons();
 
    isSpun = false;
    totalPrize = 0
    guesses = [];
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }
  play();


  // Onclick function that resets the letters + correctly answered letters and starts the play function again.
  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    play();
  }




}



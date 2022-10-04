window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];


  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var word;              // Selected word
  var guess;             // Geuss
  var geusses = [];      // Stored geusses
  var counter;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var lives;

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");




  // create alphabet ul
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


  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Kategorien er Premier League fodbold hold";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Kategorien er programmeringssprog";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Kategorien er byer";
    }
  }

  // Create geusses ul
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }


  // Show lives
  comments = function () {

    showLives.innerHTML = "Du har " + lives + 'kr';
    if (lives < 1) {
      showLives.innerHTML = "Du har tabt";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }

        const index = alphabet.indexOf(geuss);
        if (index > -1) { // only splice array when item is found
          {
            alphabet.splice(index, 1); // 2nd parameter means remove one item only
            myButtons = document.getElementById('buttons').innerHTML = "";
            buttons();
          }
        }
      }
    }
  }

  // Play
  play = function () {
    categories = [
      ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
      ["php", "java", "javascript", "python", "rust", "ruby"],
      ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();

  // Reset funktion til bogstaver
  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    play();
  }
}
window.onload = function () {

  prize = [100, 150, 350, 500, 1000, 1500, 'Fallit'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var word;              // Selected word
  var guess;             // Geuss
  var geusses = [];      // Stored geusses
  var counter;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var getSpin = "";
  var totalPrize = 0;
  var isSpun = false;
  var fullGuess = "";

  // Get elements
  var showSpin = document.getElementById("myspin");
  var showTotal = document.getElementById("mytotal");


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

  function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
  }

  // Select Catagory
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

  document.getElementById('spin').onclick = function () {
    if (isSpun) {
      showTotal.innerHTML = "Du må kun spinne én gang!"
      setTimeout(function () {
        comments();
      }, 2000);
    }
    else {
      getSpin = get_random(prize);
      isSpun = true;
      comments();
    }
    if (getSpin == 'Fallit') {
      showTotal.innerHTML = "Du er gået fallit og har mistet dine penge. Prøv igen!"
      totalPrize = 0;
      getSpin = "";
      isSpun = false;
    }
  }

  // Create geusses ul
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
      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function () {
    showTotal.innerHTML = "Du har " + totalPrize + " kr.";
    showSpin.innerHTML = getSpin;
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showTotal.innerHTML = "Tillykke, du har vundet " + totalPrize + " kr.!";
      }
    }
  }

  document.getElementById('submitGuess').onclick = function () {
    var fullGuess = document.getElementById("fullGuess").value;
    console.log(fullGuess);
    if (fullGuess.toUpperCase() == word.toUpperCase()) {
      showTotal.innerHTML = "Tillykke, du har vundet " + totalPrize + " kr.!";
      for (var i = 0; i < word.length; i++) {
        geusses[i].innerHTML = word[i];
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

  // OnClick Function
  check = function () {
    list.onclick = function () {
      if (isSpun) {
        var geuss = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < wordReplaced.length; i++) {
          if (wordReplaced[i] === geuss) {
            geusses[i].innerHTML = geuss;
            counter += 1;
            totalPrize = totalPrize + getSpin;
            getSpin = "";
            comments();
          }
          var index = alphabet.indexOf(geuss);
          if (index > -1)// only splice array when item is found
          {
            alphabet.splice(index, 1); // 2nd parameter means remove one item only
            myButtons = document.getElementById('buttons').innerHTML = "";
            buttons();
          }
        }
      }
      else {
        showTotal.innerHTML = "Du skal spinne først!"
        setTimeout(function () {
          comments();
        }, 2000);
      }
    }

    isSpun = false;
  }


  // Play
  play = function () {
    categories = [
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


    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];

    buttons();
 
    isSpun = false;
    totalPrize = 0
    geusses = [];
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();


  // Reset

  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    play();
  }




}



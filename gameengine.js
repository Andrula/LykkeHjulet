
window.onload = function () {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categories;         // Array of topics
    var chosenCategory;     // Selected catagory
    var word;              // Selected word
    var guess;             // Geuss
    var geusses = [];      // Stored geusses
    var space;              // Number of spaces in word '-'

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
            ["php", "java", "javascript", "python", "rust", "ruby"],
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        geusses = [ ];
        lives = 10;
        counter = 0;
        space = 0;
        result();
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

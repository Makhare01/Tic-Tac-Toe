let N_SIZE = 3,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves;

// სათამაშო მაგიდის ინიციალიზაცია
function init() {
  // ცხრილის შექმნა
  var board = document.createElement("table");

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    // სტრიქონის შექმნა
    var row = document.createElement("tr");
    board.appendChild(row); // სტრიქონის სხრილზე მიმაგრება

    for (var j = 0; j < N_SIZE; j++) {
      // სტრიქონში უჯრების დამატება
      var cell = document.createElement("td");
      cell.style.height = "120px";
      cell.style.width = "120px";
      cell.style.textAlign = "center";
      cell.style.color = "black";
      cell.style.cursor = "pointer";
      cell.classList.add("col" + j, "row" + i);

      if (i == j) {
        // დიაგონალური ელემენტები
        cell.classList.add("diagonal0");
      }

      if (j == N_SIZE - i - 1) {
        // მეორე დიაგონალი
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set); // ფუნქციის მიმაგრება
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame(); // თამაშის დაწყება
}

// ახალი ტამაში
function startNewGame() {
  score = {
    // ქულების განულება
    X: 0,
    O: 0,
  };
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    // ცხრილის გასუფთავება
    square.innerHTML = EMPTY;
  });
}

// შემოწმება მოიგო თუ არა
function win(clicked) {
  // ყველ უჯრის კლასის წამოღება
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    // მომგებიანი პოზიცია
    if (items.length == N_SIZE) {
      return true; // მოიგო
    }
  }
  // არ მოუგია
  return false;
}

// ფუნქცია რომელიც ამოწმებს შეიცავს თუ არა სელექტორი კონკრეტულ ტექტსტს
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

// უჯრაზე დაკლიკვის ფუნქცია, რომელიც უჯრაში წერს მოთამშის
// სიმბოლოს ('X', 'O') და გადაყავს სვლა შემდეგ მოთამაშეზე
function set() {
  if (this.innerHTML !== EMPTY) {
    // როდესაც სათამაშო დაფა არ არსებობს
    return;
  }
  this.innerHTML = turn;
  moves += 1; // სვლების რაოდენობა გაიზარდა ერთით
  score[turn] += this.identifier;

  if (win(this)) {
    // როდესაც რომელიმე მოთამაშემ მოიგო
    alert("მოიგო: მოთამაშე " + turn + "-მა");
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    // როდესაც თამაში ფრედ დასრულდა
    alert("ფრე");
    startNewGame();
  } else {
    // როდესაც თამაში არ დასრულებულა
    turn = turn === "X" ? "O" : "X"; // სვლის შეცვლა
    document.getElementById("turn").textContent = "მოთამაშე " + turn; // უჯრაში სიმბოლოს ჩაწერა
  }
}

init(); // სათამაშ მაგიდის შექმნა

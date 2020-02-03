const cats = [new ClickerCat("Magical Fortune Cat"),
              new ClickerCat("George"),
              new ClickerCat("Thomas"),
              new ClickerCat("Lucy"),
              new ClickerCat("Mei Mei")];
const body = document.querySelector("body");
const catList = document.createElement("menu");

catList.className = "cat-list";
catList.textContent = "CHOOSE A CAT!";

body.appendChild(catList);
body.appendChild(getNewCatGameContainer(cats[0]));


cats.forEach((cat, i) => {
  const catEntry = document.createElement("li");
  catEntry.className = "cat-entry";
  const catButton = document.createElement("button");
  catButton.className = "cat-button";
  catButton.textContent = cat.name;

  catButton.addEventListener("click", (event) => {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.parentNode.replaceChild(getNewCatGameContainer(cat), gameContainer);
  });

  catEntry.appendChild(catButton);
  catList.appendChild(catEntry);
});


function getNewCatGameContainer(cat = new ClickerCat()) {
  const newCat = cat;

  let gameContainer = document.createElement("section");
  let scoreSection = document.createElement("section");
  let scoreCountSection = document.createElement("section");
  let catImage = document.createElement("img");
  let catNameSection = document.createElement("section");

  gameContainer.className = "game-container";
  scoreCountSection.className = "score";
  catImage.className = "cat";
  catNameSection.className = "cat-name";

  scoreSection.textContent = "SCORE:";
  scoreCountSection.textContent = "$" + cat.score;

  catImage.src = newCat.imageURL;
  catImage.draggable = false;

  catNameSection.textContent = newCat.name;

  scoreSection.appendChild(scoreCountSection);
  gameContainer.appendChild(scoreSection);
  gameContainer.appendChild(catImage);
  gameContainer.appendChild(catNameSection);

  //Event Handlers:
  catImage.addEventListener("mousedown", (event) => {
    if (catImage.style.animationName != "push-in-1")
    {
      catImage.style.animation = "push-in-1 0.5s ease-out 0s 1";
    }
    else
    {
      catImage.style.animation = "push-in-2 0.5s ease-out 0s 1";
    }
    if (scoreCountSection.style.animationName != "push-out-1")
    {
      scoreCountSection.style.animation = "push-out-1 0.5s ease-out 0s 1";
    }
    else
    {
      scoreCountSection.style.animation = "push-out-2 0.5s ease-out 0s 1";
    }

    body.append(getPlusOneElement(event.pageX, event.pageY));

    newCat.score += 1;
    scoreCountSection.textContent = "$" + newCat.score;

  });
  catImage.addEventListener("animationend", (event) => {
    if (catImage.style.animationName != "hover")
    {
      catImage.style.animation = "hover 0.5s ease-in-out 0s infinite alternate";
    }
  });
  // Prevent image dragging (prevent ghost image from appearing):
  //[Image dragging interrupts the game-flow.]
  catImage.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });


  return gameContainer;
}



function getPlusOneElement(x, y) {
  let plusOne = document.createElement("div");

  plusOne.className = "plus-one";
  plusOne.style.left = x - 35 + "px";
  plusOne.style.top = y - 35 + "px";
  plusOne.textContent = "+1";

  plusOne.addEventListener("animationend", (event) => {
    plusOne.parentNode.removeChild(plusOne);
  });

  return plusOne;
}

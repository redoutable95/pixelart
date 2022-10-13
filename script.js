// const board = document.querySelector("#board");
const colorsBoard = document.querySelector(".colors");
const colorsItems = colorsBoard.querySelectorAll(".colors-item");
const refreshColors = document.querySelector(".refresh");
const clearBtn = document.querySelector(".clear");
const changeBtn = document.querySelector(".change-tool");
const SQUARES_NUMBER = 400;
const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
let squareNumber;
let newColorArray = [];
let newColor;
let currentColor = "#a5a4d8";
let inputWay = "mouseover";

if (window.matchMedia("(max-width: 500px)").matches) {
  squareNumber = 100;
} else {
  squareNumber = 400;
}

function getColorBoard() {
  for (let colorsItem of colorsItems) {
    createNewColor();
    colorsItem.style.border = "none";
    colorsItem.style.background = `#${newColor}`;
    colorsItem.addEventListener("click", () => {
      colorsItem.style.border = "2px solid red";
      currentColor = colorsItem.style.backgroundColor;
    });
  }
}

getColorBoard();
refreshColors.addEventListener("click", getColorBoard);
changeBtn.addEventListener("click", () => {
  if (inputWay == "mouseover") {
    inputWay = "mousedown";
  } else {
    inputWay = "mouseover";
  }
  deleteBoardElement();
  createBordElement();
});
createBordElement();
function createBordElement() {
  for (let i = 0; i < squareNumber; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener(`${inputWay}`, (evt) => {
      evt.preventDefault();
      setColor(square);
    });
    clearBtn.addEventListener("click", () => {
      square.style.background = "#fff";
    });
    board.prepend(square);
  }
}
function deleteBoardElement() {
  for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.querySelector(".square");
    square.remove();
  }
}
function setColor(element) {
  createNewColor();
  element.style.background = currentColor;
}

function randomInteger() {
  let rand = Math.random() * 15;
  return Math.floor(rand);
}

function createNewColor() {
  for (let i = 0; i < 6; i++) {
    let rand = randomInteger();
    newColorArray.push(hexArray[rand]);
  }
  newColor = newColorArray.join("");
  newColorArray = [];
}

import { domtoimage } from "./dom-to-image.js";

const node = document.querySelector(".board-container");
const btn = document.querySelector(".save");
const resaultSave = document.querySelector(".resault-save");
btn.addEventListener("click", () => {
  const resault = document.querySelector(".resault");
  const resaultImg = document.querySelector(".resault-img");
  const resaultChild = resaultImg.children;

  resault.style.display = "flex";
  domtoimage
    .toJpeg(node)
    .then(function (dataUrl) {
      let img = new Image();
      img.src = dataUrl;
      img.style.width = "100%";
      let url = img.getAttribute("src");
      resaultImg.appendChild(img);
      resaultSave.addEventListener("click", () => {
        resaultSave.setAttribute("href", url);
      });
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
  document.querySelector(".resault-close").addEventListener("click", () => {
    resault.style.display = "none";
    resaultChild[0].remove();
  });
});

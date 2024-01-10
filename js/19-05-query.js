'use strict';

// function main() {
//   let chanelName = 'Easy Frontend';
//   console.log(chanelName);
// }

// main();

// IIFE function main()

// (() => {
//   let channelName = 'Easy Frontend';
//   console.log(channelName);
// })();

(() => {
  // const h1Element = document.getElementById('title');
  // if (h1Element) {
  //   console.log(h1Element.textContent);
  // }

  console.log('Test loop in JavaScript');
  const ulElement = document.getElementById('menu');
  if (ulElement) {
    const liElementList = ulElement.querySelectorAll(li);
    if (liElementList) {
      for (const liElement of liElementList) {
        console.log(liElement.textContent);
      }
    }
  }
})();


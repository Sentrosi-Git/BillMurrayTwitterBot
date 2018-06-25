
function fillUrl(){
  const xDimension = Math.floor(Math.random() * 500) + 300;
  const yDimension = Math.floor(Math.random() * 500) + 300;
  const billPhoto = `http://www.fillmurray.com/${xDimension}/${yDimension}`;
};

console.log("Hello World");
return fillUrl();

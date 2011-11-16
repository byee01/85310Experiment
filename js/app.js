var source = {};

source.WORDS = {
  transportation: [
    'word',
    'Bicycle',
    'Truck',
    'Train',
    'Skateboard',
    'Motorcycle',
    'Wheelbarrow'
  ],

  household: [
    'word',
    'Microwave',
    'Toaster',
    'Doorbell',
    'Grill',
    'Couch',
    'Blender'
  ],

  bathroom: [
    'word',
    'Makeup',
    'Mirror',
    'Bathtub',
    'Towel',
    'Razor',
    'Sink'
  ],

  food: [
    'word',
    'Mango',
    'Orange',
    'Watermelon',
    'Strawberry',
    'Grapes',
    'Bread'
  ],

  tools: [
    'word',
    'Axe',
    'Ruler',
    'Saw',
    'Stapler',
    'Nail',
    'Wrench',
  ],

  music: [
    'word',
    'Bell',
    'Organ',
    'Tuba',
    'Keyboard',
    'Flute',
    'Violin'
  ]
};

source.PICS = {
  transportation: [
    'pic',
    'Car',
    'Plane',
    'Sailboat',
    'Helicopter',
    'Canoe',
    'Blimp'
  ],

  household: [
    'pic',
    'Iron',
    'TV',
    'Lamp',
    'Computer',
    'Clock',
    'Bed'
  ],

  bathroom: [
    'pic',
    'Pills',
    'Toilet',
    'Scissors',
    'Comb',
    'Toothbrush',
    'Bottle'
  ],

  food: [
    'pic',
    'Banana',
    'Celery',
    'Apple',
    'Blueberry',
    'Egg',
    'Cherry'
  ],

  tools: [
    'pic',
    'Screwdriver',
    'Drill',
    'Shovel',
    'Sponge',
    'Hammer',
    'Ladder'
  ],

  music: [
    'pic',
    'Drum',
    'Clarinet',
    'Piano',
    'Accordion',
    'Trumpet',
    'Guitar'
  ] 
}

// Add a 'type' to the array. THIS IS VERY BAD DON'T EVER DO THIS.
Array.prototype.type = 

// Returns the word lowercased + .jpg
// Test by: console.log(getURL(source.PICS.transportation[0]) == 'car.jpg');
function getURL(word) {
  return word.toLowerCase() + '.jpg';
}

// Returns a new array of a random permutation of the set based off of the Fisher-Yates algo
function randomizeSet(inputArray, slideArray, newArr) {
  slideArray = slideArray || false;
  newArr = newArr || false;
  var arr;
  if (newArr) { // Save a copy of the array
    arr = inputArray.slice();
  } else {
    arr = inputArray;
  }

  if (slideArray) {
    var arrType = arr.shift(); // Pop up off the array type from the top 
  }

  var i = arr.length;
  if (i == 0) return false;

  while (--i) {
    var j = Math.floor(Math.random() * ( i + 1 ));
    var tempi = arr[i];
    var tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }

  if (slideArray) {
    arr.unshift(arrType); // Put the array type back on the top    
  }

  return arr;
}

function getRandomSlides(wordSource, picSource) {
  var tempWords = [];
  for (var category in wordSource) {
    tempWords.push(randomizeSet(wordSource[category], true, false));
  }

  var tempPics = [];
  for (var category in picSource) {
    tempPics.push(randomizeSet(picSource[category], true, false));
  }

  return randomizeSet(tempWords.concat(tempPics), false, false);
}


$(document).ready(function() {
  var slideMain = $('#test-slide');
  var slideInput = $('#input-slide');

  slideMain.hide();

  var sourceArray = getRandomSlides(source.WORDS, source.PICS);
  console.log(sourceArray);
});
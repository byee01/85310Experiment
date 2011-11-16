var source = {};

source.WORDS = {
  transportation: [
    'Bicycle',
    'Truck',
    'Train',
    'Skateboard',
    'Motorcycle',
    'Wheelbarrow'
  ],

  household: [
    'Microwave',
    'Toaster',
    'Doorbell',
    'Grill',
    'Couch',
    'Blender'
  ],

  bathroom: [
    'Makeup',
    'Mirror',
    'Bathtub',
    'Towel',
    'Razor',
    'Sink'
  ],

  food: [
    'Mango',
    'Orange',
    'Watermelon',
    'Strawberry',
    'Grapes',
    'Bread'
  ],

  tools: [
    'Axe',
    'Ruler',
    'Saw',
    'Stapler',
    'Nail',
    'Wrench',
  ],

  music: [
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
    'Car',
    'Plane',
    'Sailboat',
    'Helicopter',
    'Canoe',
    'Blimp'
  ],

  household: [
    'Iron',
    'TV',
    'Lamp',
    'Computer',
    'Clock',
    'Bed'
  ],

  bathroom: [
    'Pills',
    'Toilet',
    'Scissors',
    'Comb',
    'Toothbrush',
    'Bottle'
  ],

  food: [
    'Banana',
    'Celery',
    'Apple',
    'Blueberry',
    'Egg',
    'Cherry'
  ],

  tools: [
    'Screwdriver',
    'Drill',
    'Shovel',
    'Sponge',
    'Hammer',
    'Ladder'
  ],

  music: [
    'Drum',
    'Clarinet',
    'Piano',
    'Accordion',
    'Trumpet',
    'Guitar'
  ] 
}

// Returns the word lowercased + .jpg
// Test by: console.log(getURL(source.PICS.transportation[0]) == 'car.jpg');
function getURL(word) {
  return word.toLowerCase() + '.jpg';
}

// Returns a new array of a random permutation of the set based off of the Fisher-Yates algo
function getRandomSet(inputArray) {
  var arr = inputArray; // Don't know if I need this yet .slice(); // Save a copy of the array
  var i = arr.length;
  if (i == 0) return false;

  while (--i) {
    var j = Math.floor(Math.random() * ( i + 1 ));
    var tempi = arr[i];
    var tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
}


$(document).ready(function() {
  var slideMain = $('#main');
  console.log(source.WORDS.transportation);
  console.log(getRandomSet(source.WORDS.transportation));
  console.log(source.WORDS.transportation);
});
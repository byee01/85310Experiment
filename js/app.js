var source = {};
var userData = {};
userData.rawData = [];

var slideList = [];
var currentIndex = 0;

var slidePositions = [
  $('#td-test-top-1'),
  $('#td-test-top-2'),
  $('#td-test-top-3'),
  $('#td-test-bottom-1'),
  $('#td-test-bottom-2'),
  $('#td-test-bottom-3'),
];

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

var Slide = function(node){
  this.node = node;
  this.hidden = true;
  node.hide();
};

Slide.prototype.hideSlide = function() {
  this.node.hide();
}

Slide.prototype.showSlide = function() {
  this.node.show();
}

Slide.prototype.populateTest = function(arr) {
  var wordArr;
  var arrType = arr.shift();
  arrType == 'word' ? wordArr = true : wordArr = false;
  for(var i = 0; i < arr.length; i++) {
    if(wordArr) {
      slidePositions[i].html(arr[i]);
    } else {
      slidePositions[i].html(createPic(arr[i]));
    }
  }
  arr.unshift(arrType); // Don't forget to put the array type back!
};

function showSlide(targetSlide) {
  for(var i = 0; i < slideList.length; i++) {
    slideList[i].hideSlide();
    if(slideList[i] == targetSlide) {
      targetSlide.showSlide();
    }
  }
}

// Returns the word lowercased + .jpg
// Test by: console.log(getURL(source.PICS.transportation[0]) == 'car.jpg');
function createPic(word) {
  //return '<img src="images/' + word.toLowerCase() + '.jpg"/>';
  return word.toLowerCase() + '.jpg'
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
  var sourceArray = getRandomSlides(source.WORDS, source.PICS);
  userData.sourceData = sourceArray;
  var currentSource = sourceArray[0];

  var slideMain = new Slide($('#test-slide'));
  var slideInfo = new Slide($('#info-slide'));
  var slideInput = new Slide($('#input-slide'));
  var slideBlank = new Slide($('#blank-slide'));

  slideList.push(slideMain, slideInput, slideInfo); // Add slides to our slidelist so we can keep track of it.

 // slideInput.hideSlide();


  showSlide(slideInfo);

  $('#input-test-start').live('click', function() {
    runTest();
  });

  var inputButton = $('#input-form-submit');
  inputButton.live('click', function() {
    processTestInput(currentSource);
  });

  function runTest() {
    slideMain.populateTest(sourceArray[currentIndex]);
    showSlide(slideBlank);
    setTimeout(function(){
      showSlide(slideMain);
      setTimeout(function(){ 
        showSlide(slideInput)
      }, 1000);
    }, 1000);
  }

  function processTestInput(source) {
    var userInput = [];

    var formInputs = [
      $('#td-input-top-1'),
      $('#td-input-top-2'),
      $('#td-input-top-3'),
      $('#td-input-bottom-1'),
      $('#td-input-bottom-2'),
      $('#td-input-bottom-3'),
    ];

    // First, grab all the inputs
    // Save them to user data
    // Then clear it
    for (var i = 0; i < formInputs.length; i++) {
      userInput.push(formInputs[i].val());
      formInputs[i].val('');
    }

    userData.rawData.push([userInput.slice(), source.slice()]);
    console.log(userData);

    // Advance the slide
    if (currentIndex < slideList.length - 1) {
      currentIndex++;
      runTest();
    } else {
      showSlide(slideInfo);
    }
  }
});

let balance = 0;
let balanceQty = document.querySelector(".balance-amount");

balanceQty.textContent = balance;

var audio = new Audio('https://audio.jukehost.co.uk/api/external/download/oHUVPGIMh2PdyMT6n0kE5KVOLuNp6bMC');

if(balance == 0.0){
     $('#spin-button').prop('disabled', true);
  }

setInterval(disableIfZero,1000);



$(document).ready(function() {
  
  var balanceAddInput = document.getElementById('add-balance-input')

$('.add-balance-button').on('click', function() {
    var balanceAddInput = document.getElementById('add-balance-input');
    var addBalanceValue = parseFloat(balanceAddInput.value); // Parse the input value as a float
    balance += addBalanceValue;
    balanceQty.textContent = balance;
  enableIfBigger();
});



  
  
	//setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
	initWheel();
      
 
 	$('#spin-button').on('click', function(){
    var isSpinning = true;
    audio.play();
     
    
    $('#spin-button').prop('disabled', true); // disable the button
setTimeout(function() {
    $('#spin-button').prop('disabled', false); // enable the button after 6 seconds (the duration of the roll)
}, 6000);
    
    setTimeout(function() {
    isSpinning = false
      
      console.log(isSpinning)
}, 6100);
    
    
      
    
    var textInput = document.getElementById("color-input");
    var betColor = textInput.value;
    var betInput = document.getElementById("bet-input");
    var betAmount = betInput.value;
     if (betAmount > balance) {
        alert("You don't have enough money.");
        $('#spin-button').prop('disabled', false);
        return; // exit the function to prevent the wheel from spinning
    }
    else
    balance = balance - betAmount;
    balanceQty.textContent = balance;
    
    var clientSeed = generateSeed(20);
    var serverSeed = generateSeed(20);
    var outcomehash = sha256(clientSeed, serverSeed);
    var result = generateResult(outcomehash);
    
    
    
    var container = document.querySelector('.public-seed-container');
    var p = container.querySelector('.seed')
    
    p.textContent = serverSeed;
    console.log(result)
    
 
   
    spinWheel(result,betColor,betAmount,clientSeed,serverSeed,outcomehash);
    setTimeout(function() {
      var color = colorOfResult(result);
    addPreviousRoll(color);
}, 6100);
    
    
   
    console.log(isSpinning)
    

    
  });
});
  
  

function initWheel(){
	var $wheel = $('.roulette-wrapper .wheel'),
  		row = "";
      
  row += "<div class='row'>";
  row += "  <div class='card red'>1<\/div>";
  row += "  <div class='card black'>14<\/div>";
  row += "  <div class='card red'>2<\/div>";
  row += "  <div class='card black'>13<\/div>";
  row += "  <div class='card red'>3<\/div>";
  row += "  <div class='card black'>12<\/div>";
  row += "  <div class='card red'>4<\/div>";
  row += "  <div class='card green'>0<\/div>";
  row += "  <div class='card black'>11<\/div>";
  row += "  <div class='card red'>5<\/div>";
  row += "  <div class='card black'>10<\/div>";
  row += "  <div class='card red'>6<\/div>";
  row += "  <div class='card black'>9<\/div>";
  row += "  <div class='card red'>7<\/div>";
  row += "  <div class='card black'>8<\/div>";
  row += "<\/div>";
  
	for(var x = 0; x < 29; x += 1){
  	$wheel.append(row);
  }
}

function spinWheel(roll, betColor, betAmount,clientSeed,serverSeed,outcomehash){
  

  var $wheel = $('.roulette-wrapper .wheel'),
  		order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
      position = order.indexOf(roll);
            
  //determine position where to land
  var rows = 12,
  		card = 75 + 3 * 2,
      landingPosition = (rows * 15 * card) + (position * card);
  	
  var randomize = Math.floor(Math.random() * 75) - (75/2);
    
  landingPosition = landingPosition + randomize;
    
  var object = {
		x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
	};
  
  $wheel.css({
		'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
		'transition-duration':'6s',
		'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
	});
  
  setTimeout(function(){
		$wheel.css({
			'transition-timing-function':'',
			'transition-duration':'',
		});
    
    var resetTo = -(position * card + randomize);
		$wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
    checkWin(roll,betColor,betAmount);
    
    var outcomeContainer = document.querySelector('.outcome-seed-container');
    var p1 = outcomeContainer.querySelector('.client-seed') ;
    p1.textContent = clientSeed;
    
    var p2 = outcomeContainer.querySelector('.outcome-seed');
    p2.textContent = outcomehash;
    
      }, 6 * 1000);
 
}

function generateSeed(length) {
  const seed = CryptoJS.lib.WordArray.random(length/2).toString();
  return seed;
}

setInterval(fixBalance,100);

function sha256(clientSeed, serverSeed) {
  const input = `${serverSeed}:${clientSeed}`;
  const hash = CryptoJS.SHA256(input).toString();
  return hash;
}


function shuffleString(str) {
  // Convert the string to an array
  const arr = str.split('');
  
  // Shuffle the array using a for loop
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  // Convert the array back to a string
  const shuffledStr = arr.join('');
  
  return shuffledStr;
}



function generateResult(hash) {
  const range = 15; // number of cards
  const number = parseInt(hash.substring(0, 8), 16); // parse the first 8 digits of the hash as a number
  const result = number % range;
  return result;
}

function getColor(num) {
  if (num == 1 || num == 2 || num == 3 || num ==4 || num == 5 || num ==6 || num ==7) {
    return 'red';
  } else if (num == 14 || num == 13 || num == 12 || num == 11 || num == 10 || num == 9 || num == 8) {
    return 'black';
  } else if (num == 0) {
    return 'green';
  } else {
    return 'invalid';
  }
}


function checkWin(result, betColor, betAmount){
  
   if (getColor(result) == betColor){
     if(betColor == 'red' || betColor == 'black'){
       balance = balance + (betAmount * 2)
     }
     else if(betColor == 'green') {
       balance = balance + (betAmount * 7)
     }
     alert("You won!")
     
   }
  else if(betColor != 'red' && betColor != 'black' && betColor !='green') {
    alert('Please insert the color in lower case.')
  }
  else {
    balance = balance;
    alert("You've lost!")
  }

    
  var balanceContainer = document.getElementById('balance-container');
  var balanceAmount = balanceContainer.querySelector('.balance-amount');
  balanceAmount.textContent = balance;
  
}

function disableIfZero(){
   if (balance <= 0) {
  $('#spin-button').prop('disabled', true);
}
}
function enableIfBigger(){
   if (balance > 0) {
  $('#spin-button').prop('disabled', false);
}
}

function addPreviousRoll(resultColor) {
  const previousRolls = document.getElementById("previous-rolls");
  const card = document.createElement("div");
  card.classList.add("previous-roll");
  card.style.backgroundColor = resultColor;
  previousRolls.appendChild(card, previousRolls.firstChild);
}



function colorOfResult(result){
  const red = [1,2,3,4,5,6,7]
  const blue = [8,9,10,11,12,13,14]
  
  console.log(result)
  
      if(red.includes(result)) return '#da117b'
        else if(blue.includes(result)) return '#7e75dd'
            else return '#C8FD01'
  
  }

function fixBalance(){
  balance = balance.toFixed(-2);
}



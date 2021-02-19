'use strict';
// Accessing the DOM element 'msg' -----getElementById goes direcrly into and is faster
const msgEl = document.getElementById('msg');

let randomNum = Math.floor(Math.random() *20) + 1;
console.log('Random Number:' + randomNum);

//Initalize the Speech Recognition Object: using code from API 15-24
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//creating above to create a new instance of speech recognition. above to below to work api
let recognition = new window.SpeechRecognition()
//instanciating an object above
//below, checking to see if this will work 
recognition.start();


recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
    console.log(e) 
    
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);  // call these tiems when createed . Check number oo
    checkNumber(msg);
}
//Capture the input from the user //display user's input into the UI/write what the user speaks 

function writeMessage(msg) {
    msgEl.innerHTML = `
        <div class="response">You said:
        <span class="box">${msg}</span></div>
    `;
};

//Check the user's guess against the number
function checkNumber(msg) {
    const num = +msg; 
    //converts msf into a number (+)
    
    //Check number is valid
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div class="response">That is not a valid number</div>`;
        return;
    } 

    //Check number is in range
    if(num > 100 || num < 1){
        msgEl.innerHTML += `<div class="response">That is not in range. Number must be between 1 and 100 </div>`;
        return;
    }

    //check the number
    if (num === randomNum){
        //Let the user know they won
        // document.body.innnerHTML = `
        msgEl.innerHTML += `
        <div class="response">
            <h1>Congrats! You have guessed the number! <br><br> 
            The number is ${num}. </h1>
            
            <button class="play-again-btn" id="play-again">Play Again</button>
        </div>
        `; 
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>Too high, guess lower</div>`;
    } else {
        msgEl.innerHTML += `<div>Too low, guess higher</div>`;
    }
};

//End Speech Recognition Service
recognition.addEventListener('end', () => recognition.start()); 
document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})










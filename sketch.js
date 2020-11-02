//Reference: https://editor.p5js.org/ml5/sketches/SoundClassification_speechcommand

      //attach a click listener to a play button
//document.querySelector('button')?.addEventListener('click', async () => {
//	await Tone.start()
//	console.log('audio is ready')
//})

const options = { probabilityThreshold: 0.8 };


const play_model = 'models/play/model.json'
const pause_model = 'models/pause/model.json'




const plucky = new Tone.Synth().toDestination();
const now = Tone.now()

let classifier;
let play_classifier;
let pause_classifier;

let bkg_img;

let spoken_word;
let spoken_word_conf;

let radio_ping_pong_delay;
let reverb;
let key_val;

let metronome_val;


///////////////////// PRE LOAD FUNCTION ////////////////////
function preload() {
  // Load SpeechCommands18w sound classifier model
    classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    play_classifier = ml5.soundClassifier(play_model);
    pause_classifier = ml5.soundClassifier(pause_model);
    
    bkg_img = loadImage('img/bkg.png');
    
}




///////////////////// SETUP FUNCTION ////////////////////
function setup() {
//  createCanvas(windowWidth, windowHeight);
    createCanvas(1080, 600);
    textSize(15);
    textFont('Gotham Bold');

    //background(255);
    Tone.start()
    ADSR();
    create_piano();
    
    //radio buttons
    radio_ping_pong_delay = createRadio();
    radio_ping_pong_delay.option('PING PONG DELAY');
    radio_ping_pong_delay.position(450, 410);
    radio_ping_pong_delay.style('width', '200px');
    radio_ping_pong_delay.style('font-family', 'Gotham Bold');
    
    //radio delay buttons
    radio_reverb = createRadio();
    radio_reverb.option('REVERB');
    radio_reverb.position(450, 460);
    radio_reverb.style('width', '200px');
    radio_reverb.style('font-family', 'Gotham Bold');
    
    //radio none button
    radio_none = createRadio();
    radio_none.option('NONE');
    radio_none.position(450, 510);
    radio_none.style('width', '200px');
    radio_none.style('font-family', 'Gotham Bold');
    
    //key value
    key_val = createSelect();
    key_val.position(10, 10);
    key_val.option('1', 1);
    key_val.option('2', 2);
    key_val.option('3', 3);
    key_val.option('4', 4);
    key_val.option('5', 5);
    key_val.option('6', 6);
    key_val.option('7', 7);
    key_val.option('8', 8);
    key_val.selected('4', 4);
    key_val.position(840, 410);
    key_val.style('width', '100px');
    
    
    //gain slider
    gain_val = createSlider(0, 100, 50, 5);
    gain_val.position(840, 460);
    gain_val.style('width', '100px');
    
    
    // gain slider
    metronome_val = createSlider(0, 200, 128, 1);
    metronome_val.position(840, 510);
    metronome_val.style('width', '100px');

        
}





///////////////////// MODEL FOR ML5 FUNCTION ////////////////////
function modelReady() {
  // classify sound
  classifier.classify(gotResult);
//    play_classifier.classify(gotResult);
//    pause_classifier.classify(gotResult);
}








///////////////////// ML5 FUNCTION ////////////////////
function gotResult(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  // log the result
  console.log(result);
    console.log('Label: ' + result[0].label);
    console.log('Confidence: ' + nf(result[0].confidence, 0, 2));
    
    if (result.length > 0) {
        spoken_word = result[0].label;
        spoken_word_conf = nf(result[0].confidence, 0, 2);
    }
    
    
}




///////////////////// PLAY PIANO USING KEYBOARD FUNCTION ////////////////////
function keyPressed() {
  if (keyCode === 65) {
    plucky.triggerAttack("C4", "2", now);
    plucky.triggerRelease();
      print("pressed a");
  }if (keyCode === 83) {
    plucky.triggerAttack("D4", "2", now);
    plucky.triggerRelease();
      print("pressed s");
  }
}



///////////////////// DRAW FUNCTION ///////////////////////////
function draw() {
    image(bkg_img, 0, 0);
    
    fill(0);
    textSize(16);
        //key text 
    text('KEY: ', 790, 425);   
    text('GAIN: ', 780, 475);  
    text('METRONOME: ', 718, 525);  
    text(metronome_val.value(), 800, 540); 
    
    push();
    fill(255);
    textSize(20);
    text('ATTACK - DECAY - ', 140, 343);
    text('SUSTAIN - RELEASE', 133, 363);
    
    text('EFFECTS', 495, 353);
    
    text('MISC', 820, 353);
    
    pop();
    
    
    
//    create_piano();
//    create_piano();
    

    
    
//    if (spoken_word) {
//        print("label: " + spoken_word);
//        print("confidence: " + spoken_word_conf);
//    }
    
}




///////////////////// WINDOW RESIZED FUNCTION ///////////////////////////
//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
////    background(255);
////    create_piano();
//}
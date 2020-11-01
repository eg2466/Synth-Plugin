//Reference: https://editor.p5js.org/ml5/sketches/SoundClassification_speechcommand

const options = { probabilityThreshold: 0.8 };


const play_model = 'models/play/model.json'
const pause_model = 'models/pause/model.json'

let classifier;
let play_classifier;
let pause_classifier;


let spoken_word;
let spoken_word_conf;

function preload() {
  // Load SpeechCommands18w sound classifier model
    classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    play_classifier = ml5.soundClassifier(play_model);
    pause_classifier = ml5.soundClassifier(pause_model);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    
}



function modelReady() {
  // classify sound
  classifier.classify(gotResult);
//    play_classifier.classify(gotResult);
//    pause_classifier.classify(gotResult);
}



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




function draw() {
  background(220, 0, 0);
    
    if (spoken_word) {
        print("label: " + spoken_word);
        print("confidence: " + spoken_word_conf);
    }
    
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
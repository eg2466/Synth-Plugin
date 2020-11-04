//Reference: https://editor.p5js.org/ml5/sketches/SoundClassification_speechcommand
const options = { probabilityThreshold: 0.8 };


const play_model = 'models/play/model.json'
const pause_model = 'models/pause/model.json'


let gain_synth_val = 10;

//https://tonejs.github.io/docs/14.7.58/PingPongDelay.html
const synth_pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();


//ADSR - https://tonejs.github.io/docs/14.7.58/AmplitudeEnvelope
//const ampEnv = new Tone.AmplitudeEnvelope({
//		attack: 1,
//		decay: 2,
//		sustain: 1.0,
//		release: 8
//	}).toDestination();


const synth_reverb = new Tone.Reverb({wet: 1, decay  : 1.5 ,preDelay  : 0.01}).toDestination();

const synth_tone = new Tone.Synth({
            envelope: {
				attackCurve: "exponential",
				attack: 0.05,
				decay: 0.2,
				sustain: 0.2,
				release: 1.5}
            }).toDestination();




let loop_metro;
const now = Tone.now()
let gainNode = new Tone.Gain(-0.6).toDestination();
const metro_tone = new Tone.Synth().connect(gainNode).toDestination();

let bpm;

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

let keyboard_checkbox


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

    
    Tone.start();
    ADSR();
    create_piano();
    
    
    ////////// looping metronome ////////
    //https://tonejs.github.io/docs/14.7.58/Loop
//    loop_metro = new Tone.Loop((time) => {
//	console.log(time);
//    synth_tone.triggerAttackRelease("C5", str(bpm));
//    }, str(bpm)).start();
//    
//    //to start metronome
//    Tone.Transport.start();

    
    //radio buttons
    radio_ping_pong_delay = createRadio();
    radio_ping_pong_delay.option('PING PONG DELAY');
    radio_ping_pong_delay.position(775, 490);
    radio_ping_pong_delay.style('width', '200px');
    radio_ping_pong_delay.style('font-family', 'Gotham Bold');
    
    //radio delay buttons
    radio_reverb = createRadio();
    radio_reverb.option('REVERB');
    radio_reverb.position(775, 515);
    radio_reverb.style('width', '200px');
    radio_reverb.style('font-family', 'Gotham Bold');
    
    //radio none button
    radio_none = createRadio();
    radio_none.option('NONE');
    radio_none.position(775, 540);
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
    key_val.position(840, 400);
    key_val.style('width', '100px');
    
    
    //piano keyboard values:
    keyboard_checkbox = createCheckbox('KEYBOARD SHORTCUT', false);
    keyboard_checkbox.position(450, 280);
    
    //gain slider
    gain_val = createSlider(-10, 30, 10, 1);
    gain_val.position(840, 440);
    gain_val.style('width', '100px');
    
    
    // metronome slider
    metronome_val = createSlider(0, 200, 120, 1);
    metronome_val.position(540, 400);
    metronome_val.style('width', '120px');
    
    bpm = metronome_val.value();
    
    
        loop_metro_80 = new Tone.Loop((time) => {
//        console.log(time);
        metro_tone.triggerAttack("C5","1");
        metro_tone.triggerRelease();
        }, "4n" );
        
    
    synth_tone.volume.value = gain_synth_val;
    
    metro(bpm);
//    print(bpm);  

        
}


function metro(bpm_val){

    Tone.start();
    
    if(spoken_word === "go" || spoken_word === "no"){
        loop_metro_80.start();
        Tone.Transport.bpm.value = bpm_val;
        Tone.Transport.start();
        print("im hererere")
    }else{
        loop_metro_80.stop();
        Tone.Transport.stop();
    }
    
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
    synth_tone.triggerAttack("C"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 87) {
    synth_tone.triggerAttack("C#"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 83) {
    synth_tone.triggerAttack("D"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 69) {
    synth_tone.triggerAttack("D#"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 68) {
    synth_tone.triggerAttack("E"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 70) {
    synth_tone.triggerAttack("F"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 84) {
    synth_tone.triggerAttack("F#"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 71) {
    synth_tone.triggerAttack("G"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 89) {
    synth_tone.triggerAttack("G#"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 72) {
    synth_tone.triggerAttack("A"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 85) {
    synth_tone.triggerAttack("A#"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 74) {
    synth_tone.triggerAttack("B"+str(key_val.value()), "4n", now);
    synth_tone.triggerRelease();
  }if (keyCode === 75) {
    synth_tone.triggerAttack("C"+str(int(key_val.value()) + 1), "4n", now);
    synth_tone.triggerRelease();
  }
    
}




///////////////////// DRAW FUNCTION ///////////////////////////
function draw() {
    image(bkg_img, 0, 0);
    
    fill(0);
    textSize(16);
        //key text 
    text('KEY: ', 790, 415); 
    
    text('GAIN: ', 780, 455);  
    textSize(14);
    text(gain_val.value() + ' dB', 785, 470); 
    
    ////////METRONOME text //////////
    textSize(16);
    text('METRONOME: ', 415, 415);  
    text('BPM:   '+metronome_val.value(), 490, 465); 
    text('STATUS:  ', 460, 515);
    
    textSize(11);
    text('(Say "go" to start)', 545, 530);
    text('(Say "stop" to stop)', 545, 545);
    
    
    textSize(16);
    if(spoken_word === "go" || spoken_word === "no"){
        push();
            fill(0, 255, 0);
            text('ACTIVE', 545, 515);
        pop();
    }else{
         push();
            fill(200, 0, 0);       
            text('INACTIVE', 545, 515);
        pop();
    }
    
    ////////////////////////////////
    
    if (keyboard_checkbox.checked()){
        push();
        textSize(11);
            fill(0);
            text('(a)', 325, 253); 
            text('(s)', 383, 253); 
            text('(d)', 440, 253); 
            text('(f)', 505, 253); 
            text('(g)', 563, 253); 
            text('(h)', 622, 253); 
            text('(j)', 683, 253); 
            text('(k)', 743, 253); 
        
            text('(w)', 350, 93); 
            text('(e)', 412, 93); 
        
            text('(t)', 532, 93); 
            text('(y)', 590, 93);
            text('(u)', 650, 93); 
        pop();      
    }
    ///////////////////////////////
    
    push();
    fill(255);
    textSize(20);
    text('ATTACK - DECAY - ', 140, 343);
    text('SUSTAIN - RELEASE', 133, 363);
  
    text('METRONOME', 475, 353);
    
    text('MISC', 820, 353);
    
    pop();
    
    
    //ADSR values
        push();
    fill(255);
    textSize(14);
    text(attack.value(), 135, 553);
    text(decay.value(), 200, 553);
    text(sustain.value(), 260, 553);
    text(release.value(), 320, 553);
    
    pop();
    
    
    bpm = metronome_val.value();
    metro(bpm);

    gain_synth_val = gain_val.value();
    synth_tone.volume.value = gain_synth_val;
    
    if (radio_reverb.value() === 'REVERB'){
//        synth_reverb.Q.value = 6;
        synth_tone.chain(synth_reverb, Tone.Destination);
        
//        synth_reverb.start();
//        print("reverb")
    }
    if (radio_ping_pong_delay.value() === 'PING PONG DELAY'){
//        synth_pingPong.wet.value = 1;
        synth_tone.chain(synth_pingPong, Tone.Destination);
//        print("ping pong")
    }
    else{
        synth_pingPong.disconnect();
        synth_reverb.disconnect();
    }
    
    
    
//    print("release val " + synth_tone.envelope.release);
    synth_tone.envelope.attack = attack.value();
    synth_tone.envelope.decay = decay.value();
    synth_tone.envelope.sustain = sustain.value();
    synth_tone.envelope.release = release.value();
//    print("release val2 " + synth_tone.envelope.release);
}




///////////////////// WINDOW RESIZED FUNCTION ///////////////////////////
//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
////    background(255);
////    create_piano();
//}
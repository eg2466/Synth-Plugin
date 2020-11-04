let attack;
let decay;
let sustain;
let release;


//ADSR ranges from this : https://sound.stackexchange.com/questions/27798/what-time-range-is-used-for-adsr-envelopes

function ADSR() {
  attack = createSlider(0, 9, 0.05, 0.05);
  attack.id("attack-slider")
  attack.position(91, 470);
  attack.style('width', '119px');
    
    
  decay = createSlider(0, 20, 0.2, 0.2);
  decay.id("attack-slider")
  decay.position(149, 470);
  decay.style('width', '119px');
    
 
  sustain = createSlider(0, 1, 0.2, 0.1);
  sustain.id("attack-slider")
  sustain.position(206, 470);
  sustain.style('width', '119px');    
    
  
  release = createSlider(0, 10, 1.5, 0.5);
  release.id("attack-slider")
  release.position(262, 470);
  release.style('width', '119px');       
    
}
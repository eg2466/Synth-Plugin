let attack;
let decay;
let sustain;
let release;

function ADSR() {
  attack = createSlider(0, 100, 10, 5);
  attack.id("attack-slider")
  attack.position(91, 470);
  attack.style('width', '119px');
    
    
  decay = createSlider(0, 100, 10, 5);
  decay.id("attack-slider")
  decay.position(149, 470);
  decay.style('width', '119px');
    
 
  sustain = createSlider(0, 100, 10, 5);
  sustain.id("attack-slider")
  sustain.position(206, 470);
  sustain.style('width', '119px');    
    
  
  release = createSlider(0, 100, 10, 5);
  release.id("attack-slider")
  release.position(262, 470);
  release.style('width', '119px');       
    
}
let c;
let c1;
let d;
let d1;
let e;
let f;
let f1;
let g;
let g1;
let a;
let a1;
let b;
let c2;

let c_pressed;
let d_pressed




function create_piano() {
    
    c = createButton('C');  
    c.mousePressed(c_key);
//    c.mouseReleased(c_key_rel);
    c.id("white-btn")
    c.position(100, 100);  
    
    
    d = createButton('D');  
    d.id("white-btn")
    d.mousePressed(d_key);
    d.position(160, 100);  
    
    e = createButton('E');  
    e.id("white-btn")
    e.position(220, 100);    
    
    f = createButton('F');  
    f.id("white-btn")
    f.position(280, 100);   
    
    g = createButton('G');  
    g.id("white-btn")
    g.position(340, 100);
    
    a = createButton('A');  
    a.id("white-btn")
    a.position(400, 100);
    
    b = createButton('B');  
    b.id("white-btn")
    b.position(460, 100);
    
    c2 = createButton('C');  
    c2.id("white-btn")
    c2.position(520, 100);
    
    
    
    c1 = createButton('C#');  
    c1.id("blk-btn")
    c1.position(140, 100);  
    
    d1 = createButton('D#');  
    d1.id("blk-btn")
    d1.position(200, 100);  
    
    f1 = createButton('F#');  
    f1.id("blk-btn")
    f1.position(320, 100);  
    
    g1 = createButton('G#');  
    g1.id("blk-btn")
    g1.position(380, 100); 
    
    a1 = createButton('A#');  
    a1.id("blk-btn")
    a1.position(440, 100); 
    
}


function c_key(){
//    c_pressed = 1;
//    d_pressed = 0;
//    plucky.triggerAttackRelease("C4", "8n", now);
//    plucky.triggerRelease();
//    print("here");
}

function d_key(){
//    plucky.triggerAttackRelease("D4", "8n", now);

}


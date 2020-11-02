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
let d_pressed;

let gain_val;

//let c2_val


function create_piano() {
    
    c = createButton('C');  
    c.mousePressed(c_key);
//    c.mouseReleased(c_key_rel);
    c.id("white-btn");
    c.position(300, 100);  
    
    
    d = createButton('D');  
    d.id("white-btn");
    d.mousePressed(d_key);
    d.position(360, 100);  
    
    e = createButton('E');  
    e.id("white-btn");
    e.mousePressed(e_key);
    e.position(420, 100);    
    
    f = createButton('F');  
    f.id("white-btn")
    f.mousePressed(f_key);
    f.position(480, 100);   
    
    g = createButton('G');  
    g.id("white-btn");
    g.mousePressed(g_key);
    g.position(540, 100);
    
    a = createButton('A');  
    a.id("white-btn");
    a.mousePressed(a_key);
    a.position(600, 100);
    
    b = createButton('B');  
    b.id("white-btn");
    b.mousePressed(b_key);
    b.position(660, 100);
    
    c2 = createButton('C');  
    c2.id("white-btn");
    c2.mousePressed(c2_key);
    c2.position(720, 100);
    
    
    
    c1 = createButton('C#');  
    c1.id("blk-btn")
    c1.mousePressed(c_sharp_key);
    c1.position(340, 100);  
    
    d1 = createButton('D#');  
    d1.id("blk-btn");
    d1.mousePressed(d_sharp_key);
    d1.position(400, 100);  
    
    f1 = createButton('F#');  
    f1.id("blk-btn");
    f1.mousePressed(f_sharp_key);
    f1.position(520, 100);  
    
    g1 = createButton('G#');  
    g1.id("blk-btn");
    g1.mousePressed(g_sharp_key);
    g1.position(580, 100); 
    
    a1 = createButton('A#');  
    a1.id("blk-btn");
    a1.mousePressed(a_sharp_key);
    a1.position(640, 100); 

    
}


function c_key(){
    plucky.triggerAttack("C"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function c_sharp_key(){
    plucky.triggerAttack("C#"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}


function d_key(){
    plucky.triggerAttack("D"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function d_sharp_key(){
    plucky.triggerAttack("D#"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function e_key(){
    plucky.triggerAttack("E"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function f_key(){
    plucky.triggerAttack("F"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function f_sharp_key(){
    plucky.triggerAttack("F#"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function g_key(){
    plucky.triggerAttack("G"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function g_sharp_key(){
    plucky.triggerAttack("G#"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}


function a_key(){
    plucky.triggerAttack("A"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}


function a_sharp_key(){
    plucky.triggerAttack("A#"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}


function b_key(){
    plucky.triggerAttack("B"+str(key_val.value()), "8n", now);
    plucky.triggerRelease();
}

function c2_key(){
//    c2_val = int(key_val.value()) + 1;
    plucky.triggerAttack("C"+str(int(key_val.value()) + 1), "8n", now);
    plucky.triggerRelease();
    print("C"+str(int(key_val.value()) + 1));
}




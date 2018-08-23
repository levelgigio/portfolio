function Star() {
    this.x = random(-largura/2, largura/2);
    this.y = random(-altura/2, altura/2);
    this.z = random(0, altura/2);
    this.px = 0;
    this.py = 0;
    this.draw = function() {
        fill(255);
        noStroke();
        var tamanho = map(this.z, 0, altura/2, 6, 0);
        ellipse(this.x/this.z*largura, this.y/this.z*altura, tamanho, tamanho);
        stroke(255);
        strokeWeight(tamanho);
        line(this.px, this.py, this.x/this.z*largura, this.y/this.z*altura);
    };
    this.update = function() {
        this.px = this.x/this.z*largura;
        this.py = this.y/this.z*altura;
        this.z = this.z - velocidade;
        
        if(this.z < 1) {
            this.z = random(0, altura/2);  
            this.px = this.x/this.z*largura;
            this.py = this.y/this.z*altura;
        } 
    };
}

// ------------------------------------------------------------- //

let altura = 400;
let largura = 400;
var stars = [];
var velocidade = 5;

function setup() {
    var canvas = createCanvas(largura, altura);
    canvas.parent("challenge_001_starfield");
    background(0);
    for(var i = 0; i < 600; i++)
        stars[i] = new Star();
}

function draw() {
    background(0);
    translate(largura/2, altura/2);
    for(var i = 0; i < 600; i++) {
        stars[i].update();
        stars[i].draw();
    }       
}
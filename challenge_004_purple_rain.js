function Gota() {
    this.x = random(0, largura);
    this.y = random(-altura, 0);
    this.z = random(0, 20);
    this.comprimento = map(this.z, 0, 20, 4, 10);
    this.espessura = map(this.z, 0, 20, 1, 3)
    this.velocidade = map(this.z, 0, 20, 2, 5);
    this.draw = function() {
        stroke(100, 0, 100);
        strokeWeight(this.espessura);
        line(this.x, this.y, this.x ,this.y+this.comprimento);
    }
    this.update = function() {
        this.velocidade *= 1.01;
        this.y += this.velocidade;
        if(this.y >= altura) {
            splashs.push(new Splash(this));
            this.y = random(-altura, 0);
            this.x = random(0, largura);
            this.velocidade = map(this.z, 0, 20, 2, 5);
        }    
    }
}

function Splash(gota) {
    this.x1 = gota.x;
    this.x2 = gota.x
    this.y = gota.y;
    this.espessura = gota.espessura;
    this.mod_velocidade = -gota.velocidade/1.5;
    this.angulo = map(gota.velocidade, 2, 5, 63.0*3.14/180.0, 70.0*3.14/180.0);
    this.velx = Math.cos(this.angulo)*this.mod_velocidade;
    this.vely = Math.sin(this.angulo)*this.mod_velocidade;
    this.draw = function() {
        noFill();
        strokeWeight(1);
        ellipse(this.x1, this.y, this.espessura, this.espessura);
        ellipse(this.x2, this.y, this.espessura, this.espessura);
    }
    this.update = function() {
        this.vely += 1;
        this.y += this.vely;
        this.x1 += this.velx;
        this.x2 -= this.velx;
    }
}

// ------------------------------------------------------------- //

let largura = 400;
let altura = 400;
var gotas = [];
var splashs = [];

function setup() {
    var canvas = createCanvas(largura, altura);
    canvas.parent("challenge_004_purple_rain");
    for (var i = 0; i < 35; i++) 
        gotas.push(new Gota());
}

function draw() {
    background(255, 218, 185);
    for (var i = 0; i < gotas.length; i++) {
        gotas[i].draw();
        gotas[i].update();
    } 
    for (var i = 0; i < splashs.length; i++) {
        splashs[i].draw();
        splashs[i].update();
        if(splashs[i].y > altura + 10)
            splashs.splice(i, 1);
    }
}
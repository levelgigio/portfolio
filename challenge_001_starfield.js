var starfield = new p5((sketch) => {

    function Star() {
        this.x = sketch.random(-largura/2, largura/2);
        this.y = sketch.random(-altura/2, altura/2);
        this.z = sketch.random(0, altura/2);
        this.px = 0;
        this.py = 0;
        this.draw = function() {
            sketch.fill(255);
            sketch.noStroke();
            var tamanho = sketch.map(this.z, 0, altura/2, 6, 0);
            sketch.ellipse(this.x/this.z*largura, this.y/this.z*altura, tamanho, tamanho);
            sketch.stroke(255);
            sketch.strokeWeight(tamanho);
            sketch.line(this.px, this.py, this.x/this.z*largura, this.y/this.z*altura);
        };
        this.update = function() {
            this.px = this.x/this.z*largura;
            this.py = this.y/this.z*altura;
            this.z = this.z - velocidade;

            if(this.z < 1) {
                this.z = sketch.random(0, altura/2);  
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


    sketch.setup = function() {
        var canvas = sketch.createCanvas(largura, altura);
        canvas.parent("challenge_001_starfield");
        sketch.background(0);
        for(var i = 0; i < 600; i++)
            stars[i] = new Star();
    }

    sketch.draw = function() {
        sketch.background(0);
        sketch.translate(largura/2, altura/2);
        for(var i = 0; i < 600; i++) {
            stars[i].update();
            stars[i].draw();
        }       
    }
});
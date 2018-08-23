var menger_sponge = new p5((sketch) => {
    function Box(x, y, z, raio) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.raio = raio;
        this.draw = function() {
            sketch.push();
            sketch.translate(this.x, this.y, this.z);
            sketch.box(this.raio);
            sketch.pop();
        }
        this.divide = function() {
            for(var i = -1; i <= 1; i++)
                for(var j = -1; j <= 1; j++) 
                    for(var k = -1; k <= 1; k++) 
                        if(sketch.abs(i)+sketch.abs(j)+sketch.abs(k) > 1)
                            new_boxes[new_boxes.length] = new Box(this.raio/3*i + this.x, this.raio/3*j + this.y, this.raio/3*k + this.z, this.raio/3);
        }
    }

    // ------------------------------------------------------------ //

    var angulo = 0;
    var boxes = [];
    var new_boxes = [];
    var divisoes = 0;
    let largura = 400;
    let altura = 400;
    var mouse_clicks = 0;

    sketch.setup = function() {
        var canvas = sketch.createCanvas(largura, altura, sketch.WEBGL);
        canvas.parent("challenge_002_menger_sponge");
        boxes[0] = new Box(0, 0, 0, 150);
    }

    sketch.draw = function() {
        sketch.background(0);
        sketch.rotateX(angulo)
        sketch.rotateY(angulo/2);
        sketch.fill(255);
        for(var i = 0; i < boxes.length; i++)
            boxes[i].draw();
        angulo += 0.01;
    }

    sketch.mousePressed = function() {
        if(mouse_clicks < 2) {
            var total = boxes.length;
            for(var i = 0; i < total; i++)
                boxes[i].divide();
            boxes = new_boxes;
            new_boxes = [];
            mouse_clicks++;
        }
    }
});


let app = new PIXI.Application({width: 600, height: 800});

//size
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

var width = window.innerWidth;
var height = window.innerHeight*0.95;

app.renderer.resize(width, height);

PIXI.loader
    .add("img/space_ship.png")
    .add("img/star.png")
    .add('DisposableDroidBB', "DisposableDroidBB.ttf")
    .load(setup);

function setup(){
    space_ship = new PIXI.Sprite(PIXI.loader.resources['img/space_ship.png'].texture);
    stars = [];
    //initial stars
    for(var i = 0; i<12; i++){
        stars[i] = new PIXI.Sprite(PIXI.loader.resources['img/star.png'].texture);
        stars[i].x = Math.random()*width;
        stars[i].y = Math.random()*height;
        app.stage.addChild(stars[i]);
    }
    //initial space ship
    space_ship.x = 0.45*width;
    space_ship.y = height;
    app.stage.addChild(space_ship);

    state = play;

    message = new PIXI.Text("0s",{fill:"white",fontFamily:'PIXELFONT',fontSize: 0.00005*height*width});
    app.stage.addChild(message);
    message.position.set(54, 54);

    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    state(delta);
}

time = 0;
dt = 1;

function play(delta){
    //initial movement of the space ship
    if(space_ship.y > 0.618*height){
        space_ship.y -= (1-0.618)*height/90;
    }
    //moving stars
    for(var i = 0; i<12; i++){
        if(stars[i].y>height){
            stars[i].y = 0;
            stars[i].x = Math.random()*width;
        }
        else{
            stars[i].y += height/180;
        }
    }
    //time
    time += dt;
    message.text = Math.floor(time/60)+"s";
}

document.body.appendChild(app.view);

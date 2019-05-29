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
    //initialize stars
    for(var i = 0; i<12; i++){
        stars[i] = new PIXI.Sprite(PIXI.loader.resources['img/star.png'].texture);
        stars[i].x = Math.random()*width;
        stars[i].y = Math.random()*height;
        app.stage.addChild(stars[i]);
    }
    //initialize space ship
    space_ship.x = 0.45*width;
    space_ship.y = height;
    app.stage.addChild(space_ship);

    state = play;

    message = new PIXI.Text("0s",{fill:"white",fontFamily:'PIXELFONT',fontSize: 0.00005*height*width});
    app.stage.addChild(message);
    message.position.set(54, 54);

    app.ticker.add(delta => gameLoop(delta));
}

let time = 0;
let dt = 0;
let end = false;
let enter = false;

function gameLoop(delta){
    window.addEventListener("mousedown",function(){
        dt = 1;
        enter = true;
    });
    
    window.addEventListener("touchstart",function(){
        dt = 1;
        enter = true;
    });

    window.addEventListener("mouseup",function(){
        end = true;
        dt = 0;
    });
    
    window.addEventListener("touchend",function(){
        end = true;
        dt = 0;
    });
    if(end){
        end_game(delta);
    }
    else{
        play(delta);
    }

    if(space_ship.y > 0.8*height && enter){
        space_ship.y -= (1-0.8)*height/90;
    }
}

function play(delta){
    //initial movement of the space ship
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

let next_req =true;
function end_game(delta){
    if(space_ship.y > -150){
        //moving space_ship
        space_ship.y -= 0.8*height/90;
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
    }
    else if(next_req){
        next_req = false;
        document.getElementById("time-value").value = Math.floor(time/60);
        console.log("time");
        document.getElementById("data-form").submit();
        
    }

}

document.body.appendChild(app.view);

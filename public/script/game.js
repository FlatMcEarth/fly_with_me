app = new PIXI.Application({width: 600, height: 800});

//size
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight*0.95);

document.body.appendChild(app.view);

var express = require('express');
var app = express();

app.set('port', process.env.PORT||3000);

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'));

app.get("/", function(req, res){
    res.render('start');
});

app.get('/game',function(req,res){
    res.render('game');
});

app.use(require('body-parser')());

//initial ranking
var ranking = [];
for(var i = 0; i<10; i++){
    ranking[i] = {
        ranking: i+1,
        name: "Flyer",
        time: 0
    };
}

app.post('/end', function(req, res){
    var time = req.body.time;
    if(time>ranking[9].time){
        res.render("end-name",{time: time});
    }
    else{
        res.render("end",{time: time});
    }
});
var util = require("./util");

app.post('/rank_process',function(req,res){
    var item = {
        ranking: 0,
        name: req.body.name,
        time: parseInt(req.body.time)
    };
    if(req.body.played=="true"){
        util.ranking_insert(ranking,item);
    }
    res.redirect(303,"/ranking");
});

app.get("/ranking", function(req,res){
    res.render("ranking",{ranking: ranking});
})

//404 page
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

//500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+
    app.get('port'));
});
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

app.post('/end', function(req, res){
    var time = req.body.time;
    console.log("time");
    res.render("end",{time: time});
});

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
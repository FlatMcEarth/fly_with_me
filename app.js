var express = require('express');
var app = express();

app.set('port', process.env.PORT||3000);

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'));
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
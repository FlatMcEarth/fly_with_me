exports.ranking_insert = function(ranking, item){
    var loc = find_loc(ranking,item);
    if(loc<0){
        return;
    }
    insert_loc(ranking,item,loc);
};

function find_loc(ranking, item){
    for(var i = 0; i<10; i++){
        if(ranking[i].time<item.time){
            return i;
        }
    }
    return -1;
}

function insert_loc(ranking, item, loc){
    item.ranking = loc+1;
    ranking.splice(loc,0,item);
    for(var i = loc; i<10; i++){
        ranking[i].ranking = i+1;
    }
    ranking.splice(10);
}

var ranking = [];
for(var i = 0; i<10; i++){
    ranking[i] = {
        ranking: i+1,
        name: "Flyer",
        time: 1000-i*100
    };
}

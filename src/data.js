var http = require('http');

const url = "someUrlThatNickWillGiveMe";
var responseString = "";

var brews;
//console.log(msg);

exports.getCurrentDrinks = function (callback) {
    //var drink = {};
    //var drinks = []; // should this be = {}
    console.log(msg);

    http.get(url, (response) => {
        let data = '';
    response.on('data' , (chunk) => {
        data += chunk;
});

    response.on('end', () => {
        var drinkArr = JSON.parse(data);
    brews = Object.keys(drinkArr);
    responseString = this.getOnTapSpeech(drinkArr);

    callback(drinkArr);// kinda confused what a callback is for
});
})
.on('error', (err) => {
        console.log("Error: " + err.message);

    responseString = "Sorry we are having issues connecting to kegerator database";


});
}

exports.getOnTapSpeech = function(drinkArr){

    if(brews.length == 0){
        return "There are no drinks on tap! Better start brewing!"
    }
    if(brews.length == 1){
        var res = "We just have some " + brews[0] + " on tap. It has an ABV percentage of "
            + drinkArr[brews[0]].ABV;

        if(drinkArr[brews[0]].amountRem < 2000){
            res += ". There isn't much left, so please drink responsibly"
        }

        return res;
    }else{
        var res = "We have some ";
        while(brews.length > 1){
            var temp = brews.pop();
            res += temp + " It has an ABV percentage of " + drinkArr[temp].ABV;
            if(drinkArr[temp].amountRem < 2000){
                res += ". There isn't much left, so please drink responsibly"
            }

            res += " and in addition we also have ";
        }

        res += drinkArr[brews[0]] + " on tap. It has an ABV percentage of "
            + drinkArr[brews[0]].ABV;

        if(drinkArr[brews[0]].amountRem < 2000){
            res += ". There isn't much left, so please drink responsibly"
        }

        return res;
    }
}

exports.getOutput = function(){
    return responseString;
}
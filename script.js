$(document).ready(function() {
    $("#content").hide();
    $("#city").keyup(function(e){
        var code= e.which;
        if(code==13){
            getWeather();
        }
    });
    $("#button").on("click",function(){
        getWeather();
    });


});

function getWeather(){
    var city =$("#city").val();
    $("#content").show();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q="+ city+",us&mode=xml&appid=b416f86b2ee1b6bd7f1466ba3f7e1e4a&unit%C3%A9s=imp%C3%A9riale",
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
            myFunction(result);
        },
        error: function () {
            alert('City not found');
        }
    });
}


function myFunction(result){
    document.getElementById("content").innerHTML= "";
    var array= result.list;
    for(var i=0; i<array.length;i++){
        var time= array[i].dt_txt.split(" ");
        //console.log($("#time").val());
        //console.log(time[1]);

        if($("#time").val() == time[1]){
            var weather = array[i].weather[0].description;
            var temperature = (array[i].main.temp-273.15)*1.8+32;
            var humidity = array[i].main.humidity;
            var windspeed = array[i].wind.speed;
            document.getElementById("content").innerHTML += "<tr class='weather'>"+
                "</tr><td id='date'>"+"Weather on "+time[0]+" at "+time[1]+"</td>"+"<td id='weather'>" +"Description of weather: "+ weather + "</td>"+"<td id='temp'>"+"Temperature: "+temperature+"°F"+"</td>"+"<td id='humidity'>"+"Humidity: "+humidity+"%"+"</td>"
            +"<td id='windspeed'>"+"Windspeed: "+windspeed+"mph"+"</td>";
        }
    }





}